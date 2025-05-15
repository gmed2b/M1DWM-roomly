"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { BookingCreate, BookingResponse } from "@/types/booking";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditBookingPage() {
  const router = useRouter();
  const params = useParams();
  const bookingId = params?.slug as string;
  const [form, setForm] = useState<BookingCreate | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`);
      if (!res.ok) return setError("Erreur de chargement");
      const data: BookingResponse = await res.json();
      setForm({
        room_id: data.room_id,
        user_id: data.user_id,
        date: data.date,
        start_time: data.start_time,
        end_time: data.end_time,
        is_full_day: data.is_full_day,
        attendees: data.attendees,
        services: data.services,
        total_price: data.total_price,
      });
    })();
  }, [bookingId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => prev ? ({
      ...prev,
      [name]: newValue,
    }) : prev);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${bookingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      router.push("/admin/bookings");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div className="text-center py-8">Chargement...</div>;

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Booking</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="room_id">Room ID</Label>
            <Input name="room_id" value={form.room_id} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="user_id">User ID</Label>
            <Input name="user_id" value={form.user_id} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="date">Date</Label>
            <Input name="date" type="date" value={form.date} onChange={handleChange} required />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Label htmlFor="start_time">Start Time</Label>
              <Input name="start_time" type="time" value={form.start_time} onChange={handleChange} />
            </div>
            <div className="flex-1">
              <Label htmlFor="end_time">End Time</Label>
              <Input name="end_time" type="time" value={form.end_time} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="is_full_day">Full Day?</Label>
            <Input name="is_full_day" type="checkbox" checked={form.is_full_day} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="attendees">Attendees</Label>
            <Input name="attendees" type="number" min={1} value={form.attendees} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="total_price">Total Price</Label>
            <Input name="total_price" type="number" min={0} value={form.total_price} onChange={handleChange} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Saving..." : "Update Booking"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
