"use client";

import Link from "next/link";

const vehicles = [
  {
    id: "CAR001",
    title: "2022 Toyota Camry",
    vin: "JTNB11HK8N3000001",
    price: "₦42,500,000",
    status: "Available",
    report: "Verified",
  },
];

export default function VehicleManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-slate-800 text-white">

          <tr>

            <th className="p-4">Vehicle ID</th>
            <th>Vehicle</th>
            <th>VIN</th>
            <th>Price</th>
            <th>Status</th>
            <th>Scan Report</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {vehicles.map((vehicle) => (

            <tr
              key={vehicle.id}
              className="border-b text-center"
            >

              <td className="p-4">{vehicle.id}</td>

              <td>{vehicle.title}</td>

              <td>{vehicle.vin}</td>

              <td>{vehicle.price}</td>

              <td>{vehicle.status}</td>

              <td>

                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

                  {vehicle.report}

                </span>

              </td>

              <td>

                <Link
                  href="#"
                  className="rounded-lg bg-blue-900 px-4 py-2 text-white"
                >

                  Manage

                </Link>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}