import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ImageUpload from "../components/ImageUpload";
import { createAuction } from "../services/auctionService";
import { createProduct, listCategories } from "../services/productService";
import { APP_ROUTES } from "../utils/legacyRoutes";

const DEFAULT_AUCTION_START_DELAY_MINUTES = 10;
const DEFAULT_AUCTION_DURATION_HOURS = 24;

function toDateTimeLocalValue(dateValue) {
  const date = new Date(dateValue);
  const timezoneOffsetMinutes = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - timezoneOffsetMinutes * 60_000);
  return localDate.toISOString().slice(0, 16);
}

function createInitialForm() {
  const now = new Date();
  const auctionStart = new Date(
    now.getTime() + DEFAULT_AUCTION_START_DELAY_MINUTES * 60_000,
  );
  const auctionEnd = new Date(
    auctionStart.getTime() + DEFAULT_AUCTION_DURATION_HOURS * 60 * 60_000,
  );

  return {
    name: "",
    categoryId: "",
    condition: "",
    status: "AVAILABLE",
    basePrice: "",
    stepPrice: "",
    auctionStartTime: toDateTimeLocalValue(auctionStart),
    auctionEndTime: toDateTimeLocalValue(auctionEnd),
    scale: "",
    height: "",
    material: "",
    description: "",
  };
}

function normalizeUploadedImageUrl(uploadResult) {
  if (!uploadResult || typeof uploadResult !== "object") {
    return "";
  }

  return (
    uploadResult.url || uploadResult.secureUrl || uploadResult.imageUrl || ""
  );
}

export default function SellAuctionPage() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [categoryError, setCategoryError] = useState("");

  const [formData, setFormData] = useState(() => createInitialForm());
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);
  const [imageUploadKey, setImageUploadKey] = useState(0);

  const [isAuthenticChecked, setIsAuthenticChecked] = useState(false);
  const [isPolicyChecked, setIsPolicyChecked] = useState(false);

  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        setCategoryError(
          error.message || "Khong the tai danh sach danh muc tu backend.",
        );
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

  const hasMinimumRequiredFields = useMemo(() => {
    return (
      formData.name.trim() &&
      formData.categoryId &&
      formData.condition &&
      formData.status &&
      formData.basePrice &&
      formData.stepPrice &&
      formData.auctionStartTime &&
      formData.auctionEndTime &&
      formData.description.trim() &&
      uploadedImageUrls.length > 0 &&
      isAuthenticChecked &&
      isPolicyChecked
    );
  }, [formData, uploadedImageUrls.length, isAuthenticChecked, isPolicyChecked]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveUploadedImage = (imageUrlToRemove) => {
    setUploadedImageUrls((prev) =>
      prev.filter((imageUrl) => imageUrl !== imageUrlToRemove),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitError("");

    if (!isAuthenticChecked || !isPolicyChecked) {
      setSubmitError("Vui long dong y cac cam ket truoc khi dang san pham.");
      return;
    }

    if (uploadedImageUrls.length === 0) {
      setSubmitError("Vui long tai len it nhat 1 anh san pham.");
      return;
    }

    const basePriceValue = Number(formData.basePrice);
    const stepPriceValue = Number(formData.stepPrice);

    if (!Number.isFinite(basePriceValue) || basePriceValue <= 0) {
      setSubmitError("Gia khoi diem phai lon hon 0.");
      return;
    }

    if (!Number.isFinite(stepPriceValue) || stepPriceValue <= 0) {
      setSubmitError("Buoc gia (step) phai lon hon 0.");
      return;
    }

    const auctionStartDate = new Date(formData.auctionStartTime);
    const auctionEndDate = new Date(formData.auctionEndTime);

    if (
      Number.isNaN(auctionStartDate.getTime()) ||
      Number.isNaN(auctionEndDate.getTime())
    ) {
      setSubmitError("Thoi gian mo/ket thuc phien dau gia khong hop le.");
      return;
    }

    if (auctionEndDate <= auctionStartDate) {
      setSubmitError("Thoi gian ket thuc phai lon hon thoi gian bat dau.");
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        name: formData.name,
        description: formData.description,
        basePrice: basePriceValue,
        scale: formData.scale,
        height: formData.height,
        material: formData.material,
        condition: formData.condition,
        status: formData.status,
        categoryId: formData.categoryId,
        imageUrls: uploadedImageUrls,
      };

      const createdProduct = await createProduct(payload);

      let createdAuction;

      try {
        createdAuction = await createAuction({
          productId: createdProduct.id,
          startPrice: basePriceValue,
          stepPrice: stepPriceValue,
          startTime: auctionStartDate,
          endTime: auctionEndDate,
        });
      } catch (auctionError) {
        throw new Error(
          `San pham #${createdProduct.id} da duoc tao, nhung tao phien dau gia that bai: ${auctionError.message}`,
        );
      }

      setFormData(createInitialForm());
      setUploadedImageUrls([]);
      setImageUploadKey((prev) => prev + 1);
      setIsAuthenticChecked(false);
      setIsPolicyChecked(false);

      const swalResult = await Swal.fire({
        icon: "success",
        title: "Dang san pham va tao phien dau gia thanh cong",
        text: `Ma san pham: #${createdProduct.id} | Ma phien: #${createdAuction.id}`,
        confirmButtonText: "Về trang khám phá",
        showCancelButton: true,
        cancelButtonText: "Tiếp tục đăng sản phẩm",
        reverseButtons: true,
      });

      if (swalResult.isConfirmed) {
        navigate(APP_ROUTES.explore);
      }
    } catch (error) {
      setSubmitError(error.message || "Dang san pham that bai.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="pt-24 pb-16 px-6 md:px-8">
      <section className="max-w-screen-2xl mx-auto mb-8 md:mb-12">
        <div className="rounded-3xl overflow-hidden relative bg-gradient-to-r from-on-background via-[#1d2a3f] to-[#2f4261] p-8 md:p-12 text-white">
          <img
            alt="Nền trang đăng bán"
            className="absolute inset-0 w-full h-full object-cover opacity-25"
            src="/images/hero.webp"
          />
          <div className="relative z-10 max-w-3xl space-y-4">
            <p className="inline-flex items-center px-3 py-1 rounded-full text-xs uppercase tracking-[0.2em] font-bold bg-white/15">
              Seller Studio
            </p>
            <h1 className="font-headline text-4xl md:text-6xl font-bold tracking-tight">
              Đăng bán sản phẩm
              <span className="text-primary-fixed"> đấu giá trực tiếp</span>
            </h1>
            <p className="text-white/85 text-lg leading-relaxed">
              Tạo phiên đấu giá mới chỉ trong vài phút. Điền thông tin sản phẩm,
              tải ảnh, nhập step và đăng trực tiếp qua Product + Auction API.
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
                <span className="material-symbols-outlined text-primary text-base">
                  check_circle
                </span>
                Chuẩn bị ảnh rõ nhiều góc để tăng tỉ lệ chốt giá.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  check_circle
                </span>
                Chọn đúng danh mục để người mua dễ tìm thấy sản phẩm.
              </li>
              <li className="flex items-start gap-2">
                <span className="material-symbols-outlined text-primary text-base">
                  check_circle
                </span>
                Nhập mô tả trung thực, rõ tình trạng và phụ kiện đi kèm.
              </li>
            </ul>
          </article>

          <article className="rounded-2xl bg-on-background text-white p-6">
            <h3 className="font-headline text-xl font-bold mb-3">Gợi ý giá</h3>
            <p className="text-white/75 text-sm leading-relaxed mb-4">
              Mức giá khởi điểm hợp lý thường nằm trong khoảng 60% - 80% giá thị
              trường để thu hút lượt quan tâm ban đầu.
            </p>
            <div className="rounded-xl bg-white/10 p-4">
              <p className="text-xs uppercase tracking-[0.2em] text-white/60 mb-1">
                Lưu ý
              </p>
              <p className="font-bold text-sm">
                Product API se tao san pham truoc, sau do Auction API se mo
                phien dau gia theo step va thoi gian ban nhap.
              </p>
            </div>
          </article>

          <article className="rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-6">
            <h3 className="font-headline text-xl font-bold mb-3">
              Quản lý nhanh
            </h3>
            <p className="text-on-surface-variant text-sm leading-relaxed mb-4">
              Sau khi đăng thành công, bạn có thể kiểm tra sản phẩm mới ngay tại
              trang khám phá.
            </p>
            <Link
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold"
              to={APP_ROUTES.explore}
            >
              Xem sản phẩm hiện có
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </article>
        </aside>

        <section className="lg:col-span-2 rounded-2xl bg-surface-container-low p-6 md:p-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            <div>
              <h2 className="font-headline text-3xl font-bold tracking-tight mb-2">
                Thông tin sản phẩm
              </h2>
              <p className="text-on-surface-variant text-sm">
                Các trường có dấu * là bắt buộc theo Product API.
              </p>
            </div>

            {submitError && (
              <div className="rounded-lg border border-error/40 bg-error-container/20 px-4 py-3 text-sm text-error">
                {submitError}
              </div>
            )}

            {categoryError && (
              <div className="rounded-lg border border-error/40 bg-error-container/20 px-4 py-3 text-sm text-error">
                {categoryError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="md:col-span-2">
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="name"
                >
                  Tên sản phẩm *
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="name"
                  name="name"
                  onChange={handleInputChange}
                  placeholder="VD: Figure Asuka Langley - Evangelion 1/7"
                  required
                  type="text"
                  value={formData.name}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="categoryId"
                >
                  Danh mục *
                </label>
                <select
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  disabled={isLoadingCategories}
                  id="categoryId"
                  name="categoryId"
                  onChange={handleInputChange}
                  required
                  value={formData.categoryId}
                >
                  <option value="">
                    {isLoadingCategories
                      ? "Dang tai danh muc..."
                      : "Chon danh muc"}
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={String(category.id)}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="condition"
                >
                  Tình trạng *
                </label>
                <select
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="condition"
                  name="condition"
                  onChange={handleInputChange}
                  required
                  value={formData.condition}
                >
                  <option value="">Chon tinh trang</option>
                  <option value="MISB">Mới nguyên seal (MISB)</option>
                  <option value="LIKE_NEW">Như mới</option>
                  <option value="USED_GOOD">Đã qua sử dụng - Tốt</option>
                  <option value="USED_FAIR">Đã qua sử dụng - Có lỗi nhẹ</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="status"
                >
                  Trạng thái *
                </label>
                <select
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="status"
                  name="status"
                  onChange={handleInputChange}
                  required
                  value={formData.status}
                >
                  <option value="AVAILABLE">AVAILABLE</option>
                  <option value="PENDING">PENDING</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="basePrice"
                >
                  Giá khởi điểm (VND) *
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="basePrice"
                  min={1}
                  name="basePrice"
                  onChange={handleInputChange}
                  placeholder="VD: 1000000"
                  required
                  type="number"
                  value={formData.basePrice}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="stepPrice"
                >
                  Buoc gia (step) *
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="stepPrice"
                  min={1}
                  name="stepPrice"
                  onChange={handleInputChange}
                  placeholder="VD: 50000"
                  required
                  type="number"
                  value={formData.stepPrice}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="auctionStartTime"
                >
                  Bat dau dau gia *
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="auctionStartTime"
                  name="auctionStartTime"
                  onChange={handleInputChange}
                  required
                  type="datetime-local"
                  value={formData.auctionStartTime}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="auctionEndTime"
                >
                  Ket thuc dau gia *
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="auctionEndTime"
                  name="auctionEndTime"
                  onChange={handleInputChange}
                  required
                  type="datetime-local"
                  value={formData.auctionEndTime}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="scale"
                >
                  Tỷ lệ mô hình
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="scale"
                  name="scale"
                  onChange={handleInputChange}
                  placeholder="VD: 1/7"
                  type="text"
                  value={formData.scale}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="height"
                >
                  Chiều cao (cm)
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="height"
                  min={0}
                  name="height"
                  onChange={handleInputChange}
                  placeholder="VD: 23.5"
                  step="0.1"
                  type="number"
                  value={formData.height}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-semibold mb-2"
                  htmlFor="material"
                >
                  Chất liệu
                </label>
                <input
                  className="w-full rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                  id="material"
                  name="material"
                  onChange={handleInputChange}
                  placeholder="VD: PVC, ABS"
                  type="text"
                  value={formData.material}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-headline text-2xl font-bold">
                Hình ảnh sản phẩm *
              </h3>
              <ImageUpload
                key={imageUploadKey}
                className="w-full"
                folder="products"
                maxFiles={6}
                multiple
                onUploadComplete={(uploadResult) => {
                  const imageUrl = normalizeUploadedImageUrl(uploadResult);
                  if (!imageUrl) {
                    return;
                  }

                  setUploadedImageUrls((prev) => {
                    if (prev.includes(imageUrl)) {
                      return prev;
                    }
                    return [...prev, imageUrl];
                  });
                }}
                onUploadError={(message) => {
                  setSubmitError(message || "Tai anh len that bai.");
                }}
              />

              {uploadedImageUrls.length > 0 && (
                <div className="space-y-2 rounded-xl border border-outline-variant/40 bg-surface-container-lowest p-4">
                  <p className="text-sm font-semibold">
                    Ảnh đã tải thành công ({uploadedImageUrls.length})
                  </p>
                  <div className="space-y-2">
                    {uploadedImageUrls.map((imageUrl, index) => (
                      <div
                        key={imageUrl}
                        className="flex items-center justify-between gap-3 rounded-lg bg-surface-container px-3 py-2 text-sm"
                      >
                        <a
                          className="truncate text-secondary hover:underline"
                          href={imageUrl}
                          rel="noreferrer"
                          target="_blank"
                        >
                          Ảnh {index + 1}
                        </a>
                        <button
                          className="text-error hover:underline"
                          onClick={() => handleRemoveUploadedImage(imageUrl)}
                          type="button"
                        >
                          Xóa
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-on-surface-variant">
                URL ảnh sẽ được thêm tự động vào payload `imageUrls` của Product
                API.
              </p>
            </div>

            <div>
              <label
                className="block text-sm font-semibold mb-2"
                htmlFor="description"
              >
                Mô tả chi tiết *
              </label>
              <textarea
                className="w-full min-h-[160px] rounded-lg border border-outline-variant/40 bg-surface-container-lowest px-4 py-3"
                id="description"
                name="description"
                onChange={handleInputChange}
                placeholder="Mô tả tình trạng sản phẩm, phụ kiện đi kèm, nguồn gốc và các lưu ý khác..."
                required
                value={formData.description}
              />
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 text-sm text-on-surface-variant">
                <input
                  checked={isAuthenticChecked}
                  className="mt-1 rounded border-outline-variant/50"
                  onChange={(event) =>
                    setIsAuthenticChecked(event.target.checked)
                  }
                  required
                  type="checkbox"
                />
                Tôi cam kết sản phẩm đăng bán là hàng chính hãng và chịu trách
                nhiệm về tính xác thực của thông tin.
              </label>

              <label className="flex items-start gap-3 text-sm text-on-surface-variant">
                <input
                  checked={isPolicyChecked}
                  className="mt-1 rounded border-outline-variant/50"
                  onChange={(event) => setIsPolicyChecked(event.target.checked)}
                  required
                  type="checkbox"
                />
                Tôi đồng ý với điều khoản đấu giá, phí dịch vụ và quy trình xử
                lý tranh chấp của nền tảng.
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                className="px-6 py-3 rounded-lg bg-primary text-white font-headline font-bold text-lg hover:bg-primary-container transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={
                  isSubmitting ||
                  !hasMinimumRequiredFields ||
                  isLoadingCategories
                }
                type="submit"
              >
                {isSubmitting ? "Dang dang san pham..." : "Đăng phiên đấu giá"}
              </button>

              <Link
                className="px-6 py-3 rounded-lg border border-outline-variant/50 bg-surface-container-lowest font-semibold hover:bg-surface-container transition-colors text-center"
                to={APP_ROUTES.dashboard}
              >
                Về bảng điều khiển
              </Link>
            </div>
          </form>
        </section>
      </section>
    </main>
  );
}
