export default function VehicleFinancing() {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-blue-950">

        Vehicle Financing

      </h2>

      <p className="mb-8 text-gray-600">

        Apply for vehicle financing through our approved banking and
        finance partners. Financing approval and repayment plans will
        be available after verification.

      </p>

      <div className="grid gap-5 md:grid-cols-2">

        <input
          className="rounded-xl border p-4"
          placeholder="Full Name"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Phone Number"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Email Address"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Monthly Income"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Preferred Deposit Amount"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Preferred Repayment Duration"
        />

      </div>

      <button className="mt-8 rounded-xl bg-blue-900 px-8 py-4 font-semibold text-white">

        Apply For Financing

      </button>

    </section>

  );

}