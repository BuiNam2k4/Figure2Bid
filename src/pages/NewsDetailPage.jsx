import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsById } from "../services/newsService";

function formatDate(value) {
  if (!value) {
    return "";
  }

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) {
    return "";
  }

  return parsed.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

function parseContentBlocks(value) {
  if (!value) {
    return [];
  }

  const blocks = [];
  const imagePattern = /!\[[^\]]*\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match = imagePattern.exec(value);

  const pushTextBlock = (text) => {
    text
      .split(/\n{2,}|\r\n{2,}/)
      .map((paragraph) => paragraph.replace(/\s+/g, " ").trim())
      .filter(Boolean)
      .forEach((paragraph) => blocks.push({ type: "text", value: paragraph }));
  };

  while (match) {
    const matchIndex = match.index;
    const before = value.slice(lastIndex, matchIndex);
    if (before.trim()) {
      pushTextBlock(before);
    }

    blocks.push({ type: "image", value: match[1] });

    lastIndex = matchIndex + match[0].length;
    match = imagePattern.exec(value);
  }

  const remaining = value.slice(lastIndex);
  if (remaining.trim()) {
    pushTextBlock(remaining);
  }

  return blocks;
}

export default function NewsDetailPage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchNewsDetail = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getNewsById(id);

        if (!isMounted) {
          return;
        }

        setArticle(data);
      } catch (fetchError) {
        if (isMounted) {
          setError(fetchError?.message || "Khong the tai bai viet.");
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    fetchNewsDetail();

    return () => {
      isMounted = false;
    };
  }, [id]);

  const contentBlocks = useMemo(
    () => parseContentBlocks(article?.content || article?.summary || ""),
    [article],
  );

  return (
    <main className="pt-24 pb-20 px-6 max-w-[1100px] mx-auto">
      <div className="flex items-center gap-2 text-sm text-on-surface-variant">
        <Link to="/" className="hover:text-primary">
          Trang chu
        </Link>
        <span>/</span>
        <Link to="/news" className="hover:text-primary">
          Tin tuc
        </Link>
        <span>/</span>
        <span className="text-on-surface">
          {article?.title || "Dang tai..."}
        </span>
      </div>

      {error ? (
        <div className="mt-6 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {isLoading ? (
        <div className="mt-10 rounded-2xl border border-dashed border-outline-variant/40 bg-surface-container-lowest px-4 py-6 text-center text-sm text-on-surface-variant">
          Dang tai bai viet...
        </div>
      ) : article ? (
        <article className="mt-10 space-y-6">
          <header className="space-y-4">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary">
              {article.status || "News"}
            </p>
            <h1 className="font-headline text-4xl font-bold leading-tight text-on-surface">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-3 text-sm text-on-surface-variant">
              <span>{article.authorUsername || "Admin"}</span>
              <span className="h-1 w-1 rounded-full bg-outline" />
              <span>{formatDate(article.createdAt)}</span>
            </div>
            <p className="text-lg text-on-surface-variant">
              {article.summary || "Chua co tom tat cho bai viet nay."}
            </p>
          </header>

          <img
            alt={article.title}
            className="w-full rounded-3xl object-cover"
            src={article.thumbnailUrl || "/images/hero.gif"}
          />

          <div className="space-y-4 text-base leading-relaxed text-on-surface-variant">
            {contentBlocks.length > 0 ? (
              contentBlocks.map((block, index) => {
                if (block.type === "image") {
                  return (
                    <img
                      key={`${article.id}-img-${index}`}
                      alt={article.title}
                      className="w-full rounded-2xl object-cover"
                      src={block.value}
                    />
                  );
                }

                return <p key={`${article.id}-p-${index}`}>{block.value}</p>;
              })
            ) : (
              <p>Chua co noi dung chi tiet cho bai viet nay.</p>
            )}
          </div>
        </article>
      ) : null}
    </main>
  );
}
