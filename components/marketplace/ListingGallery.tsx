"use client";

import { useState } from "react";
import Image from "next/image";

interface ListingGalleryProps {
  images: string[];
  video?: string;
  title: string;
}

export default function ListingGallery({
  images,
  video,
  title,
}: ListingGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="space-y-5">
      {/* Main Media */}
      <div className="relative h-[520px] overflow-hidden rounded-2xl bg-slate-100 shadow-lg">
        {selectedImage ? (
          <Image
            src={selectedImage}
            alt={title}
            fill
            priority
            className="object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No image available
          </div>
        )}
      </div>

      {/* Image Thumbnails */}
      {images.length > 0 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={`${image}-${index}`}
              type="button"
              onClick={() => setSelectedImage(image)}
              className={`relative h-24 overflow-hidden rounded-xl border-4 transition ${
                selectedImage === image
                  ? "border-blue-900"
                  : "border-transparent hover:border-blue-300"
              }`}
              aria-label={`View image ${index + 1} of ${title}`}
            >
              <Image
                src={image}
                alt={`${title} image ${index + 1}`}
                fill
                sizes="(max-width:768px) 25vw, 150px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Video */}
      {video && (
        <div className="overflow-hidden rounded-2xl bg-black shadow-lg">
          <video
            src={video}
            controls
            preload="metadata"
            className="max-h-[520px] w-full"
          >
            Your browser does not support video playback.
          </video>
        </div>
      )}
    </section>
  );
}