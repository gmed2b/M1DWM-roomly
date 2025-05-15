"use client";
import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

import { fetcher } from "@/lib/utils";
import { Room } from "@/types/room";
import { useState } from "react";
import useSWR from "swr";

// Types
type RoomType = "small" | "medium" | "large" | "atypical" | "all";
type RoomCategory = "standard" | "premium" | "high-end" | "all";

interface FilterState {
  type: RoomType;
  category: RoomCategory;
  capacity: number;
  priceRange: [number, number];
  equipment: string[];
  search: string; // Ajout du champ de recherche
}

const equipmentOptions = [
  { id: "projector", label: "Projector" },
  { id: "audio", label: "Audio System" },
  { id: "whiteboard", label: "Whiteboard" },
  { id: "videoConference", label: "Video Conference" },
  { id: "catering", label: "Catering" },
  { id: "wifi", label: "WiFi" },
];

export default function SearchPage() {
  const [filters, setFilters] = useState<FilterState>({
    type: "all",
    category: "all",
    capacity: 10,
    priceRange: [0, 500],
    equipment: [],
    search: "", // Initialisation du champ de recherche
  });

  const toggleEquipment = (id: string) => {
    setFilters((prev) => {
      if (prev.equipment.includes(id)) {
        return { ...prev, equipment: prev.equipment.filter((item) => item !== id) };
      }
      return { ...prev, equipment: [...prev.equipment, id] };
    });
  };

  const { data: rooms, isLoading, error } = useSWR<Room[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, fetcher);

  // Filtrage dynamique côté client
  const filteredRooms = (rooms || []).filter((room) => {
    // Recherche par nom ou description
    if (filters.search.trim() !== "") {
      const searchLower = filters.search.toLowerCase();
      if (
        !room.name.toLowerCase().includes(searchLower) &&
        !room.description.toLowerCase().includes(searchLower)
      ) {
        return false;
      }
    }
    // Type
    if (filters.type !== "all") {
      if (filters.type === "small" && room.type !== "Petite") return false;
      if (filters.type === "medium" && room.type !== "Moyenne") return false;
      if (filters.type === "large" && room.type !== "Grande") return false;
      if (filters.type === "atypical" && room.type !== "Espace Atypique") return false;
    }
    // Catégorie
    if (filters.category !== "all") {
      if (filters.category === "standard" && room.category !== "Standard") return false;
      if (filters.category === "premium" && room.category !== "Premium") return false;
      if (filters.category === "high-end" && room.category !== "Haut de Gamme") return false;
    }
    // Capacité
    if (room.capacity.max < filters.capacity) return false;
    // Prix
    if (room.pricePerHour < filters.priceRange[0] || room.pricePerHour > filters.priceRange[1]) return false;
    // Equipements (tous doivent être présents)
    if (filters.equipment.length > 0) {
      const roomAmenityNames = room.amenities.map((a) => a.name.toLowerCase());
      if (!filters.equipment.every((eq) => roomAmenityNames.includes(eq.toLowerCase()))) return false;
    }
    return true;
  });

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <aside className="w-1/4 space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>
        {/* Champ de recherche */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Search by name or description</h3>
          <input
            type="text"
            className="w-full border rounded px-2 py-1 text-sm"
            placeholder="Search..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
        {/* Room Type */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Room Type</h3>
          <Select value={filters.type} onValueChange={(v) => setFilters({ ...filters, type: v as RoomType })}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="small">Small Rooms</SelectItem>
              <SelectItem value="medium">Medium Rooms</SelectItem>
              <SelectItem value="large">Large Conference Halls</SelectItem>
              <SelectItem value="atypical">Atypical Spaces</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Room Category */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Category</h3>
          <Select
            value={filters.category}
            onValueChange={(v) => setFilters({ ...filters, category: v as RoomCategory })}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="standard">Standard</SelectItem>
              <SelectItem value="premium">Premium</SelectItem>
              <SelectItem value="high-end">High-End</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Capacity */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Capacity</h3>
            <span className="text-sm text-gray-500">{filters.capacity}+ people</span>
          </div>
          <Slider
            defaultValue={[filters.capacity]}
            max={100}
            step={5}
            onValueChange={(value) => setFilters({ ...filters, capacity: value[0] })}
          />
        </div>
        {/* Price Range */}
        <div className="space-y-2">
          <div className="flex justify-between">
            <h3 className="text-sm font-medium">Price Range</h3>
            <span className="text-sm text-gray-500">
              €{filters.priceRange[0]} - €{filters.priceRange[1]}
            </span>
          </div>
          <Slider
            defaultValue={filters.priceRange}
            min={0}
            max={1000}
            step={50}
            onValueChange={(value) => setFilters({ ...filters, priceRange: [value[0], value[1]] })}
          />
        </div>
        {/* Equipment */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Equipment</h3>
          <div className="grid grid-cols-2 gap-2">
            {equipmentOptions.map((option) => (
              <div key={option.id} className="flex items-center space-x-2">
                <Checkbox
                  id={option.id}
                  checked={filters.equipment.includes(option.id)}
                  onCheckedChange={() => toggleEquipment(option.id)}
                />
                <label htmlFor={option.id} className="text-sm">
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </div>
        {/* <Button className="w-full mt-4" type="button" onClick={() => { }}>
          Apply Filters
        </Button> */}
      </aside>
      <main className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        {isLoading && <div>chargement...</div>}
        {error && <div className="text-red-500">Erreur de chargement</div>}
        {filteredRooms.length === 0 && !isLoading && (
          <div className="text-gray-500">Aucune salle trouvée avec ces filtres.</div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </main>
    </div>
  );
}
