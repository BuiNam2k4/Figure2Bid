import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();
  const mainRef = useRef(null);

  useEffect(() => {
    const loginForm = mainRef.current?.querySelector("#loginForm");

    if (!loginForm) {
      return undefined;
    }

    const handleSubmit = (event) => {
      event.preventDefault();
      navigate("/home");
    };

    loginForm.addEventListener("submit", handleSubmit);

    return () => {
      loginForm.removeEventListener("submit", handleSubmit);
    };
  }, [navigate]);

  return (
    <main ref={mainRef} className="min-h-screen pt-24 flex items-stretch">
      {/* Left: High-Impact Visual Column */}
      <section className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-on-background">
        <div className="absolute inset-0 z-0">
          <img alt="Cinematic high-end collectible figurine photography" className="w-full h-full object-cover opacity-60 mix-blend-luminosity scale-105" data-alt="dramatic cinematic close-up of a high-end resin anime statue with neon blue and red rim lighting against a dark studio background" src="/images/photo-1-15612676190041302758248.webp" />
        </div>
        {/* Atmospheric Layering Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-on-background via-transparent to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        {/* Brand Identity Branding */}
        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <div>
            <h1 className="font-headline font-black text-4xl tracking-tighter text-white uppercase italic">
              FIGURE2BID
            </h1>
          </div>
          <div className="max-w-md">
            <span className="inline-block px-3 py-1 bg-primary text-white font-headline text-xs tracking-widest uppercase mb-6">
              Đã xác thực chính hãng
            </span>
            <h2 className="font-headline text-5xl font-bold text-white leading-none tracking-tight mb-4">
              NẮM BẮT NHỊP ĐẬP <br />AKIBA.
            </h2>
            <p className="text-surface-container font-body text-lg opacity-80">
              Tham gia kho sưu tầm số độc quyền cho vật phẩm hiếm, manga giới
              hạn và figure tỉ lệ lớn.
            </p>
          </div>
        </div>
        {/* Floating Glass Status Element */}
        <div className="absolute bottom-16 right-16 z-20 text-glass-blur p-6 rounded-xl border border-white/10 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
              <img alt="Top Contributor" className="w-full h-full object-cover" data-alt="portrait headshot of a stylish young adult male in a minimalist modern studio setting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDpLg3-c7hKiu6LUzLUt1xvbnZ0KTRoTVyY8bmOyL7Q6eg1aNnceWdpGeuPbxx_jfVJz1afRFHw-OdIFik4MKM7unj-UEqupk8i9-cs5sFw94_fiY2nS1WbR6A4D24612NCmRvo9ayfVYSpksV14qO1tQtlrkHMZI_R3peKj6vFsT2p2KW0M0H-qJaQ3h3MlkuEhWEDrkGZCaX092hzy7vnV5ECZJfPcGC1-kbIdHonMBdcfFm90SFbhATktRL5vgkZrhmGBs9PaSyO" />
            </div>
            <div>
              <p className="text-xs font-label uppercase tracking-widest text-on-surface-variant mb-1">
                Người thắng phiên gần nhất
              </p>
              <p className="font-headline font-bold text-on-surface">
                @NEON_CURATOR
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Right: Login Form Column */}
      <section className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-24 bg-surface">
        <div className="w-full max-w-md">
          <div className="mb-12">
            <h3 className="font-headline text-3xl font-black text-on-background uppercase tracking-tighter mb-2">
              Chào mừng quay lại
            </h3>
            <p className="text-on-surface-variant font-medium">
              Truy cập kho sưu tầm và các phiên đang theo dõi.
            </p>
          </div>
          {/* Form Section */}
          <form className="space-y-6" id="loginForm">
            <div>
              <label className="block font-label text-[10px] tracking-widest uppercase text-on-surface-variant font-bold mb-2" htmlFor="identifier">
                Tên đăng nhập hoặc email
              </label>
              <input className="w-full h-14 px-6 bg-surface-container-low border-none focus:ring-2 focus:ring-secondary/20 focus:bg-white rounded-lg transition-all font-body text-on-surface placeholder:text-outline-variant/60" id="identifier" name="identifier" placeholder="collector_01" type="text" />
            </div>
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="font-label text-[10px] tracking-widest uppercase text-on-surface-variant font-bold" htmlFor="password">
                  Mật khẩu
                </label>
                <a className="font-label text-[10px] tracking-widest uppercase text-primary font-black hover:underline" href="#">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <input className="w-full h-14 px-6 bg-surface-container-low border-none focus:ring-2 focus:ring-secondary/20 focus:bg-white rounded-lg transition-all font-body text-on-surface" id="password" name="password" placeholder="••••••••" type="password" />
                <button className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant" type="button">
                  <span className="material-symbols-outlined text-xl">visibility</span>
                </button>
              </div>
            </div>
            {/* Primary Action */}
            <button className="w-full h-16 bg-gradient-to-br from-primary to-primary-container text-white font-headline font-bold text-lg rounded-lg shadow-[0_10px_20px_rgba(184,17,32,0.2)] hover:shadow-[0_15px_30px_rgba(184,17,32,0.3)] transition-all active:scale-[0.98] uppercase tracking-wider" type="submit">
              Vào kho sưu tầm
            </button>
          </form>
          {/* Social Login Divider */}
          <div className="relative my-10 flex items-center">
            <div className="flex-grow border-t border-surface-container-high" />
            <span className="flex-shrink mx-4 font-label text-[10px] tracking-widest uppercase text-outline-variant font-bold">
              Xác minh danh tính
            </span>
            <div className="flex-grow border-t border-surface-container-high" />
          </div>
          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center gap-3 h-14 border border-surface-container-high rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 1.2-4.53z" fill="#EA4335" />
              </svg>
              Google
            </button>
            <button className="flex items-center justify-center gap-3 h-14 border border-surface-container-high rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:bg-surface-container-low transition-colors">
              <svg className="w-5 h-5" fill="#5865F2" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128c.126-.094.252-.192.372-.29a.074.074 0 0 1 .077-.01c3.927 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .077.01c.12.098.246.196.373.29a.077.077 0 0 1-.006.128 12.933 12.933 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.955-2.419 2.156-2.419 1.21 0 2.176 1.096 2.156 2.419 0 1.334-.946 2.419-2.156 2.419zm7.974 0c-1.182 0-2.156-1.085-2.156-2.419 0-1.333.946-2.419 2.156-2.419 1.21 0 2.175 1.096 2.156 2.419 0 1.334-.946 2.419-2.156 2.419z" />
              </svg>
              Discord
            </button>
          </div>
          {/* Footer Links */}
          <div className="mt-16 text-center">
            <p className="font-label text-xs uppercase tracking-widest text-on-surface-variant">
              Mới tham gia sưu tầm?
              <a className="font-black text-secondary hover:text-primary transition-colors ml-1" href="#">
                Tạo tài khoản
              </a>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
