(function () {
  function getPathContext() {
    var normalizedPath = window.location.pathname.replace(/\\/g, "/");
    var segments = normalizedPath.split("/").filter(Boolean);
    var currentFile =
      segments.length > 0 ? segments[segments.length - 1] : "index.html";
    var isInPagesFolder = segments.indexOf("pages") !== -1;

    function pageLink(fileName) {
      return isInPagesFolder ? fileName : "pages/" + fileName;
    }

    function imageLink(fileName) {
      return isInPagesFolder ? "../images/" + fileName : "images/" + fileName;
    }

    return {
      currentFile: currentFile,
      indexLink: isInPagesFolder ? "../index.html" : "index.html",
      pageLink: pageLink,
      imageLink: imageLink,
    };
  }

  function navLinkClasses(isActive) {
    var base = "transition-colors";
    return isActive
      ? "text-primary font-bold " + base
      : "text-[#111c2c] hover:text-[#b81120] " + base;
  }

  function makeNavLink(context, label, fileName) {
    var isActive = context.currentFile === fileName;
    return (
      '<a class="' +
      navLinkClasses(isActive) +
      '" href="' +
      context.pageLink(fileName) +
      '">' +
      label +
      "</a>"
    );
  }

  class SiteHeader extends HTMLElement {
    connectedCallback() {
      var context = getPathContext();
      var navItems = [
        { label: "Trang chủ", fileName: "home-page.html" },
        { label: "Khám phá", fileName: "explore-page.html" },
        { label: "Tin tức", fileName: "news-page.html" },
        { label: "Bảng điều khiển", fileName: "dashboard-page.html" },
      ];

      var navHtml = navItems
        .map(function (item) {
          return makeNavLink(context, item.label, item.fileName);
        })
        .join("");

      this.innerHTML =
        '<header class="fixed top-0 w-full z-50 bg-[#f9f9ff]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(17,28,44,0.06)]">' +
        '<nav class="flex items-center justify-between px-8 py-2 max-w-[1440px] mx-auto">' +
        '<a class="flex items-center" href="' +
        context.indexLink +
        '"><img class="h-14 w-auto object-contain origin-left scale-150" src="' +
        context.imageLink("logo_png.png") +
        '" alt="Figure2Bid" /></a>' +
        '<div class="hidden md:flex items-center gap-8 font-headline tracking-tight">' +
        navHtml +
        "</div>" +
        '<div class="flex items-center gap-2 sm:gap-3">' +
        '<a aria-label="Cart" class="hidden sm:inline-flex hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 text-[#111c2c]" href="' +
        context.pageLink("cart-page.html") +
        '"><span class="material-symbols-outlined">shopping_cart</span></a>' +
        '<a class="hidden sm:inline-flex items-center rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors" href="' +
        context.pageLink("sell-auction-page.html") +
        '">Đăng bán</a>' +
        '<a class="rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-3 py-2 text-sm font-semibold text-[#111c2c] hover:bg-surface-container-high transition-colors" href="' +
        context.pageLink("login-page.html") +
        '">Đăng nhập</a>' +
        '<a class="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-white hover:bg-primary-container transition-colors" href="' +
        context.pageLink("register-page.html") +
        '">Đăng ký</a>' +
        "</div>" +
        "</nav>" +
        "</header>";
    }
  }

  class SiteFooter extends HTMLElement {
    connectedCallback() {
      var context = getPathContext();

      this.innerHTML =
        '<footer class="w-full bg-slate-100 mt-20 tonal-layering-top">' +
        '<div class="grid grid-cols-2 md:flex md:justify-between items-center px-12 py-16 w-full max-w-screen-2xl mx-auto">' +
        '<div class="col-span-2 md:col-span-1 mb-8 md:mb-0">' +
        '<div class="text-xl font-black text-slate-900 mb-4">Figure2Bid</div>' +
        "<p class=\"font-['Plus_Jakarta_Sans'] text-sm text-slate-500 max-w-xs leading-relaxed\">© 2026 Figure2Bid. Bảo lưu mọi quyền. Nền tảng đấu giá và lưu trữ cho văn hóa 2D.</p>" +
        "</div>" +
        "<div class=\"flex flex-wrap gap-8 md:gap-12 font-['Plus_Jakarta_Sans'] text-sm\">" +
        '<a class="text-slate-500 hover:text-slate-900 transition-all opacity-80 hover:opacity-100" href="' +
        context.pageLink("home-page.html") +
        '">Chính sách</a>' +
        '<a class="text-slate-500 hover:text-slate-900 transition-all opacity-80 hover:opacity-100" href="' +
        context.pageLink("home-page.html") +
        '">Điều khoản</a>' +
        '<a class="text-slate-500 hover:text-slate-900 transition-all opacity-80 hover:opacity-100" href="' +
        context.pageLink("cart-page.html") +
        '">Giao hàng</a>' +
        '<a class="text-slate-500 hover:text-slate-900 transition-all opacity-80 hover:opacity-100" href="' +
        context.pageLink("login-page.html") +
        '">Xác thực</a>' +
        '<a class="text-slate-500 hover:text-slate-900 transition-all opacity-80 hover:opacity-100" href="' +
        context.pageLink("news-page.html") +
        '">Tin tức</a>' +
        "</div>" +
        '<div class="hidden lg:flex items-center gap-4">' +
        '<div class="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer"><span class="material-symbols-outlined text-sm">alternate_email</span></div>' +
        '<div class="w-10 h-10 rounded-full border border-slate-300 flex items-center justify-center text-slate-500 hover:bg-primary hover:text-white hover:border-primary transition-all cursor-pointer"><span class="material-symbols-outlined text-sm">language</span></div>' +
        "</div>" +
        "</div>" +
        "</footer>";
    }
  }

  customElements.define("site-header", SiteHeader);
  customElements.define("site-footer", SiteFooter);
})();
