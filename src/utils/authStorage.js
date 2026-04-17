const AUTH_SESSION_KEY = "figureAuctionAuthSession";

function isFutureInstant(isoInstant) {
  if (!isoInstant || typeof isoInstant !== "string") {
    return false;
  }

  const expiresAt = Date.parse(isoInstant);
  if (Number.isNaN(expiresAt)) {
    return false;
  }

  return expiresAt > Date.now();
}

export function saveAuthSession(authData) {
  if (!authData) {
    return;
  }

  localStorage.setItem(AUTH_SESSION_KEY, JSON.stringify(authData));
}

export function getAuthSession() {
  const raw = localStorage.getItem(AUTH_SESSION_KEY);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    clearAuthSession();
    return null;
  }
}

export function clearAuthSession() {
  localStorage.removeItem(AUTH_SESSION_KEY);
}

export function getAccessToken() {
  return getAuthSession()?.accessToken || "";
}

export function getRefreshToken() {
  return getAuthSession()?.refreshToken || "";
}

export function hasValidAccessToken() {
  const session = getAuthSession();
  if (!session?.accessToken) {
    return false;
  }

  return isFutureInstant(session.accessTokenExpiresAt);
}

export function hasValidRefreshToken() {
  const session = getAuthSession();
  if (!session?.refreshToken) {
    return false;
  }

  return isFutureInstant(session.refreshTokenExpiresAt);
}

function normalizeRoleName(roleName) {
  return String(roleName || "").trim().toUpperCase();
}

export function hasRole(roleName) {
  const targetRole = normalizeRoleName(roleName);
  if (!targetRole) {
    return false;
  }

  const session = getAuthSession();
  if (!session) {
    return false;
  }

  const primaryRole = normalizeRoleName(session.role);
  if (primaryRole === targetRole) {
    return true;
  }

  if (!Array.isArray(session.roles)) {
    return false;
  }

  return session.roles.some((role) => normalizeRoleName(role) === targetRole);
}

export function isAdminSession() {
  return hasRole("ADMIN");
}
