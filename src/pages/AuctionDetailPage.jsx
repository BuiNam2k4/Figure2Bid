import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProductById } from "../services/productService";
import { APP_ROUTES } from "../utils/legacyRoutes";

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
  const [reloadTick, setReloadTick] = useState(0);
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
        setError("Khong co id san pham trong URL. Vui long mo tu trang Explore.");
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

  const imageUrls = useMemo(() => getProductImages(product), [product]);
  const selectedImage =
    imageUrls[Math.min(selectedImageIndex, Math.max(0, imageUrls.length - 1))] ||
    "/images/hero.webp";

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
        <span className="text-on-surface max-w-[360px] truncate">{product.name}</span>
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
                  <p className="font-semibold">{formatDate(product.createdAt)}</p>
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
