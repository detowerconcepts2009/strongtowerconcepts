import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InteriorNeeds from "@/components/InteriorNeeds";

export default function InteriorNeedsPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <InteriorNeeds />

      <Footer />
    </main>
  );
}