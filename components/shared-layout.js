(function () {
  function getPathContext() {
    var normalizedPath = window.location.pathname.replace(/\\/g, "/");
    var segments = normalizedPath.split("/").filter(Boolean);
    var currentFile =
      segments.length > 0 ? segments[segments.length - 1] : "index.html";

    if (currentFile.indexOf(".") === -1) {
      currentFile = "index.html";
    }

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

  function isCurrentPage(context, fileName) {
    if (context.currentFile === fileName) {
      return true;
    }

    return (
      context.currentFile === "index.html" &&
      (fileName === "index.html" || fileName === "home-page.html")
    );
  }

  function makeNavLink(context, label, fileName) {
    var isActive = isCurrentPage(context, fileName);
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

  function makeMobileMenuLink(context, label, fileName) {
    var isActive = isCurrentPage(context, fileName);
    var linkClass = isActive
      ? "flex items-center justify-between rounded-lg border border-primary/20 bg-primary/10 px-3 py-2.5 text-sm font-semibold text-primary"
      : "flex items-center justify-between rounded-lg border border-transparent px-3 py-2.5 text-sm font-semibold text-on-surface hover:bg-surface-container-high transition-colors";
    var iconClass = isActive ? "text-primary" : "text-on-surface-variant";
    var iconName = isActive ? "check" : "chevron_right";

    return (
      '<a data-mobile-nav-link class="' +
      linkClass +
      '" href="' +
      context.pageLink(fileName) +
      '"><span>' +
      label +
      '</span><span class="material-symbols-outlined text-base ' +
      iconClass +
      '">' +
      iconName +
      "</span></a>"
    );
  }

  function getPageLabel(fileName) {
    var labels = {
      "index.html": "Trang chủ",
      "home-page.html": "Trang chủ",
      "explore-page.html": "Khám phá",
      "news-page.html": "Tin tức",
      "dashboard-page.html": "Bảng điều khiển",
      "auction-detail-page.html": "Chi tiết đấu giá",
      "cart-page.html": "Giỏ hàng",
      "sell-auction-page.html": "Đăng bán",
      "login-page.html": "Đăng nhập",
      "register-page.html": "Đăng ký",
      "landing-page.html": "Landing page",
    };

    return labels[fileName] || "Figure2Bid";
  }

  function makeMobileBreadcrumb(context) {
    var currentLabel = getPageLabel(context.currentFile);
    var isHomePage =
      context.currentFile === "index.html" ||
      context.currentFile === "home-page.html";
    var crumbLinkClass =
      "text-on-surface-variant hover:text-primary transition-colors text-xs font-semibold uppercase tracking-widest";
    var crumbCurrentClass =
      "text-primary text-xs font-bold uppercase tracking-widest";

    if (isHomePage) {
      currentLabel = "Tổng quan";
    }

    return (
      '<a class="' +
      crumbLinkClass +
      '" href="' +
      context.indexLink +
      '">Trang chủ</a>' +
      '<span class="text-on-surface-variant/70">/</span>' +
      '<span class="' +
      crumbCurrentClass +
      '">' +
      currentLabel +
      "</span>"
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
      var mobileMenuItems = [
        { label: "Trang chủ", fileName: "home-page.html" },
        { label: "Khám phá", fileName: "explore-page.html" },
        { label: "Tin tức", fileName: "news-page.html" },
        { label: "Phiên đấu giá", fileName: "auction-detail-page.html" },
        { label: "Bảng điều khiển", fileName: "dashboard-page.html" },
        { label: "Giỏ hàng", fileName: "cart-page.html" },
        { label: "Đăng bán", fileName: "sell-auction-page.html" },
        { label: "Đăng nhập", fileName: "login-page.html" },
        { label: "Đăng ký", fileName: "register-page.html" },
      ];

      var navHtml = navItems
        .map(function (item) {
          return makeNavLink(context, item.label, item.fileName);
        })
        .join("");
      var mobileMenuHtml = mobileMenuItems
        .map(function (item) {
          return makeMobileMenuLink(context, item.label, item.fileName);
        })
        .join("");
      var mobileBreadcrumbHtml = makeMobileBreadcrumb(context);

      this.innerHTML =
        '<header class="fixed top-0 w-full z-50 bg-[#f9f9ff]/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(17,28,44,0.06)]">' +
        '<nav class="flex items-center justify-between px-4 md:px-8 py-2 max-w-[1440px] mx-auto gap-3">' +
        '<a class="flex items-center" href="' +
        context.indexLink +
        '"><img class="h-10 md:h-14 w-auto object-contain origin-left md:scale-150" src="' +
        context.imageLink("logo_png.png") +
        '" alt="Figure2Bid" /></a>' +
        '<div class="hidden md:flex items-center gap-8 font-headline tracking-tight">' +
        navHtml +
        "</div>" +
        '<div class="flex items-center gap-1.5 sm:gap-3">' +
        '<a aria-label="Cart" class="hidden sm:inline-flex hover:opacity-80 transition-all duration-300 scale-95 active:scale-90 text-[#111c2c]" href="' +
        context.pageLink("cart-page.html") +
        '"><span class="material-symbols-outlined">shopping_cart</span></a>' +
        '<a class="hidden sm:inline-flex items-center rounded-lg border border-primary/30 bg-primary/5 px-3 py-2 text-sm font-semibold text-primary hover:bg-primary hover:text-white transition-colors" href="' +
        context.pageLink("sell-auction-page.html") +
        '">Đăng bán</a>' +
        '<a class="inline-flex items-center whitespace-nowrap rounded-lg border border-outline-variant/50 bg-surface-container-lowest px-2.5 py-2 text-xs font-semibold text-[#111c2c] hover:bg-surface-container-high transition-colors sm:px-3 sm:text-sm" href="' +
        context.pageLink("login-page.html") +
        '">Đăng nhập</a>' +
        '<a class="inline-flex items-center whitespace-nowrap rounded-lg bg-primary px-2.5 py-2 text-xs font-semibold text-white hover:bg-primary-container transition-colors sm:px-3 sm:text-sm" href="' +
        context.pageLink("register-page.html") +
        '">Đăng ký</a>' +
        '<button type="button" aria-label="Mở menu điều hướng" aria-expanded="false" data-mobile-menu-toggle class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-outline-variant/50 bg-surface-container-lowest text-[#111c2c] hover:bg-surface-container-high transition-colors sm:hidden">' +
        '<span class="material-symbols-outlined text-[20px]" data-mobile-menu-icon>menu</span>' +
        "</button>" +
        "</div>" +
        "</nav>" +
        '<div class="md:hidden border-t border-outline-variant/40 bg-white/95">' +
        '<div class="flex items-center gap-2 px-4 py-2.5 max-w-[1440px] mx-auto overflow-x-auto whitespace-nowrap">' +
        mobileBreadcrumbHtml +
        "</div>" +
        "</div>" +
        '<div class="md:hidden hidden border-t border-outline-variant/40 bg-white/95" data-mobile-menu>' +
        '<div class="max-w-[1440px] mx-auto px-4 py-3 max-h-[70vh] overflow-y-auto">' +
        '<p class="mb-2 text-[11px] uppercase tracking-[0.16em] font-bold text-on-surface-variant">Điều hướng nhanh</p>' +
        '<div class="grid grid-cols-1 gap-1.5">' +
        mobileMenuHtml +
        "</div>" +
        "</div>" +
        "</div>" +
        "</header>";

      var mobileMenuToggle = this.querySelector("[data-mobile-menu-toggle]");
      var mobileMenu = this.querySelector("[data-mobile-menu]");
      var mobileMenuIcon = this.querySelector("[data-mobile-menu-icon]");
      var host = this;

      function closeMobileMenu() {
        if (!mobileMenu || !mobileMenuToggle) {
          return;
        }

        mobileMenu.classList.add("hidden");
        mobileMenuToggle.setAttribute("aria-expanded", "false");

        if (mobileMenuIcon) {
          mobileMenuIcon.textContent = "menu";
        }
      }

      function openMobileMenu() {
        if (!mobileMenu || !mobileMenuToggle) {
          return;
        }

        mobileMenu.classList.remove("hidden");
        mobileMenuToggle.setAttribute("aria-expanded", "true");

        if (mobileMenuIcon) {
          mobileMenuIcon.textContent = "close";
        }
      }

      if (mobileMenuToggle && mobileMenu) {
        mobileMenuToggle.addEventListener("click", function (event) {
          event.stopPropagation();

          if (mobileMenu.classList.contains("hidden")) {
            openMobileMenu();
          } else {
            closeMobileMenu();
          }
        });

        mobileMenu
          .querySelectorAll("[data-mobile-nav-link]")
          .forEach(function (link) {
            link.addEventListener("click", function () {
              closeMobileMenu();
            });
          });

        this.handleOutsideClick = function (event) {
          if (!host.contains(event.target)) {
            closeMobileMenu();
          }
        };
        document.addEventListener("click", this.handleOutsideClick);

        this.handleResize = function () {
          if (window.innerWidth >= 768) {
            closeMobileMenu();
          }
        };
        window.addEventListener("resize", this.handleResize);
      }
    }

    disconnectedCallback() {
      if (this.handleOutsideClick) {
        document.removeEventListener("click", this.handleOutsideClick);
        this.handleOutsideClick = null;
      }

      if (this.handleResize) {
        window.removeEventListener("resize", this.handleResize);
        this.handleResize = null;
      }
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
