"use client";

import { useState } from "react";
import Image from "next/image";

interface VehicleGalleryProps {
  images: string[];
  title: string;
}

export default function VehicleGallery({
  images,
  title,
}: VehicleGalleryProps) {

  const [selected, setSelected] = useState(images[0]);

  return (

    <section className="space-y-5">

      <div className="relative h-[520px] overflow-hidden rounded-2xl shadow-lg">

        <Image
          src={selected}
          alt={title}
          fill
          priority
          className="object-cover"
        />

      </div>

      <div className="grid grid-cols-4 gap-4">

        {images.map((image, index) => (

          <button
            key={index}
            onClick={() => setSelected(image)}
            className={`relative h-24 overflow-hidden rounded-xl border-4 transition ${
              selected === image
                ? "border-blue-900"
                : "border-transparent hover:border-blue-300"
            }`}
          >

            <Image
              src={image}
              alt={`${title}-${index}`}
              fill
              className="object-cover"
            />

          </button>

        ))}

      </div>

    </section>

  );

}