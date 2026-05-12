import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { listNews } from "../services/newsService";

export default function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await listNews({
          page: 0,
          size: 30,
          sort: "createdAt,desc",
        });

        if (!isMounted) {
          return;
        }

        setArticles(data?.content ?? []);
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.message || "Khong the tai tin tuc.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  const featuredArticle = articles[0];
  const gridArticles = articles;

  const resolveNewsSlug = (article) => article?.slug || article?.id;

  return (
    <main className="pt-24 pb-20 px-6 max-w-[1440px] mx-auto">
      <section className="mb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {featuredArticle ? (
            <Link
              to={`/news/${resolveNewsSlug(featuredArticle)}`}
              className="group lg:col-span-8 rounded-2xl overflow-hidden bg-on-background text-white relative"
            >
              <img
                alt={featuredArticle.title}
                className="w-full h-[420px] object-cover opacity-65 transition-transform duration-500 group-hover:scale-[1.02]"
                src={featuredArticle.thumbnailUrl || "/images/hero.gif"}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-8 right-8 bottom-8 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold bg-primary/85 px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">
                    newspaper
                  </span>
                  Tin Noi Bat
                </span>
                <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                  {featuredArticle.title}
                </h1>
                <p className="text-white/85 text-lg">
                  {featuredArticle.summary ||
                    "Chua co tom tat cho bai viet nay."}
                </p>
              </div>
            </Link>
          ) : (
            <article className="lg:col-span-8 rounded-2xl overflow-hidden bg-on-background text-white relative">
              <img
                alt="Tin noi bat"
                className="w-full h-[420px] object-cover opacity-65"
                src="/images/hero.gif"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute left-8 right-8 bottom-8 space-y-4">
                <span className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold bg-primary/85 px-3 py-1 rounded-full">
                  <span className="material-symbols-outlined text-sm">
                    newspaper
                  </span>
                  Tin Noi Bat
                </span>
                <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight">
                  Toan canh thi truong figure quy hiem quy II/2026
                </h1>
                <p className="text-white/85 text-lg">
                  Tong hop xu huong dau gia, nhom san pham tang gia manh va
                  chien luoc ra gia danh cho nha suu tam moi.
                </p>
              </div>
            </article>
          )}
          <aside className="lg:col-span-4 space-y-4">
            <div className="rounded-2xl bg-surface-container-low p-6 border border-surface-container-high">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-secondary mb-3">
                Chuyên mục
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">
                  Thị trường
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">
                  Sự kiện
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">
                  Mẹo đấu giá
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-high text-xs font-semibold">
                  Bảo quản figure
                </span>
              </div>
            </div>
            <div className="rounded-2xl bg-surface-container-lowest p-6 border border-outline-variant/40">
              <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary mb-3">
                Cập nhật mới
              </p>
              <ul className="space-y-3 text-sm text-on-surface-variant">
                <li>09:00 - Lịch mở 5 phiên đấu giá hiếm tuần này</li>
                <li>11:30 - Top figure tăng giá mạnh nhất tháng</li>
                <li>14:15 - Cảnh báo hàng giả theo series phổ biến</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>
      <section>
        <div className="flex items-end justify-between mb-8">
          <h2 className="font-headline text-3xl font-bold">Tin Tức Mới Nhất</h2>
          <a
            className="text-secondary font-bold hover:underline"
            href="/explore"
          >
            Xem phiên đấu giá
          </a>
        </div>
        {error ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading ? (
            <div className="rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-lowest px-4 py-6 text-center text-sm text-on-surface-variant">
              Dang tai tin tuc...
            </div>
          ) : articles.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-lowest px-4 py-6 text-center text-sm text-on-surface-variant">
              Chua co tin tuc nao.
            </div>
          ) : (
            gridArticles.map((article) => (
              <Link
                key={article.id}
                to={`/news/${resolveNewsSlug(article)}`}
                className="rounded-2xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 hover:shadow-xl transition-shadow"
              >
                <img
                  alt={article.title}
                  className="w-full h-52 object-cover"
                  src={article.thumbnailUrl || "/images/img1.webp"}
                />
                <div className="p-5 space-y-3">
                  <p className="text-xs uppercase tracking-[0.2em] font-bold text-primary">
                    {article.status || "News"}
                  </p>
                  <h3 className="font-headline text-xl font-bold">
                    {article.title}
                  </h3>
                  <p className="text-sm text-on-surface-variant">
                    {article.summary || "Chua co tom tat cho bai viet nay."}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      </section>
    </main>
  );
}
