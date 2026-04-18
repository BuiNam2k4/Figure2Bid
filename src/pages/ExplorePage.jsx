import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getAuctionByProductId } from "../services/auctionService";
import { listCategories, listProducts } from "../services/productService";
import { APP_ROUTES } from "../utils/legacyRoutes";

const PAGE_SIZE = 9;

function formatPrice(value) {
  const numericValue = Number(value || 0);
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
    maximumFractionDigits: 0,
  }).format(numericValue);
}

function formatDate(isoString) {
  if (!isoString) {
    return "Khong ro";
  }

  const parsedDate = new Date(isoString);
  if (Number.isNaN(parsedDate.getTime())) {
    return "Khong ro";
  }

  return new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function formatCountdown(milliseconds) {
  const clampedMilliseconds = Math.max(0, milliseconds);
  const totalSeconds = Math.floor(clampedMilliseconds / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return [hours, minutes, seconds]
    .map((part) => String(part).padStart(2, "0"))
    .join(":");
}

function buildAuctionTimeInfo(auction, nowMs) {
  if (!auction) {
    return {
      label: "Phien dau gia",
      value: "Chua mo",
    };
  }

  const status = String(auction.status || "").toUpperCase();
  const startMs = new Date(auction.startTime).getTime();
  const endMs = new Date(auction.endTime).getTime();

  if (status === "CANCELLED") {
    return {
      label: "Phien dau gia",
      value: "Da huy",
    };
  }

  if (!Number.isFinite(endMs)) {
    return {
      label: "Thoi gian",
      value: "--:--:--",
    };
  }

  if (status === "ENDED" || nowMs >= endMs) {
    return {
      label: "Phien dau gia",
      value: "Da ket thuc",
    };
  }

  if (Number.isFinite(startMs) && nowMs < startMs && status !== "ACTIVE") {
    return {
      label: "Bat dau sau",
      value: formatCountdown(startMs - nowMs),
    };
  }

  return {
    label: "Thoi gian con lai",
    value: formatCountdown(endMs - nowMs),
  };
}

function getStatusBadgeClass(status) {
  const normalizedStatus = String(status || "").toUpperCase();

  if (normalizedStatus === "ACTIVE") {
    return "bg-primary/10 text-primary";
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

function getProductStatusOverlayLabel(status) {
  const normalizedStatus = String(status || "").toUpperCase();

  if (normalizedStatus === "ACTIVE") {
    return "TRUC TIEP";
  }

  if (normalizedStatus === "SCHEDULED") {
    return "SAP DIEN RA";
  }

  if (normalizedStatus === "ENDED") {
    return "DA KET THUC";
  }

  if (normalizedStatus === "CANCELLED") {
    return "DA HUY";
  }

  if (normalizedStatus === "NO_AUCTION") {
    return "CHUA MO";
  }

  return normalizedStatus || "UNKNOWN";
}

function getProductImage(product) {
  if (product?.mainImageUrl) {
    return product.mainImageUrl;
  }

  if (Array.isArray(product?.imageUrls) && product.imageUrls.length > 0) {
    return product.imageUrls[0];
  }

  return "/images/hero.webp";
}

export default function ExplorePage() {
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [keywordInput, setKeywordInput] = useState("");
  const [keyword, setKeyword] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState("createdAt,desc");

  const [page, setPage] = useState(0);
  const [productsPage, setProductsPage] = useState({
    content: [],
    number: 0,
    totalPages: 0,
    totalElements: 0,
  });
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState("");
  const [auctionByProductId, setAuctionByProductId] = useState({});
  const [countdownNowMs, setCountdownNowMs] = useState(() => Date.now());

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setCountdownNowMs(Date.now());
    }, 1000);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryError("");

      try {
        const data = await listCategories();
        if (!isMounted) {
          return;
        }
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setCategoryError(error.message || "Khong the tai danh muc.");
      } finally {
        if (isMounted) {
          setIsLoadingCategories(false);
        }
      }
    };

    fetchCategories();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchProducts = async () => {
      setIsLoadingProducts(true);
      setProductsError("");

      try {
        const responsePage = await listProducts({
          page,
          size: PAGE_SIZE,
          sort,
          keyword: keyword || undefined,
          categoryId: categoryId || undefined,
          status: status || undefined,
        });

        if (!isMounted) {
          return;
        }

        setProductsPage({
          content: Array.isArray(responsePage?.content)
            ? responsePage.content
            : [],
          number:
            typeof responsePage?.number === "number" ? responsePage.number : 0,
          totalPages:
            typeof responsePage?.totalPages === "number"
              ? responsePage.totalPages
              : 0,
          totalElements:
            typeof responsePage?.totalElements === "number"
              ? responsePage.totalElements
              : 0,
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }
        setProductsError(error.message || "Khong the tai danh sach san pham.");
      } finally {
        if (isMounted) {
          setIsLoadingProducts(false);
        }
      }
    };

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [categoryId, keyword, page, sort, status]);

  const productItems = productsPage.content;
  const totalPages = productsPage.totalPages;
  const currentPage = productsPage.number;

  useEffect(() => {
    let isMounted = true;

    const loadAuctionsForProducts = async () => {
      const productIds = Array.from(
        new Set(
          (Array.isArray(productsPage.content) ? productsPage.content : [])
            .map((product) => product?.id)
            .filter((id) => id !== undefined && id !== null),
        ),
      );

      if (productIds.length === 0) {
        setAuctionByProductId({});
        return;
      }

      const results = await Promise.all(
        productIds.map(async (productId) => {
          try {
            const auction = await getAuctionByProductId(productId);
            return [productId, auction || null];
          } catch {
            return [productId, null];
          }
        }),
      );

      if (!isMounted) {
        return;
      }

      const mapped = {};
      results.forEach(([productId, auction]) => {
        mapped[productId] = auction;
      });

      setAuctionByProductId(mapped);
    };

    loadAuctionsForProducts();

    return () => {
      isMounted = false;
    };
  }, [productsPage.content]);

  const pageNumbers = useMemo(() => {
    if (!totalPages) {
      return [];
    }

    const maxVisiblePages = 5;
    const start = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
    const end = Math.min(totalPages, start + maxVisiblePages);
    const adjustedStart = Math.max(0, end - maxVisiblePages);

    return Array.from(
      { length: end - adjustedStart },
      (_, index) => adjustedStart + index,
    );
  }, [currentPage, totalPages]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setKeyword(keywordInput.trim());
    setCategoryId("");
    setStatus("");
    setPage(0);
  };

  const handleCategoryChange = (event) => {
    setCategoryId(event.target.value);
    setKeyword("");
    setKeywordInput("");
    setStatus("");
    setPage(0);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
    setKeyword("");
    setKeywordInput("");
    setCategoryId("");
    setPage(0);
  };

  const clearFilters = () => {
    setKeyword("");
    setKeywordInput("");
    setCategoryId("");
    setStatus("");
    setSort("createdAt,desc");
    setPage(0);
  };

  return (
    <main className="pt-24 min-h-screen max-w-[1440px] mx-auto flex flex-col md:flex-row gap-8 px-8 pb-20">
      <aside className="w-full md:w-72 flex-shrink-0 space-y-8 md:sticky md:top-28 self-start">
        <section className="rounded-xl bg-surface-container-low p-5 space-y-6">
          <h3 className="font-headline text-lg font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">tune</span>
            Lọc bộ sưu tập
          </h3>

          <form className="space-y-2" onSubmit={handleSearchSubmit}>
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Tìm theo tên
            </label>
            <div className="flex gap-2">
              <input
                className="flex-1 rounded-lg bg-surface-container-lowest border border-outline-variant/40 px-3 py-2 text-sm"
                onChange={(event) => setKeywordInput(event.target.value)}
                placeholder="VD: Evangelion"
                type="text"
                value={keywordInput}
              />
              <button
                className="rounded-lg bg-primary px-3 py-2 text-white text-sm font-semibold"
                type="submit"
              >
                Tìm
              </button>
            </div>
          </form>

          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Danh mục
            </label>
            <select
              className="w-full rounded-lg bg-surface-container-lowest border border-outline-variant/40 px-3 py-2 text-sm"
              disabled={isLoadingCategories}
              onChange={handleCategoryChange}
              value={categoryId}
            >
              <option value="">
                {isLoadingCategories
                  ? "Dang tai danh muc..."
                  : "Tat ca danh muc"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={String(category.id)}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="space-y-2">
            <label className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Trạng thái
            </label>
            <select
              className="w-full rounded-lg bg-surface-container-lowest border border-outline-variant/40 px-3 py-2 text-sm"
              onChange={handleStatusChange}
              value={status}
            >
              <option value="">Tat ca trang thai</option>
              <option value="AVAILABLE">AVAILABLE</option>
              <option value="PENDING">PENDING</option>
              <option value="SOLD">SOLD</option>
            </select>
          </div>

          <button
            className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest py-2 text-sm font-semibold hover:bg-surface-container"
            onClick={clearFilters}
            type="button"
          >
            Xóa bộ lọc
          </button>

          {categoryError && (
            <p className="text-xs text-error leading-relaxed">
              {categoryError}
            </p>
          )}
        </section>

        <div className="bg-surface-container-highest/30 p-6 rounded-xl border border-secondary/10">
          <p className="text-xs text-secondary font-bold mb-2 uppercase tracking-tighter">
            Tạo nhanh
          </p>
          <p className="text-xs text-on-surface-variant leading-relaxed mb-3">
            Muốn đăng vật phẩm của bạn? Chuyển sang trang đăng bán để tạo sản
            phẩm mới ngay.
          </p>
          <Link
            className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
            to={APP_ROUTES.sell}
          >
            Đăng sản phẩm
            <span className="material-symbols-outlined text-base">
              arrow_forward
            </span>
          </Link>
        </div>
      </aside>

      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-headline text-5xl font-extrabold tracking-tighter uppercase mb-2">
              Figure <span className="text-primary">.</span>
            </h1>
            <p className="text-on-surface-variant">
              Sản phẩm hiện có từ Product API: {productsPage.totalElements} mục
              đang hiển thị.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant font-bold">
              Sắp xếp theo
            </span>
            <div className="flex bg-surface-container-low p-1 rounded-lg overflow-x-auto">
              <button
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                  sort === "createdAt,desc"
                    ? "bg-surface-container-lowest shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => {
                  setSort("createdAt,desc");
                  setPage(0);
                }}
                type="button"
              >
                Mới nhất
              </button>
              <button
                className={`px-4 py-2 text-xs font-bold rounded-md transition-all ${
                  sort === "createdAt,asc"
                    ? "bg-surface-container-lowest shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
                onClick={() => {
                  setSort("createdAt,asc");
                  setPage(0);
                }}
                type="button"
              >
                Cũ hơn
              </button>
            </div>
          </div>
        </div>

        {productsError && (
          <div className="mb-6 rounded-lg border border-error/40 bg-error-container/20 px-4 py-3 text-sm text-error">
            {productsError}
          </div>
        )}

        {isLoadingProducts ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {Array.from({ length: PAGE_SIZE }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="rounded-2xl bg-surface-container-lowest overflow-hidden animate-pulse"
              >
                <div className="aspect-[4/5] bg-surface-container" />
                <div className="p-6 space-y-3">
                  <div className="h-4 w-1/2 rounded bg-surface-container" />
                  <div className="h-6 w-4/5 rounded bg-surface-container" />
                  <div className="h-10 rounded bg-surface-container" />
                  <div className="h-7 w-2/3 rounded bg-surface-container" />
                </div>
              </div>
            ))}
          </div>
        ) : productItems.length === 0 ? (
          <div className="rounded-2xl border border-outline-variant/40 bg-surface-container-low p-10 text-center">
            <h2 className="font-headline text-2xl font-bold mb-2">
              Chưa có sản phẩm phù hợp
            </h2>
            <p className="text-on-surface-variant mb-5">
              Hãy đổi bộ lọc hoặc đăng sản phẩm đầu tiên của bạn.
            </p>
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-white"
              to={APP_ROUTES.sell}
            >
              Đăng sản phẩm ngay
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {productItems.map((product) => {
                const auction = auctionByProductId[product.id] || null;
                const auctionStatus = String(
                  auction?.status || "NO_AUCTION",
                ).toUpperCase();
                const statusLabel = getProductStatusOverlayLabel(auctionStatus);
                const timeInfo = buildAuctionTimeInfo(auction, countdownNowMs);
                const sellerUsername =
                  auction?.sellerUsername ||
                  product?.sellerUsername ||
                  "Unknown";
                const totalBids = Number(auction?.totalBids || 0);
                const currentPriceText =
                  auction &&
                  auction.currentPrice !== undefined &&
                  auction.currentPrice !== null
                    ? formatPrice(auction.currentPrice)
                    : "CHUA CO";

                return (
                  <Link
                    key={product.id}
                    aria-label={`Xem chi tiet ${product.name || "san pham"}`}
                    className="group relative bg-surface-container-lowest rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-500 block"
                    to={`${APP_ROUTES.auctionDetail}?id=${encodeURIComponent(
                      String(product.id),
                    )}`}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden">
                      <img
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        src={getProductImage(product)}
                      />

                      <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-400/40 shadow-lg shadow-red-600/20">
                        <span className="font-headline font-extrabold text-xs text-red-500 tracking-wide animate-[pulse_0.85s_ease-in-out_infinite]">
                          {statusLabel}
                        </span>
                      </div>

                      <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 rounded-full border border-red-400/40 shadow-lg shadow-red-600/20">
                        <span className="font-headline font-extrabold text-xs text-red-500 tabular-nums animate-[pulse_0.85s_ease-in-out_infinite]">
                          {currentPriceText}
                        </span>
                      </div>

                      <div className="absolute bottom-4 left-4 right-4 z-30 bg-black/60 backdrop-blur-sm p-3 rounded-xl flex justify-between items-center border border-red-400/40 shadow-lg shadow-red-600/20">
                        <span className="font-label text-[10px] uppercase font-bold text-red-400 tracking-wide">
                          {timeInfo.label}
                        </span>
                        <span className="font-headline font-extrabold text-red-500 tabular-nums">
                          {timeInfo.value}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <p className="font-label text-xs text-slate-500 uppercase tracking-widest">
                          Seller: {sellerUsername}
                        </p>
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded font-bold ${getStatusBadgeClass(
                            auctionStatus,
                          )}`}
                        >
                          {auctionStatus}
                        </span>
                      </div>

                      <h3 className="font-headline font-bold text-lg mb-4 group-hover:text-primary transition-colors min-h-[56px]">
                        {product.name}
                      </h3>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex flex-col">
                          <span className="font-label text-[10px] text-on-surface-variant uppercase">
                            Gia hien tai
                          </span>
                          <span className="font-headline font-bold text-xl text-on-background">
                            {currentPriceText}
                          </span>
                          <span className="font-label text-[10px] text-on-surface-variant uppercase mt-1">
                            {totalBids} luot bid
                          </span>
                        </div>

                        <span className="bg-surface-container-high group-hover:bg-primary group-hover:text-on-primary p-3 rounded-xl transition-colors duration-300">
                          <span className="material-symbols-outlined text-lg">
                            gavel
                          </span>
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {totalPages > 1 && (
              <div className="mt-20 flex justify-center items-center gap-2 flex-wrap">
                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage <= 0}
                  onClick={() => setPage((prev) => Math.max(0, prev - 1))}
                  type="button"
                >
                  <span className="material-symbols-outlined text-on-surface">
                    chevron_left
                  </span>
                </button>

                {pageNumbers.map((pageIndex) => (
                  <button
                    key={pageIndex}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-headline transition-colors ${
                      pageIndex === currentPage
                        ? "bg-primary text-white font-bold"
                        : "hover:bg-surface-container-low"
                    }`}
                    onClick={() => setPage(pageIndex)}
                    type="button"
                  >
                    {pageIndex + 1}
                  </button>
                ))}

                <button
                  className="w-10 h-10 rounded-full flex items-center justify-center bg-surface-container-low hover:bg-surface-container-high transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={currentPage >= totalPages - 1}
                  onClick={() =>
                    setPage((prev) => Math.min(totalPages - 1, prev + 1))
                  }
                  type="button"
                >
                  <span className="material-symbols-outlined text-on-surface">
                    chevron_right
                  </span>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
