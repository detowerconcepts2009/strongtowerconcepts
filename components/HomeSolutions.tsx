import Link from "next/link";

const solutions = [
  {
    title: "Marketplace",
    subtitle: "Properties • Vehicles • Interior Needs",
    href: "/marketplace",
    color: "from-blue-700 to-blue-900",
  },
  {
    title: "Business Services",
    subtitle: "CAC • NIN • Business Registration",
    href: "/business",
    color: "from-yellow-500 to-yellow-600",
  },
  {
    title: "ICT Solutions",
    subtitle: "Websites • Hosting • CCTV • Domains",
    href: "/ict",
    color: "from-indigo-600 to-blue-700",
  },
  {
    title: "Cargo & Logistics",
    subtitle: "Nigeria ↔ UK • USA • Canada • Europe",
    href: "/cargo",
    color: "from-emerald-600 to-green-700",
  },
];

export default function HomeSolutions() {
  return (
    <section className="py-20 bg-gray-50">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="text-yellow-600 font-semibold uppercase tracking-widest">
            OUR PLATFORM
          </p>

          <h2 className="mt-3 text-4xl font-bold text-blue-900">
            One Vision. Many Solutions.
          </h2>

          <p className="mt-5 max-w-3xl mx-auto text-gray-600 text-lg">
            Explore our growing ecosystem of business solutions designed for
            individuals, entrepreneurs and organizations.
          </p>

        </div>

        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

          {solutions.map((item) => (

            <Link
              key={item.title}
              href={item.href}
              className="group overflow-hidden rounded-3xl bg-white shadow-md hover:shadow-2xl transition duration-300"
            >

              <div className={`h-3 bg-gradient-to-r ${item.color}`} />

              <div className="p-8">

                <h3 className="text-2xl font-bold text-blue-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-gray-600 leading-7">
                  {item.subtitle}
                </p>

                <div className="mt-8 inline-flex items-center text-yellow-600 font-semibold group-hover:translate-x-2 transition">
                  Explore →
                </div>

              </div>

            </Link>

          ))}

        </div>

      </div>

    </section>
  );
}