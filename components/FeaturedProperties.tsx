import PropertyCard from "./PropertyCard";
import PropertyFilter from "./PropertyFilter";
import SectionHeader from "./SectionHeader";

import { properties } from "./properties/properties";

export default function FeaturedProperties() {
  const featuredProperties = properties
    .filter((property) => property.featured)
    .slice(0, 3);

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

          {featuredProperties.map((property) => (

            <PropertyCard
              key={property.id}
              id={property.id}
              title={property.title}
              location={`${property.location}, ${property.state}`}
              price={`₦${property.price.toLocaleString()}`}
              bedrooms={property.bedrooms}
              bathrooms={property.bathrooms}
              type={property.purpose}
              featured={property.featured}
              verified={property.verified}
            />

          ))}

        </div>

      </div>

    </section>
  );
}