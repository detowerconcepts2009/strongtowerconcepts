import Image from "next/image";
import Link from "next/link";

interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  type: "Sale" | "Rent";
  featured?: boolean;
  verified?: boolean;
}

export default function PropertyCard({
  id,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  type,
  featured,
  verified,
}: PropertyCardProps) {
  return (
    <Link href={`/properties/${id}`}>
      <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 cursor-pointer">

        <div className="relative h-60">

          <Image
            src="/images/properties/property-placeholder.jpg"
            alt={title}
            fill
            className="object-cover"
          />

          <div className="absolute top-3 left-3 flex gap-2">

            <span className="bg-blue-900 text-white text-xs px-3 py-1 rounded-full">
              {type}
            </span>

            {featured && (
              <span className="bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
                Featured
              </span>
            )}

          </div>

          {verified && (
            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              Verified
            </span>
          )}

        </div>

        <div className="p-5">

          <h3 className="text-xl font-bold text-gray-900">
            {title}
          </h3>

          <p className="text-gray-500 mt-2">
            📍 {location}
          </p>

          <p className="text-2xl font-bold text-blue-900 mt-4">
            {price}
          </p>

          <div className="flex justify-between mt-6 text-gray-600">

            <span>🛏 {bedrooms} Beds</span>

            <span>🚿 {bathrooms} Baths</span>

          </div>

        </div>

      </div>
    </Link>
  );
}