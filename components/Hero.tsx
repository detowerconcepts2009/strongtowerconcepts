import Image from "next/image";
import Button from "./Button";

export default function Hero() {
  const services = [
    { icon: "🏠", title: "Marketplace", desc: "Properties • Vehicles • Interior" },
    { icon: "💼", title: "Business Services", desc: "CAC • NIN • Business Registration" },
    { icon: "💻", title: "ICT Solutions", desc: "Web • Hosting • Branding" },
    { icon: "📦", title: "Cargo & Logistics", desc: "UK • USA • Canada • Europe" },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Logo Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.06] pointer-events-none">
        <Image
          src="/images/logo/stc-logo.png"
          alt="Strong Tower Concepts"
          width={900}
          height={900}
          priority
          className="object-contain"
        />
      </div>

      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm uppercase tracking-widest">
              Strong Tower Concepts
            </span>

            <h1 className="mt-8 text-5xl lg:text-7xl font-extrabold leading-tight">
              One Vision.
              <br />
              Many Solutions.
              <br />
              Endless Value.
            </h1>

            <p className="mt-8 text-lg leading-8 text-gray-200 max-w-2xl">
              Your trusted platform for buying, selling and connecting with
              premium solutions in <strong>Properties</strong>,
              <strong> Vehicles</strong>,
              <strong> Interior Needs</strong>,
              <strong> Business Services</strong>,
              <strong> ICT Solutions</strong> and
              <strong> International Cargo & Logistics.</strong>
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Button
                text="Explore Marketplace"
                href="/marketplace"
              />

              <Button
                text="Request a Service"
                href="/contact"
                variant="outline"
              />

            </div>

          </div>

          {/* RIGHT */}

          <div className="grid sm:grid-cols-2 gap-5">

            {services.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-md p-6 hover:bg-white/20 transition"
              >
                <div className="text-5xl">
                  {item.icon}
                </div>

                <h3 className="mt-5 text-xl font-bold">
                  {item.title}
                </h3>

                <p className="mt-3 text-gray-200 text-sm leading-6">
                  {item.desc}
                </p>
              </div>
            ))}

          </div>

        </div>

      </div>
    </section>
  );
}