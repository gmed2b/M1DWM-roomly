"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import env from "@/env";
import { BookingCreate } from "@/types/booking";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewBookingPage() {
  const router = useRouter();
  const [form, setForm] = useState<BookingCreate>({
    room_id: "",
    user_id: "",
    date: "",
    start_time: "",
    end_time: "",
    is_full_day: false,
    attendees: 1,
    services: [],
    total_price: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${env.API_URL}/api/bookings`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      router.push("/admin/bookings");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>New Booking</CardTitle>
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
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Saving..." : "Create Booking"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
