const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";

const NGROK_HOST_SUFFIXES = [".ngrok-free.dev", ".ngrok.io", ".ngrok.app"];

function normalizeHeaders(headers) {
  if (!headers) {
    return {};
  }

  if (typeof Headers !== "undefined" && headers instanceof Headers) {
    return Object.fromEntries(headers.entries());
  }

  if (Array.isArray(headers)) {
    return Object.fromEntries(headers);
  }

  return { ...headers };
}

function isNgrokBaseUrl(baseUrl = API_BASE_URL) {
  try {
    const { hostname } = new URL(baseUrl);
    const normalizedHostname = hostname.toLowerCase();
    return NGROK_HOST_SUFFIXES.some((suffix) =>
      normalizedHostname.endsWith(suffix),
    );
  } catch {
    return false;
  }
}

function withPlatformHeaders(headers, baseUrl = API_BASE_URL) {
  const platformHeaders = isNgrokBaseUrl(baseUrl)
    ? { "ngrok-skip-browser-warning": "true" }
    : {};

  return {
    ...platformHeaders,
    ...normalizeHeaders(headers),
  };
}

function buildApiUrl(path) {
  return `${API_BASE_URL}${path}`;
}

function apiFetch(path, init = {}) {
  return fetch(buildApiUrl(path), {
    ...init,
    headers: withPlatformHeaders(init.headers),
  });
}

export { API_BASE_URL, apiFetch, buildApiUrl, withPlatformHeaders };
