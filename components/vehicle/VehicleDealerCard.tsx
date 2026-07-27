"use client";

import Image from "next/image";
import ContactButtons from "../property-details/ContactButtons";

interface VehicleDealerCardProps {
  name: string;
  company: string;
  phone: string;
  whatsapp: string;
  email: string;
  photo: string;
  verified?: boolean;
  totalVehicles?: number;
}

export default function VehicleDealerCard({
  name,
  company,
  phone,
  whatsapp,
  email,
  photo,
  verified = true,
  totalVehicles = 0,
}: VehicleDealerCardProps) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex flex-col items-center">

        <div className="relative h-28 w-28 overflow-hidden rounded-full">

          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover"
          />

        </div>

        <h2 className="mt-5 text-2xl font-bold text-blue-950">
          {name}
        </h2>

        <p className="mt-2 text-gray-500">
          {company}
        </p>

        {verified && (

          <span className="mt-3 rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-700">

            ✓ Verified Vehicle Dealer

          </span>

        )}

        <p className="mt-4 text-sm text-gray-500">

          {totalVehicles} Active Vehicle Listings

        </p>

      </div>

      <div className="mt-8">

        <ContactButtons
          agentName={name}
          phone={phone}
          whatsapp={whatsapp}
          email={email}
          listingTitle="Vehicle Listing"
        />

      </div>

    </div>

  );

}