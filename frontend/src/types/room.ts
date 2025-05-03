export type RoomCategory = "Premium" | "Standard" | "Haut de Gamme";

export type RoomType = "Petite" | "Moyenne" | "Grande" | "Hangar" | "Parking" | "Espace Atypique";

export type RoomAmenity = {
  icon: string;
  name: string;
  description?: string;
};

export type RoomService = {
  icon: string;
  name: string;
  description: string;
  includedInPrice: boolean;
  priceIfExtra?: number;
};

export type RoomImage = {
  src: string;
  alt: string;
  featured?: boolean;
};

export type Room = {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: RoomCategory;
  type: RoomType;
  capacity: {
    min: number;
    max: number;
    optimal: number;
  };
  size: number; // in square meters
  pricePerHour: number;
  pricePerDay: number;
  location: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  amenities: RoomAmenity[];
  services: RoomService[];
  images: RoomImage[];
  availabilityConfirmationRequired: boolean;
  rating?: number;
  reviews?: number;
};
