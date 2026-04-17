import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";

export default function RootPage() {
  const mainRef = useRef(null);

  useEffect(() => {
    const mainElement = mainRef.current;

    if (!mainElement) {
      return undefined;
    }

    mainElement.classList.add("scroll-motion");

    const sections = Array.from(
      mainElement.querySelectorAll("section[data-scroll-section]"),
    );

    if (!sections.length) {
      return () => {
        mainElement.classList.remove("scroll-motion");
      };
    }

    sections.forEach((section, index) => {
      section.style.setProperty(
        "--section-delay",
        String(Math.min(index * 80, 320)) + "ms",
      );
    });

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion || !("IntersectionObserver" in window)) {
      sections.forEach((section) => section.classList.add("is-visible"));
      return () => {
        mainElement.classList.remove("scroll-motion");
      };
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("is-visible", entry.isIntersecting);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -12% 0px",
      },
    );

    sections.forEach((section, index) => {
      if (index === 0) {
        section.classList.add("is-visible");
      }

      observer.observe(section);
    });

    return () => {
      observer.disconnect();
      mainElement.classList.remove("scroll-motion");
    };
  }, []);

  return (
    <main ref={mainRef} className="pt-24 md:pt-16">
      {/* Hero Section */}
      <section
        className="relative px-8 pt-0 pb-20 max-w-screen-2xl mx-auto"
        data-scroll-section
      >
        <div className="relative min-h-[680px] rounded-3xl overflow-hidden">
          <img
            className="absolute inset-0 w-full h-full object-cover"
            src="/images/hero.gif"
            alt="Hero artwork"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/35 to-black/55 pointer-events-none" />
          <div className="relative z-10 min-h-[680px] flex items-center justify-center px-6 md:px-12">
            <div className="space-y-8 max-w-4xl text-center p-8 md:p-12">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-surface-container-highest text-primary font-bold text-xs uppercase tracking-widest mx-auto">
                Trực tiếp từ 36
              </div>
              <h1 className="hero-title mb-3 font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.03em] text-white drop-shadow-[0_10px_20px_rgba(0,0,0,0.36)]">
                Đấu giá
                <span className="text-primary font-extrabold italic ml-1">
                  Figure Real Time
                </span>{" "}
                ngay bây giờ!
              </h1>
              <p className="hero-copy text-xl text-white/95 max-w-2xl mx-auto leading-relaxed">
                Sàn thương mại đấu giá sản phẩm văn hóa 2D Đầu tiên tại Việt
                Nam!
              </p>
              <div className="flex flex-wrap gap-4 pt-4 justify-center">
                <a
                  className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-headline font-bold text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center gap-2"
                  href="/auction-detail"
                >
                  Vào phiên đấu giá
                  <span className="material-symbols-outlined">trending_up</span>
                </a>
                <a
                  className="px-8 py-4 bg-surface-container-low text-secondary border border-secondary/15 rounded-lg font-headline font-bold text-lg hover:bg-surface-container-high transition-all"
                  href="#cach-thuc-dau-gia"
                >
                  Cách thức đấu giá
                </a>
                <Link
                  className="px-8 py-4 bg-white/90 text-primary border border-white rounded-lg font-headline font-bold text-lg hover:bg-white transition-all flex items-center gap-2"
                  to="/sell"
                >
                  Đăng bán sản phẩm
                  <span className="material-symbols-outlined">add_box</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Auction Flow */}
      <section
        id="cach-thuc-dau-gia"
        className="px-8 py-20 max-w-screen-2xl mx-auto scroll-mt-28"
        data-scroll-section
      >
        <div className="rounded-3xl bg-gradient-to-br from-surface-container to-surface-container-high p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                Cách thức đấu giá
              </p>
              <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tight">
                4 bước tham gia phiên đấu giá
              </h2>
              <p className="text-on-surface-variant max-w-2xl leading-relaxed">
                Quy trình được tối ưu để bạn có thể đặt giá nhanh, an toàn và
                minh bạch từ lúc đăng ký đến khi nhận hàng.
              </p>
            </div>
            <a
              className="inline-flex items-center gap-2 text-secondary font-bold hover:underline"
              href="/register"
            >
              Bắt đầu ngay
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">person_add</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Bước 1
              </p>
              <h3 className="text-xl font-headline font-bold">Tạo tài khoản</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Đăng ký nhanh và hoàn tất xác thực để mở quyền tham gia các
                phiên đấu giá hiếm.
              </p>
            </article>
            <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-secondary/10 text-secondary flex items-center justify-center">
                <span className="material-symbols-outlined">inventory_2</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-secondary">
                Bước 2
              </p>
              <h3 className="text-xl font-headline font-bold">Chọn vật phẩm</h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Theo dõi mô tả, lịch sử giá và thời gian còn lại trước khi quyết
                định đặt giá đầu tiên.
              </p>
            </article>
            <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center">
                <span className="material-symbols-outlined">gavel</span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-tertiary">
                Bước 3
              </p>
              <h3 className="text-xl font-headline font-bold">
                Đấu giá trực tiếp
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Đặt mức giá phù hợp theo thời gian thực. Giá cao nhất khi phiên
                kết thúc sẽ là người thắng cuộc.
              </p>
            </article>
            <article className="bg-surface-container-lowest rounded-2xl p-6 border border-outline-variant/40 space-y-4">
              <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined">
                  local_shipping
                </span>
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
                Bước 4
              </p>
              <h3 className="text-xl font-headline font-bold">
                Thanh toán &amp; nhận hàng
              </h3>
              <p className="text-on-surface-variant leading-relaxed text-sm">
                Hoàn tất thanh toán bảo mật và chọn giao tận nơi hoặc lưu kho
                cao cấp tại Tokyo.
              </p>
            </article>
          </div>
        </div>
      </section>
      {/* Quick Navigation */}
      <section
        className="px-8 py-12 max-w-screen-2xl mx-auto"
        data-scroll-section
      >
        <div className="rounded-2xl bg-surface-container p-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
            <div>
              <p className="text-xs uppercase tracking-widest font-bold text-primary">
                Điều hướng nhanh
              </p>
              <h2 className="text-3xl font-headline font-bold">
                Toàn bộ page theo luồng
              </h2>
            </div>
            <a
              className="text-secondary font-bold hover:underline"
              href="/home"
            >
              Đi đến trang chủ marketplace
            </a>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 text-sm">
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/"
            >
              Trang đích
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/home"
            >
              Trang chủ
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/explore"
            >
              Khám phá figure
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/auction-detail"
            >
              Chi tiết đấu giá
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/cart"
            >
              Giỏ hàng
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/dashboard"
            >
              Bảng điều khiển
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/news"
            >
              Tin tức
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/login"
            >
              Đăng nhập
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="/register"
            >
              Đăng ký
            </a>
            <a
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              href="#cach-thuc-dau-gia"
            >
              Luồng đấu giá
            </a>
            <Link
              className="rounded-lg bg-surface-container-lowest px-4 py-3 font-semibold hover:bg-primary hover:text-white transition-colors"
              to="/sell"
            >
              Đăng bán đấu giá
            </Link>
          </div>
        </div>
      </section>
      {/* Value Props (Bento Grid) */}
      <section
        className="px-8 py-20 bg-surface-container-low"
        data-scroll-section
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-surface-container-lowest p-10 rounded-xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  verified_user
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold">
                Xác thực chính hãng
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Mỗi vật phẩm đều được kiểm định bởi 3 chuyên gia độc lập trước
                khi vào kho lưu trữ cao cấp.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  public
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold">
                Drop hiếm toàn cầu
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Tiếp cận trực tiếp các đợt phát hành độc quyền tại Akihabara và
                bộ sưu tập tư nhân quý hiếm.
              </p>
            </div>
            <div className="bg-surface-container-lowest p-10 rounded-xl space-y-4 hover:translate-y-[-4px] transition-transform duration-300">
              <div className="w-12 h-12 rounded-lg bg-tertiary/10 flex items-center justify-center text-tertiary">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  bolt
                </span>
              </div>
              <h3 className="text-2xl font-headline font-bold">
                Đấu giá thời gian thực
              </h3>
              <p className="text-on-surface-variant leading-relaxed">
                Hệ thống đấu giá độ trễ thấp cho cạnh tranh tốc độ cao, nơi từng
                mili giây đều có giá trị.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Featured Collections */}
      <section
        className="px-8 py-32 max-w-screen-2xl mx-auto"
        data-scroll-section
      >
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-5xl font-headline font-bold tracking-tight">
              Bộ sưu tập <span className="text-primary italic">nổi bật</span>
            </h2>
            <p className="text-on-surface-variant text-lg max-w-xl">
              Các đợt mở bán được tuyển chọn trong tuần này. Thêm ngay vào danh
              sách theo dõi của bạn.
            </p>
          </div>
          <a
            className="text-secondary font-bold flex items-center gap-2 hover:underline"
            href="/explore"
          >
            Xem tất cả bộ sưu tập
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Evangelion */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="dramatic shot of a purple mecha unit head with glowing green eyes in a dark industrial hangar with red emergency lights"
                src="/images/img1.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              <div className="absolute top-4 right-4 bg-primary px-3 py-1 text-white font-bold text-xs rounded uppercase tracking-tighter">
                Mới ra mắt
              </div>
            </div>
            <h4 className="text-2xl font-headline font-bold mb-2">
              Neon Genesis Evangelion
            </h4>
            <p className="text-sm font-label text-slate-500 uppercase tracking-widest mb-4">
              Unit 01 Artifacts • 12 vật phẩm
            </p>
            <a
              className="block w-full py-3 text-center border border-outline-variant/30 rounded-lg font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
              href="/explore"
            >
              Khám phá bộ sưu tập
            </a>
          </div>
          {/* One Piece */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="vibrant aesthetic collection of pirate themed manga volumes and a golden coin on a dark wooden surface with warm atmospheric lighting"
                src="/images/img2.jpeg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            <h4 className="text-2xl font-headline font-bold mb-2">
              Gotoubun: Miku Nakano
            </h4>
            <p className="text-sm font-label text-slate-500 uppercase tracking-widest mb-4">
              Rare Manuscript Cuttings • 8 vật phẩm
            </p>
            <a
              className="block w-full py-3 text-center border border-outline-variant/30 rounded-lg font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
              href="/explore"
            >
              Khám phá bộ sưu tập
            </a>
          </div>
          {/* Ghibli */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="hand-painted style artistic scene of a lush green forest with soft ethereal light filtering through leaves and a small ceramic spirit statue"
                src="/images/img3.jpg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            <h4 className="text-2xl font-headline font-bold mb-2">
              Steins;Gate Kurisu scale 1/7
            </h4>
            <p className="text-sm font-label text-slate-500 uppercase tracking-widest mb-4">
              Princess Mononoke Sets • 5 vật phẩm
            </p>
            <a
              className="block w-full py-3 text-center border border-outline-variant/30 rounded-lg font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all"
              href="/explore"
            >
              Khám phá bộ sưu tập
            </a>
          </div>
        </div>
      </section>
      {/* Community/Trust: Premium Vault */}
      <section
        className="px-8 py-32 bg-on-background text-white relative overflow-hidden"
        data-scroll-section
      >
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
          <img
            className="w-full h-full object-cover"
            data-alt="high-tech secure server room with glowing blue led lights and futuristic hardware aesthetic"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCDlSGIhtfeGdFuPr4UUFUnlhumm5mfw3ddUkHV2BJTAmWxlOsi6JqMqqeSBNKcOVAljgnfpaGscCDZmqNalhUj8-5dmqNQDkHQdqzZZSMN9y_szbzXr4VddgpbwNYopreKxqGk5okEHm5Nayxe_SEsq_roHeojt_WYgHA3khuzgXkklZP4gX0QYgl8YU1Zm4YXDmExIIiOt4agyHePDCdG8ZoJprRaL-L7IsiEA3BbWtWJQ7u57K9M9tXXHmuEBwNWzZITF7T-IR_j"
          />
        </div>
        <div className="max-w-screen-2xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <h2 className="text-5xl font-headline font-bold leading-tight">
              Kho lưu trữ <span className="text-primary italic">cao cấp</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Bảo mật không chỉ là công nghệ mà còn là gìn giữ giá trị sưu tầm.
              Mỗi vật phẩm có thể được lưu tại kho kiểm soát khí hậu ở Tokyo
              hoặc vận chuyển bảo hiểm tận tay.
            </p>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">
                  verified
                </span>
                <div>
                  <h5 className="font-bold text-xl">Xác thực 3 lớp</h5>
                  <p className="text-slate-500">
                    Đối soát nguồn gốc, kiểm định vật lý và gắn thẻ NFC số.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
                <div>
                  <h5 className="font-bold text-xl">Ký quỹ số có bảo hiểm</h5>
                  <p className="text-slate-500">
                    Tiền của bạn được bảo toàn cho tới khi vật phẩm được xác
                    minh khi nhận hàng.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="relative">
            <div className="p-8 bg-slate-900/50 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
              <div className="flex items-center gap-4 mb-8">
                <img
                  className="w-16 h-16 rounded-full object-cover grayscale"
                  data-alt="portrait of a professional japanese man in a sleek modern office setting with glasses looking confident"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA0VEAdenGIm8FNALfc7ONmAqME06XSIrF3yP3Oy3mvFwD8Zqwst_gOQq855FfA26CpLFXMkGT_A_WRNIP4TQKy1a2i_TGOXWOsm2GATKy89tLhdcBhmS3MeFEbUrZ7z9I0gNAYn-037apPji2flx1kkV2w3pEXtkj0AQOFLjbQlndH42ibDeAL-u8jUw5PZeEcqD9BXo55-l9M96inceQkdKOWMsq3Tu4ZeRcHay20W5SZhe7JPtK9umz0m7RRRqWdCPdy8H95_jXY"
                />
                <div>
                  <p className="font-bold text-lg">Kenji Sato</p>
                  <p className="text-slate-500 text-sm">
                    Chuyên gia kiểm định trưởng
                  </p>
                </div>
              </div>
              <p className="text-xl italic font-body leading-relaxed text-slate-300">
                "Chúng tôi không chỉ bán figure, chúng tôi lưu giữ văn hóa 2D.
                Mọi vật phẩm qua kho đều được đối xử như một tác phẩm nghệ thuật
                đương đại."
              </p>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary opacity-20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section
        className="px-8 py-32 text-center max-w-screen-xl mx-auto"
        data-scroll-section
      >
        <div className="space-y-10">
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">
            Sẵn sàng trở thành <br />
            <span className="text-primary italic">
              nhà sưu tầm huyền thoại?
            </span>
          </h2>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto">
            Gia nhập cộng đồng hơn 50.000 nhà sưu tầm và nhận quyền truy cập sớm
            các đợt drop lớn từ Akihabara.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              className="w-full md:w-auto px-12 py-5 bg-primary text-white rounded-lg font-headline font-bold text-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform"
              href="/register"
            >
              Tạo tài khoản
            </a>
            <a
              className="w-full md:w-auto px-12 py-5 bg-transparent text-on-background border-2 border-on-background rounded-lg font-headline font-bold text-xl hover:bg-on-background hover:text-white transition-all"
              href="/explore"
            >
              Xem các phiên sắp mở
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
