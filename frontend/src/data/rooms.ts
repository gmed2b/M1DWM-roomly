import { RoomCardProps } from "@/components/RoomCard";

export const popularRooms: RoomCardProps[] = [
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
