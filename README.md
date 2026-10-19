# Online ShopEase Mart — men's fashion demo store

A responsive men's fashion storefront built with Next.js App Router, React, TypeScript, Tailwind CSS, and SQLite. It includes a 48-item men's sample catalog, size selection, combined search and filters, brand browsing, Amazon/Flipkart/Myntra price comparisons, guest and account-backed carts, wishlist, registration and login, demo checkout, order history, and an admin dashboard.

## Requirements

- Node.js 22.12 or newer (recommended for the current SQLite native binding)
- npm 10 or newer

## Run locally

```powershell
npm install
Copy-Item .env.example .env.local
npm run dev
```

Open `http://localhost:3000`. The SQLite database is created automatically at `data/shopease.db` and the sample catalog is seeded on first run. Existing ShopEase databases are migrated from the earlier demo's USD amounts to INR at a fixed demo conversion rate of ₹83 per USD. Product color choices are removed; a compatibility migration normalizes existing catalog and cart records to a single internal default variant per product. Prior order totals and item snapshots are converted too. No external credentials are required. Set `DATABASE_PATH` in `.env.local` to use a different local database file.

To create a local development admin, register with `admin@shopease.local`. This address receives the admin role only when `NODE_ENV` is not `production`; choose your own password. The development-only role shortcut is intentionally disabled in production.

## Demo checkout

All catalog, cart, checkout, and order-history amounts use Indian Rupees (INR). Orders below ₹1,499 include ₹99 shipping; orders of ₹1,499 or more ship free. Checkout offers a clearly labeled demo card flow and cash on delivery. Demo checkout does not collect card data or make a charge. Orders, line items, stock changes, shipping details, and status are stored in SQLite.

The customer catalog and filters are limited to men's shirts, T-shirts, jeans, trousers, shoes, watches, wallets, belts, sunglasses, bags, accessories, ethnic wear, and jackets. Products retain their own main image, and customers can select sizes where applicable; color selection is not offered. Catalog prices and stock are demo data; retailer ratings are not supplied. Brand labels are not brand-endorsed and authenticity is not independently verified.

The Price Comparison section compares a small, explicitly labeled sample of men's products across Amazon.in, Flipkart, and Myntra. Marketplace prices are illustrative demo values, not live offers. Platform links open genuine product search results so shoppers can check current prices themselves. Retailer ratings, delivery charges, and availability are not fabricated or displayed.

## Tests

```powershell
npm test
npx playwright install chromium
npm run test:e2e
```

The unit tests cover the men's-only category allowlist, product-scoped image mappings and default variants, exclusion of women's/children's and legacy duplicate products, combined search/filters, sorting, and INR behavior. Playwright tests exercise search, men's category filtering, price comparison links, the absence of color controls, size-based cart persistence, registration, checkout, order history, and admin product management. Browser runs write desktop/mobile catalog and checkout screenshots into `screenshots/`. The E2E setup uses and resets only a `shopease-e2e` database under `data/`; set `PLAYWRIGHT_PORT` and `NEXT_DIST_DIR=.next-e2e` to test alongside a running local dev server. Set `PLAYWRIGHT_USE_PRODUCTION=1` to run against an existing production build in `NEXT_DIST_DIR`.

## Project notes

- `src/app/api/` contains catalog, authentication, cart, wishlist, orders, health, and admin APIs.
- Passwords use Node.js scrypt hashing; session cookies are HTTP-only, same-site, and secure in production.
- `data/` is local runtime state and is excluded from version control.
- Product photography uses remote Unsplash image URLs. The app has a fallback image for failed product-image requests.

This is a local demo platform, not a production payment service. Before production deployment, provision admin accounts through a controlled process, add rate limiting and operational monitoring, secure and back up the database, review privacy requirements for stored addresses, and integrate a payment provider on the server. Never collect or store card details in this demo.
