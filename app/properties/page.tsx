import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import PropertyGrid from "../../components/PropertyGrid";

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      {/* Hero */}

      <section className="bg-gradient-to-r from-blue-950 to-blue-800 py-20">

        <div className="max-w-7xl mx-auto px-6">

          <h1 className="text-5xl font-black text-white">
            Properties Marketplace
          </h1>

          <p className="mt-5 text-blue-100 text-lg max-w-2xl leading-8">
            Browse verified residential and commercial properties listed by
            trusted agents across Nigeria.
          </p>

        </div>

      </section>

      {/* Content */}

      <section className="max-w-7xl mx-auto px-6 py-16">

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-3xl font-bold text-blue-950">
              Available Properties
            </h2>

            <p className="text-gray-600 mt-2">
              Discover your next investment or dream home.
            </p>

          </div>

        </div>

        <PropertyGrid />

      </section>

      <Footer />

    </main>
  );
}