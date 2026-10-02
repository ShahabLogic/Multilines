# Multilines Coating Solutions

A full-stack website for Multilines Coating Solutions, a Lahore-based contractor for industrial and commercial flooring, concrete repair, sports surfaces and protective coatings.

## What is included

- Responsive, premium multi-page React website with shared light/dark themes, a full-screen epoxy-floor hero, a second-screen slider, service directory and detailed service pages.
- Service navigation links to every service detail page; the service catalogue is maintained in `src/data/services.js`.
- Dedicated pages for About, Services, Systems, Projects/Gallery, Paints & Coatings, Products, Cart, Contact, Global Appearance and Product Admin.
- Online reference imagery selected for different service types. Gallery imagery is clearly presented as illustrative reference work, not as verified Multilines installations.
- Homepage Facebook video embed using the supplied share URL, with a direct Facebook link as fallback. Embedded playback depends on Facebook's availability and privacy settings.
- CSS-built 3D-style coating can and resin samples, including a first-load animation.
- Product storefront with a shared JSON catalogue, product search/category filters, cart, direct Buy Now and WhatsApp order messages. The order is submitted to the Multilines team for confirmation; there is no card-payment checkout.
- Password-authenticated admin dashboard with product create/edit/delete, publish/featured controls and image upload (JPG, PNG or WebP, up to 5 MB), plus a private enquiry inbox with a reviewed/new follow-up status.
- Node.js API that persists shared site settings, product data, image uploads and valid contact enquiries in `data/`. Shared appearance updates are broadcast to open visitors and reloaded for new visitors.
- Contact page with phone, WhatsApp, email, Facebook and a Lahore map.

## Run locally

```bash
npm ci
npm run dev
```

This starts the React development server at `http://localhost:3000` and the Node API at `http://localhost:4301`. React proxies `/api/*` and `/media/*` to the API. The backend uses Node built-ins; React and build tools are development dependencies.

## Product administrator setup

Open `/admin/products`. On a fresh installation, the first administrator creates an account with a valid email and a password of at least 12 characters. After setup, the endpoint is closed and sign-in is required to manage the catalogue.

**Before exposing a fresh production deployment to the public, set `ADMIN_SETUP_KEY`** in the server environment and enter it on the first-run setup form. This prevents a visitor from claiming the first admin account. Alternatively, configure `ADMIN_EMAIL` and `ADMIN_PASSWORD` as deployment secrets and use those credentials to sign in. Do not put credentials in frontend code or commit them.

Sessions use an HTTP-only cookie and a salted scrypt password hash. If `SESSION_SECRET` (at least 32 characters) is not configured, the server creates `data/admin-session-secret`; keep that file or the environment secret persistent across restarts so existing sessions remain valid. Product images uploaded from the dashboard are stored under `data/uploads/products/`.

## Shared appearance security

The shared appearance editor is at `/admin/config`. The published light/dark mode and accent colour are stored on the server and apply across pages and visitors. On a fresh install, appearance updates are open only if neither `ADMIN_SETUP_KEY` nor `ADMIN_KEY` is configured. Once an administrator exists, shared settings updates require that authenticated admin session or a valid `ADMIN_KEY`; enter the key in the editor when using that option. For production, set `ADMIN_SETUP_KEY` before exposing a fresh installation and create the administrator promptly.

## Production deployment

```bash
npm run build
PORT=4301 npm run serve
```

Deploy the built frontend and `server.js` together as a Node application. Provide a **persistent, writable `data/` directory** for the product catalogue, shared settings, enquiries, administrator data and uploads. A static-only host will not provide the API or shared persistence. Set deployment secrets such as `ADMIN_SETUP_KEY`, `ADMIN_EMAIL` / `ADMIN_PASSWORD`, `SESSION_SECRET` and `ADMIN_KEY` in the hosting platform rather than in source control. `PORT` is supported by common hosting platforms; the server binds to `0.0.0.0` by default.

## Company details seeded in the site

- **Company:** Multilines Coating Solutions
- **Phone / WhatsApp:** 0303-4446027
- **Email:** Imtiaz.ali@coatingsolutions.com.pk
- **Location:** Lahore, Pakistan
- **Facebook:** https://www.facebook.com/ResinFlooringPakistan/

The service scope uses the supplied existing services folder as a reference and expands it into 30 browsable service detail pages. Local image assets are served from `public/images/`; source legacy WordPress assets are not required at runtime.
