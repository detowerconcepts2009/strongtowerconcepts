import Link from "next/link";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function PartnerPage() {
  const partnerTypes = [
    {
      title: "Property Agents",
      description:
        "List and promote properties while connecting with potential customers.",
    },
    {
      title: "Vehicle Sellers",
      description:
        "Showcase vehicles and reach customers looking for reliable transportation.",
    },
    {
      title: "Business Owners",
      description:
        "Register and promote your business through the Strong Tower Concepts platform.",
    },
    {
      title: "ICT Service Providers",
      description:
        "Offer technology, website, hosting, branding and other professional services.",
    },
    {
      title: "Logistics Partners",
      description:
        "Join our cargo and logistics network and serve customers locally and internationally.",
    },
    {
      title: "Marketplace Vendors",
      description:
        "Sell products and grow your customer base through our digital marketplace.",
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#071A35] via-[#0B2447] to-[#123A67] px-6 py-20 text-white">
        <div className="mx-auto max-w-6xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
            Strong Tower Concepts
          </p>

          <h1 className="text-4xl font-black md:text-6xl">
            Become a Partner
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Grow your business by joining Strong Tower Concepts and reach more
            customers through our growing digital marketplace.
          </p>
        </div>
      </section>

      {/* Partner Types */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {partnerTypes.map((partner) => (
            <div
              key={partner.title}
              className="rounded-2xl bg-white p-8 shadow-md"
            >
              <h2 className="text-xl font-bold text-blue-950">
                {partner.title}
              </h2>

              <p className="mt-4 leading-7 text-slate-600">
                {partner.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Partnership CTA */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-4xl rounded-3xl bg-blue-950 px-8 py-12 text-center text-white">
          <h2 className="text-3xl font-bold">
            Ready to grow with us?
          </h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-blue-100">
            Partner with Strong Tower Concepts and become part of a platform
            built around one vision, many solutions and endless value.
          </p>

          <Link
            href="/auth/register"
            className="mt-8 inline-flex rounded-xl bg-yellow-400 px-7 py-3 font-semibold text-blue-950 transition hover:bg-yellow-300"
          >
            Start Your Partnership
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}