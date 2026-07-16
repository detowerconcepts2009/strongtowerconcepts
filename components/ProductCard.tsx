import Link from "next/link";
import Button from "./Button";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string;
  featured?: boolean;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  featured,
}: ProductCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden">

      {/* Image */}

      <div className="relative h-56 bg-gray-200 flex items-center justify-center">

        <span className="text-gray-500">
          Product Image
        </span>

        {featured && (
          <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full">
            Featured
          </span>
        )}

      </div>

      {/* Body */}

      <div className="p-5">

        <p className="text-sm font-semibold text-blue-900">
          {category}
        </p>

        <h3 className="text-xl font-bold mt-2">
          {name}
        </h3>

        <p className="text-2xl font-bold text-blue-900 mt-4">
          {price}
        </p>

        <div className="flex gap-3 mt-6">

          <Button
            text="View Details"
            href={`/products/${id}`}
            className="flex-1"
          />

          <Button
            text="Add to Cart"
            variant="outline"
            className="flex-1"
          />

        </div>

      </div>

    </div>
  );
}