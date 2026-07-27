"use client";

import Image from "next/image";

import {
  FaBuilding,
  FaPhone,
  FaEnvelope,
  FaCheckCircle,
} from "react-icons/fa";

export default function DealerProfileCard() {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex flex-col items-center">

        <div className="relative h-28 w-28 overflow-hidden rounded-full">

          <Image
            src="/images/avatar.png"
            alt="Dealer"
            fill
            className="object-cover"
          />

        </div>

        <h2 className="mt-5 text-2xl font-bold text-blue-950">
          Prime Realtors Ltd
        </h2>

        <div className="mt-2 flex items-center gap-2 text-green-600">

          <FaCheckCircle />

          Verified Dealer

        </div>

      </div>

      <div className="mt-8 space-y-4">

        <div className="flex items-center gap-3">

          <FaBuilding className="text-blue-900" />

          Lagos, Nigeria

        </div>

        <div className="flex items-center gap-3">

          <FaPhone className="text-blue-900" />

          +234 800 000 0000

        </div>

        <div className="flex items-center gap-3">

          <FaEnvelope className="text-blue-900" />

          dealer@example.com

        </div>

      </div>

      <button className="mt-8 w-full rounded-xl bg-blue-900 py-4 font-semibold text-white hover:bg-blue-950">

        Edit Profile

      </button>

    </div>

  );

}