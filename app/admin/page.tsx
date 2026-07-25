import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import StatsCards from "@/app/admin/components/StatsCards";
import BookingsTable from "@/app/admin/components/BookingsTable";
import type { Booking } from "@/types/booking";

export const metadata: Metadata = {
  title: "Admin Dashboard | N L Marriage Hall & Guest House",
};

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  const bookings = (data ?? []) as Booking[];

  const today = new Date().toISOString().split("T")[0];
  const stats = [
    { label: "Total Bookings", value: bookings.length },
    {
      label: "Weddings",
      value: bookings.filter((b) => b.event_type === "wedding").length,
    },
    {
      label: "Birthdays",
      value: bookings.filter((b) => b.event_type === "birthday").length,
    },
    {
      label: "Upcoming Events",
      value: bookings.filter(
        (b) => b.event_date >= today && b.status !== "cancelled"
      ).length,
    },
  ];

  return (
    <div className="space-y-10">
      <StatsCards stats={stats} />

      <div>
        <h2 className="font-display text-2xl font-semibold text-maroon-deep mb-4">
          Bookings
        </h2>
        {error ? (
          <p className="text-maroon-deep">
            Couldn&apos;t load bookings right now. Please refresh.
          </p>
        ) : (
          <BookingsTable initialBookings={bookings} />
        )}
      </div>
    </div>
  );
}
