"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { useState } from "react";

// Types
type RoomType = "small" | "medium" | "large" | "atypical" | "all";
type RoomCategory = "standard" | "premium" | "high-end" | "all";

interface FilterState {
  type: RoomType;
  category: RoomCategory;
  capacity: number;
  priceRange: [number, number];
  equipment: string[];
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
  });

  const toggleEquipment = (id: string) => {
    setFilters((prev) => {
      if (prev.equipment.includes(id)) {
        return { ...prev, equipment: prev.equipment.filter((item) => item !== id) };
      }
      return { ...prev, equipment: [...prev.equipment, id] };
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 flex gap-8">
      <aside className="w-1/4 space-y-6">
        <h2 className="text-xl font-semibold">Filters</h2>
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
        <Button className="w-full mt-4">Apply Filters</Button>
      </aside>
      <main className="w-3/4">
        <h1 className="text-2xl font-bold mb-4">Search Results</h1>
        <p>Results will appear here based on applied filters.</p>
      </main>
    </div>
  );
}
