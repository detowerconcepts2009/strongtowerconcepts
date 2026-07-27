import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import PropertyDetails from "@/components/marketplace/PropertyDetails";

interface PropertyPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PropertyPage({
  params,
}: PropertyPageProps) {

  const { id } = await params;

  return (

    <main className="min-h-screen bg-slate-50">

      <Navbar />

      <PropertyDetails
        propertyId={id}
      />

      <Footer />

    </main>

  );

}