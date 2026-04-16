export default function HomePage() {
  return (
    <main className="pt-24 pb-20">
      {/* Hero Section: Featured Rare Figure */}
      <section className="max-w-[1440px] mx-auto px-8 mb-24">
        <div className="relative overflow-hidden rounded-[2rem] bg-surface-container-low min-h-[600px] flex items-center">
          {/* Background Text */}
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center opacity-[0.03] select-none pointer-events-none">
            <span className="font-headline text-[30rem] font-bold leading-none">HIEM</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full px-16 relative z-10">
            <div className="flex flex-col justify-center space-y-8">
              <div className="inline-flex items-center gap-2 bg-primary-container text-on-primary-container px-4 py-1 rounded-full w-fit">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>bolt</span>
                <span className="font-headline font-bold text-xs uppercase tracking-widest">Phiên đấu giá nổi bật</span>
              </div>
              <h1 className="font-headline text-7xl font-bold leading-[0.9] tracking-tighter text-on-background">
                Makise Kurisu <br />
                <span className="text-primary">1/7 Tỉ lệ</span> <br />
                <span className="text-secondary opacity-80 italic text-5xl">Digital Stars Ver.</span>
              </h1>
              <p className="font-body text-xl text-on-surface-variant max-w-md leading-relaxed">
                Tuyệt phẩm figure với lớp sơn ánh kim và bệ trưng bày neon tùy
                chỉnh. Chỉ có 500 bản trên toàn thế giới.
              </p>
              <div className="flex items-center gap-6">
                <button className="bg-gradient-to-tr from-primary to-primary-container text-on-primary px-10 py-5 rounded-xl font-headline font-bold text-lg shadow-lg hover:shadow-primary/25 transition-all duration-300 active:scale-95">
                  ĐẶT GIÁ: ¥45,000
                </button>
                <div className="glass-card px-6 py-3 rounded-xl border border-white/20 shadow-xl">
                  <p className="font-label text-xs uppercase text-on-surface-variant mb-1">
                    Còn lại
                  </p>
                  <p className="font-headline font-bold text-2xl text-primary tabular-nums">
                    04:12:35
                  </p>
                </div>
              </div>
            </div>
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent blur-3xl rounded-full" />
              <img alt="Featured Miku Figure" className="relative z-10 w-full max-w-[500px] h-auto drop-shadow-[0_35px_35px_rgba(184,17,32,0.3)] hover:scale-105 transition-transform duration-700" data-alt="Professional studio shot of a high-end anime figure with cyan pigtails and metallic outfit, dramatic neon lighting on white background" src="/images/img3.jpg" />
            </div>
          </div>
        </div>
      </section>
      {/* Đấu giá trực tiếp Grid */}
      <section className="max-w-[1440px] mx-auto px-8 mb-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-background">
              Đấu giá trực tiếp
            </h2>
            <p className="text-on-surface-variant font-body mt-2">
              Nhịp đập thị trường sưu tầm đang diễn ra ngay lúc này.
            </p>
          </div>
          <button className="text-secondary font-headline font-bold border-b-2 border-secondary/20 hover:border-secondary transition-all pb-1">
            Xem tất cả phiên đấu
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Auction Card 1 */}
          <a aria-label="Xem chi tiết Berserk Deluxe Edition" className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 block" href="/auction-detail">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img alt="Manga volume cover" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Manga volume cover with anime artwork" src="/images/img4.jpg" />
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-headline font-bold text-xs text-primary">TRỰC TIẾP</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl flex justify-between items-center border border-white/20">
                <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Thời gian còn lại</span>
                <span className="font-headline font-bold text-on-background tabular-nums">02:14:09</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                Gotoubun No Hanayome Deluxe Full volume
              </h3>
              <p className="font-label text-xs text-slate-500 mb-4 uppercase tracking-widest">
                Romcom đỉnh cao
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase">Giá hiện tại</span>
                  <span className="font-headline font-bold text-xl text-on-background">¥12,400</span>
                </div>
                <span className="bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary p-3 rounded-xl transition-colors duration-300">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
              </div>
            </div>
          </a>
          {/* Auction Card 2 */}
          <a aria-label="Xem chi tiết MGEX 1/100 Strike Freedom" className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 block" href="/auction-detail">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img alt="Evangelion card artwork" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Red Evangelion themed card art" src="/images/img1.webp" />
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-headline font-bold text-xs text-primary">TRỰC TIẾP</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl flex justify-between items-center border border-white/20">
                <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Thời gian còn lại</span>
                <span className="font-headline font-bold text-on-background tabular-nums">00:45:12</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                MGEX 1/100 Strike Freedom
              </h3>
              <p className="font-label text-xs text-slate-500 mb-4 uppercase tracking-widest">
                Bandai Namco • Bản custom
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase">Giá hiện tại</span>
                  <span className="font-headline font-bold text-xl text-on-background">¥28,000</span>
                </div>
                <span className="bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary p-3 rounded-xl transition-colors duration-300">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
              </div>
            </div>
          </a>
          {/* Auction Card 3 */}
          <a aria-label="Xem chi tiết Arasaka Prototype Enamel Pin" className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 block" href="/auction-detail">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img alt="Kurisu figure statue" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Anime figure posed with retro computer props" src="/images/img3.jpg" />
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-headline font-bold text-xs text-primary">TRỰC TIẾP</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl flex justify-between items-center border border-white/20">
                <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Thời gian còn lại</span>
                <span className="font-headline font-bold text-on-background tabular-nums">05:22:31</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                Arasaka Prototype Enamel Pin
              </h3>
              <p className="font-label text-xs text-slate-500 mb-4 uppercase tracking-widest">
                CD Projekt RED • Hàng chính hãng
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase">Giá hiện tại</span>
                  <span className="font-headline font-bold text-xl text-on-background">¥5,500</span>
                </div>
                <span className="bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary p-3 rounded-xl transition-colors duration-300">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
              </div>
            </div>
          </a>
          {/* Auction Card 4 */}
          <a aria-label="Xem chi tiết Nendoroid Power" className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 block" href="/auction-detail">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img alt="Miku bunny figure" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" data-alt="Bunny style anime figure on table with warm lights" src="/images/img2.jpeg" />
              <div className="absolute top-4 left-4 glass-card px-3 py-1.5 rounded-full flex items-center gap-2">
                <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="font-headline font-bold text-xs text-primary">TRỰC TIẾP</span>
              </div>
              <div className="absolute bottom-4 left-4 right-4 glass-card p-3 rounded-xl flex justify-between items-center border border-white/20">
                <span className="font-label text-[10px] uppercase font-bold text-on-surface-variant">Thời gian còn lại</span>
                <span className="font-headline font-bold text-on-background tabular-nums">12:10:44</span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="font-headline font-bold text-lg mb-1 group-hover:text-primary transition-colors">
                Nendoroid: Power (Chainsaw Man)
              </h3>
              <p className="font-label text-xs text-slate-500 mb-4 uppercase tracking-widest">
                Good Smile Company • Mới
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-label text-[10px] text-on-surface-variant uppercase">Giá hiện tại</span>
                  <span className="font-headline font-bold text-xl text-on-background">¥8,200</span>
                </div>
                <span className="bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary p-3 rounded-xl transition-colors duration-300">
                  <span className="material-symbols-outlined text-lg">gavel</span>
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>
      {/* Categories: Bento Grid Style */}
      <section className="max-w-[1440px] mx-auto px-8 mb-24">
        <h2 className="font-headline text-4xl font-bold tracking-tight text-on-background mb-12">
          Hệ sinh thái sưu tầm
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-6 h-[600px]">
          <div className="md:col-span-2 md:row-span-2 group relative overflow-hidden rounded-3xl bg-[#111c2c]">
            <img alt="Figure Category" className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000" data-alt="Cinematic wide shot of an impressive organized anime figure collection in a lit glass cabinet, glowing in blue and red tones" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDyI3KX_X7yof9d76I_QjMLYIgP6Co59jEVQu6qrmh4ewmZiRDEo2AWV-y88p6DVEBQWURC1McoPAMdIBDliKjdxXImZwSX1qif73wSmlBmdI-Ks7mROFA6DbbBsyRvXpvEWqy2tE9bx47rw4Yrpa7o15nkUw0SCXQiDes3lxnKQJVzCoho9FLXia5HBXqZSxB5oYNwTcYgMd5FFI3WuNQJR6bVg72t5WthAOzneySnQ-O7d6TyGgSvzsyfXUawNGW5Dy6-vZzWMCi9" />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10">
              <h3 className="font-headline text-6xl font-bold text-white tracking-tighter">
                Figure
              </h3>
              <p className="text-white/70 font-body text-xl max-w-sm mt-4">
                Từ statue tỉ lệ đến figma tạo dáng, tìm những điểm nhấn đắt giá
                cho bộ sưu tập của bạn.
              </p>
              <button className="mt-8 bg-white text-on-background px-8 py-3 rounded-full font-headline font-bold hover:bg-primary hover:text-on-primary transition-colors">
                Khám phá bộ sưu tập
              </button>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl bg-secondary">
            <img alt="Manga Category" className="w-full h-full object-cover opacity-40 group-hover:rotate-3 group-hover:scale-110 transition-transform duration-700" data-alt="Artistic stack of high quality manga books showing detailed black and white illustration pages fanned out" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCWncx-uFlv1GXZDdQehm7BWIgIc6sqBe6eIo0A3sjwsc3KeTAkfeFUfcWc2twJbyFU_veiALEXKbXNxEHG2A8pZ5Wjy2QkYP9aP89tq_AFImKjoxjnkLeQWcNLLwUP7XT-OheC-FHs27mvvoUy_mjkKPQGGHNYOS-jhakgicEev-mv8ifrMjx07whDnMnF_-wUhldjN1tobZkYTwVjKvbdZM_VILxZkdPygZ2cVKg23vP48441OKQHLGAiNIzU_Dq-ACVW5HhU8NMo" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-headline text-4xl font-bold text-white">
                  Manga
                </h3>
                <span className="inline-block mt-2 font-label text-xs uppercase tracking-widest text-white/80">Bản in đầu &amp; hộp sưu tập</span>
              </div>
            </div>
          </div>
          <div className="group relative overflow-hidden rounded-3xl bg-primary">
            <img alt="Merch Category" className="w-full h-full object-cover opacity-40 group-hover:-rotate-3 group-hover:scale-110 transition-transform duration-700" data-alt="Abstract dynamic composition of anime stickers, pins, and street-wear apparel with high-contrast graphic design" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDC1LeKcvwohMarkSYNaPiERStqs_3jGu8vIJj2CuLm58SWyZfEbjvvVYUvBmNLDcyF4N3exyNA2HJTuyGwWqLHp2BgW5tKMMsQ2HTuGrl7Klb7JujRzQwAkQ12KL5r7UyrbhFverR1zllNPx2ICOfFDqs7rxAiunSHkKOfEd7Bgf1ol35Nct7NCkidEwYi8YPYIRXJvs9j7WDK_i4_GUoVKmAiflwoKBzx9cHfVDNZSv5UPbdX4l2202AMNvLOQTX8LXMGO_UE1CHs" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <h3 className="font-headline text-4xl font-bold text-white">
                  Merch
                </h3>
                <span className="inline-block mt-2 font-label text-xs uppercase tracking-widest text-white/80">Thời trang &amp; vật phẩm hiếm</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Sắp kết thúc Carousel (Simulated) */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex items-center gap-4 mb-12">
            <span className="material-symbols-outlined text-primary text-4xl" style={{fontVariationSettings: '"FILL" 1'}}>timer</span>
            <h2 className="font-headline text-4xl font-bold tracking-tight text-on-background">
              Sắp kết thúc
            </h2>
          </div>
          <div className="flex gap-8 overflow-x-auto pb-8 no-scrollbar">
            {/* Item 1 */}
            <a aria-label="Xem chi tiết Evangelion Crystal" className="min-w-[400px] bg-surface-container-lowest rounded-3xl p-4 flex gap-6 hover:shadow-xl transition-all border border-transparent hover:border-outline-variant/20" href="/auction-detail">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img alt="Thumbnail 1" className="w-full h-full object-cover" data-alt="Macro photo of a detailed anime character eye and hair fragment showing exceptional paint quality" src="https://lh3.googleusercontent.com/aida-public/AB6AXuALKvExNdU3Hdbbggk-MYoRAjjTN0n8dxYNuXmUDIi1r2FgmPt7dRxlHs0xB7ATEy3XdHkqlG87ZUXmBMaNj460KNTdSLhhnbpoQCX4aosyuwgemvmBFyGKt94UoBBzDJCmsV5I5Ju0zddvP4RrJ_FZEwLJ3xST9Y3JCX50NdC4gFyduGO5UnDuBEfyvA50b0Yuj85o268kpQWjYz9taYyuuIVz1eJ5LsVARRAPrPyYpZO26-nOl_WVJvsy6q6qj66pdu3wfjMCvOnu" />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-headline font-bold text-lg leading-tight">
                    Neon Genesis Evangelion 01 Crystal
                  </h4>
                  <p className="text-primary font-headline font-bold text-sm mt-1 uppercase">
                    Còn lại 12p 4g
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-headline font-bold text-xl">¥145,000</span>
                  <span className="text-secondary font-headline font-bold text-sm uppercase">
                    Đặt nhanh
                  </span>
                </div>
              </div>
            </a>
            {/* Item 2 */}
            <a aria-label="Xem chi tiết Holographic Trading Card Set" className="min-w-[400px] bg-surface-container-lowest rounded-3xl p-4 flex gap-6 hover:shadow-xl transition-all border border-transparent hover:border-outline-variant/20" href="/auction-detail">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img alt="Thumbnail 2" className="w-full h-full object-cover" data-alt="A set of limited edition holographic anime trading cards showing intricate sparkling textures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDrOzob_NKYp5SHQ7UZHCjy6ISm-ENxUGSseVMPDbYVpjcsJA84jNN3z0ZDH90VTbtsFgT6_tZr00MBRU9X0KUzf4TTIIkz3lCBeb2LuG2Ds6FbXOM2SL8hY7CXeeSnWhnXhXrEg3H3WInMSZNsTK9rJoIyTd_OO-yM1l_RsfPju9p1EpZgZ5rS0QEB770G3OuvtsehhiuSThWJKBDBUWO0Xk-zn31c3-fz3_JUUF8qEpWibG65wjFqIj6TlDhPsEQqxtjv6uXx-zRj" />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-headline font-bold text-lg leading-tight">
                    Bộ thẻ giao dịch holographic hiếm
                  </h4>
                  <p className="text-primary font-headline font-bold text-sm mt-1 uppercase">
                    Còn lại 25p 18g
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-headline font-bold text-xl">¥32,000</span>
                  <span className="text-secondary font-headline font-bold text-sm uppercase">
                    Đặt nhanh
                  </span>
                </div>
              </div>
            </a>
            {/* Item 3 */}
            <a aria-label="Xem chi tiết Vinyl Art Toy" className="min-w-[400px] bg-surface-container-lowest rounded-3xl p-4 flex gap-6 hover:shadow-xl transition-all border border-transparent hover:border-outline-variant/20" href="/auction-detail">
              <div className="w-32 h-32 rounded-2xl overflow-hidden shrink-0">
                <img alt="Thumbnail 3" className="w-full h-full object-cover" data-alt="A designer vinyl toy figure with abstract urban patterns and high-gloss black finish" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCGkD3-3VGr0A2XMAD-5XxmtcNGcSr-OGDWz7ujfLbq6-3zTnDzTHQHR7A-SmDMB8pBqBW-8xO7_ZJACYwrfn7akhmgHhSdw79etaCd2D4wbN0fduxjGUAoIoaSDtsjHIfLab5uBp4MYM0Jni-dL3BYSJxRvn3JKB0-p7fSm1zqgDTpCsuShfHdC7Uq89wvA0u7ZtP7a4xFv_-cZB8R1gsxwiD8rIh17EoMeTlGa1FaVFwkgJs9ihGN_emIoolPvl3ZoRIXxTyVx38u" />
              </div>
              <div className="flex flex-col justify-between py-1">
                <div>
                  <h4 className="font-headline font-bold text-lg leading-tight">
                    Vinyl art toy phiên bản giới hạn
                  </h4>
                  <p className="text-primary font-headline font-bold text-sm mt-1 uppercase">
                    Còn lại 44p 50g
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="font-headline font-bold text-xl">¥54,500</span>
                  <span className="text-secondary font-headline font-bold text-sm uppercase">
                    Đặt nhanh
                  </span>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
