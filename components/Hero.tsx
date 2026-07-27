import Image from "next/image";
import Button from "./Button";

import HeroCards from "./Hero/HeroCards";
import HeroStats from "./Hero/HeroStats";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-950 via-blue-900 to-blue-700 text-white">

      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-yellow-400/10 blur-[140px]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[140px]" />

      {/* Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">

        <Image
          src="/images/logo/stc-logo.png"
          alt="Strong Tower Concepts"
          width={1800}
          height={1800}
          className="w-auto h-[1350px] object-contain"
          priority
        />

      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-20">

        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* LEFT */}

          <div>

            <span className="inline-block rounded-full border border-yellow-400/30 bg-white/10 px-6 py-2 text-xs font-bold tracking-[0.45em] uppercase text-yellow-400">
              Strong Tower Concepts
            </span>

            <div className="mt-8">

              <h1 className="text-6xl lg:text-7xl font-black leading-none">
                STRONG TOWER
              </h1>

              <h2 className="mt-2 text-4xl lg:text-5xl font-extrabold tracking-[0.35em] text-yellow-400">
                CONCEPTS
              </h2>

            </div>

            <p className="mt-8 text-lg lg:text-xl font-semibold text-blue-100">
              One Vision. Many Solutions. Endless Value.
            </p>

            <p className="mt-8 max-w-2xl text-base lg:text-lg leading-8 text-blue-100">

              Strong Tower Concepts is your trusted digital marketplace
              connecting buyers, sellers and service providers across
              Properties, Vehicles, Interior Products, Business Services,
              ICT Solutions and International Cargo & Logistics.

            </p>

            <div className="mt-10 flex flex-wrap gap-5">

              <Button
                text="Explore Marketplace"
                href="/marketplace"
              />

              <Button
                text="Request Service"
                href="/contact"
                variant="outline"
              />

            </div>

          </div>

          {/* RIGHT */}

          <HeroCards />

        </div>

        <HeroStats />

      </div>

    </section>
  );
}