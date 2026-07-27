"use client";

export default function ProductUploadForm() {

  return (

    <form className="space-y-8 rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="text-3xl font-bold text-blue-950">

        Upload Marketplace Product

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <input
          className="rounded-xl border p-4"
          placeholder="Product Name"
        />

        <select className="rounded-xl border p-4">

          <option>Electronics</option>
          <option>Home Appliances</option>
          <option>Fashion</option>
          <option>Building Materials</option>
          <option>General Merchandise</option>

        </select>

        <input
          className="rounded-xl border p-4"
          placeholder="Brand"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Selling Price"
        />

        <input
          className="rounded-xl border p-4"
          placeholder="Available Quantity"
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
        className="rounded-xl bg-green-700 px-8 py-4 font-semibold text-white"
      >
        Publish Product
      </button>

    </form>

  );

}