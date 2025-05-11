"use client";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {
  LucideBuilding,
  LucideCalendar,
  LucideHome,
  LucideLayoutDashboard,
  LucideLogOut,
  LucideMenu,
  LucideSettings,
  LucideUsers,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigation = [
    { name: "Dashboard", href: "/admin", icon: LucideLayoutDashboard },
    { name: "Rooms", href: "/admin/rooms", icon: LucideBuilding },
    { name: "Bookings", href: "/admin/bookings", icon: LucideCalendar },
    { name: "Users", href: "/admin/users", icon: LucideUsers },
    { name: "Settings", href: "/admin/settings", icon: LucideSettings },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className="flex min-h-0 flex-1 flex-col border-r border-gray-200 bg-white">
          <div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
            <div className="flex items-center justify-center px-4">
              <Link href="/admin" className="flex items-center gap-2">
                <LucideBuilding className="h-8 w-8 text-primary" />
                <span className="font-bold text-xl text-primary">Roomly Admin</span>
              </Link>
            </div>
            <nav className="mt-8 flex-1 space-y-1 px-2">
              {navigation.map((item) => {
                // Cette condition corrigée évite l'activation simultanée de plusieurs liens
                const isActive = item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(`${item.href}`);

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
                      isActive ? "bg-primary text-white" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`mr-3 h-5 w-5 flex-shrink-0 ${
                        isActive ? "text-white" : "text-gray-400 group-hover:text-gray-500"
                      }`}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <Link href="/" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <LucideHome className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Back to Website</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="flex flex-shrink-0 border-t border-gray-200 p-4">
            <Link href="/logout" className="group block w-full flex-shrink-0">
              <div className="flex items-center">
                <div>
                  <LucideLogOut className="inline-block h-5 w-5 text-gray-400 group-hover:text-gray-500" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Log out</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile header */}
      <div className="sticky top-0 z-10 bg-white lg:hidden border-b border-gray-200">
        <div className="flex h-16 items-center justify-between px-4">
          <div className="flex items-center">
            <Link href="/admin" className="flex items-center gap-2">
              <LucideBuilding className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg text-primary">Roomly Admin</span>
            </Link>
          </div>
          <div>
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon">
                  <LucideMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader className="border-b">
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <LucideBuilding className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Roomly Admin</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <nav className="flex flex-col gap-6 p-6">
                    {navigation.map((item) => {
                      // Appliquer la même logique d'activation pour le menu mobile
                      const isActive =
                        item.href === "/admin" ? pathname === "/admin" : pathname.startsWith(`${item.href}`);

                      return (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={`flex items-center gap-3 ${
                            isActive ? "text-primary font-medium" : "text-gray-700 hover:text-primary"
                          }`}
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          <item.icon className={`h-5 w-5 ${isActive ? "text-primary" : ""}`} />
                          <span>{item.name}</span>
                        </Link>
                      );
                    })}
                  </nav>

                  <div className="mt-auto border-t p-6 flex flex-col gap-3">
                    <Link
                      href="/"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideHome className="h-5 w-5" />
                      <span>Back to Website</span>
                    </Link>
                    <Link
                      href="/logout"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideLogOut className="h-5 w-5" />
                      <span>Log out</span>
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        <main className="p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
