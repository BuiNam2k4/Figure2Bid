import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import {
  deleteAuction,
  listMyAuctions,
  updateAuction,
} from "../services/auctionService";
import { APP_ROUTES } from "../utils/legacyRoutes";

const LISTING_PAGE_SIZE = 50;

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

function normalizeStatus(status) {
  return String(status || "")
    .trim()
    .toUpperCase();
}

function getAuctionStatusBadgeClass(status) {
  const normalizedStatus = normalizeStatus(status);

  if (normalizedStatus === "ACTIVE") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (normalizedStatus === "SCHEDULED") {
    return "bg-amber-100 text-amber-700";
  }

  if (normalizedStatus === "ENDED") {
    return "bg-slate-200 text-slate-700";
  }

  if (normalizedStatus === "CANCELLED") {
    return "bg-rose-100 text-rose-700";
  }

  return "bg-surface-container-high text-on-surface-variant";
}

function formatPrice(value) {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function formatDateTime(isoValue) {
  if (!isoValue) {
    return "Khong ro";
  }

  const parsedDate = new Date(isoValue);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Khong ro";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function toDateTimeLocalValue(dateValue) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return "";
  }

  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - timezoneOffsetMinutes * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function normalizePageResponse(responseData) {
  return {
    content: Array.isArray(responseData?.content) ? responseData.content : [],
    number: typeof responseData?.number === "number" ? responseData.number : 0,
    totalPages:
      typeof responseData?.totalPages === "number"
        ? responseData.totalPages
        : 0,
    totalElements:
      typeof responseData?.totalElements === "number"
        ? responseData.totalElements
        : 0,
  };
}

function getAuctionTimeLabel(auction) {
  const status = normalizeStatus(auction?.status);

  if (status === "ENDED") {
    return "Da hoan tat";
  }

  if (status === "CANCELLED") {
    return "Da huy";
  }

  const startDate = new Date(auction?.startTime);
  const endDate = new Date(auction?.endTime);

  if (status === "SCHEDULED") {
    return `Bat dau ${formatDateTime(startDate)}`;
  }

  if (status !== "ACTIVE" || Number.isNaN(endDate.getTime())) {
    return "Khong ro";
  }

  const diffMs = endDate.getTime() - Date.now();
  if (diffMs <= 0) {
    return "Sap ket thuc";
  }

  const totalMinutes = Math.floor(diffMs / 60_000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h`;
  }

  return `${hours}h ${minutes}m`;
}

function isEditableAuction(auction) {
  const status = normalizeStatus(auction?.status);
  return status === "ACTIVE" || status === "SCHEDULED";
}

function canDeleteAuction(auction) {
  return Number(auction?.totalBids || 0) === 0;
}

export default function DashboardPage() {
  const [sellerAuctionsPage, setSellerAuctionsPage] = useState(() =>
    normalizePageResponse(),
  );
  const [isLoadingSellerAuctions, setIsLoadingSellerAuctions] = useState(true);
  const [sellerAuctionsError, setSellerAuctionsError] = useState("");
  const [reloadTick, setReloadTick] = useState(0);

  const [editingAuction, setEditingAuction] = useState(null);
  const [editForm, setEditForm] = useState({
    startPrice: "",
    stepPrice: "",
    startTime: "",
    endTime: "",
    status: "AUTO",
  });
  const [editError, setEditError] = useState("");
  const [isSubmittingEdit, setIsSubmittingEdit] = useState(false);
  const [deletingAuctionId, setDeletingAuctionId] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const fetchMyAuctions = async () => {
      setIsLoadingSellerAuctions(true);
      setSellerAuctionsError("");

      try {
        const responsePage = await listMyAuctions({
          page: 0,
          size: LISTING_PAGE_SIZE,
          sort: "startTime,desc",
        });

        if (!isMounted) {
          return;
        }

        setSellerAuctionsPage(normalizePageResponse(responsePage));
      } catch (error) {
        if (!isMounted) {
          return;
        }

        setSellerAuctionsPage(normalizePageResponse());
        setSellerAuctionsError(
          error.message || "Khong the tai danh sach phien dau gia cua ban.",
        );
      } finally {
        if (isMounted) {
          setIsLoadingSellerAuctions(false);
        }
      }
    };

    fetchMyAuctions();

    return () => {
      isMounted = false;
    };
  }, [reloadTick]);

  const mySellerAuctions = sellerAuctionsPage.content;

  const listingStats = useMemo(() => {
    const active = mySellerAuctions.filter(
      (auction) => normalizeStatus(auction.status) === "ACTIVE",
    ).length;
    const scheduled = mySellerAuctions.filter(
      (auction) => normalizeStatus(auction.status) === "SCHEDULED",
    ).length;

    return {
      total: sellerAuctionsPage.totalElements || mySellerAuctions.length,
      active,
      scheduled,
    };
  }, [mySellerAuctions, sellerAuctionsPage.totalElements]);

  const isPriceLocked = Number(editingAuction?.totalBids || 0) > 0;

  const handleOpenManage = (auction) => {
    const normalizedStatus = normalizeStatus(auction.status);

    setEditingAuction(auction);
    setEditError("");
    setEditForm({
      startPrice: String(Number(auction.startPrice || 0)),
      stepPrice: String(Number(auction.stepPrice || 0)),
      startTime: toDateTimeLocalValue(auction.startTime),
      endTime: toDateTimeLocalValue(auction.endTime),
      status:
        normalizedStatus === "CANCELLED"
          ? "CANCELLED"
          : normalizedStatus === "ACTIVE"
            ? "ACTIVE"
            : "AUTO",
    });
  };

  const handleCloseManage = () => {
    setEditingAuction(null);
    setEditError("");
    setEditForm({
      startPrice: "",
      stepPrice: "",
      startTime: "",
      endTime: "",
      status: "AUTO",
    });
  };

  const handleSubmitManage = async (event) => {
    event.preventDefault();
    setEditError("");

    if (!editingAuction) {
      return;
    }

    const requestedStatus =
      editForm.status === "CANCELLED"
        ? "CANCELLED"
        : editForm.status === "ACTIVE"
          ? "ACTIVE"
          : undefined;

    const startPriceValue = Number(editForm.startPrice);
    const stepPriceValue = Number(editForm.stepPrice);

    if (
      !isPriceLocked &&
      (!Number.isFinite(startPriceValue) || startPriceValue <= 0)
    ) {
      setEditError("Gia khoi diem phai lon hon 0.");
      return;
    }

    if (
      !isPriceLocked &&
      (!Number.isFinite(stepPriceValue) || stepPriceValue <= 0)
    ) {
      setEditError("Buoc gia phai lon hon 0.");
      return;
    }

    const startDate = new Date(editForm.startTime);
    const endDate = new Date(editForm.endTime);

    if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
      setEditError("Thoi gian bat dau/ket thuc khong hop le.");
      return;
    }

    if (endDate <= startDate) {
      setEditError("Thoi gian ket thuc phai lon hon thoi gian bat dau.");
      return;
    }

    setIsSubmittingEdit(true);

    try {
      await updateAuction(editingAuction.id, {
        productId: editingAuction.productId,
        startPrice: isPriceLocked
          ? Number(editingAuction.startPrice)
          : startPriceValue,
        stepPrice: isPriceLocked
          ? Number(editingAuction.stepPrice)
          : stepPriceValue,
        startTime: editForm.startTime,
        endTime: editForm.endTime,
        status: requestedStatus,
      });

      await Swal.fire({
        icon: "success",
        title:
          requestedStatus === "CANCELLED"
            ? "Da cap nhat trang thai phien"
            : requestedStatus === "ACTIVE"
              ? "Phien da duoc kich hoat"
            : "Cap nhat phien dau gia thanh cong",
        confirmButtonText: "Dong",
      });

      handleCloseManage();
      setReloadTick((prev) => prev + 1);
    } catch (error) {
      setEditError(error.message || "Cap nhat phien dau gia that bai.");
    } finally {
      setIsSubmittingEdit(false);
    }
  };

  const handleDeleteAuction = async (auction) => {
    const confirmed = await Swal.fire({
      icon: "warning",
      title: "Xoa phien dau gia?",
      text: `Ban sap xoa phien #${auction.id} (${auction.productName}).`,
      showCancelButton: true,
      confirmButtonText: "Xoa",
      cancelButtonText: "Huy",
      reverseButtons: true,
    });

    if (!confirmed.isConfirmed) {
      return;
    }

    setDeletingAuctionId(auction.id);

    try {
      await deleteAuction(auction.id);
      await Swal.fire({
        icon: "success",
        title: "Da xoa phien dau gia",
        confirmButtonText: "Dong",
      });
      setReloadTick((prev) => prev + 1);
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Khong the xoa phien dau gia",
        text: error.message || "Xoa phien dau gia that bai.",
      });
    } finally {
      setDeletingAuctionId(null);
    }
  };

  return (
    <main className="pt-24 pb-12 max-w-[1440px] mx-auto px-8 relative">
      <section className="mb-8 rounded-2xl bg-surface-container p-6 md:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-headline font-black text-on-background">
              Dashboard người dùng
            </h1>
            <p className="mt-2 text-on-surface-variant">
              Theo dõi phiên đấu giá, đơn hàng và quản lý phiên do bạn đăng bán.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-surface-container-lowest px-3 py-1 text-xs font-bold text-on-surface-variant">
                Tong phien: {listingStats.total}
              </span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                Dang active: {listingStats.active}
              </span>
              <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-700">
                Sap bat dau: {listingStats.scheduled}
              </span>
            </div>
          </div>
          <Link
            to={APP_ROUTES.explore}
            className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-white hover:bg-primary-container"
          >
            Khám phá phiên mới
            <span className="material-symbols-outlined text-[18px]">
              arrow_forward
            </span>
          </Link>
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <section className="md:col-span-8 space-y-7">
          <div className="flex items-center justify-between">
            <h2 className="font-headline text-2xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">
                gavel
              </span>
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
                  <img
                    className="w-full h-full object-cover"
                    src={bid.image}
                    alt={bid.title}
                  />
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
                      <p className="text-2xl font-headline font-bold">
                        {bid.myBid}
                      </p>
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
              <span className="material-symbols-outlined text-secondary">
                verified
              </span>
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
            <h3 className="font-headline text-xl font-bold mb-4">
              Bảng tin hoạt động
            </h3>
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
              <h3 className="font-headline text-xl font-bold">
                Danh sách theo dõi
              </h3>
              <span className="rounded-full bg-surface-container px-2 py-1 text-xs font-bold">
                {watchList.length} mục
              </span>
            </div>
            <ul className="space-y-3">
              {watchList.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-outline-variant/30 px-3 py-2 text-sm font-semibold"
                >
                  {item}
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-2xl border-2 border-dashed border-outline-variant p-6 text-center">
            <h4 className="font-headline text-lg font-bold">
              Đăng một vật phẩm
            </h4>
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
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-headline text-2xl font-bold">
            Danh sách đang đăng bán
          </h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-2 text-sm font-bold"
            onClick={() => setReloadTick((prev) => prev + 1)}
            disabled={isLoadingSellerAuctions}
          >
            <span className="material-symbols-outlined text-base">refresh</span>
            Lam moi
          </button>
        </div>

        {sellerAuctionsError && (
          <div className="mb-4 rounded-lg border border-error/40 bg-error-container/20 px-4 py-3 text-sm text-error">
            {sellerAuctionsError}
          </div>
        )}

        {isLoadingSellerAuctions ? (
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={`seller-auction-skeleton-${index}`}
                className="h-16 rounded-xl bg-surface-container-low animate-pulse"
              />
            ))}
          </div>
        ) : mySellerAuctions.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-8 text-center">
            <h3 className="font-headline text-xl font-bold mb-2">
              Bạn chưa có phiên đấu giá nào
            </h3>
            <p className="text-on-surface-variant mb-5">
              Hãy đăng sản phẩm mới để tạo phiên đấu giá đầu tiên của bạn.
            </p>
            <Link
              to={APP_ROUTES.sell}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white"
            >
              Đăng sản phẩm
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-2xl bg-surface-container-lowest shadow-sm">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-surface-container text-left text-[11px] uppercase tracking-widest text-on-surface-variant">
                  <th className="px-6 py-4">Vật phẩm</th>
                  <th className="px-6 py-4">Giá hiện tại</th>
                  <th className="px-6 py-4">Người đấu</th>
                  <th className="px-6 py-4">Thời gian</th>
                  <th className="px-6 py-4">Trạng thái</th>
                  <th className="px-6 py-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {mySellerAuctions.map((auction) => (
                  <tr
                    key={auction.id}
                    className="border-b border-surface-container last:border-0"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-on-background">
                        {auction.productName}
                      </p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        Auction #{auction.id}
                      </p>
                    </td>
                    <td className="px-6 py-4 font-headline font-bold">
                      {formatPrice(auction.currentPrice)}
                    </td>
                    <td className="px-6 py-4">{auction.totalBids || 0}</td>
                    <td className="px-6 py-4 text-sm">
                      <p>{getAuctionTimeLabel(auction)}</p>
                      <p className="text-xs text-on-surface-variant mt-1">
                        KT: {formatDateTime(auction.endTime)}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-bold ${getAuctionStatusBadgeClass(
                          auction.status,
                        )}`}
                      >
                        {normalizeStatus(auction.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <button
                          type="button"
                          className="text-secondary text-xs font-bold uppercase tracking-wide hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() => handleOpenManage(auction)}
                          disabled={
                            !isEditableAuction(auction) ||
                            deletingAuctionId === auction.id
                          }
                        >
                          Quản lý
                        </button>

                        <button
                          type="button"
                          className="text-error text-xs font-bold uppercase tracking-wide hover:underline disabled:opacity-40 disabled:cursor-not-allowed"
                          onClick={() => handleDeleteAuction(auction)}
                          disabled={
                            !canDeleteAuction(auction) ||
                            deletingAuctionId === auction.id
                          }
                          title={
                            canDeleteAuction(auction)
                              ? "Xoa phien dau gia"
                              : "Khong the xoa auction da co bid"
                          }
                        >
                          {deletingAuctionId === auction.id
                            ? "Dang xoa..."
                            : "Xóa"}
                        </button>

                        <Link
                          to={`${APP_ROUTES.auctionDetail}?id=${encodeURIComponent(
                            String(auction.productId),
                          )}`}
                          className="text-primary text-xs font-bold uppercase tracking-wide hover:underline"
                        >
                          Chi tiết
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {editingAuction && (
        <div className="fixed inset-0 z-50 bg-black/45 px-4 py-8 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-2xl bg-surface-container-lowest p-6 md:p-7 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-headline text-2xl font-bold">
                  Quản lý phiên đấu giá
                </h3>
                <p className="text-sm text-on-surface-variant mt-1">
                  {editingAuction.productName} • Auction #{editingAuction.id}
                </p>
              </div>
              <button
                type="button"
                onClick={handleCloseManage}
                className="inline-flex items-center justify-center rounded-lg border border-outline-variant/40 px-3 py-2 text-sm font-bold"
                disabled={isSubmittingEdit}
              >
                Đóng
              </button>
            </div>

            {editError && (
              <div className="mb-4 rounded-lg border border-error/40 bg-error-container/20 px-4 py-3 text-sm text-error">
                {editError}
              </div>
            )}

            {isPriceLocked && (
              <div className="mb-4 rounded-lg border border-amber-300/60 bg-amber-100/60 px-4 py-3 text-sm text-amber-800">
                Phiên này đã có bid nên không thể đổi giá khởi điểm hoặc bước
                giá.
              </div>
            )}

            <form className="space-y-5" onSubmit={handleSubmitManage}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="manage-start-price"
                  >
                    Giá khởi điểm
                  </label>
                  <input
                    id="manage-start-price"
                    type="number"
                    min={1}
                    step="1"
                    disabled={isPriceLocked}
                    value={editForm.startPrice}
                    onChange={(event) =>
                      setEditForm((prev) => ({
                        ...prev,
                        startPrice: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 disabled:opacity-60"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="manage-step-price"
                  >
                    Bước giá
                  </label>
                  <input
                    id="manage-step-price"
                    type="number"
                    min={1}
                    step="1"
                    disabled={isPriceLocked}
                    value={editForm.stepPrice}
                    onChange={(event) =>
                      setEditForm((prev) => ({
                        ...prev,
                        stepPrice: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 disabled:opacity-60"
                  />
                </div>

                <div className="md:col-span-2">
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="manage-status"
                  >
                    Trạng thái phiên
                  </label>
                  <select
                    id="manage-status"
                    value={editForm.status}
                    onChange={(event) =>
                      setEditForm((prev) => ({
                        ...prev,
                        status: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5"
                  >
                    <option value="AUTO">Tự động theo thời gian</option>
                    <option value="ACTIVE">ACTIVE (mở phiên ngay)</option>
                    <option value="CANCELLED">CANCELLED (hủy phiên)</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="manage-start-time"
                  >
                    Thời gian bắt đầu
                  </label>
                  <input
                    id="manage-start-time"
                    type="datetime-local"
                    value={editForm.startTime}
                    onChange={(event) =>
                      setEditForm((prev) => ({
                        ...prev,
                        startTime: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5"
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-semibold mb-2"
                    htmlFor="manage-end-time"
                  >
                    Thời gian kết thúc
                  </label>
                  <input
                    id="manage-end-time"
                    type="datetime-local"
                    value={editForm.endTime}
                    onChange={(event) =>
                      setEditForm((prev) => ({
                        ...prev,
                        endTime: event.target.value,
                      }))
                    }
                    className="w-full rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5"
                  />
                </div>
              </div>

              <div className="flex flex-wrap justify-end gap-3">
                <button
                  type="button"
                  onClick={handleCloseManage}
                  className="rounded-lg border border-outline-variant/40 px-4 py-2.5 text-sm font-bold"
                  disabled={isSubmittingEdit}
                >
                  Huỷ
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={isSubmittingEdit}
                >
                  {isSubmittingEdit ? "Dang cap nhat..." : "Lưu thay đổi"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
