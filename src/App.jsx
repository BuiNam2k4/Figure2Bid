import { Navigate, Route, Routes } from "react-router-dom";
import RequireAdmin from "./components/RequireAdmin";
import RequireAuth from "./components/RequireAuth";
import ScrollToTop from "./components/ScrollToTop";
import SiteLayout from "./components/SiteLayout";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NewsPage from "./pages/NewsPage";
import RegisterPage from "./pages/RegisterPage";
import RootPage from "./pages/RootPage";
import SellAuctionPage from "./pages/SellAuctionPage";
import NotFoundPage from "./pages/NotFoundPage";
import { APP_ROUTES } from "./utils/legacyRoutes";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<SiteLayout />}>
          <Route index element={<RootPage />} />
          <Route path="home" element={<HomePage />} />
          <Route path="landing" element={<LandingPage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="auction-detail" element={<AuctionDetailPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin/login" element={<AdminLoginPage />} />
          <Route
            path="admin-login"
            element={<Navigate replace to={APP_ROUTES.adminLogin} />}
          />
          <Route path="register" element={<RegisterPage />} />

          <Route
            path="sell-auction-page.html"
            element={<Navigate replace to={APP_ROUTES.sell} />}
          />
          <Route
            path="pages/sell-auction-page.html"
            element={<Navigate replace to={APP_ROUTES.sell} />}
          />

          <Route element={<RequireAuth />}>
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="sell" element={<SellAuctionPage />} />
          </Route>

          <Route element={<RequireAuth redirectTo={APP_ROUTES.adminLogin} />}>
            <Route element={<RequireAdmin />}>
              <Route path="admin/*" element={<AdminDashboardPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}
