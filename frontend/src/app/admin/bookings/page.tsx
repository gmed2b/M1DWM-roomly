"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { BookingResponse, BookingStatus } from "@/types/booking";
import {
  LucideCalendar,
  LucideClock,
  LucideDownload,
  LucideEdit,
  LucideFilter,
  LucideListPlus,
  LucideSearch,
  LucideTrash,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

// Mock data - in a real application, this would come from an API
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

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<"all" | BookingStatus>("all");

  // Filter and search bookings
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.room_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (booking.user_id && booking.user_id.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === "all" || booking.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Manage Bookings</h1>
          <p className="text-muted-foreground">View and manage all room bookings.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/admin/bookings/new">
              <LucideListPlus className="mr-2 h-4 w-4" />
              Add New Booking
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
          <CardDescription>Find bookings by ID, room, user, or status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <LucideSearch className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search bookings..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full sm:w-[180px]">
              <Select value={filterStatus} onValueChange={(value) => setFilterStatus(value as BookingStatus | "all")}>
                <SelectTrigger>
                  <LucideFilter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bookings List */}
      <Card>
        <CardHeader>
          <CardTitle>All Bookings ({filteredBookings.length})</CardTitle>
          <CardDescription>
            {filteredBookings.length === bookings.length
              ? "Showing all bookings"
              : `Filtered from ${bookings.length} total bookings`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-2 text-left font-medium">ID</th>
                  <th className="py-3 px-2 text-left font-medium">Room</th>
                  <th className="py-3 px-2 text-left font-medium">User</th>
                  <th className="py-3 px-2 text-left font-medium">Date</th>
                  <th className="py-3 px-2 text-left font-medium">Time</th>
                  <th className="py-3 px-2 text-left font-medium">Attendees</th>
                  <th className="py-3 px-2 text-left font-medium">Status</th>
                  <th className="py-3 px-2 text-left font-medium">Total Price</th>
                  <th className="py-3 px-2 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-2">{booking.id}</td>
                    <td className="py-3 px-2">{booking.room_id}</td>
                    <td className="py-3 px-2">{booking.user_id || "-"}</td>
                    <td className="py-3 px-2 flex items-center gap-2">
                      <LucideCalendar className="h-4 w-4 text-muted-foreground" />
                      {booking.date}
                    </td>
                    <td className="py-3 px-2 flex items-center gap-2">
                      <LucideClock className="h-4 w-4 text-muted-foreground" />
                      {booking.is_full_day ? "Full day" : `${booking.start_time || "-"} - ${booking.end_time || "-"}`}
                    </td>
                    <td className="py-3 px-2">{booking.attendees}</td>
                    <td className="py-3 px-2">
                      <span
                        className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                          booking.status === "confirmed"
                            ? "bg-green-100 text-green-700"
                            : booking.status === "pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="py-3 px-2">€{booking.total_price}</td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8" asChild>
                          <Link href={`/admin/bookings/${booking.id}`}>
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

          {filteredBookings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <LucideSearch className="h-10 w-10 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No bookings found</h3>
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
