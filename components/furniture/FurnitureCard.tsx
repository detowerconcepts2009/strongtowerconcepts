import Image from "next/image";
import Link from "next/link";

interface FurnitureCardProps {
  id: string;
  title: string;
  image: string;
  category: string;
  brand: string;
  price: string;
  location: string;
  condition: string;
  featured?: boolean;
}

export default function FurnitureCard({
  id,
  title,
  image,
  category,
  brand,
  price,
  location,
  condition,
  featured,
}: FurnitureCardProps) {
  return (
    <Link href={`/marketplace/furniture/${id}`}>

      <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">

        <div className="relative h-64">

          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
          />

          {featured && (
            <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
              Featured
            </span>
          )}

        </div>

        <div className="p-5">

          <p className="text-sm text-blue-900 font-semibold">
            {category}
          </p>

          <h3 className="mt-2 text-xl font-bold">
            {title}
          </h3>

          <p className="mt-2 text-gray-500">
            {brand}
          </p>

          <p className="mt-4 text-2xl font-bold text-blue-900">
            {price}
          </p>

          <div className="mt-5 flex justify-between text-sm text-gray-500">

            <span>{condition}</span>

            <span>{location}</span>

          </div>

        </div>

      </div>

    </Link>
  );
}