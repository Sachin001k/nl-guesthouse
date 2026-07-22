import type { Metadata } from "next";
import BookingForm from "@/app/components/BookingForm";

export const metadata: Metadata = {
  title: "Book Your Event | N L Marriage Hall & Guest House",
};

export default function BookPage() {
  return (
    <main className="flex-1 flex items-center justify-center px-4 py-16 sm:py-24">
      <BookingForm />
    </main>
  );
}
