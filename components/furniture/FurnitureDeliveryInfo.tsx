interface FurnitureDeliveryInfoProps {
  nationwide?: boolean;
  estimatedDays?: string;
  installation?: boolean;
}

export default function FurnitureDeliveryInfo({
  nationwide = true,
  estimatedDays = "2 - 7 Working Days",
  installation = true,
}: FurnitureDeliveryInfoProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-orange-700">

        Delivery Information

      </h2>

      <div className="space-y-5">

        <div className="rounded-xl border p-5">

          <strong>Delivery Coverage</strong>

          <p className="mt-2">

            {nationwide
              ? "Nationwide delivery available."
              : "Selected states only."}

          </p>

        </div>

        <div className="rounded-xl border p-5">

          <strong>Estimated Delivery Time</strong>

          <p className="mt-2">

            {estimatedDays}

          </p>

        </div>

        <div className="rounded-xl border p-5">

          <strong>Installation</strong>

          <p className="mt-2">

            {installation
              ? "Professional installation available where applicable."
              : "Installation not included."}

          </p>

        </div>

      </div>

    </section>

  );

}