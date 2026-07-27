"use client";

export default function PropertyUploadForm() {

  return (

    <form className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-blue-950">
        Upload Property
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          placeholder="Property Title"
          className="rounded-xl border p-4"
        />

        <select className="rounded-xl border p-4">

          <option>Sale</option>

          <option>Rent</option>

        </select>

        <select className="rounded-xl border p-4">

          <option>Residential</option>

          <option>Commercial</option>

          <option>Land</option>

        </select>

        <input
          placeholder="Price"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Bedrooms"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Bathrooms"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="Inspection Fee"
          className="rounded-xl border p-4"
        />

        <input
          placeholder="State"
          className="rounded-xl border p-4"
        />

      </div>

      <textarea
        rows={6}
        placeholder="Property Description"
        className="w-full rounded-xl border p-4"
      />

      <div>

        <label className="mb-2 block font-semibold">
          Upload Images (Maximum 30)
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
          Upload Property Video
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
        Save Property
      </button>

    </form>

  );

}