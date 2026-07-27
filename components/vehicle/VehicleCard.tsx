import Image from "next/image";
import Link from "next/link";

interface VehicleCardProps {
  id: string;
  title: string;
  price: string;
  location: string;
  year: number;
  mileage: string;
  transmission: string;
  fuel: string;
  featured?: boolean;
  verified?: boolean;
  scanVerified?: boolean;
}

export default function VehicleCard({
  id,
  title,
  price,
  location,
  year,
  mileage,
  transmission,
  fuel,
  featured,
  verified,
  scanVerified,
}: VehicleCardProps) {

  return (

    <Link href={`/vehicles/${id}`}>

      <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl">

        <div className="relative h-60">

          <Image
            src="/images/vehicles/vehicle-placeholder.jpg"
            alt={title}
            fill
            className="object-cover"
          />

          <div className="absolute left-3 top-3 flex gap-2">

            <span className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
              Vehicle
            </span>

            {featured && (
              <span className="rounded-full bg-orange-500 px-3 py-1 text-xs text-white">
                Featured
              </span>
            )}

          </div>

          <div className="absolute right-3 top-3 flex flex-col gap-2">

            {verified && (
              <span className="rounded-full bg-green-600 px-3 py-1 text-xs text-white">
                Verified Dealer
              </span>
            )}

            {scanVerified && (
              <span className="rounded-full bg-blue-700 px-3 py-1 text-xs text-white">
                VIN Verified
              </span>
            )}

          </div>

        </div>

        <div className="p-5">

          <h3 className="text-xl font-bold">
            {title}
          </h3>

          <p className="mt-2 text-gray-500">
            📍 {location}
          </p>

          <p className="mt-4 text-2xl font-bold text-blue-900">
            {price}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-gray-600">

            <span>📅 {year}</span>

            <span>⛽ {fuel}</span>

            <span>🛣 {mileage}</span>

            <span>⚙ {transmission}</span>

          </div>

        </div>

      </div>

    </Link>

  );

}