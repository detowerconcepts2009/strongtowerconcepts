import {
  FaMapMarkerAlt,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

interface ListingHeaderProps {
  id: string;
  title: string;
  location: string;
  category: string;
  featured?: boolean;
  verified?: boolean;
}

export default function ListingHeader({
  id,
  title,
  location,
  category,
  featured = false,
  verified = false,
}: ListingHeaderProps) {

  return (

    <section className="space-y-5">

      <div className="flex flex-wrap gap-3">

        <span className="rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
          {category}
        </span>

        {featured && (

          <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700 flex items-center gap-2">

            <FaStar />

            Featured

          </span>

        )}

        {verified && (

          <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700 flex items-center gap-2">

            <FaCheckCircle />

            Verified

          </span>

        )}

      </div>

      <h1 className="text-4xl font-black text-blue-950">
        {title}
      </h1>

      <div className="flex items-center gap-3 text-lg text-gray-600">

        <FaMapMarkerAlt className="text-red-500" />

        {location}

      </div>

      <div className="inline-block rounded-xl bg-slate-100 px-5 py-3">

        <p className="text-sm text-gray-500">
          Property Reference
        </p>

        <p className="font-bold tracking-widest text-blue-950">
          {id}
        </p>

      </div>

    </section>

  );
}