"use client";

interface FurnitureContactProps {
  seller: string;
}

export default function FurnitureContact({
  seller,
}: FurnitureContactProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-orange-700">

        Contact Seller

      </h2>

      <div className="grid gap-5">

        <input
          className="rounded-xl border p-4"
          placeholder="Your Name"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Phone Number"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Email Address"
        />

        <textarea
          rows={6}
          className="rounded-xl border p-4"
          defaultValue={`Hello ${seller},

I am interested in this furniture item.

Kindly let me know if it is still available.

Thank you.`}
        />

        <button className="rounded-xl bg-orange-600 py-4 font-semibold text-white hover:bg-orange-700">

          Send Enquiry

        </button>

      </div>

    </section>

  );

}