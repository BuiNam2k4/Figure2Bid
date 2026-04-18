import { ensureValidAccessToken } from "./authService";
import { getAccessToken } from "../utils/authStorage";
import { apiFetch } from "./httpClient";

function getErrorMessage(responseBody, fallback) {
  if (!responseBody) {
    return fallback;
  }

  if (typeof responseBody.message === "string" && responseBody.message.trim()) {
    return responseBody.message;
  }

  if (typeof responseBody.error === "string" && responseBody.error.trim()) {
    return responseBody.error;
  }

  if (Array.isArray(responseBody.errors) && responseBody.errors.length > 0) {
    const firstError = responseBody.errors[0];
    if (typeof firstError === "string") {
      return firstError;
    }
    if (firstError && typeof firstError.defaultMessage === "string") {
      return firstError.defaultMessage;
    }
  }

  return fallback;
}

function buildQueryString(params = {}) {
  const query = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") {
      return;
    }
    query.append(key, String(value));
  });

  const serialized = query.toString();
  return serialized ? `?${serialized}` : "";
}

async function parseResponseBody(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

async function getPublic(path, fallbackErrorMessage) {
  const response = await apiFetch(path);
  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, fallbackErrorMessage));
  }

  return responseBody?.data;
}

function normalizeBidPayload(payload) {
  const cleaned = {
    auctionId:
      payload.auctionId !== undefined && payload.auctionId !== null
        ? Number(payload.auctionId)
        : undefined,
    bidAmount:
      payload.bidAmount !== undefined && payload.bidAmount !== null
        ? Number(payload.bidAmount)
        : undefined,
  };

  return Object.fromEntries(
    Object.entries(cleaned).filter(([, value]) => value !== undefined),
  );
}

export function listBidsByAuction(
  auctionId,
  { page = 0, size = 20, sort = "bidTime,desc" } = {},
) {
  if (!auctionId && auctionId !== 0) {
    throw new Error("Thieu id auction.");
  }

  return getPublic(
    `/api/v1/bids/auction/${encodeURIComponent(String(auctionId))}${buildQueryString(
      {
        page,
        size,
        sort,
      },
    )}`,
    "Khong the tai lich su bid.",
  );
}

export async function placeBid(payload) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(`/api/v1/bids`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(normalizeBidPayload(payload)),
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Dat bid that bai."));
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export async function listMyBids({
  page = 0,
  size = 20,
  sort = "bidTime,desc",
} = {}) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(
    `/api/v1/bids/my${buildQueryString({ page, size, sort })}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseBody, "Khong the tai danh sach bid cua ban."),
    );
  }

  return responseBody?.data;
}
