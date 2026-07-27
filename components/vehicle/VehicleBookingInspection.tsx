export default function VehicleBookingInspection() {

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-6 text-3xl font-bold text-blue-950">

        Book Vehicle Inspection

      </h2>

      <p className="mb-8 text-gray-600">

        Book an independent inspection before making payment.
        Certified inspection partners will verify the vehicle's
        condition and upload a digital report.

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
          type="date"
          className="rounded-xl border p-4"
        />

        <select className="rounded-xl border p-4">

          <option>Select Preferred Time</option>
          <option>9:00 AM</option>
          <option>11:00 AM</option>
          <option>1:00 PM</option>
          <option>3:00 PM</option>

        </select>

      </div>

      <textarea
        rows={5}
        className="mt-6 w-full rounded-xl border p-4"
        placeholder="Additional Notes"
      />

      <button className="mt-8 rounded-xl bg-green-700 px-8 py-4 font-semibold text-white">

        Book Inspection

      </button>

    </section>

  );

}