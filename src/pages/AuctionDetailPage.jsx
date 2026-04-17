import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getAuctionByProductId } from "../services/auctionService";
import { listBidsByAuction, placeBid } from "../services/bidService";
import { getProductById } from "../services/productService";
import { hasValidAccessToken } from "../utils/authStorage";
import { APP_ROUTES } from "../utils/legacyRoutes";

const BID_HISTORY_PAGE_SIZE = 10;

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
    hour: "2-digit",
    minute: "2-digit",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(parsedDate);
}

function getStatusBadgeClass(status) {
  const normalizedStatus = String(status || "").toUpperCase();

  if (normalizedStatus === "AVAILABLE") {
    return "bg-emerald-100 text-emerald-700";
  }

  if (normalizedStatus === "PENDING") {
    return "bg-amber-100 text-amber-700";
  }

  if (normalizedStatus === "SOLD") {
    return "bg-slate-200 text-slate-700";
  }

  return "bg-surface-container-high text-on-surface-variant";
}

function getAuctionStatusBadgeClass(status) {
  const normalizedStatus = String(status || "").toUpperCase();

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

function getProductImages(product) {
  const collected = [];

  if (product?.mainImageUrl) {
    collected.push(product.mainImageUrl);
  }

  if (Array.isArray(product?.imageUrls)) {
    product.imageUrls.forEach((url) => {
      if (url && !collected.includes(url)) {
        collected.push(url);
      }
    });
  }

  return collected.length > 0 ? collected : ["/images/hero.webp"];
}

export default function AuctionDetailPage() {
  const [searchParams] = useSearchParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [auction, setAuction] = useState(null);
  const [isLoadingAuction, setIsLoadingAuction] = useState(true);
  const [auctionError, setAuctionError] = useState("");
  const [bidsPage, setBidsPage] = useState(() => normalizePageResponse());
  const [isLoadingBids, setIsLoadingBids] = useState(false);
  const [bidsError, setBidsError] = useState("");
  const [bidAmount, setBidAmount] = useState("");
  const [bidSubmitError, setBidSubmitError] = useState("");
  const [bidSubmitSuccess, setBidSubmitSuccess] = useState("");
  const [isSubmittingBid, setIsSubmittingBid] = useState(false);
  const [reloadTick, setReloadTick] = useState(0);
  const [bidRefreshTick, setBidRefreshTick] = useState(0);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const productId = useMemo(() => {
    const rawId = searchParams.get("id");
    if (!rawId) {
      return null;
    }

    const parsedId = Number(rawId);
    if (!Number.isFinite(parsedId) || parsedId <= 0) {
      return null;
    }

    return parsedId;
  }, [searchParams]);

  useEffect(() => {
    let isMounted = true;

    const loadProduct = async () => {
      if (!productId) {
        setProduct(null);
        setIsLoading(false);
        setError(
          "Khong co id san pham trong URL. Vui long mo tu trang Explore.",
        );
        return;
      }

      setIsLoading(true);
      setError("");

      try {
        const responseData = await getProductById(productId);
        if (!isMounted) {
          return;
        }

        if (!responseData) {
          setProduct(null);
          setError("Khong tim thay san pham.");
          return;
        }

        setProduct(responseData);
        setSelectedImageIndex(0);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }
        setProduct(null);
        setError(requestError.message || "Khong the tai chi tiet san pham.");
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadProduct();

    return () => {
      isMounted = false;
    };
  }, [productId, reloadTick]);

  useEffect(() => {
    let isMounted = true;

    const loadAuction = async () => {
      if (!productId) {
        setAuction(null);
        setAuctionError("");
        setIsLoadingAuction(false);
        return;
      }

      setIsLoadingAuction(true);
      setAuctionError("");

      try {
        const responseData = await getAuctionByProductId(productId);
        if (!isMounted) {
          return;
        }

        if (!responseData) {
          setAuction(null);
          setAuctionError("San pham hien chua co phien dau gia.");
          return;
        }

        setAuction(responseData);
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setAuction(null);
        setAuctionError(
          requestError.message || "Khong the tai thong tin phien dau gia.",
        );
      } finally {
        if (isMounted) {
          setIsLoadingAuction(false);
        }
      }
    };

    loadAuction();

    return () => {
      isMounted = false;
    };
  }, [productId, reloadTick, bidRefreshTick]);

  useEffect(() => {
    let isMounted = true;

    const loadBids = async () => {
      if (!auction?.id) {
        setBidsPage(normalizePageResponse());
        setBidsError("");
        setIsLoadingBids(false);
        return;
      }

      setIsLoadingBids(true);
      setBidsError("");

      try {
        const responsePage = await listBidsByAuction(auction.id, {
          page: 0,
          size: BID_HISTORY_PAGE_SIZE,
          sort: "bidTime,desc",
        });

        if (!isMounted) {
          return;
        }

        setBidsPage(normalizePageResponse(responsePage));
      } catch (requestError) {
        if (!isMounted) {
          return;
        }

        setBidsPage(normalizePageResponse());
        setBidsError(requestError.message || "Khong the tai lich su bid.");
      } finally {
        if (isMounted) {
          setIsLoadingBids(false);
        }
      }
    };

    loadBids();

    return () => {
      isMounted = false;
    };
  }, [auction?.id, reloadTick, bidRefreshTick]);

  const isAuthenticated = hasValidAccessToken();
  const imageUrls = useMemo(() => getProductImages(product), [product]);
  const selectedImage =
    imageUrls[
      Math.min(selectedImageIndex, Math.max(0, imageUrls.length - 1))
    ] || "/images/hero.webp";
  const latestBids = bidsPage.content;
  const isAuctionActive =
    String(auction?.status || "").toUpperCase() === "ACTIVE";

  const minimumBid = useMemo(() => {
    if (!auction) {
      return 0;
    }

    const startPrice = Number(auction.startPrice || 0);
    const stepPrice = Number(auction.stepPrice || 0);
    const topBidAmount = Number(
      latestBids.length > 0 ? latestBids[0]?.bidAmount : auction.currentPrice,
    );
    const totalBids = Number(auction.totalBids || 0);
    const hasAnyBid = totalBids > 0 || latestBids.length > 0;
    const anchorPrice = Number.isFinite(topBidAmount)
      ? topBidAmount
      : startPrice;

    return hasAnyBid ? anchorPrice + stepPrice : startPrice;
  }, [auction, latestBids]);

  useEffect(() => {
    if (!auction) {
      setBidAmount("");
      return;
    }

    if (!bidAmount && minimumBid > 0) {
      setBidAmount(String(Math.ceil(minimumBid)));
    }
  }, [auction, bidAmount, minimumBid]);

  const handlePlaceBid = async (event) => {
    event.preventDefault();
    setBidSubmitError("");
    setBidSubmitSuccess("");

    if (!auction) {
      setBidSubmitError("San pham nay chua co phien dau gia.");
      return;
    }

    if (!isAuthenticated) {
      setBidSubmitError("Vui long dang nhap de dat gia.");
      return;
    }

    if (!isAuctionActive) {
      setBidSubmitError("Phien dau gia khong o trang thai cho phep dat gia.");
      return;
    }

    const numericBidAmount = Number(bidAmount);
    if (!Number.isFinite(numericBidAmount) || numericBidAmount <= 0) {
      setBidSubmitError("Gia dat khong hop le.");
      return;
    }

    if (numericBidAmount < minimumBid) {
      setBidSubmitError(
        `Gia dat toi thieu hien tai la ${formatPrice(minimumBid)}.`,
      );
      return;
    }

    setIsSubmittingBid(true);

    try {
      const placedBid = await placeBid({
        auctionId: auction.id,
        bidAmount: numericBidAmount,
      });

      setBidAmount("");
      setBidSubmitSuccess(
        `Dat gia thanh cong: ${formatPrice(placedBid.bidAmount)}.`,
      );
      setBidRefreshTick((prev) => prev + 1);
    } catch (requestError) {
      setBidSubmitError(requestError.message || "Dat gia that bai.");
    } finally {
      setIsSubmittingBid(false);
    }
  };

  if (isLoading) {
    return (
      <main className="pt-28 pb-20 px-6 max-w-[1440px] mx-auto">
        <div className="rounded-3xl bg-surface-container-low p-8 animate-pulse space-y-6">
          <div className="h-5 w-40 rounded bg-surface-container-high" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="h-[560px] rounded-2xl bg-surface-container-high" />
            <div className="space-y-4">
              <div className="h-10 w-4/5 rounded bg-surface-container-high" />
              <div className="h-8 w-1/2 rounded bg-surface-container-high" />
              <div className="h-24 rounded bg-surface-container-high" />
              <div className="h-64 rounded bg-surface-container-high" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="pt-28 pb-20 px-6 max-w-[960px] mx-auto">
        <div className="rounded-2xl border border-error/30 bg-error-container/20 p-8">
          <h1 className="font-headline text-3xl font-bold text-on-background mb-3">
            Khong the hien thi chi tiet san pham
          </h1>
          <p className="text-on-surface-variant mb-6">{error}</p>

          <div className="flex flex-wrap gap-3">
            <Link
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white"
              to={APP_ROUTES.explore}
            >
              Ve trang Explore
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>

            {productId && (
              <button
                className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-2.5 text-sm font-bold"
                onClick={() => setReloadTick((prev) => prev + 1)}
                type="button"
              >
                Thu tai lai
              </button>
            )}
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-20 px-6 max-w-[1440px] mx-auto">
      <nav className="hidden md:flex gap-2 text-xs font-label uppercase tracking-widest text-on-surface-variant mb-8">
        <Link className="hover:text-primary" to={APP_ROUTES.home}>
          Trang chu
        </Link>
        <span>/</span>
        <Link className="hover:text-primary" to={APP_ROUTES.explore}>
          Explore
        </Link>
        <span>/</span>
        <span className="text-on-surface max-w-[360px] truncate">
          {product.name}
        </span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <section className="lg:col-span-7 space-y-6">
          <div className="rounded-2xl overflow-hidden bg-surface-container aspect-[4/5]">
            <img
              alt={product.name}
              className="w-full h-full object-cover"
              src={selectedImage}
            />
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-3">
            {imageUrls.map((url, index) => (
              <button
                key={`${url}-${index}`}
                className={`aspect-square rounded-lg overflow-hidden border transition-all ${
                  selectedImageIndex === index
                    ? "border-primary ring-2 ring-primary/30"
                    : "border-outline-variant/40"
                }`}
                onClick={() => setSelectedImageIndex(index)}
                type="button"
              >
                <img
                  alt={`${product.name} ${index + 1}`}
                  className="w-full h-full object-cover"
                  src={url}
                />
              </button>
            ))}
          </div>

          <article className="rounded-2xl bg-surface-container-low p-6 space-y-4">
            <h2 className="font-headline text-2xl font-bold">Mo ta san pham</h2>
            <p className="text-on-surface-variant leading-relaxed whitespace-pre-line">
              {product.description || "San pham chua co mo ta."}
            </p>
          </article>
        </section>

        <aside className="lg:col-span-5">
          <div className="sticky top-28 space-y-6">
            <header>
              <div className="flex items-center gap-3 mb-3 flex-wrap">
                <span
                  className={`text-xs px-3 py-1 rounded-full font-bold ${getStatusBadgeClass(
                    product.status,
                  )}`}
                >
                  {String(product.status || "UNKNOWN").toUpperCase()}
                </span>
                <span className="text-xs font-label uppercase tracking-widest text-on-surface-variant">
                  ID #{product.id}
                </span>
              </div>

              <h1 className="font-headline text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-3">
                {product.name}
              </h1>

              <p className="text-on-surface-variant text-sm">
                Danh muc: {product.categoryName || "Chua phan loai"}
              </p>
            </header>

            <div className="rounded-2xl bg-surface-container-lowest border border-surface-container-high p-6 space-y-5">
              <div>
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                  Gia khoi diem
                </p>
                <p className="font-headline text-4xl font-bold text-on-background">
                  {formatPrice(product.basePrice)}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-surface-container p-3">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                    Seller
                  </p>
                  <p className="font-semibold truncate">
                    {product.sellerUsername || "Unknown"}
                  </p>
                </div>
                <div className="rounded-xl bg-surface-container p-3">
                  <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                    Ngay dang
                  </p>
                  <p className="font-semibold">
                    {formatDate(product.createdAt)}
                  </p>
                </div>
              </div>

              <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-4">
                <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-3">
                  Thong so chi tiet
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Tinh trang</span>
                    <span className="font-semibold text-right">
                      {product.condition || "Khong ro"}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Ti le</span>
                    <span className="font-semibold text-right">
                      {product.scale || "Khong ro"}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Chieu cao</span>
                    <span className="font-semibold text-right">
                      {product.height ? `${product.height} cm` : "Khong ro"}
                    </span>
                  </li>
                  <li className="flex justify-between gap-4">
                    <span className="text-on-surface-variant">Chat lieu</span>
                    <span className="font-semibold text-right">
                      {product.material || "Khong ro"}
                    </span>
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-outline-variant/40 bg-surface-container-low p-4 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                      Phien dau gia
                    </p>
                    <h3 className="font-headline text-xl font-bold">Dat gia</h3>
                  </div>

                  {auction && (
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full font-bold ${getAuctionStatusBadgeClass(
                        auction.status,
                      )}`}
                    >
                      {String(auction.status || "UNKNOWN").toUpperCase()}
                    </span>
                  )}
                </div>

                {isLoadingAuction ? (
                  <div className="space-y-2 animate-pulse">
                    <div className="h-3 w-32 rounded bg-surface-container-high" />
                    <div className="h-6 w-44 rounded bg-surface-container-high" />
                    <div className="h-20 rounded bg-surface-container-high" />
                  </div>
                ) : auction ? (
                  <>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="rounded-lg bg-surface-container p-3">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Gia hien tai
                        </p>
                        <p className="font-bold">
                          {formatPrice(auction.currentPrice)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container p-3">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Buoc gia
                        </p>
                        <p className="font-bold">
                          {formatPrice(auction.stepPrice)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-surface-container p-3">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Gia toi thieu
                        </p>
                        <p className="font-bold">{formatPrice(minimumBid)}</p>
                      </div>
                      <div className="rounded-lg bg-surface-container p-3">
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Luot bid
                        </p>
                        <p className="font-bold">{auction.totalBids || 0}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Bat dau
                        </p>
                        <p className="font-semibold">
                          {formatDate(auction.startTime)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-widest text-on-surface-variant mb-1">
                          Ket thuc
                        </p>
                        <p className="font-semibold">
                          {formatDate(auction.endTime)}
                        </p>
                      </div>
                    </div>

                    <form className="space-y-3" onSubmit={handlePlaceBid}>
                      <div>
                        <label
                          className="block text-sm font-semibold mb-2"
                          htmlFor="bidAmount"
                        >
                          Gia ban muon dat
                        </label>
                        <input
                          className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-2.5"
                          id="bidAmount"
                          min={minimumBid > 0 ? Math.ceil(minimumBid) : 1}
                          onChange={(event) => {
                            setBidAmount(event.target.value);
                            setBidSubmitError("");
                            setBidSubmitSuccess("");
                          }}
                          placeholder="Nhap gia ban muon dat"
                          step="1"
                          type="number"
                          value={bidAmount}
                        />
                      </div>

                      {bidSubmitError && (
                        <p className="rounded-lg border border-error/30 bg-error-container/20 px-3 py-2 text-sm text-error">
                          {bidSubmitError}
                        </p>
                      )}

                      {bidSubmitSuccess && (
                        <p className="rounded-lg border border-emerald-300/50 bg-emerald-100/50 px-3 py-2 text-sm text-emerald-700">
                          {bidSubmitSuccess}
                        </p>
                      )}

                      {!isAuthenticated && (
                        <p className="text-sm text-on-surface-variant">
                          Vui long{" "}
                          <Link
                            className="text-primary font-semibold hover:underline"
                            to={APP_ROUTES.login}
                          >
                            dang nhap
                          </Link>{" "}
                          de dat gia.
                        </p>
                      )}

                      {isAuthenticated && !isAuctionActive && (
                        <p className="text-sm text-on-surface-variant">
                          Phien dau gia nay dang o trang thai{" "}
                          {String(auction.status || "UNKNOWN").toUpperCase()},
                          khong the dat gia luc nay.
                        </p>
                      )}

                      <button
                        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white disabled:opacity-60 disabled:cursor-not-allowed"
                        disabled={
                          isSubmittingBid ||
                          !isAuthenticated ||
                          !isAuctionActive ||
                          !auction
                        }
                        type="submit"
                      >
                        {isSubmittingBid ? "Dang dat gia..." : "Dat gia ngay"}
                      </button>
                    </form>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-3">
                        <h4 className="font-semibold">Lich su bid moi nhat</h4>
                        <button
                          className="text-xs font-semibold text-primary hover:underline"
                          onClick={() => setBidRefreshTick((prev) => prev + 1)}
                          type="button"
                        >
                          Lam moi
                        </button>
                      </div>

                      {isLoadingBids ? (
                        <div className="space-y-2 animate-pulse">
                          <div className="h-10 rounded bg-surface-container" />
                          <div className="h-10 rounded bg-surface-container" />
                          <div className="h-10 rounded bg-surface-container" />
                        </div>
                      ) : bidsError ? (
                        <p className="text-sm text-error">{bidsError}</p>
                      ) : latestBids.length === 0 ? (
                        <p className="text-sm text-on-surface-variant">
                          Chua co luot dat gia nao.
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {latestBids.map((bid) => (
                            <li
                              key={bid.id}
                              className="rounded-lg bg-surface-container px-3 py-2.5 text-sm"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <p className="font-semibold truncate">
                                  {bid.username || "Unknown"}
                                </p>
                                <p className="font-bold text-primary">
                                  {formatPrice(bid.bidAmount)}
                                </p>
                              </div>
                              <p className="text-xs text-on-surface-variant mt-1">
                                {formatDate(bid.bidTime)}
                              </p>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border border-outline-variant/40 bg-surface-container px-3 py-3 text-sm text-on-surface-variant">
                    {auctionError || "San pham nay hien chua mo phien dau gia."}
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white"
                  to={APP_ROUTES.explore}
                >
                  Quay lai Explore
                  <span className="material-symbols-outlined text-base">
                    arrow_back
                  </span>
                </Link>

                <button
                  className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/40 bg-surface-container px-4 py-2.5 text-sm font-bold"
                  onClick={() => setReloadTick((prev) => prev + 1)}
                  type="button"
                >
                  Lam moi du lieu
                </button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
