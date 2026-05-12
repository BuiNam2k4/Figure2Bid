import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getNewsBySlug } from "../services/newsService";

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
  const linkedImagePattern = /^\[!\[[^\]]*\]\s*\(([^)]+)\)\]\s*\(([^)]+)\)/;
  const imagePattern = /^!\[[^\]]*\]\s*\(([^)]+)\)/;
  const headingPattern = /^(#{1,6})\s+(.*)$/;

  value.split(/\r?\n/).forEach((rawLine) => {
    const line = rawLine.trim();
    if (!line) {
      return;
    }

    const headingMatch = line.match(headingPattern);
    if (headingMatch) {
      blocks.push({
        type: "heading",
        level: headingMatch[1].length,
        value: headingMatch[2].trim(),
      });
      return;
    }

    const linkedImageMatch = line.match(linkedImagePattern);
    if (linkedImageMatch) {
      blocks.push({
        type: "image",
        value: linkedImageMatch[1],
        link: linkedImageMatch[2],
      });
      return;
    }

    const imageMatch = line.match(imagePattern);
    if (imageMatch) {
      blocks.push({ type: "image", value: imageMatch[1] });
      return;
    }

    blocks.push({ type: "text", value: line });
  });

  return blocks;
}

function renderInlineMarkdown(value) {
  if (!value) {
    return null;
  }

  const nodes = [];
  const pattern =
    /\[!\[[^\]]*\]\s*\(([^)]+)\)\]\s*\(([^)]+)\)|!\[[^\]]*\]\s*\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match = pattern.exec(value);

  const isExternalLink = (href) => /^https?:\/\//i.test(href);

  while (match) {
    const matchIndex = match.index;
    const before = value.slice(lastIndex, matchIndex);
    if (before) {
      nodes.push(before);
    }

    if (match[1]) {
      const imageUrl = match[1];
      const linkUrl = match[2];
      const imageNode = (
        <img
          alt=""
          className="my-4 w-full rounded-2xl object-cover"
          src={imageUrl}
        />
      );
      if (linkUrl) {
        nodes.push(
          <a
            key={`${linkUrl}-${matchIndex}`}
            href={linkUrl}
            className="text-inherit no-underline"
            target={isExternalLink(linkUrl) ? "_blank" : undefined}
            rel={isExternalLink(linkUrl) ? "noreferrer" : undefined}
          >
            {imageNode}
          </a>,
        );
      } else {
        nodes.push(imageNode);
      }
    } else if (match[3]) {
      const imageUrl = match[3];
      nodes.push(
        <img
          key={`${imageUrl}-${matchIndex}`}
          alt=""
          className="my-4 w-full rounded-2xl object-cover"
          src={imageUrl}
        />,
      );
    } else {
      const label = match[4];
      const href = match[5];
      if (href && href.startsWith("/")) {
        nodes.push(
          <Link
            key={`${href}-${matchIndex}`}
            to={href}
            className="text-inherit no-underline"
          >
            {label}
          </Link>,
        );
      } else {
        nodes.push(
          <a
            key={`${href}-${matchIndex}`}
            href={href}
            className="text-inherit no-underline"
            target={isExternalLink(href) ? "_blank" : undefined}
            rel={isExternalLink(href) ? "noreferrer" : undefined}
          >
            {label}
          </a>,
        );
      }
    }

    lastIndex = matchIndex + match[0].length;
    match = pattern.exec(value);
  }

  const remaining = value.slice(lastIndex);
  if (remaining) {
    nodes.push(remaining);
  }

  return nodes;
}

export default function NewsDetailPage() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [visibleAds, setVisibleAds] = useState({ left: true, right: true });
  const [isCenterAdVisible, setIsCenterAdVisible] = useState(true);

  const adCloseLink = "https://shorten.asia/Q9pEU9xh";

  const handleCloseAd = (position) => {
    setVisibleAds((prev) => ({ ...prev, [position]: false }));
    window.open(adCloseLink, "_blank", "noopener,noreferrer");
  };

  const handleCloseCenterAd = () => {
    setIsCenterAdVisible(false);
    window.open(adCloseLink, "_blank", "noopener,noreferrer");
  };

  useEffect(() => {
    if (!slug) {
      return undefined;
    }

    const interval = setInterval(() => {
      setIsCenterAdVisible(true);
    }, 20000);

    return () => clearInterval(interval);
  }, [slug]);

  useEffect(() => {
    let isMounted = true;

    const fetchNewsDetail = async () => {
      setIsLoading(true);
      setError("");

      try {
        const data = await getNewsBySlug(slug);

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
  }, [slug]);

  const contentBlocks = useMemo(
    () => parseContentBlocks(article?.content || article?.summary || ""),
    [article],
  );

  return (
    <main className="pt-24 pb-20 px-6 max-w-[1100px] mx-auto">
      <button
        type="button"
        onClick={() => {
          window.open("/explore", "_blank", "noopener,noreferrer");
          window.open(
            "https://shorten.asia/Q9pEU9xh",
            "_blank",
            "noopener,noreferrer",
          );
        }}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-white shadow-lg opacity-80 transition-opacity hover:opacity-100 animate-pulse"
        aria-label="Chot don ngay"
      >
        Chot don ngay
      </button>
      {isCenterAdVisible ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="relative w-full max-w-3xl overflow-hidden rounded-3xl border border-outline-variant/40 bg-surface-container-lowest shadow-2xl">
            <button
              type="button"
              onClick={handleCloseCenterAd}
              className="absolute right-4 top-4 h-9 w-9 rounded-full border border-outline-variant/40 bg-white text-sm font-bold text-on-surface hover:bg-surface-container"
              aria-label="Dong quang cao"
            >
              x
            </button>
            <div className="grid gap-6 p-6 md:grid-cols-[1.2fr_1fr] md:items-center">
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                  Suu tap doc quyen
                </p>
                <h2 className="font-headline text-3xl font-bold text-on-surface">
                  Giam gia 40% cho phien dau gia dac biet
                </h2>
                <p className="text-sm text-on-surface-variant">
                  Chi co hom nay. Nhan voucher va tham gia dau gia ngay de so
                  huu nhung figure hiem nhat.
                </p>
                <div className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
                  MO NGAY
                </div>
              </div>
              <img
                alt="Quang cao lon"
                className="h-56 w-full rounded-2xl object-cover md:h-64"
                src="/images/hero.gif"
              />
            </div>
          </div>
        </div>
      ) : null}
      {visibleAds.left ? (
        <aside className="fixed left-4 top-36 z-40 hidden xl:block">
          <div className="relative w-56 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-xl">
            <button
              type="button"
              onClick={() => handleCloseAd("left")}
              className="absolute right-2 top-2 h-7 w-7 rounded-full border border-outline-variant/40 bg-white text-xs font-bold text-on-surface hover:bg-surface-container"
              aria-label="Dong quang cao"
            >
              x
            </button>
            <div className="space-y-2 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-primary font-bold">
                Quang cao
              </p>
              <p className="text-sm text-on-surface-variant">
                Bo suu tap figure moi ve, giam 30% cho don hang hom nay.
              </p>
              <img
                alt="Quang cao figure"
                className="w-full rounded-xl object-cover"
                src="/images/img1.webp"
              />
            </div>
          </div>
        </aside>
      ) : null}

      {visibleAds.right ? (
        <aside className="fixed right-4 top-52 z-40 hidden xl:block">
          <div className="relative w-56 rounded-2xl border border-outline-variant/40 bg-surface-container-lowest p-4 shadow-xl">
            <button
              type="button"
              onClick={() => handleCloseAd("right")}
              className="absolute right-2 top-2 h-7 w-7 rounded-full border border-outline-variant/40 bg-white text-xs font-bold text-on-surface hover:bg-surface-container"
              aria-label="Dong quang cao"
            >
              x
            </button>
            <div className="space-y-2 pt-4">
              <p className="text-xs uppercase tracking-[0.2em] text-secondary font-bold">
                Flash deal
              </p>
              <p className="text-sm text-on-surface-variant">
                Dau gia linh vat doc quyen, bat dau chi tu 199k.
              </p>
              <img
                alt="Quang cao dau gia"
                className="w-full rounded-xl object-cover"
                src="/images/img2.webp"
              />
            </div>
          </div>
        </aside>
      ) : null}
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
                  const imageNode = (
                    <img
                      alt={article.title}
                      className="w-full rounded-2xl object-cover"
                      src={block.value}
                    />
                  );
                  if (block.link) {
                    return (
                      <a
                        key={`${article.id}-img-${index}`}
                        href={block.link}
                        className="text-inherit no-underline"
                        target={
                          block.link.startsWith("http") ? "_blank" : undefined
                        }
                        rel={
                          block.link.startsWith("http")
                            ? "noreferrer"
                            : undefined
                        }
                      >
                        {imageNode}
                      </a>
                    );
                  }

                  return (
                    <div key={`${article.id}-img-${index}`}>{imageNode}</div>
                  );
                }

                if (block.type === "heading") {
                  const HeadingTag = `h${block.level}`;
                  return (
                    <HeadingTag
                      key={`${article.id}-h-${index}`}
                      className="font-headline text-2xl font-bold text-on-surface"
                    >
                      {renderInlineMarkdown(block.value)}
                    </HeadingTag>
                  );
                }

                return (
                  <p key={`${article.id}-p-${index}`}>
                    {renderInlineMarkdown(block.value)}
                  </p>
                );
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
