export default function LandingPage() {
  return (
    <main className="pt-24 md:pt-16 overflow-x-hidden font-body">
      {/* Hero Section */}
      <section className="relative px-8 pt-0 pb-20 max-w-screen-2xl mx-auto">
        <div className="space-y-8 z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center px-4 py-1 rounded-full bg-surface-container-highest text-primary font-bold text-xs uppercase tracking-widest mx-auto">
            Trực tiếp từ Akihabara
          </div>
          <h1 className="text-6xl md:text-8xl font-headline font-bold leading-[0.9] tracking-tighter text-on-background">
            Tương lai của
            <span className="text-primary italic">sưu tầm 2D</span> là sôi động
          </h1>
          <p className="text-xl text-on-surface-variant max-w-2xl mx-auto font-body leading-relaxed">
            Sở hữu một phần lịch sử. Kho lưu trữ số và sàn đấu giá cao cấp đầu
            tiên cho vật phẩm Nhật Bản chính hãng, figure hiếm và manga giới
            hạn.
          </p>
          <div className="flex flex-wrap gap-4 pt-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-br from-primary to-primary-container text-white rounded-lg font-headline font-bold text-lg shadow-2xl shadow-primary/30 hover:shadow-primary/40 transition-all flex items-center gap-2">
              Tham gia đấu giá
              <span className="material-symbols-outlined">trending_up</span>
            </button>
            <button className="px-8 py-4 bg-surface-container-low text-secondary border border-secondary/15 rounded-lg font-headline font-bold text-lg hover:bg-surface-container-high transition-all">
              Cách hoạt động
            </button>
          </div>
        </div>
      </section>
      {/* Value Props (Bento Grid) */}
      <section className="px-8 py-20 bg-surface-container-low">
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
              <p className="text-on-surface-variant font-body leading-relaxed">
                Mỗi vật phẩm đều được kiểm định bởi 3 chuyên gia độc lập và lưu
                trữ niêm phong trong kho cao cấp.
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
              <p className="text-on-surface-variant font-body leading-relaxed">
                Tiếp cận trực tiếp các đợt phát hành độc quyền tại Akihabara và
                vật phẩm quý hiếm từ bộ sưu tập tư nhân.
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
              <p className="text-on-surface-variant font-body leading-relaxed">
                Hệ thống đấu giá độ trễ thấp dành cho cạnh tranh tốc độ cao, nơi
                từng mili giây đều tạo khác biệt.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Bộ sưu tập nổi bật */}
      <section className="px-8 py-32 max-w-screen-2xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
          <div className="space-y-4">
            <h2 className="text-5xl font-headline font-bold tracking-tight">
              Bộ sưu tập <span className="text-primary italic">nổi bật</span>
            </h2>
            <p className="text-on-surface-variant text-lg font-body max-w-xl">
              Các đợt mở bán được tuyển chọn trong tuần này. Thêm ngay vào danh
              sách theo dõi của bạn.
            </p>
          </div>
          <a
            className="text-secondary font-label font-bold flex items-center gap-2 hover:underline"
            href="#"
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
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB47d7w3jEDhCMAfhphQTuE_W7aNIoJtJyVBsiu9lA0dy1YI-ih7BD5UzXxlZL9FHDFxFsc3YDDiwj6l13gaiBhwq_PG0ic4kyjJU7CTnq7obvEHz6nL-Cn4EoBMEEJ3Qkwninz4l1w9QqJBvFxEHFRW0yNVeG9bZxIFuxN6-ZHboYxLOQOmGuvd7jcXLueErY96EYx5kse-6htJN2cDw3I5oC_9ncNnIKfYtbFm3oRIxXFVLSwwgCSPOUtFziGnFNjorB5mewZLRNE"
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
            <button className="w-full py-3 border border-outline-variant/30 rounded-lg font-label font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              Khám phá bộ sưu tập
            </button>
          </div>
          {/* One Piece */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="vibrant aesthetic collection of pirate themed manga volumes and a golden coin on a dark wooden surface with warm atmospheric lighting"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjc1RDWPgeuQDYFya20_E0IQgPkeyLCEueoIg--vl2XjQNgBocFSedW3pLUSHJ-bTZr3jXDwneAxjo-nnvVOwd7VvTPvLctUMSADUfHni7U3Eb6XUGRxXRirZUfQZiyo3Q2KyJXJLtDTABXR0nEsyu4xCkmNV7H3M9LwmHG_iCpJZQ9s9w8vuIevakc_scKlmwYalyzCzzYBKwav3F2tE_aJTi97dLQHO3o3Nw1A2Kq3dUADi7aqnzidZ8R3r9hzNv8ZCNHbza9xwl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            <h4 className="text-2xl font-headline font-bold mb-2">
              One Piece: The Wano Saga
            </h4>
            <p className="text-sm font-label text-slate-500 uppercase tracking-widest mb-4">
              Rare Manuscript Cuttings • 8 vật phẩm
            </p>
            <button className="w-full py-3 border border-outline-variant/30 rounded-lg font-label font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              Khám phá bộ sưu tập
            </button>
          </div>
          {/* Ghibli */}
          <div className="group cursor-pointer">
            <div className="relative aspect-[3/4] rounded-lg overflow-hidden mb-6">
              <img
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                data-alt="hand-painted style artistic scene of a lush green forest with soft ethereal light filtering through leaves and a small ceramic spirit statue"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDR4NdnnWzdVbscQoG5tCr6-HT5X3-_ocPy7uH8LL49ksks1g0GjIQNyaRu1P0yaGWBZrxjh58MdZiQeA9WotTDUT7vsqj4CIXN81vTvCgQ4_l7OhLF227RwX-rW558puqYgxFmuKW1L3Ycqkal-G41w-7Pc9nX_s4KrqnBnUWLuOIdtFsQ8S9_YpVCwuMcuhA-I5q0CDDv9tDWtZVgTMgio65g-RcDxnWyI6un126c073wZMh98Fli6BjvFU3DAgSj8obisupI8DId"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>
            <h4 className="text-2xl font-headline font-bold mb-2">
              Studio Ghibli Original Cels
            </h4>
            <p className="text-sm font-label text-slate-500 uppercase tracking-widest mb-4">
              Princess Mononoke Sets • 5 vật phẩm
            </p>
            <button className="w-full py-3 border border-outline-variant/30 rounded-lg font-label font-bold group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all">
              Khám phá bộ sưu tập
            </button>
          </div>
        </div>
      </section>
      {/* Community/Trust: Premium Vault */}
      <section className="px-8 py-32 bg-on-background text-white relative overflow-hidden">
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
            <p className="text-slate-400 text-lg font-body leading-relaxed">
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
                  <h5 className="font-headline font-bold text-xl">
                    Xác thực 3 lớp
                  </h5>
                  <p className="text-slate-500 font-body">
                    Đối soát nguồn gốc, kiểm định vật lý và gắn thẻ NFC số.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <span className="material-symbols-outlined text-primary">
                  security
                </span>
                <div>
                  <h5 className="font-headline font-bold text-xl">
                    Ký quỹ số có bảo hiểm
                  </h5>
                  <p className="text-slate-500 font-body">
                    Tiền của bạn được bảo vệ cho tới khi vật phẩm được xác minh
                    khi nhận hàng.
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
                  <p className="text-slate-500 text-sm font-label">
                    Chuyên gia kiểm định trưởng
                  </p>
                </div>
              </div>
              <p className="text-xl italic font-body leading-relaxed text-slate-300">
                "Chúng tôi không chỉ bán figure. Chúng tôi gìn giữ văn hóa 2D.
                Mọi vật phẩm đi qua kho đều được xem như một tác phẩm nghệ thuật
                đương đại."
              </p>
            </div>
            {/* Decorative circle */}
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-primary opacity-20 rounded-full blur-2xl" />
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="px-8 py-32 text-center max-w-screen-xl mx-auto">
        <div className="space-y-10">
          <h2 className="text-5xl md:text-7xl font-headline font-bold tracking-tighter">
            Sẵn sàng trở thành <br />
            <span className="text-primary italic">
              nhà sưu tầm huyền thoại?
            </span>
          </h2>
          <p className="text-xl text-on-surface-variant font-body max-w-2xl mx-auto">
            Gia nhập hơn 50.000 nhà sưu tầm và nhận quyền truy cập sớm các đợt
            drop lớn tiếp theo từ Akihabara.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="w-full md:w-auto px-12 py-5 bg-primary text-white rounded-lg font-headline font-bold text-xl shadow-xl shadow-primary/20 hover:scale-105 transition-transform">
              Tạo tài khoản
            </button>
            <button className="w-full md:w-auto px-12 py-5 bg-transparent text-on-background border-2 border-on-background rounded-lg font-headline font-bold text-xl hover:bg-on-background hover:text-white transition-all">
              Xem các phiên sắp mở
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
