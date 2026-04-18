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

function normalizeCreatePayload(payload) {
  const cleaned = {
    ...payload,
    name: payload.name?.trim(),
    description: payload.description?.trim(),
    condition: payload.condition?.trim(),
    status: payload.status?.trim(),
    scale: payload.scale?.trim() || undefined,
    material: payload.material?.trim() || undefined,
    categoryId:
      payload.categoryId !== undefined && payload.categoryId !== null
        ? Number(payload.categoryId)
        : undefined,
    basePrice:
      payload.basePrice !== undefined && payload.basePrice !== null
        ? Number(payload.basePrice)
        : undefined,
    height:
      payload.height !== undefined &&
      payload.height !== null &&
      payload.height !== ""
        ? Number(payload.height)
        : undefined,
    imageUrls: Array.isArray(payload.imageUrls)
      ? payload.imageUrls.filter(Boolean)
      : undefined,
  };

  return Object.fromEntries(
    Object.entries(cleaned).filter(([, value]) => value !== undefined),
  );
}

export function listCategories() {
  return getPublic("/api/v1/categories", "Khong the tai danh muc.");
}

export function listProducts({
  page = 0,
  size = 12,
  sort = "createdAt,desc",
  keyword,
  categoryId,
  status,
} = {}) {
  const normalizedKeyword = keyword?.trim();
  const normalizedStatus = status?.trim();

  let endpoint = "/api/v1/products";
  const query = { page, size, sort };

  if (normalizedKeyword) {
    endpoint = "/api/v1/products/search";
    query.keyword = normalizedKeyword;
  } else if (categoryId) {
    endpoint = `/api/v1/products/category/${encodeURIComponent(String(categoryId))}`;
  } else if (normalizedStatus) {
    endpoint = `/api/v1/products/status/${encodeURIComponent(normalizedStatus.toUpperCase())}`;
  }

  return getPublic(
    `${endpoint}${buildQueryString(query)}`,
    "Khong the tai danh sach san pham.",
  );
}

export function getProductById(productId) {
  if (!productId && productId !== 0) {
    throw new Error("Thieu id san pham.");
  }

  return getPublic(
    `/api/v1/products/${encodeURIComponent(String(productId))}`,
    "Khong the tai chi tiet san pham.",
  );
}

export async function createProduct(payload) {
  await ensureValidAccessToken();
  const accessToken = getAccessToken();

  const response = await apiFetch(`/api/v1/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(normalizeCreatePayload(payload)),
  });

  const responseBody = await parseResponseBody(response);

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, "Dang san pham that bai."));
  }

  if (!responseBody?.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}
