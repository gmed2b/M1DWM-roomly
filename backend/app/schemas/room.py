from pydantic import BaseModel, Field
from typing import List, Dict, Optional, Literal

# Correspondant aux types de frontend
RoomCategory = Literal["Premium", "Standard", "Haut de Gamme"]
RoomType = Literal["Petite", "Moyenne", "Grande", "Hangar", "Parking", "Espace Atypique"]

class RoomAmenity(BaseModel):
    icon: str
    name: str
    description: Optional[str] = None

class RoomService(BaseModel):
    icon: str
    name: str
    description: str
    includedInPrice: bool
    priceIfExtra: Optional[float] = None

class RoomImage(BaseModel):
    src: str
    alt: str
    featured: Optional[bool] = None

class RoomCapacity(BaseModel):
    min: int
    max: int
    optimal: int

class RoomLocation(BaseModel):
    address: str
    city: str
    postalCode: str
    country: str
    coordinates: Dict[str, float]

class RoomCreate(BaseModel):
    name: str
    slug: str
    description: str
    shortDescription: str
    category: RoomCategory
    type: RoomType
    capacity: RoomCapacity
    size: float
    pricePerHour: float
    pricePerDay: float
    location: RoomLocation
    amenities: List[RoomAmenity]
    services: List[RoomService]
    images: List[RoomImage]
    availabilityConfirmationRequired: bool = False
    rating: Optional[float] = None
    reviews: Optional[int] = None

class RoomResponse(RoomCreate):
    id: str