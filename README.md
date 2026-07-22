# N L Marriage Hall & Guest House — Booking System

Next.js 16 (App Router) + TypeScript + Tailwind CSS + Supabase.

## What's included so far

- **Home page** (`/`) — simple hero linking to the booking form.
- **Booking form** (`/book`) — collects name, phone, email, event type,
  date, guest count, and special requests. Styled as an invitation-card
  layout (see `app/components/BookingForm.tsx`).
- **Booking success page** (`/book/success?id=...`) — looks the booking
  up in the database by id before showing a success message, so fake
  IDs in the URL can't fake a confirmation.
- **API route** (`app/api/bookings/route.ts`) — validates input
  server-side and inserts into Supabase using the service role key.
- **Supabase clients** (`lib/supabase/`) — separate browser, server, and
  admin clients, matching Supabase's SSR guidance.
- **Proxy** (`proxy.ts`) — Next.js 16's replacement for middleware;
  currently redirects anonymous visitors away from `/admin` to `/login`.
- **Placeholders** for `/admin` and `/login` — folders exist so the next
  phase (dashboard + auth) slots in without restructuring.
- **`supabase/schema.sql`** — run this once in your Supabase SQL editor
  to create the `bookings` table and Row Level Security policies.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a Supabase project at https://supabase.com if you don't have
   one yet.
3. In the Supabase SQL Editor, run the contents of `supabase/schema.sql`.
4. Copy `.env.local.example` to `.env.local` and fill in your project's
   URL and keys (Project Settings -> API in Supabase):
   ```bash
   cp .env.local.example .env.local
   ```
5. Run the dev server:
   ```bash
   npm run dev
   ```
6. Visit http://localhost:3000/book to try the form.

## Notes

- `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security — it's only
  ever used server-side (`lib/supabase/admin.ts` is guarded with the
  `server-only` package) and must never be exposed to the browser or
  committed to git (it's already covered by `.gitignore` via
  `.env*.local`).
- The booking form currently allows anyone to insert a booking (`anon`
  role) — that's intentional so the public form works without login.
  Only authenticated users can update a booking's status.
- Deploying to Vercel: add the three env vars from `.env.local.example`
  as Environment Variables in the Vercel project settings.

## Next phases (not built yet)

- Admin dashboard: list bookings, stats, confirm/cancel actions.
- Supabase email/password auth for `/login`.
- Search, filters, export to Excel, email notifications.
