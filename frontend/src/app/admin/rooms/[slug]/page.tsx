"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Room } from "@/types/room";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const initialForm: Partial<Room> = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  category: "Standard",
  type: "Petite",
  capacity: { min: 1, max: 10, optimal: 5 },
  size: 20,
  pricePerHour: 0,
  pricePerDay: 0,
  location: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
    coordinates: { lat: 0, lng: 0 },
  },
  amenities: [],
  services: [],
  images: [],
  availabilityConfirmationRequired: false,
};

export default function EditRoomPage() {
  const router = useRouter();
  const params = useParams();
  const roomId = params?.slug as string;
  const [form, setForm] = useState<Partial<Room>>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!roomId) return;
    (async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`);
      if (!res.ok) return setError("Erreur de chargement");
      const data: Room = await res.json();
      setForm(data);
    })();
  }, [roomId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms/${roomId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la modification");
      router.push("/admin/rooms");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!form) return <div className="text-center py-8">Chargement...</div>;

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Edit Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input name="shortDescription" value={form.shortDescription} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input name="category" value={form.category} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input name="type" value={form.type} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pricePerHour">Price Per Hour</Label>
            <Input name="pricePerHour" type="number" value={form.pricePerHour} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pricePerDay">Price Per Day</Label>
            <Input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="size">Size (m²)</Label>
            <Input name="size" type="number" value={form.size} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="availabilityConfirmationRequired">Availability Confirmation Required</Label>
            <Input name="availabilityConfirmationRequired" type="checkbox" checked={!!form.availabilityConfirmationRequired} onChange={handleChange} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Saving..." : "Update Room"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
