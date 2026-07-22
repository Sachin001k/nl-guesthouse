export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type EventType =
  | "wedding"
  | "engagement"
  | "birthday"
  | "reception"
  | "corporate"
  | "other";

export interface Booking {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  event_type: EventType;
  event_date: string; // ISO date
  guests: number;
  special_requests: string | null;
  status: BookingStatus;
  created_at: string;
}

export type NewBooking = Omit<Booking, "id" | "status" | "created_at">;
