import { Navigate, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import SiteLayout from "./components/SiteLayout";
import AuctionDetailPage from "./pages/AuctionDetailPage";
import CartPage from "./pages/CartPage";
import DashboardPage from "./pages/DashboardPage";
import ExplorePage from "./pages/ExplorePage";
import HomePage from "./pages/HomePage";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import NewsPage from "./pages/NewsPage";
import RegisterPage from "./pages/RegisterPage";
import RootPage from "./pages/RootPage";
import SellAuctionPage from "./pages/SellAuctionPage";
import NotFoundPage from "./pages/NotFoundPage";

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
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="auction-detail" element={<AuctionDetailPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="sell" element={<SellAuctionPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />

          {/* <Route path="index.html" element={<Navigate replace to="/" />} />
          <Route
            path="home-page.html"
            element={<Navigate replace to="/home" />}
          />
          <Route
            path="landing-page.html"
            element={<Navigate replace to="/landing" />}
          />
          <Route
            path="explore-page.html"
            element={<Navigate replace to="/explore" />}
          />
          <Route
            path="news-page.html"
            element={<Navigate replace to="/news" />}
          />
          <Route
            path="dashboard-page.html"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route
            path="auction-detail-page.html"
            element={<Navigate replace to="/auction-detail" />}
          />
          <Route
            path="cart-page.html"
            element={<Navigate replace to="/cart" />}
          />
          <Route
            path="sell-auction-page.html"
            element={<Navigate replace to="/sell" />}
          />
          <Route
            path="login-page.html"
            element={<Navigate replace to="/login" />}
          />
          <Route
            path="register-page.html"
            element={<Navigate replace to="/register" />}
          />

          <Route
            path="pages/index.html"
            element={<Navigate replace to="/" />}
          />
          <Route
            path="pages/home-page.html"
            element={<Navigate replace to="/home" />}
          />
          <Route
            path="pages/landing-page.html"
            element={<Navigate replace to="/landing" />}
          />
          <Route
            path="pages/explore-page.html"
            element={<Navigate replace to="/explore" />}
          />
          <Route
            path="pages/news-page.html"
            element={<Navigate replace to="/news" />}
          />
          <Route
            path="pages/dashboard-page.html"
            element={<Navigate replace to="/dashboard" />}
          />
          <Route
            path="pages/auction-detail-page.html"
            element={<Navigate replace to="/auction-detail" />}
          />
          <Route
            path="pages/cart-page.html"
            element={<Navigate replace to="/cart" />}
          />
          <Route
            path="pages/sell-auction-page.html"
            element={<Navigate replace to="/sell" />}
          />
          <Route
            path="pages/login-page.html"
            element={<Navigate replace to="/login" />}
          />
          <Route
            path="pages/register-page.html"
            element={<Navigate replace to="/register" />}
          />

          <Route path="*" element={<NotFoundPage />} /> */}
        </Route>
      </Routes>
    </>
  );
}
