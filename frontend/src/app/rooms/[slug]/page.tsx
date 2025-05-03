"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRoomBySlug } from "@/data/rooms";
import Image from "next/image";
import { notFound } from "next/navigation";
import React, { useState } from "react";

interface RoomPageProps {
  params: { slug: string };
  searchParams: { reserve?: string };
}

export default function RoomPage({ params, searchParams }: RoomPageProps) {
  const room = getRoomBySlug(params.slug);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [attendees, setAttendees] = useState<number>(room?.capacity.optimal || 10);
  const [duration, setDuration] = useState<"hourly" | "daily">("hourly");
  const [reservationOpened, setReservationOpened] = useState<boolean>(!!searchParams.reserve);

  if (!room) {
    notFound();
  }

  // Trouver l'image principale (featured) ou la première image
  const mainImage = selectedImage || room.images.find((img) => img.featured)?.src || room.images[0]?.src;

  // Calculer le prix total en fonction des services sélectionnés
  const calculateTotalPrice = () => {
    // Prix de base selon la durée
    const basePrice = duration === "hourly" ? room.pricePerHour : room.pricePerDay;

    // Ajouter le prix des services sélectionnés
    let extraServicesPrice = 0;

    room.services.forEach((service) => {
      if (!service.includedInPrice && selectedServices.includes(service.name)) {
        if (service.name.includes("traiteur")) {
          // Le service traiteur est calculé par personne
          extraServicesPrice += (service.priceIfExtra || 0) * attendees;
        } else {
          // Les autres services ont un prix fixe
          extraServicesPrice += service.priceIfExtra || 0;
        }
      }
    });

    return basePrice + extraServicesPrice;
  };

  const toggleService = (serviceName: string) => {
    setSelectedServices((prev) =>
      prev.includes(serviceName) ? prev.filter((name) => name !== serviceName) : [...prev, serviceName]
    );
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Galerie d'images */}
        <div>
          <div className="relative mb-4 aspect-video overflow-hidden rounded-lg">
            <Image src={mainImage.replace("/public", "")} alt={room.name} fill className="object-cover" priority />
            {room.category === "Haut de Gamme" && (
              <Badge className="absolute left-2 top-2" variant="destructive">
                Confirmation requise
              </Badge>
            )}
            <Badge
              className="absolute right-2 top-2"
              variant={
                room.category === "Premium"
                  ? "default"
                  : room.category === "Haut de Gamme"
                  ? "destructive"
                  : "secondary"
              }
            >
              {room.category}
            </Badge>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {room.images.map((image, index) => (
              <div
                key={index}
                className={`relative aspect-video cursor-pointer overflow-hidden rounded-md border-2 ${
                  selectedImage === image.src ||
                  (!selectedImage && image.featured && mainImage === image.src.replace("/public", ""))
                    ? "border-primary"
                    : "border-transparent"
                }`}
                onClick={() => setSelectedImage(image.src)}
              >
                <Image src={image.src.replace("/public", "")} alt={image.alt} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        {/* Informations sur la salle */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h1 className="text-3xl font-bold">{room.name}</h1>
            {room.rating && (
              <div className="flex items-center gap-1">
                <span className="text-yellow-500">★</span>
                <span className="font-medium">{room.rating}</span>
                <span className="text-gray-500">({room.reviews} avis)</span>
              </div>
            )}
          </div>

          <div className="mb-6 flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="i-tabler-users h-4 w-4"></span>
              {room.capacity.min}-{room.capacity.max} personnes
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="i-tabler-ruler h-4 w-4"></span>
              {room.size} m²
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="i-tabler-category h-4 w-4"></span>
              {room.type}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <span className="i-tabler-map-pin h-4 w-4"></span>
              {room.location.city}
            </Badge>
          </div>

          <p className="mb-6 text-gray-700">{room.description}</p>

          <div className="mb-6 grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Prix par heure</p>
              <p className="text-2xl font-bold">{room.pricePerHour}€</p>
            </div>
            <div>
              <p className="font-medium">Prix par jour</p>
              <p className="text-2xl font-bold">{room.pricePerDay}€</p>
            </div>
          </div>

          <Sheet open={reservationOpened} onOpenChange={setReservationOpened}>
            <SheetTrigger asChild>
              <Button size="lg" className="w-full">
                Réserver maintenant
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-full sm:max-w-md">
              <SheetHeader>
                <SheetTitle>Réserver {room.name}</SheetTitle>
                <SheetDescription>Complétez les détails pour réserver cette salle.</SheetDescription>
              </SheetHeader>
              <div className="py-6">
                <div className="mb-6">
                  <h3 className="mb-2 font-medium">Date de réservation</h3>
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border"
                    disabled={(date) => date < new Date()}
                  />
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 font-medium">Type de réservation</h3>
                  <div className="flex gap-4">
                    <Button
                      variant={duration === "hourly" ? "default" : "outline"}
                      onClick={() => setDuration("hourly")}
                      className="flex-1"
                    >
                      Horaire
                    </Button>
                    <Button
                      variant={duration === "daily" ? "default" : "outline"}
                      onClick={() => setDuration("daily")}
                      className="flex-1"
                    >
                      Journée complète
                    </Button>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 font-medium">Nombre de participants</h3>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAttendees((prev) => Math.max(room.capacity.min, prev - 1))}
                      disabled={attendees <= room.capacity.min}
                    >
                      <span className="i-tabler-minus h-4 w-4"></span>
                    </Button>
                    <Input
                      type="number"
                      value={attendees}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (value >= room.capacity.min && value <= room.capacity.max) {
                          setAttendees(value);
                        }
                      }}
                      className="text-center"
                      min={room.capacity.min}
                      max={room.capacity.max}
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setAttendees((prev) => Math.min(room.capacity.max, prev + 1))}
                      disabled={attendees >= room.capacity.max}
                    >
                      <span className="i-tabler-plus h-4 w-4"></span>
                    </Button>
                  </div>
                  <p className="mt-1 text-sm text-gray-500">
                    Capacité: {room.capacity.min} à {room.capacity.max} personnes
                  </p>
                </div>

                <div className="mb-6">
                  <h3 className="mb-2 font-medium">Services additionnels</h3>
                  <div className="space-y-3">
                    {room.services.map((service, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <Checkbox
                          id={`service-${index}`}
                          checked={service.includedInPrice || selectedServices.includes(service.name)}
                          onCheckedChange={() => {
                            if (!service.includedInPrice) {
                              toggleService(service.name);
                            }
                          }}
                          disabled={service.includedInPrice}
                        />
                        <div className="grid gap-1.5 leading-none">
                          <label
                            htmlFor={`service-${index}`}
                            className="text-sm font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {service.name}
                            {service.includedInPrice ? (
                              <span className="ml-2 text-sm text-green-600">(Inclus)</span>
                            ) : (
                              <span className="ml-2 text-sm text-gray-500">
                                (+{service.priceIfExtra}€{service.name.includes("traiteur") ? "/personne" : ""})
                              </span>
                            )}
                          </label>
                          <p className="text-sm text-gray-500">{service.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mb-8 rounded-lg bg-gray-50 p-4">
                  <h3 className="mb-2 font-semibold">Total estimé</h3>
                  <p className="text-2xl font-bold">{calculateTotalPrice()}€</p>
                  <p className="text-sm text-gray-500">
                    {duration === "hourly" ? "Prix à l'heure" : "Prix à la journée"}
                    {selectedServices.length > 0 && " avec services additionnels"}
                  </p>
                </div>

                <Button className="w-full" size="lg">
                  {room.availabilityConfirmationRequired ? "Demander une confirmation" : "Confirmer la réservation"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Détails, Services, Localisation */}
      <Tabs defaultValue="amenities" className="mt-12">
        <TabsList className="mb-8 w-full justify-start">
          <TabsTrigger value="amenities">Équipements</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="location">Localisation</TabsTrigger>
        </TabsList>

        <TabsContent value="amenities" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {room.amenities.map((amenity, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="flex items-center gap-4 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <span className={`i-tabler-${amenity.icon} h-5 w-5`}></span>
                  </div>
                  <div>
                    <h3 className="font-medium">{amenity.name}</h3>
                    {amenity.description && <p className="text-sm text-gray-500">{amenity.description}</p>}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="services" className="mt-0">
          <div className="grid gap-6 md:grid-cols-2">
            {room.services.map((service, index) => (
              <Card key={index} className="overflow-hidden">
                <CardContent className="p-4">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <span className={`i-tabler-${service.icon} h-5 w-5`}></span>
                    </div>
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      {service.includedInPrice ? (
                        <Badge variant="outline" className="bg-green-50 text-green-700">
                          Inclus
                        </Badge>
                      ) : (
                        <Badge variant="outline">
                          +{service.priceIfExtra}€{service.name.includes("traiteur") ? "/personne" : ""}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-700">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="location" className="mt-0">
          <div className="grid gap-8 md:grid-cols-2">
            <Card>
              <CardContent className="p-4">
                <h3 className="mb-4 text-xl font-semibold">Adresse</h3>
                <div className="space-y-2">
                  <p>{room.location.address}</p>
                  <p>
                    {room.location.postalCode} {room.location.city}
                  </p>
                  <p>{room.location.country}</p>
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="flex items-center gap-2">
                    <span className="i-tabler-map h-4 w-4"></span>
                    Voir sur Google Maps
                  </Button>
                </div>
              </CardContent>
            </Card>
            <div className="relative h-80 overflow-hidden rounded-lg">
              {/* Ici, vous pourriez intégrer une carte Google Maps ou une image statique */}
              <div className="flex h-full w-full items-center justify-center bg-gray-200">
                <p className="text-gray-500">Carte interactive indisponible</p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}

// Génération statique des chemins pour les salles
export async function generateStaticParams() {
  const rooms = await import("@/data/rooms").then((module) => module.popularRooms);
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}
