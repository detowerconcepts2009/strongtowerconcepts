"use client";

import Link from "next/link";

const products = [
  {
    id: "FUR001",
    product: "Vita Supreme Mattress",
    category: "Mattress",
    brand: "Vitafoam",
    price: "₦285,000",
    stock: 24,
    status: "Available",
  },
];

export default function FurnitureManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-orange-700 text-white">

          <tr>

            <th className="p-4">Product ID</th>
            <th>Product</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Status</th>
            <th>Action</th>

          </tr>

        </thead>

        <tbody>

          {products.map((item) => (

            <tr
              key={item.id}
              className="border-b text-center"
            >

              <td className="p-4">{item.id}</td>

              <td>{item.product}</td>

              <td>{item.category}</td>

              <td>{item.brand}</td>

              <td>{item.price}</td>

              <td>{item.stock}</td>

              <td>{item.status}</td>

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