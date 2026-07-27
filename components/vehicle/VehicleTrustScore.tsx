interface VehicleTrustScoreProps {
  score?: number;
}

export default function VehicleTrustScore({
  score = 96,
}: VehicleTrustScoreProps) {

  const checks = [

    ["VIN Verified", true],
    ["Dealer Verified", true],
    ["Inspection Completed", true],
    ["Ownership Verified", true],
    ["No Theft Record", true],
    ["No Flood Damage", true],
    ["Mileage Consistent", true],
    ["Insurance History", true],
    ["Recall Cleared", true],
    ["Accident Free", true],

  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-blue-950">

        Strong Tower Trust Score

      </h2>

      <div className="mb-8 flex items-center gap-6">

        <div className="flex h-32 w-32 items-center justify-center rounded-full bg-green-100 text-5xl font-bold text-green-700">

          {score}

        </div>

        <div>

          <h3 className="text-2xl font-bold text-green-700">

            Excellent

          </h3>

          <p className="mt-2 text-gray-600">

            This vehicle passed most verification checks.

          </p>

        </div>

      </div>

      <div className="space-y-4">

        {checks.map(([title, status]) => (

          <div
            key={title}
            className="flex justify-between rounded-xl border p-4"
          >

            <span>{title}</span>

            <span className="font-bold text-green-700">

              {status ? "✓ Passed" : "Pending"}

            </span>

          </div>

        ))}

      </div>

    </section>

  );

}