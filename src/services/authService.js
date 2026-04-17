import {
  clearAuthSession,
  getRefreshToken,
  hasValidAccessToken,
  hasValidRefreshToken,
  saveAuthSession,
} from "../utils/authStorage";

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

async function postAuth(path, payload, fallbackErrorMessage) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  let responseBody = null;
  try {
    responseBody = await response.json();
  } catch {
    responseBody = null;
  }

  if (!response.ok) {
    throw new Error(getErrorMessage(responseBody, fallbackErrorMessage));
  }

  if (!responseBody || !responseBody.data) {
    throw new Error("Phan hoi API khong hop le.");
  }

  return responseBody.data;
}

export function login(payload) {
  return postAuth("/api/v1/auth/login", payload, "Dang nhap that bai.");
}

export function register(payload) {
  return postAuth("/api/v1/auth/register", payload, "Dang ky that bai.");
}

export function refreshToken(payload) {
  return postAuth("/api/v1/auth/refresh", payload, "Lam moi token that bai.");
}

export async function ensureValidAccessToken() {
  if (hasValidAccessToken()) {
    return;
  }

  if (!hasValidRefreshToken()) {
    clearAuthSession();
    throw new Error("Phien dang nhap da het han. Vui long dang nhap lai.");
  }

  try {
    const refreshedAuth = await refreshToken({
      refreshToken: getRefreshToken(),
    });
    saveAuthSession(refreshedAuth);
  } catch (error) {
    clearAuthSession();
    throw error;
  }
}
