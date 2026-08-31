import Link from "next/link";
import Button from "./Button";

interface ProductCardProps {
  id: number;
  name: string;
  category: string;
  price: string;
  image?: string | null;
  featured?: boolean;
}

export default function ProductCard({
  id,
  name,
  category,
  price,
  image,
  featured,
}: ProductCardProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-md transition duration-300 hover:shadow-xl">
      {/* IMAGE */}

      <div className="relative flex h-56 items-center justify-center bg-slate-100">
        {image ? (
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-sm text-slate-400">
            Product Image
          </span>
        )}

        {featured && (
          <span className="absolute left-3 top-3 rounded-full bg-orange-500 px-3 py-1 text-xs font-semibold text-white">
            Featured
          </span>
        )}
      </div>

      {/* BODY */}

      <div className="p-5">
        <p className="text-sm font-semibold text-blue-900">
          {category}
        </p>

        <h3 className="mt-2 text-xl font-bold text-slate-900">
          {name}
        </h3>

        <p className="mt-4 text-2xl font-bold text-blue-900">
          {price}
        </p>

        <div className="mt-6 flex gap-3">
          <Button
            text="View Details"
            href={`/marketplace/interior/${id}`}
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