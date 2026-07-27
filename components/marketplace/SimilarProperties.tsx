import PropertyCard from "@/components/PropertyCard";
import { properties } from "../properties/properties";

interface SimilarPropertiesProps {
  currentId: string;
}

export default function SimilarProperties({
  currentId,
}: SimilarPropertiesProps) {

  const currentProperty = properties.find(
    (property) => property.id === currentId
  );

  if (!currentProperty) return null;

  const similar = properties
    .filter((property) => {

      if (property.id === currentId) return false;

      return (
        property.state === currentProperty.state ||
        property.category === currentProperty.category ||
        property.propertyType === currentProperty.propertyType
      );
    })
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (

    <section className="space-y-8">

      <div>

        <h2 className="text-3xl font-black text-blue-950">
          Similar Properties
        </h2>

        <p className="text-gray-500 mt-2">
          You may also be interested in these listings.
        </p>

      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

        {similar.map((property) => (

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