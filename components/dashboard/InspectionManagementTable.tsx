"use client";

const inspections = [
  {
    booking: "BK-1001",
    property: "Luxury Duplex",
    customer: "Olawale Victor",
    phone: "08031234567",
    date: "30 Jul 2026",
    time: "10:00 AM",
    payment: "Paid",
    status: "Pending",
  },
];

export default function InspectionManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-emerald-700 text-white">

          <tr>

            <th className="p-4">Booking</th>

            <th>Property</th>

            <th>Customer</th>

            <th>Phone</th>

            <th>Date</th>

            <th>Time</th>

            <th>Payment</th>

            <th>Status</th>

          </tr>

        </thead>

        <tbody>

          {inspections.map((item) => (

            <tr
              key={item.booking}
              className="border-b text-center"
            >

              <td className="p-4">{item.booking}</td>

              <td>{item.property}</td>

              <td>{item.customer}</td>

              <td>{item.phone}</td>

              <td>{item.date}</td>

              <td>{item.time}</td>

              <td>

                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">

                  {item.payment}

                </span>

              </td>

              <td>

                <button className="rounded-lg bg-blue-900 px-4 py-2 text-white">

                  {item.status}

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}