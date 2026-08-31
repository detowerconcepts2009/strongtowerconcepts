import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import VehiclePageLayout from "@/components/vehicle/VehiclePageLayout";

export default function VehiclesPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <VehiclePageLayout />

      <Footer />
    </main>
  );
}