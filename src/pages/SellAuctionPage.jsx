export default function SellAuctionPage() {
  return (
    <main className="pt-24 pb-16 px-6 md:px-8">
      <section className="max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-on-background via-[#1d2a3f] to-[#2f4261] p-8 md:p-12 text-white">
          <img alt="Nền trang đăng bán" className="absolute inset-0 w-full h-full object-cover opacity-25" src="/images/hero.webp" />
          <div className="relative z-10 max-w-3xl space-y-4">
            <p className="inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] font-bold bg-white/15">
              Seller Studio
            </p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Đăng bán sản phẩm
              <span className="text-primary-fixed">đấu giá trực tiếp</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
              Tạo phiên đấu giá mới chỉ trong vài phút. Điền thông tin sản phẩm,
              thiết lập giá và thời gian kết thúc để bắt đầu thu hút người mua.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="space-y-4">
          <article className="rounded-2xl bg-surface-container p-6">
            <h2 className="font-headline text-2xl font-bold mb-4">
              Checklist trước khi đăng
            </h2>
            <ul className="space-y-3 text-on-surface-variant text-sm leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                Chuẩn bị ảnh rõ 3 góc: trước, sau, chi tiết seal.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                Mô tả đầy đủ tình trạng box, phụ kiện và lỗi ngoại quan.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base">check_circle</span>
                Đặt giá khởi điểm hợp lý để tăng tương tác phiên đấu giá.
              </li>
            </ul>
          </article>
          <article className="rounded-2xl bg-on-background text-white p-6">
            <h3 className="font-headline text-xl font-bold mb-3">Phí dịch vụ</h3>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              Nền tảng thu phí 5% trên giá chốt. Nếu sản phẩm không bán được,
              bạn sẽ không bị tính phí.
            </p>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                Ví dụ
              </p>
              <p className="font-bold">
                Giá chốt 3.000.000đ -&gt; Bạn nhận 2.850.000đ
              </p>
            </div>
          </article>
          <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6">
            <h3 className="font-headline text-xl font-bold mb-3">
              Thời gian duyệt
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed">
              Bài đăng mới được kiểm duyệt trong vòng 30-90 phút để xác minh nội
              dung và chống hàng giả trước khi mở phiên.
            </p>
          </article>
        </aside>
        <section className="lg:col-span-2 rounded-2xl bg-surface-container-low p-6 md:p-8">
          <form className="space-y-8" action="#" method="post">
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-2">
                Thông tin sản phẩm
              </h2>
              <p className="text-on-surface-variant text-sm">
                Các trường có dấu * là bắt buộc.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-2" htmlFor="item-name">Tên sản phẩm *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="item-name" name="item-name" placeholder="VD: Figure Asuka Langley - Evangelion 1/7" required type="text" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="series">Series / Nhân vật *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="series" name="series" placeholder="VD: Evangelion" required type="text" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="category">Danh mục *</label>
                <select className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="category" name="category" required>
                  <option value>Chọn danh mục</option>
                  <option>Figure tỉ lệ</option>
                  <option>Nendoroid</option>
                  <option>Figure hành động</option>
                  <option>Tượng resin</option>
                  <option>Manga Bản Giới Hạn</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="condition">Tình trạng *</label>
                <select className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="condition" name="condition" required>
                  <option value>Chọn tình trạng</option>
                  <option>Mới/Nguyên seal</option>
                  <option>Như mới</option>
                  <option>Đã qua sử dụng - Tốt</option>
                  <option>Đã qua sử dụng - Có lỗi nhẹ</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="start-price">Giá khởi điểm (VND) *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="start-price" min={1000} name="start-price" placeholder="VD: 1000000" required type="number" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="step-price">Bước giá tối thiểu (VND) *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="step-price" min={1000} name="step-price" placeholder="VD: 50000" required type="number" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="buyout-price">Giá mua ngay (VND)</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="buyout-price" min={0} name="buyout-price" placeholder="Không bắt buộc" type="number" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="auction-start">Thời gian bắt đầu *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="auction-start" name="auction-start" required type="datetime-local" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="auction-end">Thời gian kết thúc *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="auction-end" name="auction-end" required type="datetime-local" />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-2" htmlFor="location">Khu vực gửi hàng *</label>
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="location" name="location" placeholder="VD: TP. Hồ Chí Minh" required type="text" />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-bold">
                Hình ảnh sản phẩm
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" name="image-url-1" placeholder="URL ảnh 1 *" required type="url" />
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" name="image-url-2" placeholder="URL ảnh 2" type="url" />
                <input className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" name="image-url-3" placeholder="URL ảnh 3" type="url" />
              </div>
              <p className="text-xs text-on-surface-variant">
                Gợi ý: dùng ảnh tỉ lệ 4:5 hoặc 1:1, dung lượng tối ưu dưới 2MB.
              </p>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="description">Mô tả chi tiết *</label>
              <textarea className="w-full min-h-[160px] rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3" id="description" name="description" placeholder="Mô tả tình trạng sản phẩm, phụ kiện đi kèm, nguồn gốc và các lưu ý khác..." required defaultValue={""} />
            </div>
            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-on-surface-variant">
                <input className="mt-1 rounded border-outline-variant/50" required type="checkbox" />
                Tôi cam kết sản phẩm đăng bán là hàng chính hãng và chịu trách
                nhiệm về tính xác thực của thông tin.
              </label>
              <label className="flex items-start gap-3 text-sm text-on-surface-variant">
                <input className="mt-1 rounded border-outline-variant/50" required type="checkbox" />
                Tôi đồng ý với điều khoản đấu giá, phí dịch vụ và quy trình xử
                lý tranh chấp của nền tảng.
              </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button className="px-6 py-3 rounded-lg bg-primary text-white font-headline font-bold text-lg hover:bg-primary-container transition-colors" type="submit">
                Đăng phiên đấu giá
              </button>
              <a className="px-6 py-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-semibold hover:bg-surface-container transition-colors text-center" href="/dashboard">
                Lưu nháp trong bảng điều khiển
              </a>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
