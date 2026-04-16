# FigureAuction - React + Vite

Project duoc chuyen tu bo giao dien HTML/CSS tinh sang ung dung React + Vite.

## Scripts

- `npm run dev`: Chay moi truong phat trien
- `npm run build`: Build production
- `npm run preview`: Xem ban build local

## Route Mapping

- `/`: Trang chu chinh (chuyen tu `index.html`)
- `/home`: `home-page.html`
- `/landing`: `landing-page.html`
- `/explore`: `explore-page.html`
- `/news`: `news-page.html`
- `/dashboard`: `dashboard-page.html`
- `/auction-detail`: `auction-detail-page.html`
- `/cart`: `cart-page.html`
- `/sell`: `sell-auction-page.html`
- `/login`: `login-page.html`
- `/register`: `register-page.html`

## Migration Notes

- Toan bo HTML trong `pages/` duoc giu lai va render qua React component.
- CSS noi tuyen tu tung trang duoc nap dong trong runtime.
- Link `.html` cu duoc map sang route React de di chuyen khong reload.
- Header/Footer da duoc viet lai thanh component React.

## Assets

- Anh va tai nguyen tinh duoc copy sang `public/images` va `public/sound`.
