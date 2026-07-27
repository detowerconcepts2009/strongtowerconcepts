interface VehicleHeaderProps {
  title: string;
  location: string;
  featured?: boolean;
  verified?: boolean;
  vinVerified?: boolean;
}

export default function VehicleHeader({
  title,
  location,
  featured,
  verified,
  vinVerified,
}: VehicleHeaderProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <div className="flex flex-wrap items-center gap-3">

        {featured && (

          <span className="rounded-full bg-orange-500 px-4 py-2 text-sm font-semibold text-white">

            Featured

          </span>

        )}

        {verified && (

          <span className="rounded-full bg-green-600 px-4 py-2 text-sm font-semibold text-white">

            Verified Dealer

          </span>

        )}

        {vinVerified && (

          <span className="rounded-full bg-blue-900 px-4 py-2 text-sm font-semibold text-white">

            VIN Verified

          </span>

        )}

      </div>

      <h1 className="mt-6 text-4xl font-bold text-blue-950">

        {title}

      </h1>

      <p className="mt-3 text-lg text-gray-500">

        📍 {location}

      </p>

    </section>

  );

}