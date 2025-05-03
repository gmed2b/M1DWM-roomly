import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Room } from "@/types/room";
import { LucideRulerDimensionLine, LucideSlidersHorizontal, LucideUsersRound } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();

  const featuredImage = room.images.find((img) => img.featured) || room.images[0];

  return (
    <Link href={`/rooms/${room.slug}`} className="block">
      <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg pt-0">
        <div className="relative h-52 w-full">
          <Image
            src={featuredImage.src.replace("/public", "")}
            alt={featuredImage.alt}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <Badge
            className="absolute right-2 top-2"
            variant={
              room.category === "Premium" ? "default" : room.category === "Haut de Gamme" ? "destructive" : "secondary"
            }
          >
            {room.category}
          </Badge>
        </div>
        <CardContent>
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-xl font-semibold line-clamp-1">{room.name}</h3>
            {room.rating && (
              <div className="flex items-center gap-1 text-sm">
                <span className="text-yellow-500">★</span>
                <span>{room.rating}</span>
                <span className="text-gray-500">({room.reviews})</span>
              </div>
            )}
          </div>
          <p className="mb-2 text-sm text-gray-600">{room.shortDescription}</p>
          <div className="mb-2 flex flex-wrap gap-2">
            <Badge variant="outline" className="flex items-center gap-1">
              <LucideUsersRound className="h-4 w-4" />
              Jusqu&apos;à {room.capacity.max} pers.
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <LucideRulerDimensionLine className="h-4 w-4" />
              {room.size} m²
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <LucideSlidersHorizontal className="h-4 w-4" />
              {room.type}
            </Badge>
          </div>
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-lg font-bold">{room.pricePerHour}€</span>
              <span className="text-sm text-gray-500">/heure</span>
            </div>
            <div>
              <span className="text-lg font-bold">{room.pricePerDay}€</span>
              <span className="text-sm text-gray-500">/jour</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between mt-auto">
          <Button variant="outline" onClick={() => router.push(`/rooms/${room.slug}`)}>
            Détails
          </Button>
          <Button onClick={() => router.push(`/rooms/${room.slug}?reserve=true`)}>Réserver</Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
