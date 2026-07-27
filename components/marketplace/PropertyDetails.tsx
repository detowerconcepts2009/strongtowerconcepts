import { notFound } from "next/navigation";

import { properties } from "../properties/properties";

import ListingGallery from "./ListingGallery";
import ListingHeader from "./ListingHeader";
import PriceTag from "./PriceTag";
import PropertyStats from "./PropertyStats";
import PropertyOverview from "./PropertyOverview";
import PropertyFeatures from "./PropertyFeatures";
import PropertyDocuments from "./PropertyDocuments";
import PropertyLocation from "./PropertyLocation";
import SimilarProperties from "./SimilarProperties";
import AgentCard from "./AgentCard";
import ShareButtons from "./ShareButtons";

interface PropertyDetailsProps {
  propertyId: string;
}

export default function PropertyDetails({
  propertyId,
}: PropertyDetailsProps) {

  const property = properties.find(
    (item) => item.id === propertyId
  );

  if (!property) {
    notFound();
  }

  return (

    <div className="max-w-7xl mx-auto px-6 py-12">

      <div className="grid lg:grid-cols-3 gap-10">

        {/* LEFT */}

        <div className="lg:col-span-2 space-y-8">

          <ListingGallery
            images={[
              property.media.cover,
              ...property.media.gallery,
            ]}
            video={property.media.video}
            title={property.title}
          />

          <ListingHeader
            id={property.id}
            title={property.title}
            location={`${property.location}, ${property.state}`}
            category={property.propertyType}
            featured={property.featured}
            verified={property.verified}
          />

          <PriceTag
            price={property.price}
          />

          <PropertyStats
            id={property.id}
            views={property.views}
            postedAt={property.postedAt}
            status={property.status}
            yearBuilt={property.yearBuilt}
            area={property.area}
            location={`${property.location}, ${property.state}`}
            latitude={property.latitude}
            longitude={property.longitude}
          />

          <PropertyOverview
            description={property.description}
          />

          <PropertyFeatures
            features={property.features}
          />

          <PropertyDocuments
            documents={property.documents}
          />

          <PropertyLocation
            address={`${property.location}, ${property.city}, ${property.state}`}
            latitude={property.latitude}
            longitude={property.longitude}
          />

          <ShareButtons />

        </div>

        {/* RIGHT */}

        <div>

          <div className="sticky top-28">

            <AgentCard
              name={property.agent.name}
              company={property.agent.company}
              phone={property.agent.phone}
              whatsapp={property.agent.whatsapp}
              email={property.agent.email}
              photo={property.agent.photo}
            />

          </div>

        </div>

      </div>

      <section className="mt-20">

        <SimilarProperties
          currentId={property.id}
        />

      </section>

    </div>

  );

}