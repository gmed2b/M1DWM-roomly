import { Room, RoomAmenity, RoomService } from "@/types/room";

// Amenities communs pour les salles
export const commonAmenities: RoomAmenity[] = [
  { icon: "wifi", name: "WiFi haute vitesse" },
  { icon: "aircondition", name: "Climatisation" },
  { icon: "water", name: "Eau minérale" },
];

// Services communs pour les salles
export const commonServices: RoomService[] = [
  {
    icon: "coffee",
    name: "Service café/thé",
    description: "Service de café, thé et viennoiseries pendant votre événement",
    includedInPrice: true,
  },
  {
    icon: "tech",
    name: "Assistance technique",
    description: "Un technicien à disposition pendant votre événement",
    includedInPrice: false,
    priceIfExtra: 150, // par événement
  },
];

// Données des salles
export const popularRooms: Room[] = [
  {
    id: "1",
    name: "Grande Salle Confluente",
    slug: "grande-salle-confluente",
    description:
      "La Grande Salle Confluente est un espace spacieux et lumineux, idéal pour les réunions et meetings professionnels jusqu'à 20 personnes. Avec son éclairage naturel et ses équipements modernes, cette salle offre un cadre parfait pour vos événements d'affaires.",
    shortDescription: "Grande salle lumineuse pour réunions et meetings professionnels.",
    category: "Haut de Gamme",
    type: "Grande",
    capacity: {
      min: 10,
      max: 20,
      optimal: 15,
    },
    size: 42, // m²
    pricePerHour: 120,
    pricePerDay: 800,
    location: {
      address: "10 Rue de la Confluence",
      city: "Lyon",
      postalCode: "69002",
      country: "France",
      coordinates: {
        lat: 45.743,
        lng: 4.815,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "natural-light", name: "Éclairage naturel" },
      { icon: "modern-equipment", name: "Équipements modernes" },
    ],
    services: commonServices,
    images: [
      { src: "/public/assets/room1.webp", alt: "Grande Salle Confluente - Vue principale", featured: true },
      { src: "/public/assets/meeting-space.jpg", alt: "Grande Salle Confluente - Configuration réunion" },
    ],
    availabilityConfirmationRequired: true,
    rating: 4.8,
    reviews: 239,
  },
  {
    id: "2",
    name: "Espace Innovation",
    slug: "espace-innovation",
    description:
      "L'Espace Innovation est une salle polyvalente et moderne conçue pour stimuler la créativité et la collaboration. Avec son mobilier modulable et ses murs inscriptibles, cette salle s'adapte à tous types d'événements, des ateliers de brainstorming aux formations interactives. L'espace est équipé des dernières technologies et peut être reconfiguré selon vos besoins spécifiques.",
    shortDescription: "Salle polyvalente et moderne pour stimuler la créativité et la collaboration.",
    category: "Premium",
    type: "Moyenne",
    capacity: {
      min: 6,
      max: 15,
      optimal: 8,
    },
    size: 26, // m²
    pricePerHour: 90,
    pricePerDay: 600,
    location: {
      address: "45 Rue de la Technologie",
      city: "Lyon",
      postalCode: "69003",
      country: "France",
      coordinates: {
        lat: 45.7639,
        lng: 4.8578,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "modulable", name: "Mobilier modulable" },
      { icon: "walls", name: "Murs inscriptibles" },
      { icon: "screens", name: "Écrans multiples" },
    ],
    services: commonServices,
    images: [{ src: "/public/assets/room2.jpeg", alt: "Espace Innovation - Configuration ouverte", featured: true }],
    availabilityConfirmationRequired: false,
    rating: 4.6,
    reviews: 725,
  },
  {
    id: "3",
    name: "Salle Présentation",
    slug: "salle-presentation",
    description:
      "La Salle Présentation est un espace classique et pratique, idéal pour des présentations, des réunions ou des formations en petit groupe. Équipée d'une télévision, d'un système audio et d'un parking à proximité, cette salle offre tout le nécessaire pour vos événements professionnels.",
    shortDescription: "Salle classique pour présentations et réunions jusqu'à 8 personnes.",
    category: "Standard",
    type: "Petite",
    capacity: {
      min: 2,
      max: 8,
      optimal: 6,
    },
    size: 16, // m²
    pricePerHour: 40,
    pricePerDay: 250,
    location: {
      address: "45 Avenue des Présentations",
      city: "Lyon",
      postalCode: "69003",
      country: "France",
      coordinates: {
        lat: 45.76,
        lng: 4.85,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "tv", name: "Télévision" },
      { icon: "audio", name: "Système audio" },
      { icon: "parking", name: "Parking à proximité" },
    ],
    services: [
      {
        icon: "coffee",
        name: "Service café/thé",
        description: "Service de café et thé pendant votre événement",
        includedInPrice: true,
      },
    ],
    images: [{ src: "/public/assets/room3.webp", alt: "Salle Présentation - Vue principale", featured: true }],
    availabilityConfirmationRequired: false,
    rating: 4.2,
    reviews: 1189,
  },
];

export const newRooms: Room[] = [
  {
    id: "4",
    name: "Atelier Créatif",
    slug: "atelier-creatif",
    description:
      "L'Atelier Créatif est un espace inspirant conçu pour les ateliers de design, les sessions de brainstorming et les réunions créatives. Avec ses murs inscriptibles, ses matériaux naturels et son éclairage chaleureux, cette salle favorise l'innovation et la collaboration.",
    shortDescription: "Espace inspirant pour ateliers de design et brainstorming.",
    category: "Standard",
    type: "Petite",
    capacity: {
      min: 2,
      max: 10,
      optimal: 6,
    },
    size: 25, // m²
    pricePerHour: 50,
    pricePerDay: 300,
    location: {
      address: "12 Rue des Idées",
      city: "Lyon",
      postalCode: "69007",
      country: "France",
      coordinates: {
        lat: 45.7485,
        lng: 4.8467,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "natural", name: "Matériaux naturels" },
      { icon: "lighting", name: "Éclairage chaleureux" },
    ],
    services: commonServices,
    images: [
      { src: "/public/assets/room4.jpg", alt: "Atelier Créatif - Vue principale", featured: true },
      { src: "/public/assets/creative-space.jpg", alt: "Atelier Créatif - Configuration atelier" },
    ],
    availabilityConfirmationRequired: false,
    rating: 4.5,
    reviews: 20,
  },
  {
    id: "5",
    name: "Studio Digital",
    slug: "studio-digital",
    description:
      "Le Studio Digital est un espace high-tech conçu pour les enregistrements vidéo, les webinaires et les présentations en ligne. Équipé de caméras professionnelles, d'un éclairage studio et d'un fond vert, cet espace est parfait pour vos projets numériques.",
    shortDescription: "Espace high-tech pour enregistrements vidéo et webinaires.",
    category: "Standard",
    type: "Petite",
    capacity: {
      min: 1,
      max: 5,
      optimal: 3,
    },
    size: 20, // m²
    pricePerHour: 80,
    pricePerDay: 500,
    location: {
      address: "99 Boulevard Digital",
      city: "Lyon",
      postalCode: "69006",
      country: "France",
      coordinates: {
        lat: 45.7702,
        lng: 4.8501,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "camera", name: "Caméras professionnelles" },
      { icon: "green-screen", name: "Fond vert" },
      { icon: "studio-lighting", name: "Éclairage studio" },
    ],
    services: commonServices,
    images: [
      { src: "/public/assets/room5.jpg", alt: "Studio Digital - Vue principale", featured: true },
      { src: "/public/assets/digital-studio.jpg", alt: "Studio Digital - Équipement" },
    ],
    availabilityConfirmationRequired: true,
    rating: 4.7,
    reviews: 15,
  },
  {
    id: "6",
    name: "Terrasse Panoramique",
    slug: "terrasse-panoramique",
    description:
      "La Terrasse Panoramique est un espace extérieur unique offrant une vue imprenable sur la ville. Idéal pour les événements en plein air, les cocktails ou les pauses détente, cet espace est équipé de mobilier confortable et d'un système de sonorisation.",
    shortDescription: "Espace extérieur avec vue imprenable pour événements en plein air.",
    category: "Premium",
    type: "Grande",
    capacity: {
      min: 10,
      max: 50,
      optimal: 30,
    },
    size: 100, // m²
    pricePerHour: 150,
    pricePerDay: 1000,
    location: {
      address: "5 Quai des Célestins",
      city: "Lyon",
      postalCode: "69002",
      country: "France",
      coordinates: {
        lat: 45.7558,
        lng: 4.8275,
      },
    },
    amenities: [
      ...commonAmenities,
      { icon: "outdoor", name: "Mobilier extérieur confortable" },
      { icon: "sound-system", name: "Système de sonorisation" },
      { icon: "panoramic-view", name: "Vue panoramique" },
    ],
    services: commonServices,
    images: [
      { src: "/public/assets/room6.jpg", alt: "Terrasse Panoramique - Vue principale", featured: true },
      { src: "/public/assets/outdoor-event.jpg", alt: "Terrasse Panoramique - Événement en plein air" },
    ],
    availabilityConfirmationRequired: true,
    rating: 4.9,
    reviews: 25,
  },
];

export const getRoomBySlug = (slug: string): Room | undefined => {
  return popularRooms.find((room) => room.slug === slug);
};
