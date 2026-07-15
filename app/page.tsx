import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import QuickStats from "../components/QuickStats";
import PropertySearch from "../components/PropertySearch";
import PropertyCategories from "../components/PropertyCategories";
import FeaturedProperties from "../components/FeaturedProperties";
import FeaturedAgents from "../components/FeaturedAgents";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import BecomeAgent from "../components/BecomeAgent";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <QuickStats />
      <PropertySearch />
      <PropertyCategories />
      <FeaturedProperties />
      <FeaturedAgents />
      <Services />
      <WhyChooseUs />
      <BecomeAgent />
    </main>
  );
}