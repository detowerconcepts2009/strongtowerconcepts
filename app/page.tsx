import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import GlobalSearch from "../components/GlobalSearch";
import MarketplaceDashboard from "../components/MarketplaceDashboard";
import PropertyCategories from "../components/PropertyCategories";
import FeaturedProperties from "../components/FeaturedProperties";
import InteriorNeeds from "../components/InteriorNeeds";
import FeaturedAgents from "../components/FeaturedAgents";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import BecomeAgent from "../components/BecomeAgent";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <Hero />

      <GlobalSearch />

      <MarketplaceDashboard />

      <PropertyCategories />

      <FeaturedProperties />

      <InteriorNeeds />

      <FeaturedAgents />

      <Services />

      <WhyChooseUs />

      <BecomeAgent />

      <Footer />

    </main>
  );
}