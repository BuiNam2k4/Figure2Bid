export const LEGACY_FILE_ROUTE_MAP = {
  "index.html": "/",
  "index-page.html": "/",
  "home-page.html": "/home",
  "explore-page.html": "/explore",
  "news-page.html": "/news",
  "dashboard-page.html": "/dashboard",
  "auction-detail-page.html": "/auction-detail",
  "cart-page.html": "/cart",
  "sell-auction-page.html": "/sell",
  "login-page.html": "/login",
  "register-page.html": "/register",
  "landing-page.html": "/landing",
};

export const APP_ROUTES = {
  home: "/",
  landing: "/landing",
  explore: "/explore",
  news: "/news",
  dashboard: "/dashboard",
  auctionDetail: "/auction-detail",
  cart: "/cart",
  sell: "/sell",
  login: "/login",
  register: "/register",
};

export function mapLegacyHrefToRoute(href) {
  if (!href) {
    return null;
  }

  const rawHref = href.trim();

  if (
    !rawHref ||
    rawHref.startsWith("#") ||
    /^https?:\/\//i.test(rawHref) ||
    /^mailto:/i.test(rawHref) ||
    /^tel:/i.test(rawHref) ||
    /^javascript:/i.test(rawHref)
  ) {
    return null;
  }

  const [withoutHash, hashPart = ""] = rawHref.split("#");
  const [pathPart, queryPart = ""] = withoutHash.split("?");
  const normalizedPath = pathPart.replace(/\\/g, "/");
  const fileName = normalizedPath.split("/").filter(Boolean).pop() || "";

  if (!fileName.toLowerCase().endsWith(".html")) {
    return null;
  }

  const routePath = LEGACY_FILE_ROUTE_MAP[fileName];

  if (!routePath) {
    return null;
  }

  let mappedHref = routePath;

  if (queryPart) {
    mappedHref += `?${queryPart}`;
  }

  if (hashPart) {
    mappedHref += `#${hashPart}`;
  }

  return mappedHref;
}
