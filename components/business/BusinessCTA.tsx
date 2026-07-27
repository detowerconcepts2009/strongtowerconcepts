import Link from "next/link";

export default function BusinessCTA() {

  return (

    <section className="rounded-3xl bg-blue-950 px-10 py-16 text-center text-white">

      <h2 className="text-4xl font-bold">

        Ready to Get Started?

      </h2>

      <p className="mx-auto mt-6 max-w-3xl text-lg text-blue-100">

        Our team is ready to help you with business registration,
        NIN services, website development, educational processing,
        branding and many more professional services.

      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">

        <Link
          href="/contact"
          className="rounded-xl bg-white px-8 py-4 font-semibold text-blue-950"
        >
          Contact Us
        </Link>

        <Link
          href="/partner"
          className="rounded-xl border border-white px-8 py-4 font-semibold"
        >
          Become a Partner
        </Link>

      </div>

    </section>

  );

}