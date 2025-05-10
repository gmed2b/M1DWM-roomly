"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { allRooms } from "@/data/rooms";
import type { BookingResponse } from "@/types/booking";
import { LucideArrowLeft, LucideCalendar, LucideClock, LucideEuro, LucideUser, LucideUsers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useMemo, useState } from "react";

// Mock data (à remplacer par un fetch API plus tard)
const bookings: BookingResponse[] = [
  {
    id: "B-1001",
    room_id: "R-4001",
    user_id: "U-001",
    date: "2025-05-10",
    start_time: "09:00:00",
    end_time: "12:00:00",
    is_full_day: false,
    attendees: 12,
    services: ["Projector", "Coffee"],
    total_price: 240,
    status: "confirmed",
    created_at: "2025-05-01T10:00:00Z",
    updated_at: "2025-05-01T10:00:00Z",
  },
  {
    id: "B-1002",
    room_id: "R-4002",
    user_id: "U-002",
    date: "2025-05-12",
    start_time: "13:00:00",
    end_time: "17:00:00",
    is_full_day: false,
    attendees: 8,
    services: ["Whiteboard"],
    total_price: 120,
    status: "pending",
    created_at: "2025-05-02T11:00:00Z",
    updated_at: "2025-05-02T11:00:00Z",
  },
  {
    id: "B-1003",
    room_id: "R-4003",
    user_id: "U-003",
    date: "2025-05-15",
    is_full_day: true,
    attendees: 20,
    services: ["Catering"],
    total_price: 500,
    status: "cancelled",
    created_at: "2025-05-03T12:00:00Z",
    updated_at: "2025-05-04T09:00:00Z",
  },
];

export default function BookingDetailEditPage() {
  const params = useParams();
  const bookingId = params?.slug as string;

  const booking = useMemo(() => bookings.find((b) => b.id === bookingId), [bookingId]);

  const [editMode, setEditMode] = useState(false);
  const [form, setForm] = useState(booking ? { ...booking } : undefined);

  // Trouver la salle liée à la réservation
  const room = useMemo(() => allRooms.find((r) => r.id === booking?.room_id), [booking]);

  if (!booking) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <h2 className="text-2xl font-bold mb-2">Booking not found</h2>
        <p className="mb-4 text-muted-foreground">No booking matches the provided ID.</p>
        <Button asChild variant="outline">
          <Link href="/admin/bookings">
            <LucideArrowLeft className="mr-2 h-4 w-4" /> Back to bookings
          </Link>
        </Button>
      </div>
    );
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value, type } = e.target as HTMLInputElement;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((prev) => (prev ? { ...prev, [name]: type === "checkbox" ? checked : value } : prev));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: API call
    setEditMode(false);
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Détails réservation + utilisateur */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Bloc principal réservation */}
        <div className="flex-1">
          <Card>
            <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 pb-2">
              <div>
                <CardTitle className="text-xl md:text-2xl flex items-center gap-2">
                  Réservation #{booking.id}
                  <span
                    className={`ml-2 px-2 py-1 rounded text-xs font-semibold ${
                      booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                        ? "bg-yellow-100 text-yellow-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </CardTitle>
                <CardDescription className="mt-1 text-sm">
                  Créée le {new Date(booking.created_at).toLocaleString()} • Modifiée le{" "}
                  {new Date(booking.updated_at).toLocaleString()}
                </CardDescription>
              </div>
              <Button variant="outline" size="sm" onClick={() => setEditMode((v) => !v)}>
                {editMode ? "Annuler" : "Modifier"}
              </Button>
            </CardHeader>
            <CardContent className="pt-2 pb-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-base">
                    <LucideCalendar className="h-5 w-5 text-muted-foreground" />
                    <span>Date :</span>
                    <span className="font-medium">{booking.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <LucideClock className="h-5 w-5 text-muted-foreground" />
                    <span>Heure :</span>
                    <span className="font-medium">
                      {booking.is_full_day
                        ? "Journée entière"
                        : `${booking.start_time || "-"} - ${booking.end_time || "-"}`}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <LucideUsers className="h-5 w-5 text-muted-foreground" />
                    <span>Participants :</span>
                    <span className="font-medium">{booking.attendees}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <LucideEuro className="h-5 w-5 text-muted-foreground" />
                    <span>Total :</span>
                    <span className="font-medium">€{booking.total_price}</span>
                  </div>
                  <div className="flex items-center gap-2 text-base">
                    <span>Services :</span>
                    <span className="font-medium">
                      {booking.services.length > 0 ? (
                        booking.services.join(", ")
                      ) : (
                        <span className="text-muted-foreground">Aucun</span>
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Statut :</span>
                    <span
                      className={`font-semibold text-xs ${
                        booking.status === "confirmed"
                          ? "text-green-600"
                          : booking.status === "pending"
                          ? "text-yellow-600"
                          : "text-red-600"
                      }`}
                    >
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">ID réservation :</span>
                    <span className="font-mono text-xs">{booking.id}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Créée le :</span>
                    <span className="text-xs">{new Date(booking.created_at).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">Modifiée le :</span>
                    <span className="text-xs">{new Date(booking.updated_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              {editMode && form && (
                <form className="space-y-4 border-t pt-6 mt-6" onSubmit={handleSubmit}>
                  <h3 className="font-semibold mb-2">Modifier la réservation</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs mb-1">Date</label>
                      <Input type="date" name="date" value={form.date} onChange={handleChange} required />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Heure de début</label>
                      <Input
                        type="time"
                        name="start_time"
                        value={form.start_time || ""}
                        onChange={handleChange}
                        disabled={form.is_full_day}
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Heure de fin</label>
                      <Input
                        type="time"
                        name="end_time"
                        value={form.end_time || ""}
                        onChange={handleChange}
                        disabled={form.is_full_day}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-6">
                      <input
                        type="checkbox"
                        name="is_full_day"
                        checked={form.is_full_day}
                        onChange={handleChange}
                        id="is_full_day"
                      />
                      <label htmlFor="is_full_day" className="text-xs">
                        Journée entière
                      </label>
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Participants</label>
                      <Input
                        type="number"
                        name="attendees"
                        value={form.attendees}
                        min={1}
                        max={room?.capacity.max || 100}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs mb-1">Total (€)</label>
                      <Input
                        type="number"
                        name="total_price"
                        value={form.total_price}
                        min={0}
                        step={1}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2">
                    <Button type="submit" variant="default">
                      Enregistrer
                    </Button>
                    <Button type="button" variant="outline" onClick={() => setEditMode(false)}>
                      Annuler
                    </Button>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
        {/* Carte utilisateur */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <Card className="h-full flex flex-col justify-between">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LucideUser className="h-5 w-5 text-muted-foreground" />
                Utilisateur
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                <div className="font-semibold">ID : {booking.user_id || "-"}</div>
                {/* Ajoute ici d'autres infos utilisateur si disponibles (nom, email, etc) */}
                <div className="text-xs text-muted-foreground mt-2">(Détails utilisateur à compléter)</div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
      {/* Détails salle */}
      <div>
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 pb-2">
            {room?.images?.[0] && (
              <Image
                src={room.images[0].src.replace("/public", "")}
                alt={room.images[0].alt}
                width={112} // Adjust width as needed
                height={80} // Adjust height as needed
                className="object-cover rounded shadow"
              />
            )}
            <div>
              <CardTitle className="text-lg">{room?.name || "Salle inconnue"}</CardTitle>
              <CardDescription>{room?.shortDescription}</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-2 text-sm pt-0">
            {room && (
              <>
                <div>
                  Catégorie : <span className="font-medium">{room.category}</span> | Type :{" "}
                  <span className="font-medium">{room.type}</span>
                </div>
                <div>
                  Capacité : {room.capacity.min} à {room.capacity.max} (opt. {room.capacity.optimal})
                </div>
                <div>Superficie : {room.size} m²</div>
                <div>
                  Adresse : {room.location.address}, {room.location.city}
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {room.amenities.map((a) => (
                    <span key={a.name} className="bg-gray-100 rounded px-2 py-0.5 text-xs">
                      {a.name}
                    </span>
                  ))}
                </div>
                <div className="flex flex-wrap gap-1 mt-1">
                  {room.services.map((s) => (
                    <span key={s.name} className="bg-blue-50 rounded px-2 py-0.5 text-xs">
                      {s.name}
                    </span>
                  ))}
                </div>
                <div className="text-xs mt-2">
                  Prix/heure : €{room.pricePerHour} | Prix/jour : €{room.pricePerDay}
                </div>
                <div className="text-xs mt-1">
                  Note : {room.rating ?? "-"} ({room.reviews ?? 0} avis)
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
