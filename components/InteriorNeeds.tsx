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
  price: number | string | null;
  images: CatalogueImage[];
}

interface CatalogueApiResponse {
  success: boolean;
  products?: CatalogueProduct[];
  message?: string;
}

interface MarketplaceProduct {
  id: string;
  name: string;
  category: string;
  price: string;
  featured?: boolean;
  image?: string | null;
  detailsHref: string;
}

const staticMarketplaceProducts: MarketplaceProduct[] = [
  {
    id: "bed-frame-6x6",
    name: "Luxury 6x6 Bed Frame",
    category: "Bedroom",
    price: "₦420,000.00",
    featured: false,
    image: null,
    detailsHref:
      "/marketplace/interior/bed-frame-6x6",
  },
  {
    id: "l-shape-sofa",
    name: "Modern L-Shape Sofa",
    category: "Living Room",
    price: "₦780,000.00",
    featured: true,
    image: null,
    detailsHref:
      "/marketplace/interior/l-shape-sofa",
  },
];

function formatCurrency(
  value: number | string
): string {
  const numericValue =
    typeof value === "number"
      ? value
      : Number(value);

  if (!Number.isFinite(numericValue)) {
    return "Price unavailable";
  }

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(numericValue);
}

function getPrimaryImage(
  product: CatalogueProduct
): string | null {
  return (
    product.images.find(
      (image) => image.isPrimary
    )?.imageUrl ??
    product.images[0]?.imageUrl ??
    null
  );
}

export default function InteriorNeeds() {
  const [catalogueProducts, setCatalogueProducts] =
    useState<CatalogueProduct[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadCatalogueProducts() {
      try {
        setLoading(true);

        const response = await fetch(
          "/api/catalogue/public",
          {
            cache: "no-store",
          }
        );

        const data: CatalogueApiResponse =
          await response.json();

        if (
          !response.ok ||
          !data.success
        ) {
          return;
        }

        if (mounted) {
          setCatalogueProducts(
            data.products ?? []
          );
        }
      } catch (error) {
        console.error(
          "Marketplace catalogue loading error:",
          error
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCatalogueProducts();

    return () => {
      mounted = false;
    };
  }, []);

  const catalogueMarketplaceProducts =
    catalogueProducts.map(
      (product): MarketplaceProduct => {
        const isMattress =
          product.productType ===
          "MATTRESS";

        const isSupreme =
          product.name
            .toLowerCase()
            .includes("supreme");

        return {
          id: product.id,
          name: isMattress
            ? `${product.name} Mattress`
            : product.name,
          category: isMattress
            ? "Mattress"
            : "Pillow",
          price: isMattress
            ? "Select Size"
            : product.price !== null
              ? formatCurrency(
                  product.price
                )
              : "Price unavailable",
          featured: isSupreme,
          image:
            getPrimaryImage(product),
          detailsHref: `/marketplace/interior/${product.id}`,
        };
      }
    );

  const marketplaceProducts = [
    ...catalogueMarketplaceProducts,
    ...staticMarketplaceProducts,
  ];

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

          {loading ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <p className="text-slate-500">
                Loading interior products...
              </p>
            </div>
          ) : marketplaceProducts.length ===
            0 ? (
            <div className="rounded-2xl bg-slate-50 p-8 text-center">
              <p className="text-slate-500">
                No interior products are
                currently available.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {marketplaceProducts.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    featured={
                      product.featured
                    }
                    image={product.image}
                    detailsHref={
                      product.detailsHref
                    }
                  />
                )
              )}
            </div>
          )}
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