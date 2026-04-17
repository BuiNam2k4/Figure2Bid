import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../utils/legacyRoutes";
import { clearAuthSession, hasValidAccessToken } from "../utils/authStorage";

const NAVBAR_HOME_ROUTE = "/home";

const desktopNavItems = [
  { label: "Trang chủ", to: NAVBAR_HOME_ROUTE },
  { label: "Khám phá", to: APP_ROUTES.explore },
  { label: "Tin tức", to: APP_ROUTES.news },
  { label: "Bảng điều khiển", to: APP_ROUTES.dashboard },
];

const baseMobileNavItems = [
  { label: "Trang chủ", to: NAVBAR_HOME_ROUTE },
  { label: "Khám phá", to: APP_ROUTES.explore },
  { label: "Tin tức", to: APP_ROUTES.news },
  { label: "Phiên đấu giá", to: APP_ROUTES.auctionDetail },
  { label: "Bảng điều khiển", to: APP_ROUTES.dashboard },
  { label: "Giỏ hàng", to: APP_ROUTES.cart },
  { label: "Đăng bán", to: APP_ROUTES.sell },
  { label: "Landing page", to: APP_ROUTES.landing },
];

const pageLabels = {
  [APP_ROUTES.home]: "Tổng quan",
  [NAVBAR_HOME_ROUTE]: "Tổng quan",
  [APP_ROUTES.explore]: "Khám phá",
  [APP_ROUTES.news]: "Tin tức",
  [APP_ROUTES.dashboard]: "Bảng điều khiển",
  [APP_ROUTES.auctionDetail]: "Chi tiết đấu giá",
  [APP_ROUTES.cart]: "Giỏ hàng",
  [APP_ROUTES.sell]: "Đăng bán",
  [APP_ROUTES.login]: "Đăng nhập",
  [APP_ROUTES.register]: "Đăng ký",
  [APP_ROUTES.landing]: "Landing page",
};

function isRouteActive(pathname, routePath) {
  if (routePath === APP_ROUTES.home || routePath === NAVBAR_HOME_ROUTE) {
    return pathname === APP_ROUTES.home || pathname === NAVBAR_HOME_ROUTE;
  }

  return pathname === routePath;
}

function DesktopNavLink({ item, pathname }) {
  const active = isRouteActive(pathname, item.to);

  return (
    <Link
      to={item.to}
      className={
        active ? "site-nav__link site-nav__link--active" : "site-nav__link"
      }
    >
      {item.label}
    </Link>
  );
}

function MobileNavLink({ item, pathname, onNavigate }) {
  const active = isRouteActive(pathname, item.to);

  return (
    <Link
      to={item.to}
      onClick={onNavigate}
      className={
        active
          ? "flex items-center justify-between rounded-lg border border-primary/20 bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary"
          : "flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors"
      }
    >
      <span>{item.label}</span>
      <span
        className={`material-symbols-outlined text-base ${active ? "text-primary" : "text-on-surface-variant"}`}
      >
        {active ? "check" : "chevron_right"}
      </span>
    </Link>
  );
}

/* ════════════════════════════════════════════════════════════
   TOP HEADER — Logo · Search · Auth buttons
   ════════════════════════════════════════════════════════════ */
function TopHeader({ isAuthenticated, onLogout }) {
  return (
    <div className="site-header__top">
      <div className="site-header__top-inner">
        {/* ── Logo ─────────────────────────────────────────── */}
        <Link className="site-header__logo" to={APP_ROUTES.home}>
          <img
            className="site-header__logo-img"
            src="/images/logo_ping1.png"
            alt="Figure247"
          />
        </Link>

        {/* ── Search Bar ───────────────────────────────────── */}
        <div className="site-header__search">
          <span className="material-symbols-outlined site-header__search-icon">
            search
          </span>
          <input
            className="site-header__search-input"
            type="search"
            placeholder="Tìm kiếm figure, phiên đấu giá..."
            id="globalSearch"
          />
        </div>

        {/* ── Auth Buttons ─────────────────────────────────── */}
        <div className="site-header__actions">
          {isAuthenticated ? (
            <>
              <Link
                aria-label="Giỏ hàng"
                className="site-header__icon-btn"
                to={APP_ROUTES.cart}
              >
                <span className="material-symbols-outlined">shopping_cart</span>
              </Link>
              <Link className="site-header__sell-btn" to={APP_ROUTES.sell}>
                Đăng bán
              </Link>
              <button
                type="button"
                aria-label="Đăng xuất"
                onClick={onLogout}
                className="site-header__icon-btn"
              >
                <span className="material-symbols-outlined">logout</span>
              </button>
            </>
          ) : (
            <>
              <Link className="site-header__login-btn" to={APP_ROUTES.login}>
                <span className="material-symbols-outlined site-header__btn-icon">
                  login
                </span>
                Đăng nhập
              </Link>
              <Link
                className="site-header__register-btn"
                to={APP_ROUTES.register}
              >
                <span className="material-symbols-outlined site-header__btn-icon">
                  person_add
                </span>
                Đăng ký
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVBAR — Navigation links · Contact info
   ════════════════════════════════════════════════════════════ */
function SiteNavbar({ pathname, isMobileMenuOpen, onToggleMobile }) {
  return (
    <div className="site-header__nav">
      <div className="site-header__nav-inner">
        {/* ── Mobile hamburger ─────────────────────────────── */}
        <button
          type="button"
          aria-label="Mở menu điều hướng"
          aria-expanded={isMobileMenuOpen}
          className="site-header__hamburger"
          onClick={onToggleMobile}
        >
          <span className="material-symbols-outlined">
            {isMobileMenuOpen ? "close" : "menu"}
          </span>
        </button>

        {/* ── Desktop Nav Links ────────────────────────────── */}
        <nav className="site-nav__links">
          {desktopNavItems.map((item) => (
            <DesktopNavLink key={item.to} item={item} pathname={pathname} />
          ))}
        </nav>

        {/* ── Contact Info ─────────────────────────────────── */}
        <div className="site-nav__contact">
          <a href="tel:0123456789" className="site-nav__contact-item">
            <span className="material-symbols-outlined site-nav__contact-icon">
              call
            </span>
            <span>0123 456 789</span>
          </a>
          <span className="site-nav__contact-divider" />
          <a
            href="mailto:support@figure247.com"
            className="site-nav__contact-item"
          >
            <span className="material-symbols-outlined site-nav__contact-icon">
              mail
            </span>
            <span>support@figure247.com</span>
          </a>
          <span className="site-nav__contact-divider" />
          <span className="site-nav__contact-item site-nav__contact-item--static">
            <span className="material-symbols-outlined site-nav__contact-icon">
              schedule
            </span>
            <span>T2 – CN: 8:00 – 22:00</span>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   COMBINED HEADER wrapper
   ════════════════════════════════════════════════════════════ */
function SiteHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isAuthenticated = hasValidAccessToken();

  const currentLabel = useMemo(() => {
    return pageLabels[pathname] || "Figure2Bid";
  }, [pathname]);

  const mobileNavItems = useMemo(() => {
    if (isAuthenticated) {
      return baseMobileNavItems;
    }

    return [
      ...baseMobileNavItems,
      { label: "Đăng nhập", to: APP_ROUTES.login },
      { label: "Đăng ký", to: APP_ROUTES.register },
    ];
  }, [isAuthenticated]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    clearAuthSession();
    setMobileMenuOpen(false);
    navigate(APP_ROUTES.login, { replace: true });
  };

  return (
    <header className="site-header">
      {/* Row 1: Header */}
      <TopHeader isAuthenticated={isAuthenticated} onLogout={handleLogout} />

      {/* Row 2: Navbar */}
      <SiteNavbar
        pathname={pathname}
        isMobileMenuOpen={isMobileMenuOpen}
        onToggleMobile={() => setMobileMenuOpen((c) => !c)}
      />

      {/* Mobile breadcrumb */}
      <div className="md:hidden border-t border-outline-variant/40 bg-white/95">
        <div className="flex items-center gap-2 px-4 py-2.5 max-w-[1440px] mx-auto overflow-x-auto whitespace-nowrap">
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold uppercase tracking-widest"
            to={NAVBAR_HOME_ROUTE}
          >
            Trang chủ
          </Link>
          <span className="text-on-surface-variant/70">/</span>
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            {currentLabel}
          </span>
        </div>
      </div>

      {/* Mobile slide-down menu */}
      <div
        className={`md:hidden border-t border-outline-variant/40 bg-white/95 ${isMobileMenuOpen ? "" : "hidden"}`}
      >
        <div className="max-w-[1440px] mx-auto px-4 py-3 max-h-[70vh] overflow-y-auto">
          <p className="mb-2 text-[11px] uppercase tracking-[0.16em] font-bold text-on-surface-variant">
            Điều hướng nhanh
          </p>
          <div className="grid grid-cols-1 gap-1.5">
            {mobileNavItems.map((item) => (
              <MobileNavLink
                key={item.to}
                item={item}
                pathname={pathname}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            ))}
          </div>

          {/* Mobile contact info */}
          <div className="mt-4 pt-3 border-t border-outline-variant/30">
            <p className="mb-2 text-[11px] uppercase tracking-[0.16em] font-bold text-on-surface-variant">
              Liên hệ
            </p>
            <div className="space-y-2">
              <a
                href="tel:0123456789"
                className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  call
                </span>
                0123 456 789
              </a>
              <a
                href="mailto:support@figure247.com"
                className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                <span className="material-symbols-outlined text-base">
                  mail
                </span>
                support@figure247.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="w-full bg-slate-100 mt-20 tonal-layering-top">
      <div className="grid grid-cols-2 md:flex md:justify-between items-center px-12 py-16 w-full max-w-screen-2xl mx-auto">
        <div className="col-span-2 md:col-span-1 mb-8 md:mb-0">
          <div className="text-xl font-black text-slate-900 mb-4">
            Figure2Bid
          </div>
          <p className="text-sm text-slate-500 max-w-xs leading-relaxed">
            © 2026 Figure2Bid. Bảo lưu mọi quyền. Nền tảng đấu giá và lưu trữ
            cho văn hóa 2D.
          </p>
        </div>

        <div className="flex flex-wrap gap-8 md:gap-12 text-sm">
          <Link
            className="text-slate-500 hover:text-slate-900 transition-all"
            to={APP_ROUTES.home}
          >
            Chính sách
          </Link>
          <Link
            className="text-slate-500 hover:text-slate-900 transition-all"
            to={APP_ROUTES.home}
          >
            Điều khoản
          </Link>
          <Link
            className="text-slate-500 hover:text-slate-900 transition-all"
            to={APP_ROUTES.cart}
          >
            Giao hàng
          </Link>
          <Link
            className="text-slate-500 hover:text-slate-900 transition-all"
            to={APP_ROUTES.login}
          >
            Xác thực
          </Link>
          <Link
            className="text-slate-500 hover:text-slate-900 transition-all"
            to={APP_ROUTES.news}
          >
            Tin tức
          </Link>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">
              alternate_email
            </span>
          </div>
          <div className="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer">
            <span className="material-symbols-outlined text-sm">language</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteLayout() {
  const { pathname } = useLocation();
  const isAdminRoute =
    pathname === APP_ROUTES.admin ||
    pathname.startsWith(`${APP_ROUTES.admin}/`);

  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-background text-on-background overflow-x-hidden">
        <Outlet />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
