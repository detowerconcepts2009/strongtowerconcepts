"use client";

import VehicleCard from "./VehicleCard";

export default function SimilarVehicles() {

  const vehicles = [

    {
      id: "car001",
      title: "2022 Toyota Camry XSE",
      price: "₦42,500,000",
      location: "Lekki, Lagos",
      year: 2022,
      mileage: "18,000 km",
      transmission: "Automatic",
      fuel: "Petrol",
      featured: true,
      verified: true,
      scanVerified: true,
    },

    {
      id: "car002",
      title: "2023 Lexus RX350",
      price: "₦83,000,000",
      location: "Abuja",
      year: 2023,
      mileage: "7,400 km",
      transmission: "Automatic",
      fuel: "Petrol",
      featured: false,
      verified: true,
      scanVerified: true,
    },

    {
      id: "car003",
      title: "2021 Mercedes C300",
      price: "₦51,000,000",
      location: "Port Harcourt",
      year: 2021,
      mileage: "31,000 km",
      transmission: "Automatic",
      fuel: "Petrol",
      featured: true,
      verified: true,
      scanVerified: false,
    },

  ];

  return (

    <section className="mt-20">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Similar Vehicles

      </h2>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {vehicles.map((vehicle) => (

          <VehicleCard
            key={vehicle.id}
            {...vehicle}
          />

        ))}

      </div>

    </section>

  );

}