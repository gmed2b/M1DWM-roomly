/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { getAuthToken, getUser } from "@/lib/auth";
import { User } from "@/types/user";
import { LucideBuilding, LucideCalendar, LucideHome, LucideMenu, LucideSearch } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet";

export default function Header() {
  const pathname = usePathname();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [_userState, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const token = getAuthToken();
    const userObj = getUser();
    setIsAuthenticated(!!token);
    setUserState(userObj);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <LucideBuilding className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl text-primary">Roomly</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className={`flex items-center text-sm font-medium text-gray-700 hover:text-primary ${pathname === "/" ? "text-primary" : ""
                }`}
            >
              <LucideHome className="h-4 w-4 mr-1" />
              Home
            </Link>
            <Link
              href="/search"
              className={`flex items-center text-sm font-medium text-gray-700 hover:text-primary ${pathname === "/search" ? "text-primary" : ""
                }`}
            >
              <LucideSearch className="h-4 w-4 mr-1" />
              Explore
            </Link>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-4">
            {!isAuthenticated ? (
              <>
                <Link href="/register">
                  <Button variant="outline" size="sm" className="hidden md:flex">
                    Sign Up
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="sm" className="hidden md:flex">
                    Log In
                  </Button>
                </Link>
              </>
            ) : (
              <Link href="/admin">
                <Button size="sm" className="hidden md:flex">
                  Go to Dashboard
                </Button>
              </Link>
            )}

            {/* Mobile Menu Trigger */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="outline" size="icon">
                  <LucideMenu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader className="border-b">
                  <SheetTitle>
                    <div className="flex items-center gap-2">
                      <LucideBuilding className="h-5 w-5 text-primary" />
                      <span className="font-semibold text-primary">Roomly</span>
                    </div>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col h-full">
                  <nav className="flex flex-col gap-6 p-6">
                    <Link
                      href="/"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideHome className="h-5 w-5" />
                      <span>Home</span>
                    </Link>
                    <Link
                      href="/search"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideSearch className="h-5 w-5" />
                      <span>Explore</span>
                    </Link>
                    <Link
                      href="/bookings"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideCalendar className="h-5 w-5" />
                      <span>Bookings</span>
                    </Link>
                    <Link
                      href="/host"
                      className="flex items-center gap-3 text-gray-700 hover:text-primary"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <LucideBuilding className="h-5 w-5" />
                      <span>List Your Space</span>
                    </Link>
                  </nav>

                  <div className="mt-auto border-t p-6 flex flex-col gap-3">
                    {!isAuthenticated ? (
                      <>
                        <Link href="/register">
                          <Button variant="outline" className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                            Sign Up
                          </Button>
                        </Link>
                        <Link href="/login">
                          <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                            Log In
                          </Button>
                        </Link>
                      </>
                    ) : (
                      <Link href="/admin">
                        <Button className="w-full" onClick={() => setIsMobileMenuOpen(false)}>
                          Go to Dashboard
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
