"use client";

import Image from "next/image";
import { MapPin, BedDouble, Bath, Square } from "lucide-react";

interface PropertyCardProps {
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image?: string;
}

export default function PropertyCard({
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  image,
}: PropertyCardProps) {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-sm transition hover:shadow-lg">

      <div className="relative h-56 w-full">

        <Image
          src={image ?? "/images/properties/property-placeholder.jpg"}
          alt={title}
          fill
          className="object-cover"
        />

      </div>

      <div className="p-6">

        <h2 className="text-xl font-bold text-slate-900">
          {title}
        </h2>

        <div className="mt-2 flex items-center gap-2 text-slate-500">

          <MapPin size={16} />

          <span>{location}</span>

        </div>

        <h3 className="mt-5 text-2xl font-bold text-blue-900">

          ₦{price.toLocaleString()}

        </h3>

        <div className="mt-6 flex justify-between border-t pt-4 text-slate-600">

          <div className="flex items-center gap-2">

            <BedDouble size={18} />

            <span>{bedrooms}</span>

          </div>

          <div className="flex items-center gap-2">

            <Bath size={18} />

            <span>{bathrooms}</span>

          </div>

          <div className="flex items-center gap-2">

            <Square size={18} />

            <span>{area} sqm</span>

          </div>

        </div>

      </div>

    </div>

  );

}