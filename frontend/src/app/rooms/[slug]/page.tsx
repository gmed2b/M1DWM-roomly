// "use client";

import { getRoomBySlug } from "@/data/rooms";
import { notFound } from "next/navigation";
import RoomClient from "./RoomClient";

interface RoomPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ reserve?: boolean }>;
}

export default async function RoomPage({ params, searchParams }: RoomPageProps) {
  const { slug } = await params;
  const { reserve } = await searchParams;

  const room = getRoomBySlug(slug);
  if (!room) {
    notFound();
  }

  return <RoomClient room={room} reserve={reserve} />;
}

// Génération statique des chemins pour les salles
export async function generateStaticParams() {
  const rooms = await import("@/data/rooms").then((module) => module.allRooms);
  return rooms.map((room) => ({
    slug: room.slug,
  }));
}
