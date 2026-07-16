import PropertyCard from "./PropertyCard";
import PropertyFilter from "./PropertyFilter";
import SectionHeader from "./SectionHeader";

export default function FeaturedProperties() {
  const properties = [
    {
      id: 1,
      title: "4 Bedroom Detached Duplex",
      location: "Lekki Phase 1, Lagos",
      price: "₦85,000,000",
      bedrooms: 4,
      bathrooms: 5,
      type: "Sale" as const,
      featured: true,
      verified: true,
    },
    {
      id: 2,
      title: "Luxury 3 Bedroom Apartment",
      location: "Ikoyi, Lagos",
      price: "₦12,000,000 / Year",
      bedrooms: 3,
      bathrooms: 3,
      type: "Rent" as const,
      featured: true,
      verified: true,
    },
    {
      id: 3,
      title: "5 Bedroom Smart Home",
      location: "Ajah, Lagos",
      price: "₦120,000,000",
      bedrooms: 5,
      bathrooms: 6,
      type: "Sale" as const,
      featured: false,
      verified: true,
    },
  ];

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6">

        <SectionHeader
          title="Featured Properties"
          subtitle="Explore our latest verified property listings."
          buttonText="View All"
          buttonLink="/properties"
        />

        <PropertyFilter />

        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-8">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              {...property}
            />
          ))}
        </div>

      </div>
    </section>
  );
}