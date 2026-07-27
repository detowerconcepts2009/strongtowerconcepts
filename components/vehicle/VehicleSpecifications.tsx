interface VehicleSpecificationsProps {
  specs: {
    year: number;
    manufacturer: string;
    model: string;
    transmission: string;
    fuel: string;
    mileage: string;
    engine: string;
    drive: string;
    color: string;
    vin: string;
    chassis: string;
    engineNumber: string;
    condition: string;
    accidentHistory: string;
    dutyStatus: string;
    ownership: string;
  };
}

export default function VehicleSpecifications({
  specs,
}: VehicleSpecificationsProps) {

  const items = [

    ["Year", specs.year],
    ["Manufacturer", specs.manufacturer],
    ["Model", specs.model],
    ["Transmission", specs.transmission],
    ["Fuel Type", specs.fuel],
    ["Mileage", specs.mileage],
    ["Engine", specs.engine],
    ["Drive Type", specs.drive],
    ["Exterior Color", specs.color],
    ["VIN Number", specs.vin],
    ["Chassis Number", specs.chassis],
    ["Engine Number", specs.engineNumber],
    ["Condition", specs.condition],
    ["Accident History", specs.accidentHistory],
    ["Duty Status", specs.dutyStatus],
    ["Ownership", specs.ownership],

  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Vehicle Specifications

      </h2>

      <div className="grid gap-5 md:grid-cols-2">

        {items.map(([label, value]) => (

          <div
            key={label}
            className="flex justify-between rounded-xl border p-4"
          >

            <span className="font-semibold text-gray-600">

              {label}

            </span>

            <span className="font-bold text-blue-950">

              {value}

            </span>

          </div>

        ))}

      </div>

      <div className="mt-10 rounded-xl border-l-4 border-green-600 bg-green-50 p-5">

        <h3 className="mb-2 text-lg font-bold text-green-700">

          Vehicle Verification

        </h3>

        <p className="text-gray-700">

          VIN, Chassis Number and Engine Number are displayed to
          improve buyer confidence. Vehicle history reports and VIN
          verification APIs will be connected in the next phase.

        </p>

      </div>

    </section>

  );

}