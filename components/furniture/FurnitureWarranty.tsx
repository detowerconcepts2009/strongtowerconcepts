interface FurnitureWarrantyProps {
  warranty: string;
  returns: string;
}

export default function FurnitureWarranty({
  warranty,
  returns,
}: FurnitureWarrantyProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-orange-700">

        Warranty & Return Policy

      </h2>

      <div className="space-y-6">

        <div className="rounded-xl border p-5">

          <h3 className="text-xl font-bold">

            Manufacturer Warranty

          </h3>

          <p className="mt-3 text-gray-600">

            {warranty}

          </p>

        </div>

        <div className="rounded-xl border p-5">

          <h3 className="text-xl font-bold">

            Return Policy

          </h3>

          <p className="mt-3 text-gray-600">

            {returns}

          </p>

        </div>

      </div>

    </section>

  );

}