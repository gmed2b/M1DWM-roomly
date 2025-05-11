"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
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

export default function RoomsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data - in a real application, this would come from an API
  const rooms = [
    {
      id: "R-4001",
      name: "Conference Room A",
      type: "Premium",
      capacity: 20,
      services: ["Projector", "Whiteboard", "Video Conferencing"],
      status: "Available",
      price: "€200/day",
    },
    {
      id: "R-4002",
      name: "Meeting Room 101",
      type: "Standard",
      capacity: 8,
      services: ["Whiteboard", "Video Conferencing"],
      status: "Occupied",
      price: "€100/day",
    },
    {
      id: "R-4003",
      name: "Creative Space",
      type: "Premium",
      capacity: 15,
      services: ["Large screens", "Whiteboards", "Sound system"],
      status: "Available",
      price: "€180/day",
    },
    {
      id: "R-4004",
      name: "Digital Studio",
      type: "Premium",
      capacity: 12,
      services: ["Recording equipment", "Green screen", "Lighting kit"],
      status: "Maintenance",
      price: "€250/day",
    },
    {
      id: "R-4005",
      name: "Executive Suite",
      type: "Luxury",
      capacity: 6,
      services: ["Video Conferencing", "Coffee service", "Private bathroom"],
      status: "Available",
      price: "€300/day",
    },
    {
      id: "R-4006",
      name: "Workshop Room",
      type: "Standard",
      capacity: 25,
      services: ["Movable tables", "Whiteboard", "Projector"],
      status: "Available",
      price: "€150/day",
    },
    {
      id: "R-4007",
      name: "Team Space A",
      type: "Standard",
      capacity: 10,
      services: ["Whiteboard", "Television"],
      status: "Occupied",
      price: "€120/day",
    },
    {
      id: "R-4008",
      name: "Board Room",
      type: "Luxury",
      capacity: 14,
      services: ["Video Conferencing", "Catering available", "Premium furniture"],
      status: "Available",
      price: "€280/day",
    },
    {
      id: "R-4009",
      name: "Training Room",
      type: "Premium",
      capacity: 30,
      services: ["Computers", "Projector", "Instructor station"],
      status: "Available",
      price: "€220/day",
    },
    {
      id: "R-4010",
      name: "Quiet Space",
      type: "Standard",
      capacity: 4,
      services: ["Sound isolation", "Comfortable seating"],
      status: "Occupied",
      price: "€80/day",
    },
  ];

  // Filter and search rooms
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === "all" || room.type === filterType;
    return matchesSearch && matchesFilter;
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
            {filteredRooms.length === rooms.length ? "Showing all rooms" : `Filtered from ${rooms.length} total rooms`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">ID</th>
                  <th className="py-3 px-2 text-left font-medium">Name</th>
                  <th className="py-3 px-2 text-left font-medium">Type</th>
                  <th className="py-3 px-2 text-left font-medium">Capacity</th>
                  <th className="py-3 px-2 text-left font-medium">Price</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRooms.map((room) => (
                  <tr key={room.id} className="border-b">
                    <td className="py-3 px-2">{room.id}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 bg-primary/10 rounded-md flex items-center justify-center">
                          <LucideBuilding className="h-4 w-4 text-primary" />
                        </div>
                        {room.name}
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          room.type === "Premium"
                            ? "bg-purple-100 text-purple-700"
                            : room.type === "Luxury"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {room.type}
                      </span>
                    </td>
                    <td className="py-3 px-2">{room.capacity} people</td>
                    <td className="py-3 px-2">{room.price}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          room.status === "Available"
                            ? "bg-green-100 text-green-700"
                            : room.status === "Occupied"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {room.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/admin/rooms/${room.id}`}>
                            <LucideEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Link>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive">
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
