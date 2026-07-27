interface VehicleHistoryProps {
  vin?: string;
}

export default function VehicleHistory({
  vin,
}: VehicleHistoryProps) {

  const history = [
    {
      title: "VIN Verification",
      status: "Verified",
    },
    {
      title: "Accident History",
      status: "No Accident Record",
    },
    {
      title: "Odometer Rollback",
      status: "No Rollback Detected",
    },
    {
      title: "Flood Damage",
      status: "No Flood Damage",
    },
    {
      title: "Theft Record",
      status: "No Theft Record",
    },
    {
      title: "Ownership History",
      status: "1 Previous Owner",
    },
    {
      title: "Insurance Claim",
      status: "No Major Claim",
    },
    {
      title: "Recall Status",
      status: "No Active Recall",
    },
  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-2 text-3xl font-bold text-blue-950">
        Vehicle History Report
      </h2>

      {vin && (
        <p className="mb-8 text-gray-500">
          VIN: {vin}
        </p>
      )}

      <div className="space-y-4">

        {history.map((item) => (

          <div
            key={item.title}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <span className="font-semibold">
              {item.title}
            </span>

            <span className="rounded-full bg-green-100 px-4 py-1 text-green-700">
              {item.status}
            </span>

          </div>

        ))}

      </div>

    </section>

  );

}