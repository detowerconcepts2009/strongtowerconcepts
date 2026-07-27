import Link from "next/link";

const services = [
  {
    title: "CAC Registration",
    href: "/services/cac",
  },
  {
    title: "NIN Services",
    href: "/services/nin",
  },
  {
    title: "Website Development",
    href: "/services/web-development",
  },
  {
    title: "Web Hosting",
    href: "/services/web-hosting",
  },
  {
    title: "Educational Services",
    href: "/services/education",
  },
  {
    title: "Branding & Graphics",
    href: "/services/branding",
  },
  {
    title: "CCTV Installation",
    href: "/services/cctv",
  },
];

export default function BusinessSidebar() {

  return (

    <aside className="rounded-2xl bg-white p-6 shadow-lg">

      <h2 className="mb-6 text-2xl font-bold text-blue-950">

        Our Services

      </h2>

      <div className="space-y-3">

        {services.map((service) => (

          <Link
            key={service.title}
            href={service.href}
            className="block rounded-xl border p-4 transition hover:bg-blue-50"
          >

            {service.title}

          </Link>

        ))}

      </div>

    </aside>

  );

}