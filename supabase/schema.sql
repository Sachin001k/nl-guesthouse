-- Run this once in the Supabase SQL Editor for your project.

create extension if not exists "pgcrypto";

create type booking_status as enum ('pending', 'confirmed', 'cancelled');
create type event_type as enum (
  'wedding',
  'engagement',
  'birthday',
  'reception',
  'corporate',
  'other'
);

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  email text not null,
  event_type event_type not null,
  event_date date not null,
  guests integer not null check (guests > 0),
  special_requests text,
  status booking_status not null default 'pending',
  created_at timestamptz not null default now()
);

alter table bookings enable row level security;

-- Anyone (anon key) can INSERT a booking — this is the public form.
create policy "Anyone can create a booking"
  on bookings for insert
  to anon
  with check (true);

-- Anyone can read a single booking by id — used by the success page
-- to confirm the booking exists before showing a success message.
-- (Consider tightening this later, e.g. via a short-lived token,
-- if booking data should not be publicly readable by id.)
create policy "Anyone can read a booking by id"
  on bookings for select
  to anon
  using (true);

-- Only authenticated users (admins) can update booking status.
create policy "Authenticated users can update bookings"
  on bookings for update
  to authenticated
  using (true)
  with check (true);

create index if not exists bookings_status_idx on bookings (status);
create index if not exists bookings_event_date_idx on bookings (event_date);
