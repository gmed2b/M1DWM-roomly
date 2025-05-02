"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LucideArrowRight, LucideCalendar, LucideFilter, LucideMapPin, LucideSearch } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
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

interface RoomCardProps {
  id: string;
  name: string;
  location: string;
  price: number;
  category: string;
  capacity: number;
  images: string[];
  rating: number;
  tags?: string[];
}

// Sample data
const popularRooms: RoomCardProps[] = [
  {
    id: "1",
    name: "Sheraton Villa",
    location: "Paris, France",
    price: 240,
    category: "premium",
    capacity: 30,
    images: ["/assets/room1.webp", "https://picsum.photos/700/600"],
    rating: 4.8,
    tags: ["Audiovisual", "Catering"],
  },
  {
    id: "2",
    name: "Residence Inn",
    location: "Lyon, France",
    price: 150,
    category: "standard",
    capacity: 20,
    images: ["/assets/room2.jpeg", "https://picsum.photos/600/500"],
    rating: 4.5,
    tags: ["Whiteboard", "Coffee Service"],
  },
  {
    id: "3",
    name: "Holiday Inn",
    location: "Marseille, France",
    price: 130,
    category: "standard",
    capacity: 15,
    images: ["/assets/room3.webp", "https://picsum.photos/500/400"],
    rating: 4.1,
    tags: ["Projector", "Private Parking"],
  },
];

const equipmentOptions = [
  { id: "projector", label: "Projector" },
  { id: "audio", label: "Audio System" },
  { id: "whiteboard", label: "Whiteboard" },
  { id: "videoConference", label: "Video Conference" },
  { id: "catering", label: "Catering" },
  { id: "wifi", label: "WiFi" },
];

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
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
      } else {
        return { ...prev, equipment: [...prev.equipment, id] };
      }
    });
  };

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

          {/* Search Bar */}
          <div className="bg-white rounded-lg shadow-lg p-4 flex flex-col md:flex-row gap-4">
            <div className="flex-1 flex items-center gap-2">
              <LucideSearch className="h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Location or venue name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
              />
            </div>

            <div className="flex items-center gap-2 border-l border-gray-200 pl-4">
              <LucideCalendar className="h-5 w-5 text-gray-400" />
              <Select>
                <SelectTrigger className="border-0 w-36">
                  <SelectValue placeholder="Select date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="next-week">Next week</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  <LucideFilter className="h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>Filter Rooms</SheetTitle>
                  <SheetDescription>Customize your search with these filters</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  {/* Room Type */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Room Type</h3>
                    <Select
                      value={filters.type}
                      onValueChange={(value) => setFilters({ ...filters, type: value as RoomType })}
                    >
                      <SelectTrigger>
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
                      onValueChange={(value) => setFilters({ ...filters, category: value as RoomCategory })}
                    >
                      <SelectTrigger>
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
                      className="py-4"
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
                      className="py-4"
                    />
                  </div>

                  {/* Equipment */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-medium">Equipment</h3>
                    <div className="grid grid-cols-2 gap-2">
                      {equipmentOptions.map((option) => (
                        <div key={option.id} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.id}
                            checked={filters.equipment.includes(option.id)}
                            onCheckedChange={() => toggleEquipment(option.id)}
                          />
                          <label
                            htmlFor={option.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {option.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full mt-4">Apply Filters</Button>
                </div>
              </SheetContent>
            </Sheet>

            <Button className="bg-primary">Search</Button>
          </div>
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
                {popularRooms.map((room) => (
                  <RoomCard key={room.id} {...room} />
                ))}
              </div>
            </section>

            {/* Featured Categories */}
            <section>
              <h2 className="text-2xl font-bold mb-6">Find By Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <CategoryCard title="Small Meetings" imageSrc="https://picsum.photos/300/200" count={24} />
                <CategoryCard title="Conference Halls" imageSrc="https://picsum.photos/301/201" count={18} />
                <CategoryCard title="Premium Spaces" imageSrc="https://picsum.photos/302/202" count={12} />
                <CategoryCard title="Atypical Venues" imageSrc="https://picsum.photos/303/203" count={8} />
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
                {/* This would be populated with actual data */}
                <RoomCard
                  id="4"
                  name="Workspace Loft"
                  location="Bordeaux, France"
                  price={180}
                  category="premium"
                  capacity={25}
                  images={["/assets/workspace.jpg"]}
                  rating={4.9}
                  tags={["New", "Catering"]}
                />
                <RoomCard
                  id="5"
                  name="Central Conference"
                  location="Lille, France"
                  price={210}
                  category="high-end"
                  capacity={40}
                  images={["/assets/conference.jpg"]}
                  rating={4.7}
                  tags={["New", "Audio System"]}
                />
                <RoomCard
                  id="6"
                  name="Urban Meeting Space"
                  location="Toulouse, France"
                  price={125}
                  category="standard"
                  capacity={15}
                  images={["/assets/meeting-space.jpg"]}
                  rating={4.6}
                  tags={["New", "Video Conference"]}
                />
              </div>
            </section>
          </TabsContent>

          {/* Other tabs would have similar content structure */}
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
};

// Component for room cards
const RoomCard = ({ name, location, price, images, rating, tags }: RoomCardProps) => {
  return (
    <Card className="overflow-hidden pt-0">
      <div className="relative h-48">
        <Image src={images[0] || "/placeholder-room.jpg"} alt={name} fill className="object-fill" />
        {tags && tags.includes("New") && <Badge className="absolute top-2 left-2 bg-green-500">New</Badge>}
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <LucideMapPin className="h-3 w-3 mr-1" /> {location}
            </CardDescription>
          </div>
          <div className="bg-primary text-primary-foreground px-2 py-0.5 rounded text-sm font-medium">{rating}</div>
        </div>
      </CardHeader>
      <CardContent>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {tags
              .filter((tag) => tag !== "New")
              .map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center">
        <p className="font-semibold text-lg">
          €{price}
          <span className="text-sm font-normal text-gray-500">/day</span>
        </p>
        <Button size="sm">Book Now</Button>
      </CardFooter>
    </Card>
  );
};

// Component for category cards
const CategoryCard = ({ title, imageSrc, count }: { title: string; imageSrc: string; count: number }) => {
  return (
    <Link href={`/category/${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="relative h-36 rounded-lg overflow-hidden group">
        <Image
          src={imageSrc || "/placeholder-category.jpg"}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-3 text-white">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm opacity-80">{count} spaces</p>
        </div>
      </div>
    </Link>
  );
};

export default HomePage;
