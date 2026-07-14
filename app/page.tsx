export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      {/* Navigation */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-2xl font-extrabold text-blue-900">
              Strong Tower <span className="text-yellow-500">Concepts</span>
            </h1>
            <p className="text-xs text-gray-500">
              One Vision. Many Solutions. Endless Value.
            </p>
          </div>

          <nav className="hidden md:flex gap-8 font-medium">
            <a href="#" className="hover:text-blue-700">Home</a>
            <a href="#services" className="hover:text-blue-700">Services</a>
            <a href="#about" className="hover:text-blue-700">About</a>
            <a href="#contact" className="hover:text-blue-700">Contact</a>
          </nav>

          <a
            href="https://wa.me/2347015217449"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg bg-blue-700 px-5 py-3 text-white font-semibold hover:bg-blue-800"
          >
            WhatsApp Us
          </a>

        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-6 py-24">

          <p className="uppercase tracking-widest text-yellow-400 font-semibold">
            Welcome to
          </p>

          <h2 className="mt-4 text-5xl md:text-7xl font-extrabold">
            Strong Tower <br />
            Concepts
          </h2>

          <p className="mt-6 text-2xl font-semibold">
            One Vision. Many Solutions. Endless Value.
          </p>

          <p className="mt-8 max-w-3xl text-lg text-blue-100">
            We provide professional CAC Registration, Website Development,
            VTU Services, Real Estate Solutions, Property Management,
            General Merchandise, and IT Consulting services across Nigeria.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <button className="rounded-lg bg-yellow-400 px-8 py-4 font-bold text-black hover:bg-yellow-300">
              Explore Services
            </button>

            <a
              href="https://wa.me/2347015217449"
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-white px-8 py-4 font-bold hover:bg-white hover:text-blue-900"
            >
              Contact Us
            </a>
          </div>

        </div>
      </section>

    </main>
  );
}