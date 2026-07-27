export default function Services() {
  const services = [
    "Website Development",
    "Web Hosting",
    "CAC Registration",
    "Real Estate",
    "Graphic Design",
    "NIN Services",
    "Internet Solutions",
    "Printing & Branding",
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <h2 className="text-4xl font-bold text-center text-blue-900">
          Our Services
        </h2>

        <p className="text-center text-gray-600 mt-4">
          Professional solutions tailored to individuals and businesses.
        </p>

        <div className="grid md:grid-cols-4 sm:grid-cols-2 gap-6 mt-12">
          {services.map((service) => (
            <div
              key={service}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition"
            >
              <h3 className="font-semibold text-lg text-blue-900">
                {service}
              </h3>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}