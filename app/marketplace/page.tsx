import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "Properties",
    description: "Explore properties available for sale and other property opportunities.",
    href: "/properties",
  },
  {
    title: "Vehicles",
    description: "Browse vehicles and automotive listings from available sellers.",
    href: "/marketplace/vehicles",
  },
  {
    title: "Interior Needs",
    description: "Discover furniture, fittings and products for your interior spaces.",
    href: "/marketplace/interior",
  },
  {
    title: "Electronics",
    description: "Shop electronics and technology products from marketplace listings.",
    href: "/marketplace/electronics",
  },
  {
    title: "General Merchandise",
    description: "Discover a wide range of products across different categories.",
    href: "/marketplace/general",
  },
];

export default function MarketplacePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            STRONG TOWER MARKETPLACE
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            One Marketplace. Many Possibilities.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Explore properties, vehicles, interior products, electronics and
            general merchandise through the Strong Tower Concepts marketplace.
          </p>

          <div className="mt-8">
            <Link
              href="/properties"
              className="inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
            >
              Explore Marketplace
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <p className="font-semibold uppercase tracking-widest text-yellow-600">
            MARKETPLACE CATEGORIES
          </p>

          <h2 className="mt-2 text-3xl font-bold text-blue-950">
            Explore Categories
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Select a category to explore available listings and products.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="group rounded-2xl bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-blue-950 group-hover:text-blue-700">
                {category.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {category.description}
              </p>

              <span className="mt-6 inline-flex font-semibold text-yellow-600 transition group-hover:translate-x-2">
                Explore →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl bg-blue-950 px-8 py-14 text-center text-white">
          <h2 className="text-3xl font-bold">
            Looking for Something Specific?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Contact Strong Tower Concepts for marketplace enquiries, product
            information or assistance with available listings.
          </p>

          <Link
            href="/contact"
            className="mt-7 inline-flex rounded-xl bg-white px-7 py-3 font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Contact Us
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}