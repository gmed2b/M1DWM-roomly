// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
// import { Textarea } from "@/components/ui/textarea";
// import { LucideArrowLeft, LucideSave } from "lucide-react";
// import Link from "next/link";
// import { ChangeEvent, FormEvent, useState } from "react";

// // Définition des interfaces pour le typage
// interface RoomFormData {
//   name: string;
//   type: string;
//   capacity: string;
//   price: string;
//   description: string;
//   services: {
//     projector: boolean;
//     whiteboard: boolean;
//     videoConferencing: boolean;
//     soundSystem: boolean;
//     cateringAvailable: boolean;
//     coffeeMachine: boolean;
//     privateRestroom: boolean;
//     airConditioner: boolean;
//     naturalLight: boolean;
//     highSpeedInternet: boolean;
//     [key: string]: boolean; // Index signature pour permettre l'accès dynamique
//   };
//   imageUrl: string;
// }

// export default function NewRoomPage() {
//   const [formData, setFormData] = useState<RoomFormData>({
//     name: "",
//     type: "",
//     capacity: "",
//     price: "",
//     description: "",
//     services: {
//       projector: false,
//       whiteboard: false,
//       videoConferencing: false,
//       soundSystem: false,
//       cateringAvailable: false,
//       coffeeMachine: false,
//       privateRestroom: false,
//       airConditioner: false,
//       naturalLight: false,
//       highSpeedInternet: false,
//     },
//     imageUrl: "",
//   });

//   const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
//     const { name, value } = e.target;
//     setFormData({
//       ...formData,
//       [name]: value,
//     });
//   };

//   const handleServiceChange = (service: string): void => {
//     setFormData({
//       ...formData,
//       services: {
//         ...formData.services,
//         [service]: !formData.services[service],
//       },
//     });
//   };

//   const handleSubmit = (e: FormEvent): void => {
//     e.preventDefault();
//     // Here you would typically send the data to your API
//     console.log("Form submitted:", formData);
//     // Mock successful submission
//     alert("Room created successfully!");
//     // Redirect to rooms list (in a real app, you'd use router.push)
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex justify-between items-center">
//         <div className="flex items-center gap-2">
//           <Button variant="outline" size="icon" asChild>
//             <Link href="/admin/rooms">
//               <LucideArrowLeft className="h-4 w-4" />
//             </Link>
//           </Button>
//           <div>
//             <h1 className="text-2xl font-bold tracking-tight">Add New Room</h1>
//             <p className="text-muted-foreground">Create a new room in the system.</p>
//           </div>
//         </div>
//         <Button onClick={handleSubmit}>
//           <LucideSave className="mr-2 h-4 w-4" />
//           Save Room
//         </Button>
//       </div>

//       <form onSubmit={handleSubmit} className="space-y-6">
//         <Card>
//           <CardHeader>
//             <CardTitle>Basic Information</CardTitle>
//             <CardDescription>Enter the fundamental details about the room.</CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-4">
//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="name">Room Name</Label>
//                 <Input
//                   id="name"
//                   name="name"
//                   placeholder="e.g. Conference Room A"
//                   value={formData.name}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="type">Room Type</Label>
//                 <Select
//                   name="type"
//                   value={formData.type}
//                   onValueChange={(value) => setFormData({ ...formData, type: value })}
//                   required
//                 >
//                   <SelectTrigger id="type">
//                     <SelectValue placeholder="Select room type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Standard">Standard</SelectItem>
//                     <SelectItem value="Premium">Premium</SelectItem>
//                     <SelectItem value="Luxury">Luxury</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
//               <div className="space-y-2">
//                 <Label htmlFor="capacity">Capacity (people)</Label>
//                 <Input
//                   id="capacity"
//                   name="capacity"
//                   type="number"
//                   placeholder="e.g. 10"
//                   value={formData.capacity}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//               <div className="space-y-2">
//                 <Label htmlFor="price">Price (per day)</Label>
//                 <Input
//                   id="price"
//                   name="price"
//                   placeholder="e.g. €200"
//                   value={formData.price}
//                   onChange={handleChange}
//                   required
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="description">Description</Label>
//               <Textarea
//                 id="description"
//                 name="description"
//                 placeholder="Describe the room and its features..."
//                 className="h-24"
//                 value={formData.description}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="space-y-2">
//               <Label htmlFor="imageUrl">Image URL</Label>
//               <Input
//                 id="imageUrl"
//                 name="imageUrl"
//                 placeholder="e.g. https://example.com/room-image.jpg"
//                 value={formData.imageUrl}
//                 onChange={handleChange}
//               />
//             </div>
//           </CardContent>
//         </Card>

//         {/* Services & Amenities */}
//         <Card>
//           <CardHeader>
//             <CardTitle>Services & Amenities</CardTitle>
//             <CardDescription>Select the services and equipment available in this room.</CardDescription>
//           </CardHeader>
//           <CardContent>
//             <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
//               {Object.entries({
//                 projector: "Projector",
//                 whiteboard: "Whiteboard",
//                 videoConferencing: "Video Conferencing",
//                 soundSystem: "Sound System",
//                 cateringAvailable: "Catering Available",
//                 coffeeMachine: "Coffee Machine",
//                 privateRestroom: "Private Restroom",
//                 airConditioner: "Air Conditioner",
//                 naturalLight: "Natural Light",
//                 highSpeedInternet: "High-Speed Internet",
//               }).map(([key, label]) => (
//                 <div key={key} className="flex items-center space-x-2">
//                   <Checkbox
//                     id={key}
//                     checked={formData.services[key]}
//                     onCheckedChange={() => handleServiceChange(key)}
//                   />
//                   <Label htmlFor={key} className="text-sm font-normal cursor-pointer">
//                     {label}
//                   </Label>
//                 </div>
//               ))}
//             </div>
//           </CardContent>
//         </Card>

//         {/* Submit Button */}
//         <div className="flex justify-end">
//           <Button type="submit">
//             <LucideSave className="mr-2 h-4 w-4" />
//             Create Room
//           </Button>
//         </div>
//       </form>
//     </div>
//   );
// }

"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Room } from "@/types/room";
import { useRouter } from "next/navigation";
import { useState } from "react";

const initialForm: Partial<Room> = {
  name: "",
  slug: "",
  description: "",
  shortDescription: "",
  category: "Standard",
  type: "Petite",
  capacity: { min: 1, max: 10, optimal: 5 },
  size: 20,
  pricePerHour: 0,
  pricePerDay: 0,
  location: {
    address: "",
    city: "",
    postalCode: "",
    country: "",
    coordinates: { lat: 0, lng: 0 },
  },
  amenities: [],
  services: [],
  images: [],
  availabilityConfirmationRequired: false,
};

export default function NewRoomPage() {
  const router = useRouter();
  const [form, setForm] = useState<Partial<Room>>(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    let newValue: string | boolean = value;
    if (type === "checkbox") {
      newValue = (e.target as HTMLInputElement).checked;
    }
    setForm((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/rooms`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error("Erreur lors de la création");
      router.push("/admin/rooms");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>New Room</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input name="name" value={form.name} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="slug">Slug</Label>
            <Input name="slug" value={form.slug} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Input name="description" value={form.description} onChange={handleChange} required />
          </div>
          <div>
            <Label htmlFor="shortDescription">Short Description</Label>
            <Input name="shortDescription" value={form.shortDescription} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="category">Category</Label>
            <Input name="category" value={form.category} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="type">Type</Label>
            <Input name="type" value={form.type} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pricePerHour">Price Per Hour</Label>
            <Input name="pricePerHour" type="number" value={form.pricePerHour} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="pricePerDay">Price Per Day</Label>
            <Input name="pricePerDay" type="number" value={form.pricePerDay} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="size">Size (m²)</Label>
            <Input name="size" type="number" value={form.size} onChange={handleChange} />
          </div>
          <div>
            <Label htmlFor="availabilityConfirmationRequired">Availability Confirmation Required</Label>
            <Input name="availabilityConfirmationRequired" type="checkbox" checked={!!form.availabilityConfirmationRequired} onChange={handleChange} />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" disabled={loading} className="w-full">{loading ? "Saving..." : "Create Room"}</Button>
        </form>
      </CardContent>
    </Card>
  );
}
