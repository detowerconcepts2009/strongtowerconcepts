"use client";

const vouchers = [
  {
    code: "WELCOME500",
    value: "₦500",
    redeemed: 124,
    balance: 876,
    status: "Active",
  },
];

export default function VoucherManagementTable() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-purple-700 text-white">

          <tr>
            <th className="p-4">Voucher Code</th>
            <th>Value</th>
            <th>Redeemed</th>
            <th>Remaining</th>
            <th>Status</th>
            <th>Action</th>
          </tr>

        </thead>

        <tbody>

          {vouchers.map((voucher) => (

            <tr
              key={voucher.code}
              className="border-b text-center"
            >

              <td className="p-4 font-semibold">
                {voucher.code}
              </td>

              <td>{voucher.value}</td>

              <td>{voucher.redeemed}</td>

              <td>{voucher.balance}</td>

              <td>{voucher.status}</td>

              <td>

                <button className="rounded-lg bg-purple-700 px-4 py-2 text-white">

                  Edit

                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}