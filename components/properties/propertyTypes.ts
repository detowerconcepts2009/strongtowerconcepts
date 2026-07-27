/* ==========================================================
   STRONG TOWER CONCEPTS
   PROPERTY TYPE DEFINITIONS
========================================================== */

export type ListingPurpose =
  | "Sale"
  | "Rent";

export type PropertyCategory =
  | "Residential"
  | "Commercial"
  | "Land";

export type ListingType =
  | "New Build"
  | "Resale"
  | "Off Plan";

export type Furnishing =
  | "Furnished"
  | "Semi Furnished"
  | "Unfurnished";

export type PropertyStatus =
  | "Available"
  | "Sold"
  | "Rented";

export interface PropertyDocument {
  title: string;
  available: boolean;
}

export interface NearbyPlace {
  name: string;
  distance: string;
}

export interface NearbyPlaces {
  schools: NearbyPlace[];
  hospitals: NearbyPlace[];
  shopping: NearbyPlace[];
  transport: NearbyPlace[];
}

export interface PropertyMedia {
  cover: string;

  gallery: string[];

  video?: string;

  virtualTour?: string;
}

export interface Agent {
  id: string;

  name: string;

  company: string;

  phone: string;

  whatsapp: string;

  email: string;

  photo: string;

  verified: boolean;

  rating: number;

  totalListings: number;
}

export interface Property {

  /* Basic */

  id: string;

  slug: string;

  title: string;

  description: string;

  purpose: ListingPurpose;

  category: PropertyCategory;

  propertyType: string;

  listingType: ListingType;

  status: PropertyStatus;

  featured: boolean;

  verified: boolean;

  negotiable: boolean;

  /* Pricing */

  price: number;

  inspectionFee: number;

  serviceCharge: number;

  paymentPlan?: string;

  /* Property Specs */

  bedrooms: number;

  bathrooms: number;

  toilets: number;

  parking: number;

  area: number;

  yearBuilt: number;

  furnishing: Furnishing;

  availableFrom: string;

  /* Address */

  address: string;

  location: string;

  city: string;

  state: string;

  country: string;

  latitude: number;

  longitude: number;

  /* Media */

  media: PropertyMedia;

  /* Features */

  features: string[];

  documents: PropertyDocument[];

  nearby: NearbyPlaces;

  tags: string[];

  /* Statistics */

  views: number;

  favourites: number;

  postedAt: string;

  updatedAt: string;

  /* Agent */

  agent: Agent;
}