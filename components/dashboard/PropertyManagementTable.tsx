"use client";

import Image from "next/image";
import Link from "next/link";

import {
  FaEdit,
  FaTrash,
  FaEye,
  FaCopy,
} from "react-icons/fa";

const listings = [
  {
    id: "STC001",
    title: "Luxury 4 Bedroom Duplex",
    image: "/images/properties/property1.jpg",
    price: "₦280,000,000",
    status: "Available",
    approval: "Approved",
    views: 124,
    date: "26 Jul 2026",
  },
];

export default function PropertyManagementTable() {

  return (

    <div className="overflow-hidden rounded-2xl bg-white shadow-lg">

      <table className="w-full">

        <thead className="bg-blue-950 text-white">

          <tr>

            <th className="p-4 text-left">Property</th>

            <th>ID</th>

            <th>Price</th>

            <th>Status</th>

            <th>Approval</th>

            <th>Views</th>

            <th>Date</th>

            <th>Actions</th>

          </tr>

        </thead>

        <tbody>

          {listings.map((item) => (

            <tr
              key={item.id}
              className="border-b"
            >

              <td className="flex items-center gap-4 p-4">

                <Image
                  src={item.image}
                  alt={item.title}
                  width={70}
                  height={60}
                  className="rounded-lg object-cover"
                />

                {item.title}

              </td>

              <td>{item.id}</td>

              <td>{item.price}</td>

              <td>{item.status}</td>

              <td>{item.approval}</td>

              <td>{item.views}</td>

              <td>{item.date}</td>

              <td>

                <div className="flex justify-center gap-3">

                  <Link href="#">
                    <FaEye />
                  </Link>

                  <Link href="#">
                    <FaEdit />
                  </Link>

                  <Link href="#">
                    <FaCopy />
                  </Link>

                  <button>
                    <FaTrash className="text-red-600" />
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