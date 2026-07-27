"use client";

export default function FurnitureUploadForm() {
  return (
    <form className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-blue-950">
        Upload Furniture Product
      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          className="rounded-xl border p-4"
          placeholder="Product Name"
        />

        <select className="rounded-xl border p-4">

          <option>Mattress</option>
          <option>Pillow</option>
          <option>Bed</option>
          <option>Sofa</option>
          <option>Dining Set</option>
          <option>Wardrobe</option>
          <option>Office Furniture</option>
          <option>Others</option>

        </select>

        <input
          className="rounded-xl border p-4"
          placeholder="Brand"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Price"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Quantity"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="SKU"
        />

      </div>

      <textarea
        rows={6}
        className="w-full rounded-xl border p-4"
        placeholder="Product Description"
      />

      <input
        type="file"
        multiple
        accept="image/*"
        className="w-full rounded-xl border p-4"
      />

      <button
        className="rounded-xl bg-blue-900 px-8 py-4 font-semibold text-white"
      >
        Save Product
      </button>

    </form>
  );
}