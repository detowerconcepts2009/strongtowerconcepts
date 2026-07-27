import Link from "next/link";
import {
  Building2,
  Car,
  Sofa,
  Monitor,
  Briefcase,
  ShoppingBag,
} from "lucide-react";

const categories = [
  {
    title: "Properties",
    href: "/marketplace/properties",
    icon: Building2,
  },
  {
    title: "Vehicles",
    href: "/marketplace/vehicles",
    icon: Car,
  },
  {
    title: "Furniture & Mattresses",
    href: "/marketplace/furniture",
    icon: Sofa,
  },
  {
    title: "Electronics",
    href: "/marketplace/electronics",
    icon: Monitor,
  },
  {
    title: "Professional Services",
    href: "/services",
    icon: Briefcase,
  },
  {
    title: "General Merchandise",
    href: "/marketplace/shop",
    icon: ShoppingBag,
  },
];

export default function MarketplaceCategories() {

  return (

    <section className="py-12">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Browse Categories

      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

        {categories.map((category) => {

          const Icon = category.icon;

          return (

            <Link
              key={category.title}
              href={category.href}
              className="rounded-2xl bg-white p-8 text-center shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
            >

              <Icon
                size={40}
                className="mx-auto mb-5 text-blue-900"
              />

              <h3 className="font-bold text-blue-950">
                {category.title}
              </h3>

            </Link>

          );

        })}

      </div>

    </section>

  );

}