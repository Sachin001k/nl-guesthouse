import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import type { EventType } from "@/types/booking";

const VALID_EVENT_TYPES: EventType[] = [
  "wedding",
  "engagement",
  "birthday",
  "reception",
  "corporate",
  "other",
];

export async function POST(request: Request) {
  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const full_name = String(body.full_name ?? "").trim();
  const phone = String(body.phone ?? "").trim();
  const email = String(body.email ?? "").trim();
  const event_type = String(body.event_type ?? "");
  const event_date = String(body.event_date ?? "");
  const guests = Number(body.guests);
  const special_requests =
    typeof body.special_requests === "string" && body.special_requests.trim()
      ? body.special_requests.trim()
      : null;

  // Server-side validation — never trust the client.
  const errors: string[] = [];
  if (!full_name) errors.push("Full name is required.");
  if (!/^[0-9+\-\s()]{7,15}$/.test(phone)) errors.push("A valid phone number is required.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("A valid email is required.");
  if (!VALID_EVENT_TYPES.includes(event_type as EventType)) {
    errors.push("A valid event type is required.");
  }
  if (!event_date || Number.isNaN(Date.parse(event_date))) {
    errors.push("A valid event date is required.");
  } else if (new Date(event_date) < new Date(new Date().toDateString())) {
    errors.push("Event date cannot be in the past.");
  }
  if (!Number.isFinite(guests) || guests < 1) {
    errors.push("Number of guests must be at least 1.");
  }

  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(" ") }, { status: 400 });
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("bookings")
    .insert({
      full_name,
      phone,
      email,
      event_type,
      event_date,
      guests,
      special_requests,
    })
    .select("id")
    .single();

  if (error) {
    console.error("Booking insert failed:", error.message);
    return NextResponse.json(
      { error: "Could not save your booking. Please try again shortly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ id: data.id }, { status: 201 });
}
