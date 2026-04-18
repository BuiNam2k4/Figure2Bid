import { Client } from "@stomp/stompjs";
import { ensureValidAccessToken } from "./authService";
import { getAccessToken } from "../utils/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const WS_ENDPOINT_PATH = import.meta.env.VITE_WS_ENDPOINT || "/ws";
const WS_APP_PREFIX = import.meta.env.VITE_WS_APP_PREFIX || "/app";
const WS_TOPIC_PREFIX = import.meta.env.VITE_WS_TOPIC_PREFIX || "/topic";
const WS_USER_ERROR_DESTINATION = "/user/queue/errors";

function buildWebSocketUrl() {
  const baseUrl = new URL(API_BASE_URL);
  baseUrl.protocol = baseUrl.protocol === "https:" ? "wss:" : "ws:";
  baseUrl.pathname = WS_ENDPOINT_PATH;
  baseUrl.search = "";
  baseUrl.hash = "";
  return baseUrl.toString();
}

function parseJsonSafely(rawValue) {
  if (!rawValue || typeof rawValue !== "string") {
    return null;
  }

  try {
    return JSON.parse(rawValue);
  } catch {
    return null;
  }
}

function extractErrorMessage(payload, fallbackMessage) {
  if (!payload) {
    return fallbackMessage;
  }

  if (typeof payload.message === "string" && payload.message.trim()) {
    return payload.message;
  }

  if (typeof payload.error === "string" && payload.error.trim()) {
    return payload.error;
  }

  return fallbackMessage;
}

function toFiniteNumber(value, fallbackValue = 0) {
  const parsedValue = Number(value);
  return Number.isFinite(parsedValue) ? parsedValue : fallbackValue;
}

function normalizeRealtimeBidEvent(payload) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const auctionId = toFiniteNumber(payload.auctionId, NaN);
  const bidId = toFiniteNumber(payload.bidId, NaN);

  if (!Number.isFinite(auctionId) || !Number.isFinite(bidId)) {
    return null;
  }

  return {
    auctionId,
    bidId,
    userId: toFiniteNumber(payload.userId, NaN),
    username: String(payload.username || "Unknown"),
    bidAmount: toFiniteNumber(payload.bidAmount, 0),
    bidTime: payload.bidTime || new Date().toISOString(),
    currentPrice: toFiniteNumber(payload.currentPrice, 0),
    totalBids: Math.max(0, toFiniteNumber(payload.totalBids, 0)),
    status: typeof payload.status === "string" ? payload.status : "",
  };
}

export async function createAuctionBidRealtimeClient({
  auctionId,
  onBidEvent,
  onError,
  onConnectionChange,
}) {
  if (!auctionId && auctionId !== 0) {
    throw new Error("Thieu id auction de ket noi realtime bidding.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();
  if (!accessToken) {
    throw new Error("Phien dang nhap khong hop le de ket noi realtime.");
  }

  const encodedAuctionId = encodeURIComponent(String(auctionId));
  const bidTopicDestination = `${WS_TOPIC_PREFIX}/auctions/${encodedAuctionId}/bids`;
  const placeBidDestination = `${WS_APP_PREFIX}/auctions/${encodedAuctionId}/bids.place`;

  const client = new Client({
    brokerURL: buildWebSocketUrl(),
    reconnectDelay: 4000,
    heartbeatIncoming: 10000,
    heartbeatOutgoing: 10000,
    connectHeaders: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  let bidSubscription = null;
  let errorSubscription = null;

  const reportError = (message, fallbackMessage) => {
    if (typeof onError !== "function") {
      return;
    }
    onError(message || fallbackMessage || "Realtime bidding gap loi.");
  };

  client.beforeConnect = async () => {
    await ensureValidAccessToken();
    const freshAccessToken = getAccessToken();
    if (!freshAccessToken) {
      throw new Error("Khong tim thay access token de ket noi realtime.");
    }

    client.connectHeaders = {
      Authorization: `Bearer ${freshAccessToken}`,
    };
  };

  client.onConnect = () => {
    if (bidSubscription) {
      bidSubscription.unsubscribe();
    }
    if (errorSubscription) {
      errorSubscription.unsubscribe();
    }

    bidSubscription = client.subscribe(bidTopicDestination, (message) => {
      const payload = parseJsonSafely(message.body);
      const normalizedEvent = normalizeRealtimeBidEvent(payload);
      if (!normalizedEvent) {
        reportError(
          "Phan hoi realtime khong hop le. Dang tai lai du lieu...",
          "Phan hoi realtime khong hop le.",
        );
        return;
      }

      if (typeof onBidEvent === "function") {
        onBidEvent(normalizedEvent);
      }
    });

    errorSubscription = client.subscribe(
      WS_USER_ERROR_DESTINATION,
      (message) => {
        const payload = parseJsonSafely(message.body);
        reportError(
          extractErrorMessage(payload, "Dat gia realtime that bai."),
          "Dat gia realtime that bai.",
        );
      },
    );

    if (typeof onConnectionChange === "function") {
      onConnectionChange("connected");
    }
  };

  client.onDisconnect = () => {
    if (typeof onConnectionChange === "function") {
      onConnectionChange("disconnected");
    }
  };

  client.onWebSocketClose = () => {
    if (typeof onConnectionChange === "function") {
      onConnectionChange("disconnected");
    }
  };

  client.onWebSocketError = () => {
    reportError(
      "Khong the ket noi realtime bidding. Vui long thu lai sau.",
      "Khong the ket noi realtime bidding.",
    );
  };

  client.onStompError = (frame) => {
    const payload = parseJsonSafely(frame?.body);
    reportError(
      extractErrorMessage(payload, frame?.headers?.message),
      "Realtime bidding gap loi.",
    );
  };

  client.activate();

  return {
    async publishBid(bidAmount) {
      const numericBidAmount = Number(bidAmount);
      if (!Number.isFinite(numericBidAmount) || numericBidAmount <= 0) {
        throw new Error("Gia dat khong hop le.");
      }

      if (!client.connected) {
        throw new Error("Realtime bidding dang ngat ket noi.");
      }

      await ensureValidAccessToken();
      const freshAccessToken = getAccessToken();

      client.publish({
        destination: placeBidDestination,
        headers: freshAccessToken
          ? { Authorization: `Bearer ${freshAccessToken}` }
          : undefined,
        body: JSON.stringify({
          bidAmount: numericBidAmount,
        }),
      });
    },
    async disconnect() {
      if (bidSubscription) {
        bidSubscription.unsubscribe();
        bidSubscription = null;
      }
      if (errorSubscription) {
        errorSubscription.unsubscribe();
        errorSubscription = null;
      }
      await client.deactivate();
    },
    isConnected() {
      return client.connected;
    },
  };
}
