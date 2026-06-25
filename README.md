# Reef — Operations Console (demo)

Unified operations system demo for a tour/transfer + cleaning operator.
Built to show **one screen for two businesses** — replacing fragmented Excel & Access sheets.

**Stack:** Next.js 14 (App Router) · TypeScript · Tailwind CSS · mock JSON data · Vercel-ready.

## Screens
- **Dashboard** — KPIs, 6-month revenue (Business A vs Business B), today's schedule, recent bookings
- **Bookings** — single intake form (works: creates a booking live) + filterable list
- **Roster** — staff × date weekly grid, colour-coded by business
- **Billing** — invoice summary, per-client list, one-click "Sync all to XERO"
- **Payroll** — pay run rolled up from completed jobs (XERO Payroll ready)

The "All / Tours / Cleaning" switcher in the top bar filters every screen.
The **EN / 日本語** switch next to it toggles the whole UI between English and
Japanese (your choice is remembered via `localStorage`). All data is sample
data held in `lib/data.ts`; translations live in `lib/i18n.ts`.

## Requirements
- Node.js **18.17+** (or 20+). Check with `node -v`.

## Run locally
```bash
npm install
npm run dev
# http://localhost:3000
```

## Build
```bash
npm run build
npm start
```

## Deploy to Vercel
1. Push this folder to a GitHub repo.
2. In Vercel: **New Project → Import** the repo. Framework preset: **Next.js** (auto-detected).
3. No env vars needed for the demo. Click **Deploy**.
4. Use the resulting `*.vercel.app` URL in the proposal.

## Where the real system plugs in
- `lib/data.ts` → replace seed arrays with API/DB reads (e.g. Postgres/Prisma or Sheets+GAS depending on the client's IT environment).
- `lib/i18n.ts` → add UI strings / domain-value translations here; add a key to both `en` and `ja`.
- `lib/store.tsx` → `addBooking` / `syncAllXero` become server actions / API routes.
- XERO: OAuth2 + Accounting API (invoices) and Payroll AU API. The "Sync to XERO" button maps to a server route that posts invoices to the client's XERO org.
