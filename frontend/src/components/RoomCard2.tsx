import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideMapPin } from "lucide-react";
import Image from "next/image";

export interface RoomCardProps {
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

export default RoomCard;
