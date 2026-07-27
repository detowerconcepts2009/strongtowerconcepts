export default function VehicleInspectionReport() {

  const report = [

    ["Engine", "Excellent"],
    ["Transmission", "Excellent"],
    ["Suspension", "Very Good"],
    ["Braking System", "Excellent"],
    ["Electrical System", "Good"],
    ["Tyres", "80% Remaining"],
    ["Interior", "Excellent"],
    ["Exterior", "Very Good"],
    ["Air Conditioning", "Working Perfectly"],

  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Mechanical Inspection Report

      </h2>

      <div className="grid gap-4 md:grid-cols-2">

        {report.map(([title, status]) => (

          <div
            key={title}
            className="flex items-center justify-between rounded-xl border p-4"
          >

            <span className="font-semibold">
              {title}
            </span>

            <span className="rounded-full bg-blue-100 px-4 py-1 text-blue-900">
              {status}
            </span>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-xl border-l-4 border-blue-900 bg-blue-50 p-5">

        <h3 className="mb-2 text-lg font-bold text-blue-900">
          Inspection Note
        </h3>

        <p className="text-gray-700">
          This section is prepared for integration with certified inspection partners.
          In production, inspection results will be uploaded by approved inspectors
          and linked directly to each vehicle listing.
        </p>

      </div>

    </section>

  );

}