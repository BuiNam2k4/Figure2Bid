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

function normalizeStatusValue(value) {
  if (value === undefined || value === null) {
    return undefined;
  }

  const normalized = String(value).trim().toUpperCase();
  return normalized || undefined;
}

function normalizeNewsPayload(payload) {
  const cleaned = {
    title: payload.title?.trim(),
    slug: payload.slug?.trim() || undefined,
    summary: payload.summary?.trim() || undefined,
    content: payload.content?.trim() || undefined,
    thumbnailUrl: payload.thumbnailUrl?.trim() || undefined,
    status: normalizeStatusValue(payload.status),
  };

  return Object.fromEntries(
    Object.entries(cleaned).filter(([, value]) => value !== undefined),
  );
}

export function listNews({
  page = 0,
  size = 10,
  sort = "createdAt,desc",
  status,
  keyword,
} = {}) {
  return getPublic(
    `/api/v1/news${buildQueryString({ page, size, sort, status, keyword })}`,
    "Khong the tai danh sach bai viet.",
  );
}

export function getNewsById(newsId) {
  if (!newsId && newsId !== 0) {
    throw new Error("Thieu id bai viet.");
  }

  return getPublic(
    `/api/v1/news/${encodeURIComponent(String(newsId))}`,
    "Khong the tai bai viet.",
  );
}

export function getNewsBySlug(slug) {
  if (!slug || !String(slug).trim()) {
    throw new Error("Thieu slug bai viet.");
  }

  return getPublic(
    `/api/v1/news/slug/${encodeURIComponent(String(slug).trim())}`,
    "Khong the tai bai viet.",
  );
}

export async function createNews(payload) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(`/api/v1/news`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(normalizeNewsPayload(payload)),
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Tao bai viet that bai."));
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export async function updateNews(newsId, payload) {
  if (!newsId && newsId !== 0) {
    throw new Error("Thieu id bai viet.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(
    `/api/v1/news/${encodeURIComponent(String(newsId))}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(normalizeNewsPayload(payload)),
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(
      getErrorMessage(responseBody, "Cap nhat bai viet that bai."),
    );
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export async function deleteNews(newsId) {
  if (!newsId && newsId !== 0) {
    throw new Error("Thieu id bai viet.");
  }

  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(
    `/api/v1/news/${encodeURIComponent(String(newsId))}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Xoa bai viet that bai."));
  }

  return responseBody?.data;
}
