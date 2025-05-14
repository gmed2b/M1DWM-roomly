"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import env from "@/env";
import { fetcher } from "@/lib/utils";
import type { Room } from "@/types/room";
import {
  LucideBuilding,
  LucideDownload,
  LucideEdit,
  LucideFilter,
  LucideListPlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const { data: rooms, isLoading, error, mutate } = useSWR<Room[]>(`${env.API_URL}/api/rooms`, fetcher);

  // Suppression d'une room
  const handleDelete = async (id: string) => {
    await fetch(`${env.API_URL}/api/rooms/${id}`, { method: "DELETE" });
    mutate();
  };

  // Filtrage dynamique
  const filteredRooms = (rooms || []).filter((room) => {
    if (filterType !== "all" && room.type !== filterType) return false;
    if (searchTerm && !room.name.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Rooms</h1>
          <p className="text-muted-foreground">View and manage all rooms in the system.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/rooms/new">
              <LucideListPlus className="mr-2 h-4 w-4" />
              Add New Room
            </Link>
          </Button>
          <Button variant="outline">
            <LucideDownload className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Search & Filters</CardTitle>
          <CardDescription>Find rooms by name, ID, or type.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search rooms..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <LucideFilter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="Standard">Standard</SelectItem>
                  <SelectItem value="Premium">Premium</SelectItem>
                  <SelectItem value="Luxury">Luxury</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Rooms List */}
      <Card>
        <CardHeader>
          <CardTitle>All Rooms ({filteredRooms.length})</CardTitle>
          <CardDescription>
            {filteredRooms.length === (rooms || []).length
              ? "Showing all rooms"
              : `Filtered from ${(rooms || []).length} total rooms`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium">Room ID</th>
                  <th className="pb-3 font-medium">Name</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Category</th>
                  <th className="pb-3 font-medium">Capacity</th>
                  <th className="pb-3 font-medium">Price/Hour</th>
                  <th className="pb-3 font-medium">Price/Day</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="border-b">
                    <td className="py-3 px-2">{room.id}</td>
                    <td className="py-3 px-2">{room.name}</td>
                    <td className="py-3 px-2">{room.type}</td>
                    <td className="py-3 px-2">{room.category}</td>
                    <td className="py-3 px-2">{room.capacity.max} people</td>
                    <td className="py-3 px-2">€{room.pricePerHour}</td>
                    <td className="py-3 px-2">€{room.pricePerDay}</td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="icon" className="h-8 w-8">
                          <Link href={`/admin/rooms/${room.id}`}><LucideEdit className="h-4 w-4" /><span className="sr-only">Edit</span></Link>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(room.id)}>
                          <LucideTrash className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredRooms.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <LucideSearch className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No rooms found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Try adjusting your search or filter to find what you&apos;re looking for.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
