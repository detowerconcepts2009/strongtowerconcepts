import Button from "@/components/Button";

export default function PropertyDetailsPage() {
  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">

          <p className="text-sm mb-2">
            Property Details
          </p>

          <h1 className="text-4xl font-bold">
            4 Bedroom Detached Duplex
          </h1>

          <p className="mt-3 text-blue-100">
            Lekki Phase 1, Lagos
          </p>

        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-10 grid lg:grid-cols-3 gap-10">

        <div className="lg:col-span-2">

          <div className="bg-gray-300 rounded-xl h-[450px] flex items-center justify-center text-gray-600 text-2xl">
            Property Image
          </div>

          <div className="mt-8">

            <div className="flex items-center justify-between">

              <h2 className="text-4xl font-bold text-blue-900">
                ₦85,000,000
              </h2>

              <span className="bg-green-600 text-white px-4 py-2 rounded-full">
                ✔ Verified
              </span>

            </div>

            <p className="text-gray-500 mt-2">
              For Sale
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">

            <div className="bg-white rounded-lg shadow p-4 text-center">
              🛏
              <h3 className="font-bold mt-2">4 Bedrooms</h3>
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-center">
              🚿
              <h3 className="font-bold mt-2">5 Bathrooms</h3>
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-center">
              🚗
              <h3 className="font-bold mt-2">Parking</h3>
            </div>

            <div className="bg-white rounded-lg shadow p-4 text-center">
              📐
              <h3 className="font-bold mt-2">650 sqm</h3>
            </div>

          </div>

          <div className="bg-white rounded-xl shadow p-6 mt-8">

            <h2 className="text-2xl font-bold text-blue-900 mb-4">
              Property Description
            </h2>

            <p className="text-gray-600 leading-8">
              This beautifully finished 4-bedroom detached duplex is located
              in the serene environment of Lekki Phase 1.

              It features spacious rooms, a modern fitted kitchen,
              ample parking space, CCTV installation,
              swimming pool, gym, and premium finishing.
            </p>

          </div>

        </div>

        <div>

          <div className="bg-white rounded-xl shadow p-6 sticky top-24">

            <div className="w-24 h-24 rounded-full bg-blue-900 text-white flex items-center justify-center text-3xl font-bold mx-auto">
              STC
            </div>

            <h2 className="text-center text-2xl font-bold mt-4">
              Olawale Victor
            </h2>

            <p className="text-center text-gray-500">
              Verified Realtor
            </p>

            <div className="space-y-4 mt-8">

              <Button
                text="WhatsApp Agent"
                variant="secondary"
              />

              <Button
                text="Call Agent"
              />

              <Button
                text="Book Inspection"
                variant="outline"
              />

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}