"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { fetcher } from "@/lib/utils";
import type { BookingResponse, BookingStatus } from "@/types/booking";
import {
  LucideDownload,
  LucideEdit,
  LucideFilter,
  LucideListPlus,
  LucideSearch,
  LucideTrash
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<BookingStatus | "all">("all");
  const { data: bookings, mutate } = useSWR<BookingResponse[]>(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings`, fetcher);

  // Suppression d'une réservation
  const handleDelete = async (id: string) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/bookings/${id}`, { method: "DELETE" });
    mutate();
  };

  // Filtrage dynamique
  const filteredBookings = (bookings || []).filter((booking) => {
    if (filterStatus !== "all" && booking.status !== filterStatus) return false;
    if (searchTerm && !booking.id.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
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
            {filteredBookings.length === (bookings || []).length
              ? "Showing all bookings"
              : `Filtered from ${(bookings || []).length} total bookings`}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left border-b">
                  <th className="pb-3 font-medium">Booking ID</th>
                  <th className="pb-3 font-medium">Room ID</th>
                  <th className="pb-3 font-medium">User ID</th>
                  <th className="pb-3 font-medium">Date</th>
                  <th className="pb-3 font-medium">Start</th>
                  <th className="pb-3 font-medium">End</th>
                  <th className="pb-3 font-medium">Attendees</th>
                  <th className="pb-3 font-medium">Status</th>
                  <th className="pb-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-2">{booking.id}</td>
                    <td className="py-3 px-2">{booking.room_id}</td>
                    <td className="py-3 px-2">{booking.user_id}</td>
                    <td className="py-3 px-2">{booking.date}</td>
                    <td className="py-3 px-2">{booking.start_time}</td>
                    <td className="py-3 px-2">{booking.end_time}</td>
                    <td className="py-3 px-2">{booking.attendees}</td>
                    <td className="py-3 px-2">
                      <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${booking.status === "confirmed"
                        ? "bg-green-100 text-green-700"
                        : booking.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-700"
                        }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex gap-2">
                        <Button asChild variant="outline" size="icon" className="h-8 w-8">
                          <Link href={`/admin/bookings/${booking.id}`}><LucideEdit className="h-4 w-4" /><span className="sr-only">Edit</span></Link>
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(booking.id)}>
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
