import PropertyCard from "./PropertyCard";
import { properties } from "./properties/properties";

interface PropertyGridProps {
  limit?: number;
}

export default function PropertyGrid({
  limit,
}: PropertyGridProps) {
  const data = limit
    ? properties.slice(0, limit)
    : properties;

  return (
    <section className="py-12">
      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {data.map((property) => (
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
    </section>
  );
}