export type BookingStatus = "pending" | "confirmed" | "cancelled";

export interface BookingCreate {
  room_id: string;
  user_id?: string;
  date: string; // ISO date string (YYYY-MM-DD)
  start_time?: string; // ISO time string (HH:MM:SS)
  end_time?: string; // ISO time string (HH:MM:SS)
  is_full_day: boolean;
  attendees: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  services: any[];
  total_price: number;
}

export interface BookingResponse extends BookingCreate {
  id: string;
  status: BookingStatus;
  created_at: string;
  updated_at: string;
}
