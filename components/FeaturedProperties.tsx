export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "Luxury 4 Bedroom Duplex",
      location: "Lekki Phase 1, Lagos",
      price: "₦180,000,000",
      status: "For Sale",
      image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800",
    },
    {
      id: 2,
      title: "2 Bedroom Apartment",
      location: "Ogba, Lagos",
      price: "₦2,500,000 / Year",
      status: "For Rent",
      image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
    },
    {
      id: 3,
      title: "Commercial Office Space",
      location: "Victoria Island",
      price: "₦12,000,000 / Year",
      status: "Lease",
      image: "https://images.unsplash.com/photo-1494526585095-c41746248156?w=800",
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          Featured Properties
        </h2>

        <p className="text-center mt-4 text-gray-600">
          Verified properties from trusted agents.
        </p>

        <div className="grid md:grid-cols-3 gap-8 mt-12">

          {properties.map((property) => (

            <div
              key={property.id}
              className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition"
            >

              <img
                src={property.image}
                alt={property.title}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">

                <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm">
                  {property.status}
                </span>

                <h3 className="text-2xl font-bold mt-4">
                  {property.title}
                </h3>

                <p className="text-gray-500 mt-2">
                  📍 {property.location}
                </p>

                <p className="text-2xl font-bold text-blue-900 mt-4">
                  {property.price}
                </p>

                <div className="mt-6 flex justify-between items-center">

                  <span className="text-green-600 font-semibold">
                      ✔ Verified
                  </span>

                  <button className="bg-blue-800 text-white px-5 py-2 rounded-lg hover:bg-blue-900">
                    View Details
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>
    </section>
  );
}