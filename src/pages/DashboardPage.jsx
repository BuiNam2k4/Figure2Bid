import { Link } from "react-router-dom";
import { APP_ROUTES } from "../utils/legacyRoutes";

const activeBids = [
  {
    id: "neo-kyoto",
    title: "Neo-Kyoto Prototype 01 (Artist Proof)",
    tag: "SCALE 1/4",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBUhiJylfKx4RBbfZbBmJ7p2Hq9r-RkK1oyF9tK0GyM17UbkxTG5LCG37WFG3ZwzDPwdAzn4tfclQMkY09a1F0pNr5avzXZlnbMOxRoK9Ru1X5S6nhd9-IsMyp9kp9tAlVigrBKRnTTJ-Z-AeIebQzEGKedDWTFJisvOwTiIy1y2X45PODPZcKlVqQdVwbkI4uxpIa1FkURS-ojU7nAB3_VvZHa8KPE_oCtPF5IbwCi5qcwR1WNUdv1Qtz-1-T7RJG5leOBhaNJ1ZYA",
    myBid: "¥145,000",
    status: "Đang dẫn",
    timer: "04:12:33 còn lại",
    isLeading: true,
  },
  {
    id: "ghost-shell",
    title: "Ghost Shell 1991 First Pressing Box Set",
    tag: "MINT",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuC6C80_xnA2Uhp2KBfn83RDGC2klyGuiESxATNFOtFT_u8uSrGRDx6kf4Q0QJiC2KwODqPGheU5HaKSDZ12A6Dyk39It_hlf5eHJh6ZaBPxImb-zwM6pcrvFwwFrJ8dXiTbfrczS_WpuVFM2puf-CBn5vdlzk3D30EjfsgK2xTqI_2cc9R3zhmXPUOPfX3HCiZxdpZwQH9JF5GPt9GHHRagws9wsP2J1yUcwUl44hMtMVKP0N_UX9H-iYFGKv5NufDjQOkyx3N_aAhY",
    myBid: "¥42,000",
    status: "Bị vượt giá",
    timer: "00:48:10 còn lại",
    isLeading: false,
  },
];

const activityFeed = [
  "Collector_X vừa vượt giá bạn ở Macross Valkyrie VF-1.",
  "Bộ mới của Hajime Sorayama sẽ mở sau 4 giờ theo sở thích của bạn.",
  "Đã xác nhận vận chuyển cho Cyberpunk Edgerunners Vinyl.",
];

const watchList = [
  "KAWS Companion - Grey Blush",
  "Odyssey Space Suit Replica 1/6",
  "Metal Build Freedom Gundam",
];

const myListings = [
  {
    name: "Ghibli Museum Exclusive Medal Set",
    price: "¥12,400",
    bidders: 18,
    left: "14h 22m",
    action: "Quản lý",
  },
  {
    name: "Neon Genesis OST (Limited Purple Vinyl)",
    price: "¥28,000",
    bidders: 4,
    left: "Đã hoàn tất",
    action: "Xem giao dịch",
  },
];

export default function DashboardPage() {
  return (
    <main className="pt-24 pb-12 max-w-[1440px] mx-auto px-8">
      <section className="mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-black text-on-background">
              Dashboard người dùng
            </h1>
            <p className="mt-2 text-on-surface-variant">
              Theo dõi phiên đấu giá, đơn hàng và danh sách quan tâm của bạn theo
              thời gian thực.
            </p>
          </div>
          <Link
            to={APP_ROUTES.explore}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-container"
          >
            Khám phá phiên mới
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-8 space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">gavel</span>
              Đang tham gia đấu giá
            </h2>
            <Link
              className="text-secondary text-sm font-label font-bold hover:underline"
              to={APP_ROUTES.auctionDetail}
            >
              Xem tất cả
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activeBids.map((bid) => (
              <article
                key={bid.id}
                className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm transition-transform hover:scale-[1.01]"
              >
                <div className="relative h-64">
                  <img className="w-full h-full object-cover" src={bid.image} alt={bid.title} />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-primary">
                    {bid.timer}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <h3 className="font-headline text-lg font-bold leading-tight">
                      {bid.title}
                    </h3>
                    <span className="rounded bg-surface-container px-2 py-1 text-[10px] font-bold text-on-surface-variant">
                      {bid.tag}
                    </span>
                  </div>
                  <div className="mt-4 flex items-end justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider text-on-surface-variant">
                        Giá của bạn
                      </p>
                      <p className="text-2xl font-headline font-bold">{bid.myBid}</p>
                    </div>
                    <p
                      className={`text-sm font-bold ${bid.isLeading ? "text-emerald-600" : "text-red-600"}`}
                    >
                      {bid.status}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <article className="rounded-2xl bg-surface-container-low p-6 md:p-8">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2 mb-5">
              <span className="material-symbols-outlined text-secondary">verified</span>
              Phiên đã thắng
            </h2>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-secondary font-bold">
                  Chờ thanh toán
                </p>
                <h3 className="mt-1 text-xl font-headline font-bold">
                  Heian Era Inspired Porcelain Figure
                </h3>
                <p className="text-sm text-on-surface-variant">
                  Phiên kết thúc 2 giờ trước • Đã xác thực bởi Figure2Bid Vault
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-headline font-black">¥18,500</p>
                <button
                  type="button"
                  className="mt-2 rounded-xl bg-secondary px-5 py-2.5 text-sm font-bold text-white hover:opacity-90"
                >
                  Thanh toán ngay
                </button>
              </div>
            </div>
          </article>
        </section>

        <aside className="md:col-span-4 space-y-7">
          <article className="bg-surface-container-highest/50 rounded-2xl p-6">
            <h3 className="font-headline text-xl font-bold mb-4">Bảng tin hoạt động</h3>
            <ul className="space-y-4 text-sm text-on-surface">
              {activityFeed.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl bg-surface-container-lowest p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-headline text-xl font-bold">Danh sách theo dõi</h3>
              <span className="rounded-full bg-surface-container px-2 py-1 text-xs font-bold">{watchList.length} mục</span>
            </div>
            <ul className="space-y-3">
              {watchList.map((item) => (
                <li key={item} className="rounded-lg border border-outline-variant/30 px-3 py-2 text-sm font-semibold">
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border-2 border-dashed border-outline-variant p-6 text-center">
            <h4 className="font-headline text-lg font-bold">Đăng một vật phẩm</h4>
            <p className="mt-2 text-sm text-on-surface-variant">
              Biến bộ sưu tập thành vốn với phí hoa hồng ưu đãi cho thành viên.
            </p>
            <Link
              to={APP_ROUTES.sell}
              className="mt-4 inline-flex rounded-lg bg-on-background px-4 py-2 text-sm font-bold text-white hover:bg-primary"
            >
              Bắt đầu đăng bán
            </Link>
          </article>
        </aside>
      </div>

      <section className="mt-14">
        <h2 className="font-headline text-2xl font-bold mb-6">Danh sách đang đăng bán</h2>
        <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-surface-container text-left text-[11px] uppercase tracking-widest text-on-surface-variant">
                <th className="px-6 py-4">Vật phẩm</th>
                <th className="px-6 py-4">Giá hiện tại</th>
                <th className="px-6 py-4">Người đấu</th>
                <th className="px-6 py-4">Thời gian</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {myListings.map((item) => (
                <tr key={item.name} className="border-b border-surface-container last:border-0">
                  <td className="px-6 py-4 font-semibold text-on-background">{item.name}</td>
                  <td className="px-6 py-4 font-headline font-bold">{item.price}</td>
                  <td className="px-6 py-4">{item.bidders}</td>
                  <td className="px-6 py-4">{item.left}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="text-secondary text-xs font-bold uppercase tracking-wide hover:underline">
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
