"use client";

import PropertyCard from "./PropertyCard";
import PropertyEmptyState from "./PropertyEmptyState";

interface Property {
  id: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  area: number;
  image?: string;
}

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {

  if (properties.length === 0) {

    return <PropertyEmptyState />;

  }

  return (

    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

      {properties.map((property) => (

        <PropertyCard
          key={property.id}
          title={property.title}
          location={property.location}
          price={property.price}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
          image={property.image}
        />

      ))}

    </div>

  );

}