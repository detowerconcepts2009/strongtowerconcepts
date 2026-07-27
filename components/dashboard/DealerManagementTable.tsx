"use client";

const dealers = [
  {
    id: "DLR001",
    company: "Prime Realtors Ltd",
    listings: 24,
    phone: "+234800000000",
    status: "Verified",
  },
];

export default function DealerManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-green-700 text-white">

          <tr>

            <th className="p-4">Dealer ID</th>
            <th>Company</th>
            <th>Listings</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {dealers.map((dealer) => (

            <tr
              key={dealer.id}
              className="border-b text-center"
            >

              <td className="p-4">{dealer.id}</td>
              <td>{dealer.company}</td>
              <td>{dealer.listings}</td>
              <td>{dealer.phone}</td>
              <td>{dealer.status}</td>

              <td>

                <button className="rounded-lg bg-blue-900 px-4 py-2 text-white">

                  Manage

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}