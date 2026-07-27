"use client";

import { useState } from "react";
import { FaHeart } from "react-icons/fa";

interface SaveListingProps {
  listingId: string;
}

export default function SaveListing({
  listingId,
}: SaveListingProps) {

  const [saved, setSaved] = useState(false);

  function toggleSave() {

    setSaved(!saved);

    // Authentication will later save this
    console.log("Saved Listing:", listingId);

  }

  return (

    <button
      onClick={toggleSave}
      className={`flex items-center gap-3 px-6 py-4 rounded-xl font-semibold transition

      ${
        saved
          ? "bg-red-600 text-white"
          : "bg-gray-200 text-gray-700 hover:bg-red-100"
      }`}
    >

      <FaHeart />

      {saved ? "Saved" : "Save Listing"}

    </button>

  );

}