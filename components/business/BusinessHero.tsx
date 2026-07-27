import Link from "next/link";

export default function BusinessHero() {

  return (

    <section className="rounded-3xl bg-gradient-to-r from-blue-950 to-sky-700 px-8 py-20 text-white">

      <div className="max-w-4xl">

        <h1 className="text-5xl font-bold">

          Professional Business Services

        </h1>

        <p className="mt-6 text-xl text-blue-100">

          Grow your business with trusted professionals.
          Register companies, process NIN, build websites,
          create your brand identity, install CCTV,
          process admissions and much more.

        </p>

        <div className="mt-10 flex flex-wrap gap-4">

          <Link
            href="/services"
            className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-900"
          >
            Explore Services
          </Link>

          <Link
            href="/partner"
            className="rounded-xl border border-white px-8 py-4 font-semibold"
          >
            Become a Service Partner
          </Link>

        </div>

      </div>

    </section>

  );

}