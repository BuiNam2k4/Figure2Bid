import { ensureValidAccessToken } from "./authService";
import { getAccessToken } from "../utils/authStorage";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

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
  const response = await fetch(`${API_BASE_URL}${path}`);
  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, fallbackErrorMessage));
  }

  return responseBody?.data;
}

function toIsoInstant(value) {
  if (!value) {
    return value;
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return value;
  }

  return parsed.toISOString();
}

function normalizeStatusValue(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalized = String(value).trim().toUpperCase();
  return normalized || undefined;
}

function normalizeAuctionPayload(payload) {
  const cleaned = {
    productId:
      payload.productId !== undefined && payload.productId !== null
        ? Number(payload.productId)
        : undefined,
    startPrice:
      payload.startPrice !== undefined && payload.startPrice !== null
        ? Number(payload.startPrice)
        : undefined,
    stepPrice:
      payload.stepPrice !== undefined && payload.stepPrice !== null
        ? Number(payload.stepPrice)
        : undefined,
    startTime: toIsoInstant(payload.startTime),
    endTime: toIsoInstant(payload.endTime),
    status: normalizeStatusValue(payload.status),
  };

  return Object.fromEntries(
    Object.entries(cleaned).filter(([, value]) => value !== undefined),
  );
}

export function listAuctions({
  page = 0,
  size = 10,
  sort = "startTime,desc",
} = {}) {
  return getPublic(
    `/api/v1/auctions${buildQueryString({ page, size, sort })}`,
    "Khong the tai danh sach auction.",
  );
}

export function listAuctionsByStatus(
  status,
  { page = 0, size = 10, sort = "startTime,desc" } = {},
) {
  if (!status) {
    throw new Error("Thieu status auction.");
  }

  return getPublic(
    `/api/v1/auctions/status/${encodeURIComponent(String(status).toUpperCase())}${buildQueryString(
      {
        page,
        size,
        sort,
      },
    )}`,
    "Khong the tai danh sach auction theo status.",
  );
}

export function getAuctionById(auctionId) {
  if (!auctionId && auctionId !== 0) {
    throw new Error("Thieu id auction.");
  }

  return getPublic(
    `/api/v1/auctions/${encodeURIComponent(String(auctionId))}`,
    "Khong the tai chi tiet auction.",
  );
}

export function getAuctionByProductId(productId) {
  if (!productId && productId !== 0) {
    throw new Error("Thieu id san pham.");
  }

  return getPublic(
    `/api/v1/auctions/product/${encodeURIComponent(String(productId))}`,
    "Khong the tai chi tiet auction cua san pham.",
  );
}

export async function listMyAuctions({
  page = 0,
  size = 20,
  sort = "startTime,desc",
} = {}) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/auctions/my${buildQueryString({ page, size, sort })}`,
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
      getErrorMessage(responseBody, "Khong the tai danh sach auction cua ban."),
    );
  }

  return responseBody?.data;
}

export async function createAuction(payload) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await fetch(`${API_BASE_URL}/api/v1/auctions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(normalizeAuctionPayload(payload)),
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Tao auction that bai."));
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export async function updateAuction(auctionId, payload) {
  if (!auctionId && auctionId !== 0) {
    throw new Error("Thieu id auction.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/auctions/${encodeURIComponent(String(auctionId))}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(normalizeAuctionPayload(payload)),
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseBody, "Cap nhat auction that bai."),
    );
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export async function deleteAuction(auctionId) {
  if (!auctionId && auctionId !== 0) {
    throw new Error("Thieu id auction.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await fetch(
    `${API_BASE_URL}/api/v1/auctions/${encodeURIComponent(String(auctionId))}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Xoa auction that bai."));
  }
}
