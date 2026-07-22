import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import type { Booking } from "@/types/booking";

export const metadata: Metadata = {
  title: "Booking Received | N L Marriage Hall & Guest House",
};

const EVENT_LABELS: Record<string, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  birthday: "Birthday",
  reception: "Reception",
  corporate: "Corporate Event",
  other: "Event",
};

export default async function BookingSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  let booking: Booking | null = null;

  if (id) {
    const supabase = await createClient();
    const { data } = await supabase
      .from("bookings")
      .select("*")
      .eq("id", id)
      .single();
    booking = data;
  }

  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
      <div className="fade-in-up mx-auto w-full max-w-lg border border-gold/50 bg-paper-deep/60 px-6 py-10 sm:px-10 sm:py-12 text-center">
        {booking ? (
          <>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-gold">
              Request Received
            </p>
            <h1 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
              Thank You, {booking.full_name.split(" ")[0]}
            </h1>
            <div className="ornament-rule mx-auto mt-5 w-32" />

            <p className="mt-6 text-ink/70">
              We&apos;ve received your request for a{" "}
              <span className="font-medium text-ink">
                {EVENT_LABELS[booking.event_type] ?? "event"}
              </span>{" "}
              on{" "}
              <span className="font-medium text-ink">
                {new Date(booking.event_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              . Our team will contact you shortly to confirm.
            </p>

            <dl className="mt-8 text-left text-sm space-y-2 border-t border-maroon/10 pt-6">
              <div className="flex justify-between">
                <dt className="text-ink/50">Booking ID</dt>
                <dd className="font-mono text-ink">{booking.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Guests</dt>
                <dd className="text-ink">{booking.guests}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-ink/50">Status</dt>
                <dd className="capitalize text-teal font-medium">
                  {booking.status}
                </dd>
              </div>
            </dl>
          </>
        ) : (
          <>
            <p className="font-display text-sm tracking-[0.3em] uppercase text-maroon">
              Not Found
            </p>
            <h1 className="font-display text-4xl font-semibold text-maroon-deep mt-2">
              We Couldn&apos;t Find That Booking
            </h1>
            <p className="mt-6 text-ink/70">
              This link may be incorrect or the booking may not exist. Please
              submit a new request.
            </p>
          </>
        )}

        <Link
          href="/book"
          className="inline-block mt-8 rounded-md border border-maroon/30 px-6 py-2.5 text-maroon-deep
                     hover:bg-maroon hover:text-paper hover:border-maroon transition-colors"
        >
          {booking ? "Make Another Booking" : "Back to Booking Form"}
        </Link>
      </div>
    </main>
  );
}
