"use client";

const approvals = [
  {
    id: "STC001",
    property: "Luxury 4 Bedroom Duplex",
    dealer: "Prime Realtors",
    submitted: "26 Jul 2026",
    status: "Pending",
  },
];

export default function PropertyApprovalTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-indigo-900 text-white">

          <tr>

            <th className="p-4">Property ID</th>
            <th>Property</th>
            <th>Dealer</th>
            <th>Submitted</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {approvals.map((item) => (

            <tr
              key={item.id}
              className="border-b text-center"
            >

              <td className="p-4">{item.id}</td>

              <td>{item.property}</td>

              <td>{item.dealer}</td>

              <td>{item.submitted}</td>

              <td>{item.status}</td>

              <td>

                <div className="flex justify-center gap-3">

                  <button className="rounded-lg bg-green-600 px-4 py-2 text-white">
                    Approve
                  </button>

                  <button className="rounded-lg bg-red-600 px-4 py-2 text-white">
                    Reject
                  </button>

                </div>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}