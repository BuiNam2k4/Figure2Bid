export default function AuctionDetailPage() {
  return (
    <main className="pt-28 pb-20 px-6 max-w-[1440px] mx-auto">
      {/* Breadcrumbs */}
      <nav className="hidden md:flex gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant mb-8">
        <a className="hover:text-primary" href="#">Kho lưu trữ</a>
        <span>/</span>
        <a className="hover:text-primary" href="#">Metal Build</a>
        <span>/</span>
        <span className="text-on-surface">EVA-01 TEST TYPE</span>
      </nav>
      {/* Product Grid: Asymmetric Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Gallery & Narrative */}
        <div className="lg:col-span-7 space-y-12">
          <div className="relative group">
            <div className="aspect-[4/5] bg-surface-container overflow-hidden rounded-xl">
              <img alt="Evangelion Unit 01 Metal Build Figure" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close up high-end studio shot of a purple mechanical evangelion unit-01 action figure with glowing green details and sharp metallic armor plates" src="/images/img3.jpg" />
            </div>
            {/* Auction Countdown Overlay */}
            <div className="absolute top-6 left-6 glass-panel px-6 py-3 rounded-full flex items-center gap-3">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
              </span>
              <span className="font-headline font-bold text-primary text-xl tracking-tight">04h : 22m : 15s</span>
            </div>
          </div>
          {/* Secondary Thumbnails */}
          <div className="grid grid-cols-4 gap-4">
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
              <img alt="Thumbnail 1" className="w-full h-full object-cover" data-alt="Side profile detail of mecha model head with intricate mechanical eye design and metallic purple finish" src="/images/img3.jpg" />
            </div>
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
              <img alt="Thumbnail 2" className="w-full h-full object-cover" data-alt="Mechanical action figure hand holding a long crimson spear with complex industrial texture" src="/images/img3.jpg" />
            </div>
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all">
              <img alt="Thumbnail 3" className="w-full h-full object-cover" data-alt="Macro shot of model joint system showing internal metal gears and hydraulic pistons" src="/images/img3.jpg" />
            </div>
            <div className="aspect-square bg-surface-container rounded-lg overflow-hidden cursor-pointer hover:ring-2 ring-primary transition-all flex items-center justify-center bg-surface-container-highest">
              <span className="text-secondary font-headline font-bold">+12</span>
            </div>
          </div>
          {/* Storytelling Description */}
          <article className="space-y-6 pt-6">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-on-background">
              Di vật của Tokyo-3
            </h2>
            <div className="space-y-4 text-on-surface-variant leading-relaxed text-lg font-light">
              <p>
                Đây không chỉ là một figure, mà còn là một kỳ công cơ khí. Metal
                Build Evangelion Unit-01 (Test Type) tái hiện sự kết hợp giữa cơ
                sinh học và thép cứng đặc trưng của nguyên tác. Mỗi khớp đều
                được tinh chỉnh để thể hiện dáng động tối đa vượt xa chuẩn nhựa
                truyền thống.
              </p>
              <p>
                Phiên bản "Steel Giant" do Ikuto Yamashita thiết kế mang đến
                ngôn ngữ thị giác mới: lộ kết cấu bên trong, giáp die-cast có
                chiều sâu và lớp tím ánh kim đổi sắc dưới ánh đèn chiếu trực
                tiếp.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-surface-container">
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">
                  Thông số
                </p>
                <ul className="text-sm space-y-2 text-on-surface">
                  <li className="flex justify-between">
                    <span>Tỉ lệ</span>
                    <span className="font-bold">Không theo tỉ lệ (220mm)</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Chất liệu</span>
                    <span className="font-bold">Die-cast, ABS, PVC</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Dòng series</span>
                    <span className="font-bold">Neon Genesis Evangelion</span>
                  </li>
                </ul>
              </div>
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-secondary font-bold mb-1">
                  Tình trạng
                </p>
                <ul className="text-sm space-y-2 text-on-surface">
                  <li className="flex justify-between">
                    <span>Hộp</span>
                    <span className="font-bold">Mới nguyên seal</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Số lượng</span>
                    <span className="font-bold">Độc bản</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Phát hành</span>
                    <span className="font-bold">2022 Tamashii Exclusive</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>
        </div>
        {/* Right: Bidding Panel */}
        <aside className="lg:col-span-5">
          <div className="sticky top-32 space-y-8">
            {/* Title & Brand */}
            <div>
              <h1 className="font-headline text-5xl font-bold tracking-tighter leading-none mb-2">
                EVANGELION UNIT-01
              </h1>
              <p className="text-xl text-primary font-headline font-medium">
                METAL BUILD [TEST TYPE] 2022 REVIVAL
              </p>
            </div>
            {/* Bidding Card */}
            <div className="bg-surface-container-lowest p-8 rounded-xl shadow-[0_40px_80px_rgba(17,28,44,0.08)] border border-surface-container-high">
              <div className="flex justify-between items-end mb-8">
                <div>
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                    Giá hiện tại
                  </p>
                  <p className="font-headline text-4xl font-bold text-on-background">
                    ¥ 145,000
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                    Lượt đấu
                  </p>
                  <p className="font-headline text-2xl font-medium text-secondary">
                    24
                  </p>
                </div>
              </div>
              {/* Bid Input Area */}
              <div className="space-y-4">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant font-headline">¥</span>
                  <input className="w-full bg-surface-container-high border-none rounded-lg py-4 pl-10 pr-4 focus:ring-2 focus:ring-secondary font-headline text-xl font-bold" type="number" defaultValue={146000} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 px-4 bg-surface-container text-secondary font-label font-bold rounded-lg hover:bg-secondary-container hover:text-white transition-all">
                    + 1,000
                  </button>
                  <button className="py-3 px-4 bg-surface-container text-secondary font-label font-bold rounded-lg hover:bg-secondary-container hover:text-white transition-all">
                    + 5,000
                  </button>
                </div>
                <button className="w-full bg-gradient-to-br from-primary to-primary-container text-white py-5 rounded-lg font-headline font-bold text-xl tracking-wide uppercase shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all">
                  Đặt giá cao nhất
                </button>
              </div>
              {/* Trust Badges */}
              <div className="mt-8 pt-8 border-t border-surface-container flex justify-between">
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '"FILL" 1'}}>verified</span>
                  <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase">Chính hãng</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '"FILL" 1'}}>local_shipping</span>
                  <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase">Bảo hiểm</span>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <span className="material-symbols-outlined text-secondary" style={{fontVariationSettings: '"FILL" 1'}}>security</span>
                  <span className="text-[10px] font-label font-bold text-on-surface-variant uppercase">Lưu kho</span>
                </div>
              </div>
            </div>
            {/* Bid History */}
            <div className="space-y-4">
              <h3 className="font-headline font-bold text-lg flex items-center gap-2">
                <span className="material-symbols-outlined text-sm">history</span>
                Hoạt động đấu giá trực tiếp
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-surface-container-low rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                      <img alt="User" data-alt="Portrait of a young man with glasses, professional avatar style" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdNX5WXFdKSZq92YNe1HDEGJ5D3V01t6lPEFKGo3IC2zLV5l4EOQUavGVe7q-Fjxr2h26taQPIB9jHdQ3VFnrvM10aOHvyp0K9L0ds-0zUhtrqwam8HZ4cDEHJg41prOCyMDrhDM0jWWRPmsl1LvuRsE1I9jOajSrduv9PJBHx6hORPfgUDCRZqmthJiMrxSKxhKqV_s311aK6DjEscIikmolOiEaj_frf_foIiDGiMi3OC8M2j2xVlvbkTAwGyi4p3u2cgclh_Gde" />
                    </div>
                    <span className="font-label text-sm font-bold">Collector_09</span>
                  </div>
                  <span className="font-headline text-sm font-bold">¥ 145,000</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-transparent rounded-lg border border-surface-container opacity-60">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                      <img alt="User" data-alt="Portrait of a woman with smiling expression, studio lighting avatar" src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2Gw67mrbu3sLX-JPrAagFUKo7ye1gdWUpKiIbaY36Myfov2DP7Qno7mTU5XBGXvNRaa9dpvziqpNxdEkoes-cA9xArOIiy4iy95f99X_rIExv_IKMHp_4F17HTzT8x2zy-YbpsrQD7b-6-tIL4G8-evX53QIr2L2Q1t2iTMgGXJLFEbOx22NGz4JGx0RIsa6AvQOZ7EyTCy0GGJvIVm3vHfdHBn4vgVs-bs7UTczCR5p5fxjNECY_vE0dD9BydMBzv7yXEYdqgz4d" />
                    </div>
                    <span className="font-label text-sm font-bold">Shinji_Stans</span>
                  </div>
                  <span className="font-headline text-sm font-bold">¥ 144,000</span>
                </div>
                <div className="flex items-center justify-between p-4 bg-transparent rounded-lg border border-surface-container opacity-40">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-surface-container-highest flex items-center justify-center overflow-hidden">
                      <img alt="User" data-alt="Portrait of a man with a beard and minimalist style, high key background" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYc1KcmKQ0eoDel9J1gXzOIsbFmbFPoqEnzwgk8q4PoGQAM6mfC9RUeHGYnUAMNNYKOniUagBn_h0i9A3JO87d6awIlPp9wWkG1f3R53gVDsulJEeD4ELZ22YRU-0O0VqDCJGGquYDbhsXL-dV-8ykJU1BbpnTFMLadFKiySIEU_pu5-kRkx0AYuyRcIBAbSgf-_toD0y7VQ-gc7IspSJpStnlFDnnyW3NnwefPdMjlY8GxT-RXt4-pKFFx5KIGP47xstHilmJwhWa" />
                    </div>
                    <span className="font-label text-sm font-bold">LCL_Drinker</span>
                  </div>
                  <span className="font-headline text-sm font-bold">¥ 140,500</span>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
      {/* Seller Profile Section */}
      <section className="mt-24 p-12 bg-surface-container-low rounded-3xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-2xl bg-white p-4 shadow-sm">
              <img alt="Logo người bán" className="w-full h-full object-contain" data-alt="Stylized futuristic logo of a mecha head in navy blue and silver" src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-KlVc-SNyoxl6RDTPHTtiIpzdJ58D3r1IkzKyRWSsIqZSo3f7O02IQ5GDbjf1CErzu1zFKIxMSAedoVjB4ETG3Z_Zd5zEyRYkvsGu5yabirgAT9VlNVK4zEv9C3ZUf-OS7P2seUisrsQWlOWurAdS-ChZy4njikauGKqMw172l8ByCGlYFLWKAQQUaPMaaK2ATUgcoaWmMQEb1HnOwErKgu0HSbYm-dEmX5mnnh_c2ZU8m_YpF_Ry3TSSSOXuUaYyHPNdJ8jOO9Tz" />
            </div>
            <div>
              <h4 className="font-headline text-2xl font-bold">
                Akihabara Premium Vault
              </h4>
              <div className="flex items-center gap-2 text-primary">
                <span className="material-symbols-outlined text-sm" style={{fontVariationSettings: '"FILL" 1'}}>star</span>
                <span className="font-label font-bold">4.99 (2,400+ lượt bán)</span>
              </div>
            </div>
          </div>
          <p className="text-on-surface-variant font-light text-lg">
            Chuyên về figure diecast cao cấp và vật phẩm anime chuẩn trưng bày
            từ năm 2012. Mỗi sản phẩm đều qua quy trình kiểm định 15 bước trước
            khi đăng bán.
          </p>
        </div>
        <div className="flex justify-end gap-4">
          <button className="px-8 py-4 bg-surface-container-highest text-on-surface font-headline font-bold rounded-xl hover:bg-surface-container-high transition-colors">
            Xem gian hàng
          </button>
          <button className="px-8 py-4 border-2 border-secondary text-secondary font-headline font-bold rounded-xl hover:bg-secondary hover:text-white transition-all">
            Liên hệ người bán
          </button>
        </div>
      </section>
    </main>
  );
}
