import VehicleGallery from "./VehicleGallery";
import VehicleSpecifications from "./VehicleSpecifications";
import AgentCard from "../marketplace/AgentCard";
import ShareButtons from "../marketplace/ShareButtons";

interface VehicleDetailsProps {
  vehicleId: string;
}

export default function VehicleDetails({
  vehicleId,
}: VehicleDetailsProps) {

  // Temporary demo data.
  // Later this will come from vehicles.ts

  const vehicle = {
    id: vehicleId,

    title: "2022 Toyota Camry XSE",

    price: 42500000,

    location: "Lekki, Lagos",

    images: [
      "/images/vehicles/vehicle-placeholder.jpg",
      "/images/vehicles/vehicle-placeholder.jpg",
      "/images/vehicles/vehicle-placeholder.jpg",
      "/images/vehicles/vehicle-placeholder.jpg",
    ],

    specifications: {
      year: 2022,
      manufacturer: "Toyota",
      model: "Camry XSE",
      transmission: "Automatic",
      fuel: "Petrol",
      mileage: "18,200 km",
      engine: "2.5L",
      drive: "FWD",
      color: "White",
      vin: "JTNB11HK8N3000001",
      chassis: "CHS001998833",
      engineNumber: "ENG889977",
      condition: "Foreign Used",
      accidentHistory: "No Record",
      dutyStatus: "Fully Paid",
      ownership: "First Owner",
    },

    dealer: {
      name: "Prime Auto Hub",
      company: "Prime Auto Hub Ltd",
      phone: "+2348000000000",
      whatsapp: "2348000000000",
      email: "sales@primeauto.com",
      photo: "/images/avatar.png",
    },
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">

      <div className="grid gap-10 lg:grid-cols-3">

        {/* LEFT */}
        <div className="space-y-8 lg:col-span-2">

          <VehicleGallery
            images={vehicle.images}
            title={vehicle.title}
          />

          <section className="rounded-2xl bg-white p-8 shadow-lg">

            <h1 className="text-4xl font-bold text-blue-950">
              {vehicle.title}
            </h1>

            <p className="mt-3 text-gray-500">
              📍 {vehicle.location}
            </p>

            <h2 className="mt-6 text-3xl font-bold text-blue-900">
              ₦{vehicle.price.toLocaleString()}
            </h2>

          </section>

          <VehicleSpecifications
            specs={vehicle.specifications}
          />

          <ShareButtons
            title={vehicle.title}
            url={`/marketplace/vehicles/${vehicle.id}`}
          />

        </div>

        {/* RIGHT */}
        <div>

          <div className="sticky top-28">

            <AgentCard
              name={vehicle.dealer.name}
              company={vehicle.dealer.company}
              phone={vehicle.dealer.phone}
              whatsapp={vehicle.dealer.whatsapp}
              email={vehicle.dealer.email}
              photo={vehicle.dealer.photo}
            />

          </div>

        </div>

      </div>

    </div>
  );
}