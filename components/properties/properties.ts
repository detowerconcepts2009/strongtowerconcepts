import { Property } from "./propertyTypes";

import { agents } from "./agents";
import { propertyMedia } from "./propertyMedia";
import { nearby } from "./nearby";
import { documents } from "./documents";

export const properties: Property[] = [
  {
    id: "STC001",

    slug: "luxury-4-bedroom-duplex-lekki",

    title: "Luxury 4 Bedroom Duplex",

    description:
      "A beautifully finished luxury duplex located in the heart of Lekki Phase 1 with spacious living rooms, fitted kitchen, swimming pool, CCTV, inverter system and ample parking space.",

    purpose: "Sale",

    category: "Residential",

    propertyType: "Detached Duplex",

    listingType: "New Build",

    status: "Available",

    featured: true,

    verified: true,

    negotiable: true,

    price: 280000000,

    inspectionFee: 10000,

    serviceCharge: 0,

    paymentPlan: "Outright Payment",

    bedrooms: 4,

    bathrooms: 5,

    toilets: 6,

    parking: 4,

    area: 650,

    yearBuilt: 2024,

    furnishing: "Semi Furnished",

    availableFrom: "Immediately",

    address: "Lekki Phase 1",

    location: "Lekki Phase 1",

    city: "Lagos",

    state: "Lagos",

    country: "Nigeria",

    latitude: 6.4474,

    longitude: 3.4729,

    media: propertyMedia.STC001,

    features: [
      "Swimming Pool",
      "Gym",
      "Boys Quarter",
      "Fitted Kitchen",
      "Walk-in Closet",
      "POP Ceiling",
      "Solar Power",
      "24 Hours Security",
      "Smart Door Lock",
      "Water Treatment",
      "CCTV",
      "Dining Area",
    ],

    documents: documents.STC001,

    nearby: nearby.STC001,

    tags: [
      "Luxury",
      "Duplex",
      "Swimming Pool",
      "Smart Home",
      "Lekki",
    ],

    views: 124,

    favourites: 48,

    postedAt: "2026-07-10",

    updatedAt: "2026-07-20",

    agent: agents[0],
  },

  {
    id: "STC002",

    slug: "modern-3-bedroom-apartment-ikoyi",

    title: "Modern 3 Bedroom Apartment",

    description:
      "Modern serviced apartment located in Ikoyi with premium finishing, uninterrupted power supply and excellent accessibility.",

    purpose: "Sale",

    category: "Residential",

    propertyType: "Apartment",

    listingType: "Resale",

    status: "Available",

    featured: true,

    verified: true,

    negotiable: false,

    price: 165000000,

    inspectionFee: 10000,

    serviceCharge: 500000,

    paymentPlan: "Mortgage Available",

    bedrooms: 3,

    bathrooms: 4,

    toilets: 4,

    parking: 2,

    area: 420,

    yearBuilt: 2023,

    furnishing: "Furnished",

    availableFrom: "Immediately",

    address: "Banana Island Road",

    location: "Ikoyi",

    city: "Lagos",

    state: "Lagos",

    country: "Nigeria",

    latitude: 6.454,

    longitude: 3.434,

    media: propertyMedia.STC002,

    features: [
      "Elevator",
      "Gym",
      "CCTV",
      "24 Hours Power",
      "Water Treatment",
      "POP Ceiling",
      "Fitted Kitchen",
      "Balcony",
    ],

    documents: documents.STC002,

    nearby: nearby.STC002,

    tags: [
      "Apartment",
      "Luxury",
      "Ikoyi",
    ],

    views: 85,

    favourites: 26,

    postedAt: "2026-07-12",

    updatedAt: "2026-07-18",

    agent: agents[1],
  },
   {
    id: "STC003",

    slug: "prime-residential-land-ibeju-lekki",

    title: "Prime Residential Land",

    description:
      "Dry and table residential land suitable for estate development, private residence and long-term investment. Located in a fast-developing axis with excellent road access.",

    purpose: "Sale",

    category: "Land",

    propertyType: "Residential Land",

    listingType: "Resale",

    status: "Available",

    featured: false,

    verified: true,

    negotiable: true,

    price: 35000000,

    inspectionFee: 5000,

    serviceCharge: 0,

    paymentPlan: "Outright Payment",

    bedrooms: 0,

    bathrooms: 0,

    toilets: 0,

    parking: 0,

    area: 600,

    yearBuilt: 0,

    furnishing: "Unfurnished",

    availableFrom: "Immediately",

    address: "Ibeju Lekki",

    location: "Ibeju Lekki",

    city: "Lagos",

    state: "Lagos",

    country: "Nigeria",

    latitude: 6.5100,

    longitude: 3.8100,

    media: propertyMedia.STC003,

    features: [
      "Dry Land",
      "Registered Survey",
      "Good Road Network",
      "Ready for Development",
      "Excellent Investment",
    ],

    documents: documents.STC003,

    nearby: nearby.STC003,

    tags: [
      "Land",
      "Investment",
      "Residential",
      "Ibeju Lekki",
    ],

    views: 42,

    favourites: 11,

    postedAt: "2026-07-15",

    updatedAt: "2026-07-18",

    agent: agents[2],
  },

    {
    id: "STC004",

    slug: "office-complex-victoria-island",

    title: "Office Complex",

    description:
      "Modern office complex suitable for corporate headquarters, financial institutions and technology companies. Premium location with excellent accessibility.",

    purpose: "Rent",

    category: "Commercial",

    propertyType: "Office Space",

    listingType: "New Build",

    status: "Available",

    featured: true,

    verified: true,

    negotiable: true,

    price: 45000000,

    inspectionFee: 20000,

    serviceCharge: 5000000,

    paymentPlan: "Annual",

    bedrooms: 0,

    bathrooms: 6,

    toilets: 8,

    parking: 30,

    area: 2200,

    yearBuilt: 2025,

    furnishing: "Semi Furnished",

    availableFrom: "Immediately",

    address: "Victoria Island",

    location: "Victoria Island",

    city: "Lagos",

    state: "Lagos",

    country: "Nigeria",

    latitude: 6.4300,

    longitude: 3.4200,

    media: propertyMedia.STC001,

    features: [
      "Elevator",
      "Reception",
      "Conference Rooms",
      "Generator",
      "Fiber Internet",
      "Fire Alarm",
      "CCTV",
      "24 Hours Security",
      "Dedicated Parking",
    ],

    documents: documents.STC001,

    nearby: nearby.STC001,

    tags: [
      "Commercial",
      "Office",
      "Victoria Island",
      "Corporate",
    ],

    views: 95,

    favourites: 19,

    postedAt: "2026-07-16",

    updatedAt: "2026-07-20",

    agent: agents[0],
  },
  
    {
    id: "STC005",

    slug: "luxury-shortlet-apartment-lekki",

    title: "Luxury Shortlet Apartment",

    description:
      "Beautifully furnished shortlet apartment with modern interiors, high-speed internet, smart TV, fitted kitchen and uninterrupted power supply.",

    purpose: "Rent",

    category: "Residential",

    propertyType: "Shortlet Apartment",

    listingType: "Resale",

    status: "Available",

    featured: true,

    verified: true,

    negotiable: false,

    price: 250000,

    inspectionFee: 0,

    serviceCharge: 0,

    paymentPlan: "Per Night",

    bedrooms: 2,

    bathrooms: 2,

    toilets: 2,

    parking: 2,

    area: 180,

    yearBuilt: 2025,

    furnishing: "Furnished",

    availableFrom: "Immediately",

    address: "Lekki Conservation Road",

    location: "Lekki",

    city: "Lagos",

    state: "Lagos",

    country: "Nigeria",

    latitude: 6.4420,

    longitude: 3.5350,

    media: propertyMedia.STC002,

    features: [
      "WiFi",
      "Netflix",
      "Swimming Pool",
      "Gym",
      "24 Hours Power",
      "Smart TV",
      "House Keeping",
      "CCTV",
      "Security",
    ],

    documents: documents.STC002,

    nearby: nearby.STC002,

    tags: [
      "Shortlet",
      "Airbnb",
      "Luxury",
      "Lekki",
    ],

    views: 210,

    favourites: 72,

    postedAt: "2026-07-18",

    updatedAt: "2026-07-21",

    agent: agents[1],
  },
];