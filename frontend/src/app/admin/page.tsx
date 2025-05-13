"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  LucideActivity,
  LucideBuilding,
  LucideCalendar,
  LucideDollarSign,
  LucideSettings,
  LucideUsers,
} from "lucide-react";
import Link from "next/link";

export default function AdminDashboard() {
  // Mock data - in a real application, this would come from an API
  const stats = [
    { name: "Total Rooms", value: "42", icon: LucideBuilding, change: "+8% from last month" },
    { name: "Active Bookings", value: "18", icon: LucideCalendar, change: "+12% from last month" },
    { name: "Total Revenue", value: "€9,850", icon: LucideDollarSign, change: "+23% from last month" },
    { name: "Active Users", value: "156", icon: LucideUsers, change: "+5% from last month" },
  ];

  const recentBookings = [
    { id: "B-12345", room: "Conference Room A", user: "Sophie Martin", date: "May 5, 2025", status: "Confirmed" },
    { id: "B-12346", room: "Meeting Room 101", user: "Lucas Bernard", date: "May 7, 2025", status: "Pending" },
    { id: "B-12347", room: "Creative Space", user: "Emma Dubois", date: "May 8, 2025", status: "Confirmed" },
    { id: "B-12348", room: "Executive Suite", user: "Thomas Leroy", date: "May 10, 2025", status: "Pending" },
    { id: "B-12349", room: "Digital Studio", user: "Camille Petit", date: "May 12, 2025", status: "Confirmed" },
  ];

  const recentRooms = [
    { id: "R-4001", name: "Conference Room A", type: "Premium", capacity: "20", status: "Available" },
    { id: "R-4002", name: "Meeting Room 101", type: "Standard", capacity: "8", status: "Occupied" },
    { id: "R-4003", name: "Creative Space", type: "Premium", capacity: "15", status: "Available" },
    { id: "R-4004", name: "Digital Studio", type: "Premium", capacity: "12", status: "Maintenance" },
    { id: "R-4005", name: "Executive Suite", type: "Luxury", capacity: "6", status: "Available" },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Admin Dashboard</h1>
        <div className="flex gap-3">
          <Button asChild variant="outline">
            <Link href="/admin/settings">
              <LucideSettings className="mr-2 h-4 w-4" />
              Settings
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.name}</CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Bookings */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Bookings</CardTitle>
                <CardDescription>Latest 5 bookings across all rooms</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/bookings">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium">Booking ID</th>
                      <th className="pb-3 font-medium">Room</th>
                      <th className="pb-3 font-medium">User</th>
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentBookings.map((booking) => (
                      <tr key={booking.id} className="border-b">
                        <td className="py-3">{booking.id}</td>
                        <td className="py-3">{booking.room}</td>
                        <td className="py-3">{booking.user}</td>
                        <td className="py-3">{booking.date}</td>
                        <td className="py-3">
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                              booking.status === "Confirmed"
                                ? "bg-green-100 text-green-700"
                                : booking.status === "Pending"
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-red-100 text-red-700"
                            }`}
                          >
                            {booking.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Rooms */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Room Status</CardTitle>
                <CardDescription>Latest 5 rooms overview</CardDescription>
              </div>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/rooms">View All</Link>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="pb-3 font-medium">Room ID</th>
                      <th className="pb-3 font-medium">Name</th>
                      <th className="pb-3 font-medium">Type</th>
                      <th className="pb-3 font-medium">Capacity</th>
                      <th className="pb-3 font-medium">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentRooms.map((room) => (
                      <tr key={room.id} className="border-b">
                        <td className="py-3">{room.id}</td>
                        <td className="py-3">{room.name}</td>
                        <td className="py-3">{room.type}</td>
                        <td className="py-3">{room.capacity}</td>
                        <td className="py-3">
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
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest system activity</CardDescription>
            </div>
            <LucideActivity className="h-4 w-4 text-muted-foreground" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-blue-100 p-2">
                <LucideUsers className="h-4 w-4 text-blue-700" />
              </div>
              <div>
                <p className="text-sm font-medium">New user registered</p>
                <p className="text-xs text-muted-foreground">Marie Durand • 2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-green-100 p-2">
                <LucideCalendar className="h-4 w-4 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Booking #B-12345 confirmed</p>
                <p className="text-xs text-muted-foreground">Conference Room A • 3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-amber-100 p-2">
                <LucideBuilding className="h-4 w-4 text-amber-700" />
              </div>
              <div>
                <p className="text-sm font-medium">Room maintenance scheduled</p>
                <p className="text-xs text-muted-foreground">Digital Studio • 5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="rounded-full bg-purple-100 p-2">
                <LucideSettings className="h-4 w-4 text-purple-700" />
              </div>
              <div>
                <p className="text-sm font-medium">System settings updated</p>
                <p className="text-xs text-muted-foreground">Admin • 8 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
