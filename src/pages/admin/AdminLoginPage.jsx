import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../services/authService";
import {
  clearAuthSession,
  hasValidAccessToken,
  isAdminSession,
  saveAuthSession,
} from "../../utils/authStorage";
import { APP_ROUTES } from "../../utils/legacyRoutes";

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // If the user is already logged in as admin, redirect immediately
  useEffect(() => {
    if (hasValidAccessToken() && isAdminSession()) {
      navigate(APP_ROUTES.admin, { replace: true });
    }
  }, [navigate]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const email = formData.email.trim();
    const password = formData.password;

    if (!email || !password) {
      setErrorMessage("Vui lòng nhập đầy đủ email và mật khẩu.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const authData = await login({ email, password });
      saveAuthSession(authData);

      // Check if the authenticated user has ADMIN role
      if (!isAdminSession()) {
        clearAuthSession();
        setErrorMessage(
          "Truy cập bị từ chối. Tài khoản của bạn không có quyền quản trị viên."
        );
        return;
      }

      navigate(APP_ROUTES.admin, { replace: true });
    } catch (error) {
      setErrorMessage(
        error.message || "Đăng nhập thất bại. Vui lòng thử lại."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="admin-login-page">
      {/* ── Animated background ─────────────────────────────────── */}
      <div className="admin-login-bg">
        <div className="admin-login-grid" />
        <div className="admin-login-glow admin-login-glow--1" />
        <div className="admin-login-glow admin-login-glow--2" />
        <div className="admin-login-scanline" />
      </div>

      {/* ── Login card ──────────────────────────────────────────── */}
      <section className="admin-login-card">
        {/* Shield icon */}
        <div className="admin-login-shield">
          <span className="material-symbols-outlined admin-login-shield-icon">
            admin_panel_settings
          </span>
        </div>

        {/* Header */}
        <div className="admin-login-header">
          <span className="admin-login-badge">RESTRICTED ACCESS</span>
          <h1 className="admin-login-title">Admin Control Panel</h1>
          <p className="admin-login-subtitle">
            Xác thực quyền quản trị viên để truy cập bảng điều khiển hệ thống.
          </p>
        </div>

        {/* Form */}
        <form
          className="admin-login-form"
          id="adminLoginForm"
          onSubmit={handleSubmit}
        >
          <div className="admin-login-field">
            <label className="admin-login-label" htmlFor="adminEmail">
              Email quản trị
            </label>
            <div className="admin-login-input-wrap">
              <span className="material-symbols-outlined admin-login-input-icon">
                mail
              </span>
              <input
                autoComplete="email"
                className="admin-login-input"
                id="adminEmail"
                name="email"
                onChange={handleChange}
                placeholder="admin@figure2bid.com"
                type="email"
                value={formData.email}
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label className="admin-login-label" htmlFor="adminPassword">
              Mật khẩu
            </label>
            <div className="admin-login-input-wrap">
              <span className="material-symbols-outlined admin-login-input-icon">
                lock
              </span>
              <input
                autoComplete="current-password"
                className="admin-login-input"
                id="adminPassword"
                name="password"
                onChange={handleChange}
                placeholder="••••••••••"
                type={showPassword ? "text" : "password"}
                value={formData.password}
              />
              <button
                className="admin-login-toggle-pw"
                onClick={() => setShowPassword((prev) => !prev)}
                type="button"
                aria-label="Toggle password visibility"
              >
                <span className="material-symbols-outlined">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="admin-login-error" role="alert">
              <span className="material-symbols-outlined admin-login-error-icon">
                warning
              </span>
              <p>{errorMessage}</p>
            </div>
          )}

          {/* Submit */}
          <button
            className="admin-login-submit"
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? (
              <>
                <span className="admin-login-spinner" />
                Đang xác thực...
              </>
            ) : (
              <>
                <span className="material-symbols-outlined">shield</span>
                Xác thực & Truy cập
              </>
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="admin-login-footer">
          <p className="admin-login-footer-text">
            <span className="material-symbols-outlined admin-login-footer-icon">
              info
            </span>
            Khu vực dành riêng cho quản trị viên hệ thống.
          </p>
          <Link className="admin-login-back-link" to={APP_ROUTES.home}>
            <span className="material-symbols-outlined">arrow_back</span>
            Quay lại trang chủ
          </Link>
        </div>
      </section>

      {/* ── Inline Styles (self-contained) ──────────────────────── */}
      <style>{`
        /* ─── Base ───────────────────────────────────────────── */
        .admin-login-page {
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: 2rem;
          position: relative;
          overflow: hidden;
          background: #0b0f19;
        }

        /* ─── Animated background ────────────────────────────── */
        .admin-login-bg {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .admin-login-grid {
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(47, 95, 203, .06) 1px, transparent 1px),
            linear-gradient(90deg, rgba(47, 95, 203, .06) 1px, transparent 1px);
          background-size: 60px 60px;
        }

        .admin-login-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: .35;
          animation: adminGlowPulse 8s ease-in-out infinite;
        }

        .admin-login-glow--1 {
          width: 520px;
          height: 520px;
          background: radial-gradient(circle, #2f5fcb 0%, transparent 70%);
          top: -10%;
          left: -8%;
        }

        .admin-login-glow--2 {
          width: 420px;
          height: 420px;
          background: radial-gradient(circle, #d81626 0%, transparent 70%);
          bottom: -12%;
          right: -6%;
          animation-delay: -4s;
        }

        @keyframes adminGlowPulse {
          0%, 100% { transform: scale(1); opacity: .30; }
          50% { transform: scale(1.12); opacity: .45; }
        }

        .admin-login-scanline {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 3px,
            rgba(47, 95, 203, .015) 3px,
            rgba(47, 95, 203, .015) 4px
          );
        }

        /* ─── Card ───────────────────────────────────────────── */
        .admin-login-card {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 460px;
          padding: 2.5rem;
          background: rgba(17, 22, 38, .82);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(47, 95, 203, .18);
          border-radius: 1.25rem;
          box-shadow:
            0 0 0 1px rgba(47, 95, 203, .08),
            0 24px 60px -12px rgba(0, 0, 0, .5);
          animation: adminCardIn .6s ease-out both;
        }

        @keyframes adminCardIn {
          from { opacity: 0; transform: translateY(24px) scale(.97); }
          to   { opacity: 1; transform: translateY(0)   scale(1); }
        }

        /* ─── Shield ─────────────────────────────────────────── */
        .admin-login-shield {
          margin: 0 auto 1.5rem;
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 1rem;
          background: linear-gradient(135deg, #2f5fcb 0%, #1a3a80 100%);
          box-shadow:
            0 0 24px rgba(47, 95, 203, .35),
            inset 0 1px 0 rgba(255,255,255,.1);
          animation: adminShieldGlow 3s ease-in-out infinite;
        }

        @keyframes adminShieldGlow {
          0%, 100% { box-shadow: 0 0 24px rgba(47, 95, 203, .35), inset 0 1px 0 rgba(255,255,255,.1); }
          50% { box-shadow: 0 0 40px rgba(47, 95, 203, .55), inset 0 1px 0 rgba(255,255,255,.15); }
        }

        .admin-login-shield-icon {
          font-size: 32px;
          color: #fff;
        }

        /* ─── Header ─────────────────────────────────────────── */
        .admin-login-header {
          text-align: center;
          margin-bottom: 2rem;
        }

        .admin-login-badge {
          display: inline-block;
          padding: .25rem .75rem;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #f87171;
          background: rgba(216, 22, 38, .12);
          border: 1px solid rgba(216, 22, 38, .2);
          border-radius: 9999px;
          margin-bottom: .75rem;
        }

        .admin-login-title {
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: 1.75rem;
          font-weight: 900;
          color: #f1f5f9;
          letter-spacing: -.02em;
          line-height: 1.15;
          margin: 0 0 .5rem;
        }

        .admin-login-subtitle {
          font-size: .875rem;
          color: #94a3b8;
          margin: 0;
          line-height: 1.55;
        }

        /* ─── Form ───────────────────────────────────────────── */
        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .admin-login-field {
          display: flex;
          flex-direction: column;
          gap: .4rem;
        }

        .admin-login-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: .18em;
          text-transform: uppercase;
          color: #64748b;
        }

        .admin-login-input-wrap {
          position: relative;
          display: flex;
          align-items: center;
        }

        .admin-login-input-icon {
          position: absolute;
          left: 14px;
          font-size: 18px;
          color: #475569;
          pointer-events: none;
        }

        .admin-login-input {
          width: 100%;
          height: 52px;
          padding: 0 48px 0 44px;
          background: rgba(30, 41, 59, .6);
          border: 1px solid rgba(71, 85, 105, .3);
          border-radius: .75rem;
          color: #e2e8f0;
          font-size: .9rem;
          font-family: "Be Vietnam Pro", sans-serif;
          transition: border-color .2s, box-shadow .2s, background .2s;
          outline: none;
        }

        .admin-login-input::placeholder {
          color: rgba(148, 163, 184, .45);
        }

        .admin-login-input:focus {
          border-color: #2f5fcb;
          background: rgba(30, 41, 59, .85);
          box-shadow: 0 0 0 3px rgba(47, 95, 203, .15);
        }

        .admin-login-toggle-pw {
          position: absolute;
          right: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border: none;
          background: none;
          cursor: pointer;
          color: #64748b;
          transition: color .2s;
        }

        .admin-login-toggle-pw:hover {
          color: #94a3b8;
        }

        .admin-login-toggle-pw .material-symbols-outlined {
          font-size: 20px;
        }

        /* ─── Error ──────────────────────────────────────────── */
        .admin-login-error {
          display: flex;
          align-items: flex-start;
          gap: .5rem;
          padding: .75rem 1rem;
          border-radius: .75rem;
          background: rgba(216, 22, 38, .1);
          border: 1px solid rgba(216, 22, 38, .2);
          color: #fca5a5;
          font-size: .82rem;
          line-height: 1.5;
          animation: adminShake .4s ease-in-out;
        }

        .admin-login-error p {
          margin: 0;
        }

        .admin-login-error-icon {
          font-size: 18px;
          margin-top: 1px;
          color: #f87171;
          flex-shrink: 0;
        }

        @keyframes adminShake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          60% { transform: translateX(-4px); }
          80% { transform: translateX(4px); }
        }

        /* ─── Submit ─────────────────────────────────────────── */
        .admin-login-submit {
          height: 56px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: .6rem;
          margin-top: .5rem;
          border: none;
          border-radius: .75rem;
          background: linear-gradient(135deg, #2f5fcb 0%, #1a3a80 100%);
          color: #fff;
          font-family: "Be Vietnam Pro", sans-serif;
          font-size: 1rem;
          font-weight: 700;
          letter-spacing: .04em;
          cursor: pointer;
          transition: transform .15s, box-shadow .25s, opacity .2s;
          box-shadow:
            0 8px 24px rgba(47, 95, 203, .3),
            inset 0 1px 0 rgba(255,255,255,.1);
        }

        .admin-login-submit:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow:
            0 12px 32px rgba(47, 95, 203, .4),
            inset 0 1px 0 rgba(255,255,255,.15);
        }

        .admin-login-submit:active:not(:disabled) {
          transform: translateY(0) scale(.98);
        }

        .admin-login-submit:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .admin-login-submit .material-symbols-outlined {
          font-size: 20px;
        }

        /* Spinner */
        .admin-login-spinner {
          width: 18px;
          height: 18px;
          border: 2px solid rgba(255,255,255,.3);
          border-top-color: #fff;
          border-radius: 50%;
          animation: adminSpin .7s linear infinite;
        }

        @keyframes adminSpin {
          to { transform: rotate(360deg); }
        }

        /* ─── Footer ─────────────────────────────────────────── */
        .admin-login-footer {
          margin-top: 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .75rem;
        }

        .admin-login-footer-text {
          display: flex;
          align-items: center;
          gap: .35rem;
          font-size: .75rem;
          color: #64748b;
          margin: 0;
        }

        .admin-login-footer-icon {
          font-size: 15px;
        }

        .admin-login-back-link {
          display: inline-flex;
          align-items: center;
          gap: .3rem;
          font-size: .8rem;
          font-weight: 600;
          color: #94a3b8;
          text-decoration: none;
          transition: color .2s;
        }

        .admin-login-back-link:hover {
          color: #e2e8f0;
        }

        .admin-login-back-link .material-symbols-outlined {
          font-size: 16px;
        }

        /* ─── Responsive ─────────────────────────────────────── */
        @media (max-width: 480px) {
          .admin-login-card {
            padding: 1.75rem 1.25rem;
          }

          .admin-login-title {
            font-size: 1.4rem;
          }
        }
      `}</style>
    </main>
  );
}
