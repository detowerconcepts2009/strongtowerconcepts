"use client";

interface BusinessContactProps {
  service: string;
}

export default function BusinessContact({
  service,
}: BusinessContactProps) {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Request This Service

      </h2>

      <div className="grid gap-5">

        <input
          type="text"
          placeholder="Full Name"
          className="rounded-xl border p-4"
        />

        <input
          type="email"
          placeholder="Email Address"
          className="rounded-xl border p-4"
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="rounded-xl border p-4"
        />

        <textarea
          rows={6}
          className="rounded-xl border p-4"
          defaultValue={`Hello,

I am interested in your ${service} service.

Kindly contact me.

Thank you.`}
        />

        <button className="rounded-xl bg-blue-900 py-4 font-semibold text-white hover:bg-blue-950">

          Submit Request

        </button>

      </div>

    </section>

  );

}