interface VehicleVINReportProps {
  vin?: string;
}

export default function VehicleVINReport({
  vin = "JTNB11HK8N3000001",
}: VehicleVINReportProps) {

  const report = [

    ["VIN", vin],
    ["Manufacturer", "Toyota"],
    ["Country", "Japan"],
    ["Model Year", "2022"],
    ["Assembly Plant", "Toyota City"],
    ["Body Style", "Sedan"],
    ["Engine", "2.5L Petrol"],
    ["Transmission", "Automatic"],
    ["Drive Type", "Front Wheel Drive"],
    ["Recall Status", "No Open Recall"],
    ["Theft Status", "No Theft Record"],
    ["Salvage Record", "None"],
    ["Flood Damage", "None"],
    ["Airbag Deployment", "No Record"],

  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        VIN Report

      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {report.map(([title, value]) => (

          <div
            key={title}
            className="flex justify-between rounded-xl border p-4"
          >

            <span className="font-semibold text-gray-600">

              {title}

            </span>

            <span className="font-bold text-blue-950">

              {value}

            </span>

          </div>

        ))}

      </div>

      <div className="mt-8 rounded-xl border-l-4 border-blue-900 bg-blue-50 p-5">

        <p className="text-gray-700">

          Future versions will retrieve this report automatically
          from VIN verification partners after successful lookup.

        </p>

      </div>

    </section>

  );

}