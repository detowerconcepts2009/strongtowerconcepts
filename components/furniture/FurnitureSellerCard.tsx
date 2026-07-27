import Image from "next/image";

interface FurnitureSellerCardProps {
  name: string;
  company: string;
  phone: string;
  email: string;
  photo: string;
  verified?: boolean;
}

export default function FurnitureSellerCard({
  name,
  company,
  phone,
  email,
  photo,
  verified = true,
}: FurnitureSellerCardProps) {

  return (

    <div className="rounded-2xl bg-white p-6 shadow-lg">

      <div className="flex items-center gap-5">

        <div className="relative h-20 w-20 overflow-hidden rounded-full">

          <Image
            src={photo}
            alt={name}
            fill
            className="object-cover"
          />

        </div>

        <div>

          <h3 className="text-2xl font-bold text-orange-700">

            {name}

          </h3>

          <p className="text-gray-500">

            {company}

          </p>

          {verified && (

            <span className="mt-2 inline-block rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-700">

              ✓ Verified Seller

            </span>

          )}

        </div>

      </div>

      <div className="mt-8 space-y-3">

        <p>

          <strong>Phone:</strong> {phone}

        </p>

        <p>

          <strong>Email:</strong> {email}

        </p>

      </div>

    </div>

  );

}