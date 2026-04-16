export default function DashboardPage() {
  return (
    <main className="pt-24 pb-12 max-w-[1440px] mx-auto px-8">
      {/* Header & Profile Quick Look */}
      {/* Bento Grid Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Đang tham gia đấu giá Section */}
        <section className="md:col-span-8 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gavel</span>
              Đang tham gia đấu giá
            </h2>
            <a className="text-secondary text-sm font-label font-bold hover:underline" href="#">Xem tất cả</a>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Bidding Card 1 */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm transition-transform hover:scale-[1.01]">
              <div className="relative h-64">
                <img className="w-full h-full object-cover" data-alt="ultra-detailed high-end anime collectible figure of a futuristic samurai with neon lighting and intricate mechanical details" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBUhiJylfKx4RBbfZbBmJ7p2Hq9r-RkK1oyF9tK0GyM17UbkxTG5LCG37WFG3ZwzDPwdAzn4tfclQMkY09a1F0pNr5avzXZlnbMOxRoK9Ru1X5S6nhd9-IsMyp9kp9tAlVigrBKRnTTJ-Z-AeIebQzEGKedDWTFJisvOwTiIy1y2X45PODPZcKlVqQdVwbkI4uxpIa1FkURS-ojU7nAB3_VvZHa8KPE_oCtPF5IbwCi5qcwR1WNUdv1Qtz-1-T7RJG5leOBhaNJ1ZYA" />
                <div className="absolute top-4 left-4 glass-panel px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span className="text-xs font-bold text-primary font-headline">04:12:33 CÒN LẠI</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    Neo-Kyoto Prototype 01 (Artist Proof)
                  </h3>
                  <div className="bg-surface-container px-2 py-1 rounded text-[10px] font-label font-bold text-on-surface-variant">
                    SCALE 1/4
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Giá của bạn</span>
                    <span className="text-2xl font-headline font-bold text-on-background">¥145,000</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Trạng thái</span>
                    <span className="text-sm font-bold text-green-600 flex items-center gap-1">Đang dẫn
                      <span className="material-symbols-outlined text-sm">trending_up</span></span>
                  </div>
                </div>
              </div>
            </div>
            {/* Bidding Card 2 (Outbid) */}
            <div className="bg-surface-container-lowest rounded-xl overflow-hidden group shadow-sm transition-transform hover:scale-[1.01]">
              <div className="relative h-64">
                <img className="w-full h-full object-cover grayscale-[0.5]" data-alt="rare manga collection volumes from the 90s in pristine condition displayed on a dark premium velvet surface with soft studio lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6C80_xnA2Uhp2KBfn83RDGC2klyGuiESxATNFOtFT_u8uSrGRDx6kf4Q0QJiC2KwODqPGheU5HaKSDZ12A6Dyk39It_hlf5eHJh6ZaBPxImb-zwM6pcrvFwwFrJ8dXiTbfrczS_WpuVFM2puf-CBn5vdlzk3D30EjfsgK2xTqI_2cc9R3zhmXPUOPfX3HCiZxdpZwQH9JF5GPt9GHHRagws9wsP2J1yUcwUl44hMtMVKP0N_UX9H-iYFGKv5NufDjQOkyx3N_aAhY" />
                <div className="absolute top-4 left-4 bg-error-container text-on-error-container px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm">warning</span>
                  <span className="text-xs font-bold font-headline">BỊ VƯỢT GIÁ</span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-headline text-lg font-bold leading-tight group-hover:text-primary transition-colors">
                    Ghost Shell 1991 First Pressing Box Set
                  </h3>
                  <div className="bg-surface-container px-2 py-1 rounded text-[10px] font-label font-bold text-on-surface-variant">
                    MINT
                  </div>
                </div>
                <div className="flex items-end justify-between">
                  <div>
                    <span className="block text-[10px] font-label uppercase text-on-surface-variant tracking-wider">Giá cao nhất</span>
                    <span className="text-2xl font-headline font-bold text-primary">¥42,000</span>
                  </div>
                  <button className="bg-on-background text-white font-headline text-sm font-bold px-4 py-2 rounded-lg hover:bg-primary transition-colors scale-100 active:scale-95">
                    RA GIÁ LẠI
                  </button>
                </div>
              </div>
            </div>
          </div>
          {/* Phiên đã thắng (Horizontal Scroll or Grid) */}
          <div className="pt-8">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2 mb-6">
              <span className="material-symbols-outlined text-secondary">verified</span>
              Phiên đã thắng
            </h2>
            <div className="bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row items-center gap-6">
              <div className="w-32 h-32 flex-shrink-0">
                <img className="w-full h-full object-cover rounded-xl shadow-lg" data-alt="minimalist photography of a premium hand-painted ceramic bowl with traditional Japanese art patterns soft depth of field" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAliJMqxP0Yr4AoxgF-4J4_KGPZB1Hcsu4LCk7W2agdta1iXWLWnOL5heeCb6gbSD-Gt_Jy1tUsFv0dbsufyiG2useWe3Nu7_vr3h94ZZpSB9j7TvTykEtiZuttMfE1OEXnW66Ee45m7F_mn6hHtSlEGlQQs2X1xFG9A8fOtPa8gwxIQfnZPB38JSXYx345Kz6dW5nW7nu45LWbh5i5HrSTlqUEWM6yQIBsMq_h7yhI8bgZ_rxRcisz1yyschNPLK-xLHBnCGOTMKsz" />
              </div>
              <div className="flex-grow">
                <div className="text-xs font-bold text-secondary uppercase font-headline tracking-tighter mb-1">
                  CHỜ THANH TOÁN
                </div>
                <h3 className="font-headline text-xl font-bold">
                  Heian Era Inspired Porcelain Figure
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Phiên kết thúc 2 giờ trước • Đã xác thực bởi Figure2Bid Vault
                </p>
              </div>
              <div className="flex-shrink-0 flex flex-col items-end gap-2">
                <div className="text-2xl font-headline font-extrabold">¥18,500</div>
                <button className="bg-secondary text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-secondary/20 transition-all">
                  THANH TOÁN NGAY
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Sidebar: Bảng tin hoạt động & Danh sách theo dõi */}
        <aside className="md:col-span-4 space-y-8">
          {/* Bảng tin hoạt động */}
          <div className="bg-surface-container-highest/50 rounded-2xl p-6">
            <h3 className="font-headline text-xl font-bold mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined">bolt</span>
              Bảng tin hoạt động
            </h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                <div>
                  <p className="text-sm font-body leading-snug">
                    <span className="font-bold">Collector_X</span> vừa vượt giá bạn
                    ở <span className="font-bold">Macross Valkyrie VF-1</span>.
                  </p>
                  <span className="text-[10px] font-label text-on-surface-variant">2 PHÚT TRƯỚC</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-secondary mt-2" />
                <div>
                  <p className="text-sm font-body leading-snug">
                    Bộ mới của <span className="font-bold">Hajime Sorayama</span>
                    sẽ mở sau 4 giờ theo sở thích của bạn.
                  </p>
                  <span className="text-[10px] font-label text-on-surface-variant">15 PHÚT TRƯỚC</span>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-green-500 mt-2" />
                <div>
                  <p className="text-sm font-body leading-snug">
                    Đã xác nhận vận chuyển cho
                    <span className="font-bold">Cyberpunk Edgerunners Vinyl</span>.
                  </p>
                  <span className="text-[10px] font-label text-on-surface-variant">1 GIỜ TRƯỚC</span>
                </div>
              </div>
            </div>
          </div>
          {/* Danh sách theo dõi */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline text-xl font-bold">
                Danh sách theo dõi
              </h3>
              <span className="text-xs bg-surface-container px-2 py-1 rounded-full font-bold">12 MỤC</span>
            </div>
            <div className="space-y-4">
              {/* Danh sách theo dõi Item */}
              <div className="group flex items-center gap-4 p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="macro photography of a designer vinyl toy with vibrant colors and smooth textures aesthetic desk ornament" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC5FvqJJKq-48m03Rr5U7JXnlKYMckpkUcRWCCmVNvEwDm2v4dgSNtG-SSIAKE9IHom9Ywg1w8yIvYuKm2_k8CAnVwDoyrkJwox99efleay3cYAu_2ODF0YKI9trHoqqSb7JKpNNvgImPwwhNr4OqhXkw6XK_kxGTg8NpgHyc56b6QCOFPBrd31X2v9AQ9zNw2hF_4vQjWwd2SQhWQlj5_Cl5yTq-JeJ1QxpUt232_Bohts1kdi_j3zHfMpm4lbVgDsCry2qe7W60BO" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold font-headline line-clamp-1">
                    KAWS Companion - Grey Blush
                  </h4>
                  <div className="text-xs text-on-surface-variant">
                    Khởi điểm ¥65,000
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">chevron_right</span>
              </div>
              {/* Danh sách theo dõi Item */}
              <div className="group flex items-center gap-4 p-2 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <img className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" data-alt="professional photo of an astronaut helmet figurine on a reflective black base cinematic lighting" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCoEql6Y3Z4lmiSagCoCZndJjsPzwVpBbp1SxtD9doyu-dRGv2odztKWaib-tWUYo8Rc8oRTcVVKpFGP0BxL2BpfPPi5lW1V__BiGB23vJIP7OWTufnF3SqVJVSZbKy-oydpciHEBQtG3l1w7nkvRi19DYYeN63VRhzHoEzh6KWMTtWHGUOR_gn9Gf3Ay_gfUsAXefi8Nt4MA3P61XpiE39WYPgwQvB-qTpBGJRN89rlJyTTfllnKsM0LAjD2hYWb03a3fxO8nzyyQH" />
                </div>
                <div className="flex-grow">
                  <h4 className="text-sm font-bold font-headline line-clamp-1">
                    Odyssey Space Suit Replica 1/6
                  </h4>
                  <div className="text-xs text-on-surface-variant">
                    Còn lại 2d 5h
                  </div>
                </div>
                <span className="material-symbols-outlined text-on-surface-variant group-hover:text-primary">chevron_right</span>
              </div>
            </div>
          </div>
          {/* Hành động quản lý tài khoản */}
          <div className="p-6 border-2 border-dashed border-outline-variant rounded-2xl flex flex-col items-center text-center gap-4">
            <div className="w-12 h-12 bg-surface-container-low rounded-full flex items-center justify-center">
              <span className="material-symbols-outlined text-on-surface-variant">add_circle</span>
            </div>
            <div>
              <h4 className="font-headline font-bold">Đăng một vật phẩm</h4>
              <p className="text-xs text-on-surface-variant">
                Biến bộ sưu tập thành vốn. Phí hoa hồng thấp 5% cho thành viên
                Diamond.
              </p>
            </div>
            <button className="w-full py-2 bg-surface-container-high text-on-surface font-bold rounded-lg hover:bg-on-background hover:text-white transition-all text-sm uppercase tracking-wider">
              Bắt đầu đăng bán
            </button>
          </div>
        </aside>
      </div>
      {/* My Listings Section (Table-like, but cleaner) */}
      <section className="mt-16">
        <h2 className="font-headline text-2xl font-bold mb-8">
          Danh sách đang đăng bán
        </h2>
        <div className="overflow-hidden bg-surface-container-lowest rounded-2xl shadow-sm">
          <div className="grid grid-cols-6 gap-4 p-6 border-b border-surface-container text-[10px] font-label uppercase tracking-widest text-on-surface-variant font-bold">
            <div className="col-span-2">Chi tiết vật phẩm</div>
            <div className="text-center">Giá hiện tại</div>
            <div className="text-center">Người đấu</div>
            <div className="text-center">Thời gian còn lại</div>
            <div className="text-right">Thao tác</div>
          </div>
          {/* Listing Row */}
          <div className="grid grid-cols-6 items-center gap-4 p-6 hover:bg-surface-container-low transition-colors">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-12 h-12 bg-surface rounded overflow-hidden">
                <img className="w-full h-full object-cover" data-alt="professional photography of a rare silver coin collection with engraved historical figures" src="https://lh3.googleusercontent.com/aida-public/AB6AXuB3KZ6xm8A33V2MFRiEzPx9UEUoM8eY7aXR-ACnZkF5vi3bVpnTk7cwvbwPprT74SWbeu0fZX8JK03v9FHrAgiU8exok5oZ29HEilmc8n5x1UPGeepc7nrEmrB5IOAh5GuNhzg2qXrk_KCxWmqENEgPVBEOFddEAejdAEmQxjXCrfMpRYKYxqF84IQb8kZ05NiVSN57cfac2IA522rR0DGKVBzQLG0jE56Wq-fygj6YD7okA2XOP6qxGr0YqYhpk1Sa6appIInIC62N" />
              </div>
              <div className="font-bold text-sm">
                Ghibli Museum Exclusive Medal Set
              </div>
            </div>
            <div className="text-center font-headline font-bold">¥12,400</div>
            <div className="text-center font-label text-sm">18</div>
            <div className="text-center font-label text-sm text-primary font-bold">
              14h 22m
            </div>
            <div className="text-right">
              <button className="text-secondary font-bold text-xs uppercase tracking-tighter hover:underline">
                Quản lý
              </button>
            </div>
          </div>
          {/* Listing Row */}
          <div className="grid grid-cols-6 items-center gap-4 p-6 hover:bg-surface-container-low transition-colors">
            <div className="col-span-2 flex items-center gap-4">
              <div className="w-12 h-12 bg-surface rounded overflow-hidden">
                <img className="w-full h-full object-cover" data-alt="stack of vintage vinyl records showing the spines with colorful art and typography" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCVVDxJMEMey8Xj01P9tkBHfNmH1_J6NmWSdj_9Ci9lBdoH55CZBubuZtBbfPVYWUmkB4n4zpwHHHBZY7B7JXumY3CBTFKd39QDv5k4bbVJLFAZUkdd9S_oN8gcXRpx2nReopg-SiOcz7BPdtalyX43vKUDjiZLnVYC2XyYqQ1g4CXQfJZm8u__eg0cqfrpf1qarVPmUiGoWzrmMqoPpX7iV0VGyz_XBbtGjBIVMy5cI8plil1YLQJ8b-_wNNNDbX83KXtkFi1BO1xX" />
              </div>
              <div className="font-bold text-sm">
                Neon Genesis OST (Limited Purple Vinyl)
              </div>
            </div>
            <div className="text-center font-headline font-bold">¥28,000</div>
            <div className="text-center font-label text-sm">4</div>
            <div className="text-center font-label text-sm text-on-surface-variant">
              Đã hoàn tất
            </div>
            <div className="text-right">
              <button className="text-secondary font-bold text-xs uppercase tracking-tighter hover:underline">
                Xem giao dịch
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
