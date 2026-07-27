import { FaDirections, FaMapMarkerAlt } from "react-icons/fa";

interface PropertyLocationProps {
  address: string;
  latitude: number;
  longitude: number;
}

export default function PropertyLocation({
  address,
  latitude,
  longitude,
}: PropertyLocationProps) {
  const googleMapLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

  return (
    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <div className="mb-6 flex items-center gap-3">

        <FaMapMarkerAlt className="text-2xl text-red-500" />

        <h2 className="text-2xl font-bold text-blue-950">
          Property Location
        </h2>

      </div>

      <p className="mb-6 text-gray-600">
        {address}
      </p>

      {/* Temporary Map Preview */}

      <div className="flex h-[350px] flex-col items-center justify-center rounded-2xl border bg-slate-100 text-center">

        <FaMapMarkerAlt className="mb-4 text-6xl text-red-500" />

        <h3 className="text-xl font-bold text-blue-950">
          Approximate Location
        </h3>

        <p className="mt-3 max-w-lg text-gray-600">
          For security reasons, the exact property location is hidden until an
          inspection is booked.
        </p>

      </div>

      <div className="mt-6 flex flex-wrap gap-4">

        <a
          href={googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-950"
        >
          Open in Google Maps
        </a>

        <a
          href={googleMapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border border-blue-900 px-6 py-3 font-semibold text-blue-900 transition hover:bg-blue-50"
        >
          <FaDirections />
          Get Directions
        </a>

      </div>

    </section>
  );
}