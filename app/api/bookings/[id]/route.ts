import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const ALLOWED_TRANSITIONS = ["confirmed", "cancelled"] as const;

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  let body: { status?: string };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!ALLOWED_TRANSITIONS.includes(body.status as (typeof ALLOWED_TRANSITIONS)[number])) {
    return NextResponse.json(
      { error: "Status must be 'confirmed' or 'cancelled'." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }

  const { data: existing, error: fetchError } = await supabase
    .from("bookings")
    .select("status")
    .eq("id", id)
    .single();

  if (fetchError || !existing) {
    return NextResponse.json({ error: "Booking not found." }, { status: 404 });
  }

  if (existing.status !== "pending") {
    return NextResponse.json(
      { error: "This booking has already been decided." },
      { status: 409 }
    );
  }

  const { error } = await supabase
    .from("bookings")
    .update({ status: body.status })
    .eq("id", id);

  if (error) {
    console.error("Booking status update failed:", error.message);
    return NextResponse.json(
      { error: "Could not update booking status." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
