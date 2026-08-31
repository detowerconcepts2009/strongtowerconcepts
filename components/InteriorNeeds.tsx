"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import SectionHeader from "./SectionHeader";
import MattressWeightGuide from "./mattress/MattressWeightGuide";

interface CatalogueImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

interface CatalogueProduct {
  id: string;
  productType: "MATTRESS" | "PILLOW";
  name: string;
  description: string | null;
  images: CatalogueImage[];
}

interface CatalogueApiResponse {
  success: boolean;
  products?: CatalogueProduct[];
  message?: string;
}

interface MarketplaceProduct {
  id: number;
  name: string;
  category: string;
  price: string;
  featured?: boolean;
  catalogueName?: string;
}

const marketplaceProducts: MarketplaceProduct[] = [
  {
    id: 1,
    name: "Vita Supreme Mattress",
    category: "Mattress",
    price: "Select Size",
    featured: true,
    catalogueName: "Vita Supreme",
  },
  {
    id: 2,
    name: "Luxury 6x6 Bed Frame",
    category: "Bedroom",
    price: "₦420,000",
    featured: false,
  },
  {
    id: 3,
    name: "Modern L-Shape Sofa",
    category: "Living Room",
    price: "₦780,000",
    featured: true,
  },
];

function findCatalogueProduct(
  products: CatalogueProduct[],
  catalogueName?: string
) {
  if (!catalogueName) {
    return null;
  }

  const searchName =
    catalogueName.trim().toLowerCase();

  return (
    products.find(
      (product) =>
        product.name.trim().toLowerCase() ===
        searchName
    ) ??
    products.find(
      (product) =>
        product.name
          .trim()
          .toLowerCase()
          .includes(searchName) ||
        searchName.includes(
          product.name.trim().toLowerCase()
        )
    ) ??
    null
  );
}

export default function InteriorNeeds() {
  const [catalogueProducts, setCatalogueProducts] =
    useState<CatalogueProduct[]>([]);

  useEffect(() => {
    async function loadCatalogueProducts() {
      try {
        const response = await fetch(
          "/api/catalogue/public",
          {
            cache: "no-store",
          }
        );

        const data: CatalogueApiResponse =
          await response.json();

        if (!response.ok || !data.success) {
          return;
        }

        setCatalogueProducts(
          data.products || []
        );
      } catch (error) {
        console.error(
          "Marketplace catalogue loading error:",
          error
        );
      }
    }

    loadCatalogueProducts();
  }, []);

  return (
    <main className="bg-slate-50">
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6">
          <SectionHeader
            title="Interior Needs"
            subtitle="Quality furniture, mattresses and home essentials."
            buttonText="View All Products"
            buttonLink="/marketplace/interior"
          />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {marketplaceProducts.map(
              (product) => {
                const catalogueProduct =
                  findCatalogueProduct(
                    catalogueProducts,
                    product.catalogueName
                  );

                const primaryImage =
                  catalogueProduct?.images.find(
                    (image) =>
                      image.isPrimary
                  )?.imageUrl ??
                  catalogueProduct?.images[0]
                    ?.imageUrl ??
                  null;

                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    featured={product.featured}
                    image={primaryImage}
                  />
                );
              }
            )}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <MattressWeightGuide />
        </div>
      </section>
    </main>
  );
}