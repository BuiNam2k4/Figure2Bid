export default function NewsPage() {
  return (
    <main className="pt-24 pb-20 px-6 max-w-[1440px] mx-auto">
      <section className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <article className="lg:col-span-8 rounded-2xl overflow-hidden bg-on-background text-white relative">
            <img alt="Tin nổi bật" className="w-full h-[420px] object-cover opacity-65" src="/images/hero.gif" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute left-8 right-8 bottom-8 space-y-4">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold bg-primary/85 px-3 py-1 rounded-full">
                <span className="material-symbols-outlined text-sm">newspaper</span>
                Tin Nổi Bật
              </span>
              <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                Toàn cảnh thị trường figure quý hiếm quý II/2026
              </h1>
              <p className="text-white/85 text-lg">
                Tổng hợp xu hướng đấu giá, nhóm sản phẩm tăng giá mạnh và chiến
                lược ra giá dành cho nhà sưu tầm mới.
              </p>
            </div>
          </article>
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-surface-container-low p-6 border border-surface-container-high">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">
                Chuyên mục
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">Thị trường</span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">Sự kiện</span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">Mẹo đấu giá</span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">Bảo quản figure</span>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/40">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-3">
                Cập nhật mới
              </p>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li>09:00 - Lịch mở 5 phiên đấu giá hiếm tuần này</li>
                <li>11:30 - Top figure tăng giá mạnh nhất tháng</li>
                <li>14:15 - Cảnh báo hàng giả theo series phổ biến</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-headline text-3xl font-bold">Tin Tức Mới Nhất</h2>
          <a className="text-secondary font-bold hover:underline" href="/explore">Xem phiên đấu giá</a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 1" className="w-full h-52 object-cover" src="/images/img3.jpg" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                Phân tích
              </p>
              <h3 className="font-headline text-xl font-bold">
                Steins;Gate figure phiên bản giới hạn: Vì sao tăng giá?
              </h3>
              <p className="text-sm text-on-surface-variant">
                Phân tích độ hiếm, nhà phát hành, phiên bản và thanh khoản trên
                thị trường thứ cấp.
              </p>
            </div>
          </article>
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 2" className="w-full h-52 object-cover" src="/images/img4.jpg" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                Series Hot
              </p>
              <h3 className="font-headline text-xl font-bold">
                Bộ truyện manga nào đang được săn nhiều nhất?
              </h3>
              <p className="text-sm text-on-surface-variant">
                Top các bản in đầu và boxset được trả giá cao trong 30 ngày gần
                nhất.
              </p>
            </div>
          </article>
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 3" className="w-full h-52 object-cover" src="/images/img1.webp" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary">
                Sự kiện
              </p>
              <h3 className="font-headline text-xl font-bold">
                Lịch công bố card/figure Evangelion tháng này
              </h3>
              <p className="text-sm text-on-surface-variant">
                Các mốc phát hành mới từ Bandai, Good Smile và những phiên
                collab đáng chú ý.
              </p>
            </div>
          </article>
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 4" className="w-full h-52 object-cover" src="/images/img2.jpeg" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                Nhà sưu tầm
              </p>
              <h3 className="font-headline text-xl font-bold">
                5 lỗi thường gặp khi chụp ảnh sản phẩm đem đấu giá
              </h3>
              <p className="text-sm text-on-surface-variant">
                Cách setup ánh sáng và bố cục để tăng độ tin cậy khi đăng bán.
              </p>
            </div>
          </article>
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 5" className="w-full h-52 object-cover" src="/images/img1.jpg" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary">
                Thị trường
              </p>
              <h3 className="font-headline text-xl font-bold">
                Diễn biến giá figure EVA trong nửa đầu năm 2026
              </h3>
              <p className="text-sm text-on-surface-variant">
                So sánh mức chốt giá theo phiên bản và tình trạng seal để ra giá
                hợp lý hơn.
              </p>
            </div>
          </article>
          <article className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow">
            <img alt="Bài viết 6" className="w-full h-52 object-cover" src="/images/photo-1-15612676190041302758248.webp" />
            <div className="p-5 space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-tertiary">
                Kinh nghiệm
              </p>
              <h3 className="font-headline text-xl font-bold">
                Chiến lược đặt bid cuối phiên để tối đa cơ hội thắng
              </h3>
              <p className="text-sm text-on-surface-variant">
                Gợi ý setup cảnh báo, bước giá và thời điểm vào lệnh trong 3
                phút cuối.
              </p>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}
