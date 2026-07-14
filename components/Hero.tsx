export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center flex items-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600')",
      }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 text-white">
        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
          Strong Tower <br /> Concepts
        </h1>

        <p className="mt-6 text-2xl text-blue-200">
          One Vision, Many Solutions, Endless Value
        </p>

        <p className="mt-8 max-w-2xl text-lg text-gray-200 leading-8">
          Delivering innovative ICT solutions, website development,
          web hosting, CAC registration, real estate services,
          branding, internet solutions and business support
          tailored to your success.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <button className="bg-blue-700 hover:bg-blue-800 px-8 py-4 rounded-lg font-semibold">
            Explore Services
          </button>

          <button className="border border-white hover:bg-white hover:text-black px-8 py-4 rounded-lg">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
}