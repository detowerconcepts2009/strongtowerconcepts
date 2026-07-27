export default function PropertySearch() {
  return (
    <section className="bg-white py-10 -mt-12 relative z-20">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-2xl p-8">

        <h2 className="text-3xl font-bold text-blue-900 mb-8 text-center">
          Find Your Dream Property
        </h2>

        <div className="grid md:grid-cols-5 gap-4">

          <input
            type="text"
            placeholder="Location"
            className="border rounded-lg p-4"
          />

          <select className="border rounded-lg p-4">
            <option>Property Type</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Land</option>
            <option>Commercial</option>
          </select>

          <select className="border rounded-lg p-4">
            <option>Purpose</option>
            <option>Buy</option>
            <option>Rent</option>
            <option>Lease</option>
          </select>

          <select className="border rounded-lg p-4">
            <option>Budget</option>
            <option>₦5M - ₦20M</option>
            <option>₦20M - ₦50M</option>
            <option>₦50M+</option>
          </select>

          <button className="bg-blue-700 text-white rounded-lg p-4 hover:bg-blue-800">
            Search
          </button>

        </div>

      </div>
    </section>
  );
}