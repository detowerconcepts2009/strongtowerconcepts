import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Car,
  Sofa,
  Laptop,
  Package,
} from "lucide-react";

const marketplace = [
  {
    title: "Properties",
    description: "Buy • Sell • Rent Properties",
    icon: Building2,
    href: "/marketplace/properties",
    bg: "bg-blue-100",
    color: "text-blue-900",
  },
  {
    title: "Vehicles",
    description: "Cars • SUVs • Commercial Vehicles",
    icon: Car,
    href: "/marketplace/vehicles",
    bg: "bg-blue-100",
    color: "text-blue-900",
  },
  {
    title: "Interior Needs",
    description: "Furniture • Home Décor • Kitchen",
    icon: Sofa,
    href: "/services/interior",
    bg: "bg-yellow-100",
    color: "text-yellow-700",
  },
  {
    title: "ICT Solutions",
    description: "Web • Hosting • CCTV • Branding",
    icon: Laptop,
    href: "/services/web-development",
    bg: "bg-yellow-100",
    color: "text-yellow-700",
  },
  {
    title: "Cargo & Logistics",
    description: "Nigeria to UK, Canada, USA & Europe",
    icon: Package,
    href: "/services/cargo",
    bg: "bg-yellow-100",
    color: "text-yellow-700",
  },
];

export default function MarketplaceDashboard() {
  return (
    <section className="bg-slate-50 py-24">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center">

          <h2 className="text-5xl font-black text-blue-950">
            Explore Our Marketplace
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Everything you need from one trusted platform.
          </p>

        </div>

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8 mt-16">

          {marketplace.map((item) => {

            const Icon = item.icon;

            return (

              <Link
                key={item.title}
                href={item.href}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl border border-slate-100 p-8 transition-all duration-300 hover:-translate-y-2"
              >

                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center ${item.bg}`}
                >
                  <Icon className={item.color} size={34} />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-blue-950">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-600 leading-7">
                  {item.description}
                </p>

                <div className="mt-8 flex items-center gap-2 font-semibold text-blue-900">

                  Explore

                  <ArrowRight
                    size={18}
                    className="group-hover:translate-x-2 transition"
                  />

                </div>

              </Link>

            );

          })}

        </div>

      </div>

    </section>
  );
}