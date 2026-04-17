import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/authService";
import { saveAuthSession } from "../utils/authStorage";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const { password, confirmPassword, acceptTerms } = formData;

    if (!fullName || !email || !password || !confirmPassword) {
      setErrorMessage("Vui long nhap day du thong tin dang ky.");
      return;
    }

    if (password.length < 8) {
      setErrorMessage("Mat khau phai co it nhat 8 ky tu.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Xac nhan mat khau khong khop.");
      return;
    }

    if (!acceptTerms) {
      setErrorMessage("Ban can dong y dieu khoan truoc khi tiep tuc.");
      return;
    }

    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const authData = await register({ fullName, email, password });
      saveAuthSession(authData);
      navigate("/home", { replace: true });
    } catch (error) {
      setErrorMessage(error.message || "Dang ky that bai. Vui long thu lai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 flex flex-col md:flex-row">
      {/* Left: Form Canvas */}
      <section className="w-full md:w-5/12 lg:w-4/12 flex items-center justify-center p-8 lg:p-16 z-10 bg-background">
        <div className="w-full max-w-md">
          {/* Brand Anchor */}
          <div className="mb-12">
            <span className="text-2xl font-black tracking-tighter text-on-background font-headline">Figure2Bid</span>
            <div className="h-1 w-12 bg-primary mt-2" />
          </div>
          <div className="mb-10">
            <h1 className="text-4xl font-headline font-bold text-on-surface tracking-tight mb-2">
              THAM GIA KHO SƯU TẦM
            </h1>
            <p className="text-on-surface-variant font-body">
              Gia nhập cộng đồng sưu tầm vật phẩm 2D tinh tuyển.
            </p>
          </div>
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="group">
              <label className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="name">Biệt danh sưu tầm / Họ và tên</label>
              <div className="relative">
                <input className="w-full px-5 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-slate-400" id="name" name="fullName" onChange={handleChange} placeholder="VD: Sora Nanashi" type="text" value={formData.fullName} />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40">person</span>
              </div>
            </div>
            {/* Email */}
            <div className="group">
              <label className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="email">Email liên hệ</label>
              <div className="relative">
                <input className="w-full px-5 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-slate-400" id="email" name="email" onChange={handleChange} placeholder="curator@kinetic.jp" type="email" value={formData.email} />
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40">alternate_email</span>
              </div>
            </div>
            {/* Password Grid */}
            <div className="grid grid-cols-1 gap-6">
              <div className="group">
                <label className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="password">Mật khẩu</label>
                <div className="relative">
                  <input className="w-full px-5 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-slate-400" id="password" name="password" onChange={handleChange} placeholder="••••••••" type="password" value={formData.password} />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40">lock</span>
                </div>
              </div>
              <div className="group">
                <label className="block font-label text-xs font-bold uppercase tracking-widest text-on-surface-variant mb-2 ml-1" htmlFor="confirm_password">Xác nhận mật khẩu</label>
                <div className="relative">
                  <input className="w-full px-5 py-4 bg-surface-container-high border-none rounded-lg focus:ring-2 focus:ring-secondary focus:bg-surface-container-lowest transition-all duration-300 placeholder:text-slate-400" id="confirm_password" name="confirmPassword" onChange={handleChange} placeholder="••••••••" type="password" value={formData.confirmPassword} />
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant opacity-40">verified_user</span>
                </div>
              </div>
            </div>
            {/* Terms */}
            <div className="flex items-start gap-3 py-2">
              <div className="relative flex items-center h-5">
                <input checked={formData.acceptTerms} className="w-5 h-5 rounded-md border-outline-variant text-primary focus:ring-primary focus:ring-offset-background" id="terms" name="acceptTerms" onChange={handleChange} type="checkbox" />
              </div>
              <label className="text-sm text-on-surface-variant font-body leading-tight" htmlFor="terms">
                Tôi đồng ý với
                <a className="text-secondary font-bold hover:underline" href="#">Cam kết xác thực</a>
                và Điều khoản thành viên.
              </label>
            </div>
            {errorMessage && (
              <p className="text-sm text-primary font-body" role="alert">
                {errorMessage}
              </p>
            )}
            {/* CTA */}
            <button className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold text-lg rounded-xl shadow-[0_10px_30px_rgba(184,17,32,0.3)] hover:scale-[1.02] active:scale-95 transition-all duration-200 uppercase tracking-wider group flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed" disabled={isSubmitting} type="submit">
              {isSubmitting ? "Dang tao tai khoan..." : "Tao tai khoan"}
              <span className="material-symbols-outlined">bolt</span>
            </button>
          </form>
          <div className="mt-10 text-center">
            <p className="text-on-surface-variant font-body">
              Đã có tài khoản?
              <Link className="text-on-surface font-bold hover:text-primary transition-colors ml-1" to="/login">Dang nhap</Link>
            </p>
          </div>
        </div>
      </section>
      {/* Right: Visual Editorial */}
      <section className="hidden md:block md:w-7/12 lg:w-8/12 bg-on-background relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-cover bg-center editorial-mask" data-alt="dynamic close-up of high-end japanese mecha action figure with neon blue lighting and atmospheric smoke in a dark professional studio" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRauf1hgjOtxRa9Mddx_BLAEC5RegmQ7r8qSGYYXYZ0qbhXRmr4g1UWuLpRmYwCnVaIoDYqNm3cIDektgQqtcRAvwDMaaeheDRy0IZ3gTRxlx5q56u5vi7wR38UiXJ816vudVXbHS3cCv5YY0Djslxu-iN_O_SC6y29Ka4qedB3IbP4gLT8EI9GbT1qTGNuQXALH8CIi0vcSDS4lrdh3mffwNX7VH-wRLXynR8LIIMxmkqxlSIF54RQvYaUiv1TkaardvAAnJvmNdc")'}} />
        {/* Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-tr from-[#111c2c] via-transparent to-transparent opacity-80" />
        {/* Content Floating Layer */}
        <div className="absolute bottom-16 left-16 right-16 z-20">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary text-white font-label text-[10px] font-bold tracking-[0.2em] uppercase mb-6">
              <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>stars</span>
              Cấp bậc: Neon Elite
            </div>
            <h2 className="text-6xl lg:text-8xl font-headline font-black text-white leading-none tracking-tighter mb-6">
              SƯU TẦM
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">ĐỈNH CAO</span>
            </h2>
            <p className="text-xl text-slate-300 font-body leading-relaxed max-w-lg mb-8">
              Tham gia cùng 50.000+ nhà sưu tầm trên sàn giao dịch sôi động cho
              manga, figure và vật phẩm hiếm.
            </p>
            {/* Stats Bento Preview */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                <p className="text-primary font-headline font-bold text-2xl">
                  48k+
                </p>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-label">
                  Phiên đang mở
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                <p className="text-secondary-container font-headline font-bold text-2xl">
                  100%
                </p>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-label">
                  Đảm bảo
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-xl p-4 rounded-xl border border-white/10">
                <p className="text-white font-headline font-bold text-2xl">24/7</p>
                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-label">
                  Phiên toàn cầu
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Floating Decorative Elements */}
        <div className="absolute top-10 right-10 flex flex-col gap-4 items-end">
          <div className="w-32 h-1 bg-primary/40" />
          <div className="w-16 h-1 bg-secondary/40" />
        </div>
      </section>
    </main>
  );
}
