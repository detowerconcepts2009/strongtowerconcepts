"use client";

import { useEffect, useState } from "react";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PropertyFilters from "@/components/dashboard/properties/PropertyFilters";
import PropertyGrid from "@/components/dashboard/properties/PropertyGrid";

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

export default function PropertiesPage() {

  const [search, setSearch] = useState("");

  const [properties, setProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function loadProperties() {

      try {

        const response =
          await fetch("/api/properties");

        const data =
          await response.json();

        if (!data.success) {

          setProperties([]);

          return;

        }

        const mappedProperties: Property[] =
          data.properties.map((property: any) => ({

            id: property.id,

            title:
              property.listing?.title ??
              "Untitled Property",

            location:
              `${property.city}, ${property.state}`,

            price:
              property.listing?.price ?? 0,

            bedrooms:
              property.listing?.bedrooms ?? 0,

            bathrooms:
              property.listing?.bathrooms ?? 0,

            area:
              property.listing?.landSize ?? 0,

            image:
              property.listing?.coverImage ?? undefined,

          }));

        setProperties(mappedProperties);

      } catch (error) {

        console.error(error);

        setProperties([]);

      } finally {

        setLoading(false);

      }

    }

    loadProperties();

  }, []);

  const filteredProperties =
    properties.filter((property) =>

      property.title
        .toLowerCase()
        .includes(search.toLowerCase())

    );

  return (

    <DashboardLayout
      title="Properties"
    >

      <PropertyFilters
        search={search}
        onSearchChange={setSearch}
      />

      {loading ? (

        <div className="rounded-2xl bg-white p-10 text-center shadow-sm">

          Loading properties...

        </div>

      ) : (

        <PropertyGrid
          properties={filteredProperties}
        />

      )}

    </DashboardLayout>

  );

}