export default function VehicleCompare() {

  const vehicles = [

    {
      name: "Toyota Camry",
      year: 2022,
      price: "₦42.5M",
      mileage: "18,000 km",
      transmission: "Automatic",
    },

    {
      name: "Honda Accord",
      year: 2022,
      price: "₦39M",
      mileage: "21,000 km",
      transmission: "Automatic",
    },

  ];

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Compare Vehicles

      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border">

          <thead className="bg-blue-900 text-white">

            <tr>

              <th className="p-4 text-left">
                Specification
              </th>

              {vehicles.map((vehicle) => (

                <th
                  key={vehicle.name}
                  className="p-4"
                >
                  {vehicle.name}
                </th>

              ))}

            </tr>

          </thead>

          <tbody>

            <tr className="border-b">

              <td className="p-4 font-semibold">
                Year
              </td>

              {vehicles.map((vehicle) => (

                <td
                  key={vehicle.name}
                  className="p-4 text-center"
                >
                  {vehicle.year}
                </td>

              ))}

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold">
                Price
              </td>

              {vehicles.map((vehicle) => (

                <td
                  key={vehicle.name}
                  className="p-4 text-center"
                >
                  {vehicle.price}
                </td>

              ))}

            </tr>

            <tr className="border-b">

              <td className="p-4 font-semibold">
                Mileage
              </td>

              {vehicles.map((vehicle) => (

                <td
                  key={vehicle.name}
                  className="p-4 text-center"
                >
                  {vehicle.mileage}
                </td>

              ))}

            </tr>

            <tr>

              <td className="p-4 font-semibold">
                Transmission
              </td>

              {vehicles.map((vehicle) => (

                <td
                  key={vehicle.name}
                  className="p-4 text-center"
                >
                  {vehicle.transmission}
                </td>

              ))}

            </tr>

          </tbody>

        </table>

      </div>

    </section>

  );

}