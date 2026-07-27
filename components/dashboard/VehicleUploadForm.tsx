"use client";

export default function VehicleUploadForm() {

  return (

    <form className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-blue-950">

        Upload Vehicle

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          placeholder="Vehicle Title"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Manufacturer"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Model"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Year"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="VIN Number"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Engine Number"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Mileage"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Price"
          className="rounded-xl border p-4"
        />

      </div>

      <textarea
        rows={6}
        placeholder="Vehicle Description"
        className="w-full rounded-xl border p-4"
      />

      <div>

        <label className="mb-2 block font-semibold">

          Upload Vehicle Photos (Maximum 30)

        </label>

        <input
          type="file"
          multiple
          accept="image/*"
          className="w-full rounded-xl border p-4"
        />

      </div>

      <div>

        <label className="mb-2 block font-semibold">

          Upload Vehicle Video

        </label>

        <input
          type="file"
          accept="video/*"
          className="w-full rounded-xl border p-4"
        />

      </div>

      <button
        className="rounded-xl bg-blue-900 px-8 py-4 font-semibold text-white"
      >

        Save Vehicle

      </button>

    </form>

  );

}