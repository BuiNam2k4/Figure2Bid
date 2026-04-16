import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <main className="pt-32 pb-20 px-6 md:px-10 max-w-4xl mx-auto">
      <div className="rounded-3xl border border-outline-variant/50 bg-surface-container-low p-8 md:p-12">
        <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-3">
          404
        </p>
        <h1 className="font-headline text-4xl md:text-5xl font-black tracking-tight mb-4">
          Không tìm thấy trang
        </h1>
        <p className="text-on-surface-variant leading-relaxed mb-8">
          Đường dẫn bạn đang truy cập không tồn tại trong phiên bản React Vite
          của FigureAuction.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 font-bold text-white hover:bg-primary-container transition-colors"
        >
          Về trang chủ
          <span className="material-symbols-outlined text-base">
            arrow_forward
          </span>
        </Link>
      </div>
    </main>
  );
}
