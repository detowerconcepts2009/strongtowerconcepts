"use client";

import { FaWhatsapp, FaFacebook, FaLink } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

interface ShareButtonsProps {
  title: string;
  url: string;
}

export default function ShareButtons({
  title,
  url,
}: ShareButtonsProps) {

  const shareText = encodeURIComponent(
    `Check out this listing on Strong Tower Concepts:\n\n${title}\n\n${url}`
  );

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    alert("Link copied successfully.");
  };

  return (

    <div className="space-y-4">

      <h3 className="text-lg font-bold text-blue-950">
        Share this Listing
      </h3>

      <div className="flex flex-wrap gap-4">

        <a
          href={`https://wa.me/?text=${shareText}`}
          target="_blank"
          className="rounded-full bg-green-600 p-4 text-white hover:bg-green-700 transition"
        >
          <FaWhatsapp size={22} />
        </a>

        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
          target="_blank"
          className="rounded-full bg-blue-600 p-4 text-white hover:bg-blue-700 transition"
        >
          <FaFacebook size={22} />
        </a>

        <a
          href={`https://twitter.com/intent/tweet?text=${shareText}`}
          target="_blank"
          className="rounded-full bg-black p-4 text-white hover:bg-gray-800 transition"
        >
          <FaXTwitter size={22} />
        </a>

        <button
          onClick={copyLink}
          className="rounded-full bg-gray-200 p-4 hover:bg-gray-300 transition"
        >
          <FaLink size={20} />
        </button>

      </div>

    </div>

  );

}