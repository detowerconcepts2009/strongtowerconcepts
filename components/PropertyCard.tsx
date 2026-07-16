import Link from "next/link";

interface PropertyCardProps {
  id: number;
  title: string;
  location: string;
  price: string;
  image?: string;
  bedrooms: number;
  bathrooms: number;
  type: "Sale" | "Rent" | "Lease";
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

        {/* Image */}
        <div className="relative h-60 bg-gray-300 flex items-center justify-center">

          <span className="text-gray-500">
            Property Image
          </span>

          {featured && (
            <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
              Featured
            </span>
          )}

          {verified && (
            <span className="absolute top-3 right-3 bg-green-600 text-white text-xs px-3 py-1 rounded-full">
              Verified
            </span>
          )}

        </div>

        {/* Body */}

        <div className="p-5">

          <div className="flex justify-between items-center">

            <h2 className="text-xl font-bold text-blue-900">
              {title}
            </h2>

            <span className="text-sm bg-blue-100 text-blue-900 px-3 py-1 rounded-full">
              {type}
            </span>

          </div>

          <p className="text-gray-500 mt-2">
            📍 {location}
          </p>

          <h3 className="text-2xl font-bold text-blue-900 mt-4">
            {price}
          </h3>

          <div className="flex justify-between mt-6 text-gray-600">

            <span>🛏 {bedrooms} Beds</span>

            <span>🚿 {bathrooms} Baths</span>

          </div>

        </div>

      </div>
    </Link>
  );
}