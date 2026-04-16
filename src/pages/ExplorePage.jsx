export default function ExplorePage() {
  return (
    <main className="pt-24 min-h-screen max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 px-8 pb-20">
      {/* Sidebar Filters */}
      <aside className="w-full md:w-72 flex-shrink-0 space-y-8 md:sticky md:top-28 self-start">
        <section>
          <h3 className="font-headline text-lg font-bold mb-4 flex items-center gap-2">
            <span
              className="material-symbols-outlined text-primary"
              data-icon="tune"
            >
              tune
            </span>
            Lọc bộ sưu tập
          </h3>
          {/* Series anime */}
          <div className="space-y-4 mb-8">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Series anime
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline-variant text-secondary focus:ring-secondary/20"
                  type="checkbox"
                />
                <span className="text-sm group-hover:text-secondary transition-colors">
                  One Piece
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline-variant text-secondary focus:ring-secondary/20"
                  type="checkbox"
                />
                <span className="text-sm group-hover:text-secondary transition-colors">
                  Naruto
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline-variant text-secondary focus:ring-secondary/20"
                  type="checkbox"
                />
                <span className="text-sm group-hover:text-secondary transition-colors">
                  Jujutsu Kaisen
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded border-outline-variant text-secondary focus:ring-secondary/20"
                  type="checkbox"
                />
                <span className="text-sm group-hover:text-secondary transition-colors">
                  Evangelion
                </span>
              </label>
            </div>
          </div>
          {/* Tình trạng */}
          <div className="space-y-4 mb-8">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Tình trạng
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-secondary text-white">
                MISB
              </button>
              <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                Mới
              </button>
              <button className="px-3 py-1.5 rounded-md text-xs font-medium bg-surface-container-high hover:bg-surface-container-highest transition-colors">
                Đã qua sử dụng
              </button>
            </div>
          </div>
          {/* Price Range */}
          <div className="space-y-4 mb-8">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Khoảng giá (USD)
            </p>
            <div className="grid grid-cols-2 gap-2">
              <input
                className="bg-surface-container-low border-none rounded-lg p-2 text-sm focus:ring-secondary/20"
                placeholder="Tối thiểu"
                type="number"
              />
              <input
                className="bg-surface-container-low border-none rounded-lg p-2 text-sm focus:ring-secondary/20"
                placeholder="Tối đa"
                type="number"
              />
            </div>
          </div>
          {/* End Date */}
          <div className="space-y-4">
            <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Kết thúc đấu giá
            </p>
            <select className="w-full bg-surface-container-low border-none rounded-lg p-2 text-sm focus:ring-secondary/20 appearance-none">
              <option>Mọi thời điểm</option>
              <option>1 giờ tới</option>
              <option>Hôm nay</option>
              <option>Tuần này</option>
            </select>
          </div>
        </section>
        <div className="bg-surface-container-highest/30 p-6 rounded-xl border border-secondary/10">
          <p className="text-xs text-secondary font-bold mb-2 uppercase tracking-tighter">
            Mẹo nhanh
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed">
            Các phiên đấu sáng sớm (JST) thường ít cạnh tranh hơn. Hãy bật cảnh
            báo cho "đợt hàng hiếm".
          </p>
        </div>
      </aside>
      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        {/* Header & Sort */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tighter uppercase mb-2">
              Figure <span className="text-primary">.</span>
            </h1>
            <p className="text-on-surface-variant">
              Tuyển chọn kiệt tác 2D từ khắp cộng đồng sưu tầm số.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Sắp xếp theo
            </span>
            <div className="flex bg-surface-container-low p-1 rounded-lg overflow-x-auto">
              <button className="px-4 py-2 text-xs font-bold rounded-md transition-all bg-surface-container-lowest shadow-sm">
                Nhiều lượt đấu
              </button>
              <button className="px-4 py-2 text-xs font-bold rounded-md transition-all text-on-surface-variant hover:text-on-surface">
                Sắp kết thúc
              </button>
              <button className="px-4 py-2 text-xs font-bold rounded-md transition-all text-on-surface-variant hover:text-on-surface">
                Mới nhất
              </button>
            </div>
          </div>
        </div>
        {/* Auction Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* Card 1 */}
          <a className="block" href="/auction-detail">
            <div className="group relative bg-surface-container-lowest rounded-xl overflow-visible p-6 transition-all duration-300 hover:translate-y-[-4px]">
              <div className="relative mb-4">
                <img
                  alt="Portgas D. Ace figure"
                  className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-xl"
                  data-alt="Premium anime figure of a cybernetic warrior in a dynamic pose, high detail, studio lighting, deep blue background"
                  src="/images/img4.jpg"
                />
                {/* Floating Glass Timer */}
                <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: '"FILL" 1' }}
                  >
                    timer
                  </span>
                  <span className="font-headline text-primary font-bold text-sm">
                    02:14:45
                  </span>
                </div>
              </div>
              <div className="pt-2">
                <div className="flex justify-between items-start mb-2">
                  <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
                    One Piece / 1:7 Scale
                  </p>
                  <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-bold">
                    24 lượt đấu
                  </span>
                </div>
                <h2 className="font-headline text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                  Portgas D. Ace - Commander 2
                </h2>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                      Giá hiện tại
                    </p>
                    <p className="text-2xl font-headline font-extrabold text-on-surface">
                      $420.00
                    </p>
                  </div>
                  <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                    ĐẶT GIÁ
                  </button>
                </div>
              </div>
            </div>
          </a>
          {/* Card 2 */}
          <div className="group relative bg-surface-container-lowest rounded-xl overflow-visible p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="relative mb-4">
              <img
                alt="Sinanju Narrative Ver. Ka"
                className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-xl"
                data-alt="Highly detailed mecha robot figure with metallic red and gold finish, intricate mechanical parts, dramatic cinematic lighting"
                src="/images/img1.webp"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  timer
                </span>
                <span className="font-headline text-primary font-bold text-sm">
                  18:05:12
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-start mb-2">
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
                  Gundam / Master Grade
                </p>
                <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-bold">
                  8 lượt đấu
                </span>
              </div>
              <h2 className="font-headline text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                Sinanju Narrative Ver. Ka
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                    Giá hiện tại
                  </p>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">
                    $185.00
                  </p>
                </div>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                  ĐẶT GIÁ
                </button>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="group relative bg-surface-container-lowest rounded-xl overflow-visible p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="relative mb-4">
              <img
                alt="Hatsune Miku Deep Sea Girl"
                className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-xl"
                data-alt="Limited edition anime character statue with flowing blue hair, detailed fabric textures on outfit, ethereal lighting in a white studio"
                src="/images/img2.jpeg"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  timer
                </span>
                <span className="font-headline text-primary font-bold text-sm">
                  00:42:01
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-start mb-2">
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
                  Vocaloid / 1:8 Scale
                </p>
                <span className="text-[10px] bg-error-container px-2 py-0.5 rounded text-error font-bold">
                  Sắp kết thúc
                </span>
              </div>
              <h2 className="font-headline text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                Hatsune Miku - Deep Sea Girl
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                    Giá hiện tại
                  </p>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">
                    $310.00
                  </p>
                </div>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                  ĐẶT GIÁ
                </button>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="group relative bg-surface-container-lowest rounded-xl overflow-visible p-6 transition-all duration-300 hover:translate-y-[-4px]">
            <div className="relative mb-4">
              <img
                alt="Sasuke Uchiha figure"
                className="w-full h-80 object-cover rounded-lg group-hover:scale-105 transition-transform duration-500 shadow-xl"
                data-alt="Glow-in-the-dark stylized figure of a comic book hero, neon accents, dark background with subtle sparks of light"
                src="/images/img1.jpg"
              />
              <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  timer
                </span>
                <span className="font-headline text-primary font-bold text-sm">
                  04:55:00
                </span>
              </div>
            </div>
            <div className="pt-2">
              <div className="flex justify-between items-start mb-2">
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold">
                  Naruto / Vibration Stars
                </p>
                <span className="text-[10px] bg-surface-container-high px-2 py-0.5 rounded text-on-surface font-bold">
                  15 lượt đấu
                </span>
              </div>
              <h2 className="font-headline text-xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors">
                Sasuke Uchiha - Curse Mark
              </h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase">
                    Giá hiện tại
                  </p>
                  <p className="text-2xl font-headline font-extrabold text-on-surface">
                    $95.00
                  </p>
                </div>
                <button className="bg-gradient-to-br from-primary to-primary-container text-white px-6 py-2.5 rounded-lg font-headline font-bold text-sm hover:opacity-90 active:scale-95 transition-all shadow-md">
                  ĐẶT GIÁ
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Pagination */}
        <div className="mt-20 flex justify-center items-center gap-2">
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors">
            <span
              className="material-symbols-outlined text-on-surface"
              data-icon="chevron_left"
            >
              chevron_left
            </span>
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-primary text-white font-bold font-headline">
            1
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low font-headline transition-colors">
            2
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low font-headline transition-colors">
            3
          </button>
          <span className="mx-2">...</span>
          <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-surface-container-low font-headline transition-colors">
            12
          </button>
          <button className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors">
            <span
              className="material-symbols-outlined text-on-surface"
              data-icon="chevron_right"
            >
              chevron_right
            </span>
          </button>
        </div>
      </div>
    </main>
  );
}
