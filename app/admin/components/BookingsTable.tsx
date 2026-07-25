"use client";

import { useState } from "react";
import type { Booking, BookingStatus } from "@/types/booking";

const EVENT_LABELS: Record<string, string> = {
  wedding: "Wedding",
  engagement: "Engagement",
  birthday: "Birthday",
  reception: "Reception",
  corporate: "Corporate",
  other: "Other",
};

const STATUS_STYLES: Record<BookingStatus, string> = {
  pending: "text-gold bg-gold/10",
  confirmed: "text-teal bg-teal/10",
  cancelled: "text-maroon-deep bg-maroon/10",
};

export default function BookingsTable({
  initialBookings,
}: {
  initialBookings: Booking[];
}) {
  const [bookings, setBookings] = useState(initialBookings);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [errorId, setErrorId] = useState<string | null>(null);

  async function updateStatus(id: string, status: BookingStatus) {
    setPendingId(id);
    setErrorId(null);

    try {
      const res = await fetch(`/api/bookings/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      if (!res.ok) throw new Error("Update failed");

      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch {
      setErrorId(id);
    } finally {
      setPendingId(null);
    }
  }

  if (bookings.length === 0) {
    return (
      <p className="text-center text-ink/50 py-16">
        No bookings yet — they&apos;ll show up here as customers submit the
        form.
      </p>
    );
  }

  return (
    <div className="overflow-x-auto border border-gold/30 bg-paper">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gold/30 text-left text-ink/50 uppercase text-xs tracking-wide">
            <th className="px-4 py-3 font-medium">Customer</th>
            <th className="px-4 py-3 font-medium">Event</th>
            <th className="px-4 py-3 font-medium">Date</th>
            <th className="px-4 py-3 font-medium">Guests</th>
            <th className="px-4 py-3 font-medium">Status</th>
            <th className="px-4 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id} className="border-b border-gold/10 last:border-0">
              <td className="px-4 py-4 align-top">
                <p className="font-medium text-ink">{booking.full_name}</p>
                <p className="text-ink/50">{booking.phone}</p>
                <p className="text-ink/50">{booking.email}</p>
              </td>
              <td className="px-4 py-4 align-top">
                {EVENT_LABELS[booking.event_type] ?? booking.event_type}
              </td>
              <td className="px-4 py-4 align-top whitespace-nowrap">
                {new Date(booking.event_date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-4 align-top">{booking.guests}</td>
              <td className="px-4 py-4 align-top">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-medium capitalize ${STATUS_STYLES[booking.status]}`}
                >
                  {booking.status}
                </span>
              </td>
              <td className="px-4 py-4 align-top">
                {booking.status === "pending" ? (
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateStatus(booking.id, "confirmed")}
                        disabled={pendingId === booking.id}
                        className="rounded-md bg-teal text-paper text-xs font-medium px-3 py-1.5
                                   hover:opacity-90 transition-opacity disabled:opacity-50"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => updateStatus(booking.id, "cancelled")}
                        disabled={pendingId === booking.id}
                        className="rounded-md border border-maroon/30 text-maroon-deep text-xs font-medium px-3 py-1.5
                                   hover:bg-maroon/5 transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                    </div>
                    {errorId === booking.id && (
                      <p className="text-xs text-maroon-deep">
                        Couldn&apos;t update — try again.
                      </p>
                    )}
                  </div>
                ) : (
                  <span className="text-ink/30 text-xs">Decision final</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
