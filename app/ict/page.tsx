import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "Website Development",
    description: "Professional websites, portals and custom web applications.",
    href: "/services/web-development",
  },
  {
    title: "Web Hosting",
    description: "Hosting, domains, deployment and website support.",
    href: "/services/web-hosting",
  },
  {
    title: "Branding & Graphics",
    description: "Professional visual identity and digital design services.",
    href: "/services/branding",
  },
  {
    title: "CCTV & Security",
    description: "Surveillance and security system installation solutions.",
    href: "/services/cctv",
  },
];

export default function ICTPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-indigo-950 to-blue-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            ICT & DIGITAL SOLUTIONS
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Technology That Works for Your Business
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            From websites and hosting to branding and security systems,
            Strong Tower Concepts provides practical technology solutions for
            individuals and organizations.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-950">
            Our ICT Solutions
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl bg-white p-8 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-blue-950 group-hover:text-blue-700">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {service.description}
              </p>

              <span className="mt-6 inline-flex font-semibold text-yellow-600 transition group-hover:translate-x-2">
                Learn More →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}