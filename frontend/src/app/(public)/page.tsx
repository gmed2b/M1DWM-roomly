"use client";

import CategoryCard from "@/components/CategoryCard";
import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import env from '@/env';
import { fetcher } from "@/lib/utils";
import type { Room } from "@/types/room";
import { LucideArrowRight, LucideSearch } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSWR from 'swr';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Chargement des rooms depuis l'API
  const { data: rooms, isLoading, error } = useSWR<Room[]>(`${env.API_URL}/api/rooms`, fetcher);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      router.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  // Filtrage des rooms populaires et nouveautés
  const popularRooms = rooms?.filter((room) => (room.rating ?? 0) >= 4.5).slice(0, 6) ?? [];
  const newRooms = rooms ? [...rooms].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 6) : [];

  // Catégories personnalisées (exemple)
  const categories = [
    { title: "Small Meetings", type: "Petite", imageSrc: "https://picsum.photos/300/200" },
    { title: "Conference Halls", type: "Grande", imageSrc: "https://picsum.photos/301/201" },
    { title: "Premium Spaces", type: "Premium", imageSrc: "https://picsum.photos/302/202" },
    { title: "Atypical Venues", type: "Espace Atypique", imageSrc: "https://picsum.photos/303/203" },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <div className="absolute inset-0 bg-gradient-to-r from-primary to-indigo-500 opacity-90"></div>
        <Image src="/hero-background.webp" fill alt="Background" className="object-cover opacity-40" priority />
        <div className="relative z-10 container mx-auto px-4 h-full md:w-5xl flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Find Your Perfect Meeting Space</h1>
          <p className="text-xl text-white/90 mb-8 max-w-2xl">
            Discover and book professional meeting rooms, conference halls, and unique event spaces
          </p>

          {/* Simplified Search Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4"
          >
            <div className="flex-1 flex items-center gap-2">
              <LucideSearch className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search location or venue"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>
            <Button type="submit" className="bg-primary">
              Search
            </Button>
          </form>
        </div>
      </div>

      {/* Categories Navigation */}
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 mb-8">
            <TabsTrigger value="all">All Spaces</TabsTrigger>
            <TabsTrigger value="meetings">Meeting Rooms</TabsTrigger>
            <TabsTrigger value="conferences">Conference Halls</TabsTrigger>
            <TabsTrigger value="atypical">Atypical Spaces</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-8">
            {/* Popular Rooms Section */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Popular Spaces</h2>
                <Button variant="link" className="flex items-center">
                  View all <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg" />
                  ))
                  : error
                    ? <div className="col-span-3 text-center text-red-500">Erreur de chargement des salles</div>
                    : popularRooms.map((room) => <RoomCard key={room.id} room={room} />)
                }
              </div>
            </section>
            {/* Featured Categories */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Find By Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {categories.map((cat) => (
                  <CategoryCard
                    key={cat.title}
                    title={cat.title}
                    imageSrc={cat.imageSrc}
                    count={rooms ? rooms.filter((r) => r.type === cat.type || r.category === cat.title).length : 0}
                  />
                ))}
              </div>
            </section>
            {/* New Locations */}
            <section>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">New Locations</h2>
                <Button variant="link" className="flex items-center">
                  View all <LucideArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading
                  ? Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="animate-pulse bg-gray-200 h-40 rounded-lg" />
                  ))
                  : error
                    ? <div className="col-span-3 text-center text-red-500">Erreur de chargement des salles</div>
                    : newRooms.map((room) => <RoomCard key={room.id} room={room} />)
                }
              </div>
            </section>
          </TabsContent>

          <TabsContent value="meetings">
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600">Meeting Rooms Content</h3>
            </div>
          </TabsContent>

          <TabsContent value="conferences">
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600">Conference Halls Content</h3>
            </div>
          </TabsContent>

          <TabsContent value="atypical">
            <div className="text-center py-16">
              <h3 className="text-xl text-gray-600">Atypical Spaces Content</h3>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
