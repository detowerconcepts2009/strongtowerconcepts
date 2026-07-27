"use client";

import { useState } from "react";
import Image from "next/image";

interface FurnitureGalleryProps {
  images: string[];
  title: string;
}

export default function FurnitureGallery({
  images,
  title,
}: FurnitureGalleryProps) {

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (

    <section className="space-y-5">

      <div className="relative h-[500px] overflow-hidden rounded-2xl shadow-lg">

        <Image
          src={selectedImage}
          alt={title}
          fill
          priority
          className="object-cover"
        />

      </div>

      <div className="grid grid-cols-4 gap-4">

        {images.map((image) => (

          <button
            key={image}
            onClick={() => setSelectedImage(image)}
            className={`relative h-24 overflow-hidden rounded-xl border-4 transition ${
              image === selectedImage
                ? "border-orange-600"
                : "border-transparent"
            }`}
          >

            <Image
              src={image}
              alt={title}
              fill
              className="object-cover"
            />

          </button>

        ))}

      </div>

    </section>

  );

}