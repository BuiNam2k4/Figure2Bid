import { Link } from "react-router-dom";

const cartItems = [
  {
    id: "AK-99212",
    status: "Cho thanh toan",
    name: "Gundam MGEX 1/100",
    subtitle: "Unicorn Gundam Ver.Ka - Ultra Detail Series",
    price: "Y24,500",
    image: "/images/img1.jpg",
    imageAlt:
      "high-detail studio photograph of a premium master grade gundam model kit with mechanical internal frame details visible",
  },
  {
    id: "AK-10452",
    status: "Cho thanh toan",
    name: "Berserk Deluxe Edition",
    subtitle: "Volumes 1-3 Hardcover Collection - Dark Horse",
    price: "Y12,800",
    image: "/images/img4.jpg",
    imageAlt:
      "dark atmospheric shot of a thick black leather-bound deluxe manga volume with red foil stamping on a marble surface",
  },
];

const suggestedItems = [
  {
    title: "Evangelion Unit-01 Chrome",
    priceLabel: "Gia hien tai: Y52,000",
    subLabel: "Con lai 2h 45m",
    image: "/images/img1.webp",
    imageAlt:
      "dramatic macro shot of a limited edition anime character figure with intricate paintwork and metallic finish",
    badgeText: "Dang dau gia",
    badgeClassName: "text-primary",
  },
  {
    title: "Akira Original Press Set",
    priceLabel: "Gia hien tai: Y118,500",
    subLabel: "Con lai 14h 22m",
    image: "/images/photo-1-15612676190041302758248.webp",
    imageAlt:
      "a stack of vintage rare manga volumes with yellowed edges showing authentic age and character",
    badgeText: "Hang hiem",
    badgeClassName: "text-secondary",
  },
  {
    title: "Neo-Tokyo Art Print #44",
    priceLabel: "Mua ngay: Y8,900",
    subLabel: "Gioi han: 10/100",
    image: "/images/img3.jpg",
    imageAlt:
      "abstract artistic render of a neon cyberpunk city street in anime style with vibrant colors and light trails",
    badgeText: "Mo ban truc tiep",
    badgeClassName: "text-primary",
  },
  {
    title: "Copic Manga Artist Set",
    priceLabel: "Gia: Y15,400",
    subLabel: "Con hang",
    image: "/images/img2.jpeg",
    imageAlt:
      "close up of a professional high-end art supply set for manga illustration with markers and fine-liners on a white desk",
    badgeText: "Thiet yeu",
    badgeClassName: "text-slate-500",
  },
];

export default function CartPage() {
  return (
    <main className="pt-32 pb-20 px-6 max-w-[1440px] mx-auto min-h-screen">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between px-2 mb-4">
            <span className="font-headline font-bold text-lg">
              2 vat pham da giu cho
            </span>
            <span className="text-on-surface-variant font-label text-sm">
              Xem lai phien da thang
            </span>
          </div>

          {cartItems.map((item) => (
            <div
              key={item.id}
              className="group relative bg-surface-container-lowest rounded-xl p-6 transition-all duration-300 hover:translate-y-[-4px] flex flex-col md:flex-row gap-8 items-center overflow-hidden"
            >
              <div className="w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  src={item.image}
                />
              </div>

              <div className="flex-grow space-y-3">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter mb-2">
                      {item.status}
                    </span>
                    <h3 className="font-headline text-2xl font-bold">
                      {item.name}
                    </h3>
                    <p className="text-on-surface-variant text-sm font-label">
                      {item.subtitle}
                    </p>
                  </div>
                  <button
                    type="button"
                    className="material-symbols-outlined text-slate-300 hover:text-error cursor-pointer transition-colors"
                    aria-label={`Xoa ${item.name} khoi gio`}
                  >
                    delete
                  </button>
                </div>

                <div className="flex items-center gap-6 pt-4">
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400 font-label tracking-widest">
                      Gia thang
                    </p>
                    <p className="font-headline text-2xl font-bold text-primary">
                      {item.price}
                    </p>
                  </div>
                  <div className="h-10 w-[1px] bg-surface-container" />
                  <div className="space-y-1">
                    <p className="text-[10px] uppercase text-slate-400 font-label tracking-widest">
                      Ma phien dau
                    </p>
                    <p className="font-label font-medium">#{item.id}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <aside className="lg:col-span-4">
          <div className="sticky top-32 space-y-6">
            <div className="bg-surface-container-low rounded-xl p-8 border border-surface-container-high">
              <h2 className="font-headline text-xl font-bold mb-6">
                Tom tat thanh toan
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-label">Tong tien thang dau</span>
                  <span className="font-headline font-bold">Y37,300</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-label">
                    Van chuyen bao hiem (duong hang khong)
                  </span>
                  <span className="font-headline font-bold">Y4,200</span>
                </div>
                <div className="flex justify-between text-on-surface-variant">
                  <span className="font-label">Phi dich vu nen tang</span>
                  <span className="font-headline font-bold">Y1,865</span>
                </div>

                <div className="pt-4 border-t border-surface-container-high flex justify-between items-center">
                  <span className="font-headline text-lg font-bold">
                    Tong don hang
                  </span>
                  <span className="font-headline text-3xl font-bold text-primary">
                    Y43,365
                  </span>
                </div>
              </div>

              <button className="w-full py-4 rounded-lg bg-gradient-to-r from-primary to-primary-container text-white font-headline font-bold text-lg flex items-center justify-center gap-3 hover:opacity-90 active:scale-95 transition-all">
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: '"FILL" 1' }}
                >
                  lock
                </span>
                Thanh toan an toan
              </button>

              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-label uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">
                    verified_user
                  </span>
                  Xac thuc dam bao
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 font-label uppercase tracking-widest">
                  <span className="material-symbols-outlined text-sm">
                    local_shipping
                  </span>
                  Van chuyen kho toan cau
                </div>
              </div>
            </div>

            <div className="bg-secondary/5 rounded-xl p-6 border border-secondary/10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white">
                <span className="material-symbols-outlined">redeem</span>
              </div>
              <div>
                <p className="font-headline font-bold text-secondary">
                  Uu dai hang Elite
                </p>
                <p className="text-xs text-secondary/80 font-label">
                  Da ap dung hang suu tam: giam 5% phi van chuyen.
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <section className="mt-32">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="font-headline text-3xl font-bold tracking-tight">
              Goi y cho ban
            </h2>
            <p className="text-on-surface-variant font-label text-sm mt-1">
              De xuat theo lich su suu tam cua ban
            </p>
          </div>
          <Link
            className="text-primary font-headline font-bold flex items-center gap-2 group"
            to="/explore"
          >
            Xem them phien dau
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_forward
            </span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {suggestedItems.map((item) => (
            <article key={item.title} className="group cursor-pointer">
              <div className="aspect-[4/5] bg-surface-container rounded-lg overflow-hidden relative mb-4">
                <img
                  alt={item.imageAlt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  src={item.image}
                />

                <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full">
                  <span
                    className={`text-[10px] font-black font-headline uppercase ${item.badgeClassName}`}
                  >
                    {item.badgeText}
                  </span>
                </div>
              </div>

              <h4 className="font-headline font-bold text-lg group-hover:text-primary transition-colors">
                {item.title}
              </h4>
              <p className="text-secondary font-headline font-bold">
                {item.priceLabel}
              </p>
              <p className="text-xs text-slate-400 font-label mt-1">
                {item.subLabel}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
