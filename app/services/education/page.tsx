import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    title: "JAMB Registration",
    description: "UTME registration and admission processing assistance.",
    href: "/services/jamb",
  },
  {
    title: "WAEC Registration",
    description: "WAEC registration and examination processing assistance.",
    href: "/services/waec",
  },
  {
    title: "NECO Registration",
    description: "NECO registration and examination processing assistance.",
    href: "/services/neco",
  },
  {
    title: "NABTEB Registration",
    description: "NABTEB registration and examination support.",
    href: "/services/nabteb",
  },
  {
    title: "Post-UTME",
    description: "Post-UTME registration and admission-related support.",
    href: "/services/post-utme",
  },
];

export default function EducationServicesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="bg-gradient-to-r from-blue-950 to-sky-700 px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="font-semibold uppercase tracking-widest text-yellow-400">
            EDUCATIONAL SERVICES
          </p>

          <h1 className="mt-4 text-4xl font-bold md:text-5xl">
            Education & Examination Services
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-blue-100">
            Access registration, examination and admission processing support
            for students, candidates and parents.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold text-blue-950">
            Explore Educational Services
          </h2>

          <p className="mt-3 max-w-3xl text-gray-600">
            Select a service below to view the available support and
            requirements.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="group rounded-2xl bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <h3 className="text-2xl font-bold text-blue-950 group-hover:text-blue-700">
                {service.title}
              </h3>

              <p className="mt-4 leading-7 text-gray-600">
                {service.description}
              </p>

              <span className="mt-6 inline-flex font-semibold text-yellow-600 transition group-hover:translate-x-2">
                View Service →
              </span>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}