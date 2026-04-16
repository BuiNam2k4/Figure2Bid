import { useEffect, useMemo, useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { APP_ROUTES } from "../utils/legacyRoutes";

const desktopNavItems = [
  { label: "Trang chủ", to: APP_ROUTES.home },
  { label: "Khám phá", to: APP_ROUTES.explore },
  { label: "Tin tức", to: APP_ROUTES.news },
  { label: "Bảng điều khiển", to: APP_ROUTES.dashboard },
];

const mobileNavItems = [
  { label: "Trang chủ", to: APP_ROUTES.home },
  { label: "Khám phá", to: APP_ROUTES.explore },
  { label: "Tin tức", to: APP_ROUTES.news },
  { label: "Phiên đấu giá", to: APP_ROUTES.auctionDetail },
  { label: "Bảng điều khiển", to: APP_ROUTES.dashboard },
  { label: "Giỏ hàng", to: APP_ROUTES.cart },
  { label: "Đăng bán", to: APP_ROUTES.sell },
  { label: "Đăng nhập", to: APP_ROUTES.login },
  { label: "Đăng ký", to: APP_ROUTES.register },
  { label: "Landing page", to: APP_ROUTES.landing },
];

const pageLabels = {
  [APP_ROUTES.home]: "Tổng quan",
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
  if (routePath === APP_ROUTES.home) {
    return pathname === APP_ROUTES.home || pathname === "/home";
  }

  return pathname === routePath;
}

function DesktopNavLink({ item, pathname }) {
  const active = isRouteActive(pathname, item.to);

  return (
    <Link
      to={item.to}
      className={
        active
          ? "text-primary font-bold transition-colors"
          : "text-[#111c2c] hover:text-[#b81120] transition-colors"
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

function SiteHeader() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { pathname } = useLocation();

  const currentLabel = useMemo(() => {
    return pageLabels[pathname] || "Figure2Bid";
  }, [pathname]);

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

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(17,28,44,0.06)]">
      <nav className="flex items-center justify-between px-4 md:px-8 py-2 max-w-[1440px] mx-auto gap-3">
        <Link className="flex items-center" to={APP_ROUTES.home}>
          <img
            className="h-10 md:h-14 w-auto object-contain origin-left md:scale-150"
            src="./images/logo_ping1.png"
            alt="Figure2Bid"
          />
        </Link>

        <div className="hidden md:flex items-center gap-8 font-headline tracking-tight">
          {desktopNavItems.map((item) => (
            <DesktopNavLink key={item.to} item={item} pathname={pathname} />
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3">
          <Link
            aria-label="Cart"
            className="hidden sm:inline-flex hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 text-[#111c2c]"
            to={APP_ROUTES.cart}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
          </Link>
          <Link
            className="hidden sm:inline-flex items-center rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors"
            to={APP_ROUTES.sell}
          >
            Đăng bán
          </Link>
          <Link
            className="inline-flex items-center whitespace-nowrap rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-2.5 py-2 text-xs font-semibold text-[#111c2c] hover:bg-surface-container-high transition-colors sm:px-3 sm:text-sm"
            to={APP_ROUTES.login}
          >
            Đăng nhập
          </Link>
          <Link
            className="inline-flex items-center whitespace-nowrap rounded-lg bg-primary px-2.5 py-2 text-xs font-semibold text-white hover:bg-primary-container transition-colors sm:px-3 sm:text-sm"
            to={APP_ROUTES.register}
          >
            Đăng ký
          </Link>
          <button
            type="button"
            aria-label="Mở menu điều hướng"
            aria-expanded={isMobileMenuOpen}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-[#111c2c] hover:bg-surface-container-high transition-colors sm:hidden"
            onClick={() => setMobileMenuOpen((current) => !current)}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isMobileMenuOpen ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>

      <div className="md:hidden border-t border-outline-variant/40 bg-white/95">
        <div className="flex items-center gap-2 px-4 py-2.5 max-w-[1440px] mx-auto overflow-x-auto whitespace-nowrap">
          <Link
            className="text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold uppercase tracking-widest"
            to={APP_ROUTES.home}
          >
            Trang chủ
          </Link>
          <span className="text-on-surface-variant/70">/</span>
          <span className="text-primary text-xs font-bold uppercase tracking-widest">
            {currentLabel}
          </span>
        </div>
      </div>

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
  return (
    <div className="min-h-screen bg-background text-on-background overflow-x-hidden">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
