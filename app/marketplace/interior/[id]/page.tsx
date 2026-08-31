"use client";

import Link from "next/link";
import { use, useEffect, useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mattressCatalogue } from "@/data/mattressCatalogue";

interface Product {
  id: string;
  name: string;
  category: string;
  price?: number;
  description: string;
  features: string[];
}

interface PublicCatalogueImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
}

interface PublicCatalogueProduct {
  id: string;
  productType: "MATTRESS" | "PILLOW";
  name: string;
  description: string | null;
  images: PublicCatalogueImage[];
}

interface PublicCatalogueResponse {
  success: boolean;
  products?: PublicCatalogueProduct[];
  message?: string;
}

interface CurrentUser {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profileImageUrl: string | null;
}

interface UserResponse {
  success: boolean;
  user?: CurrentUser;
}

const products: Product[] = [
  {
    id: "1",
    name: "Vita Supreme Mattress",
    category: "Mattress",
    description:
      "Premium Vitafoam mattress designed for comfort and support.",
    features: [
      "Premium comfort",
      "Durable foam construction",
      "Multiple dimensions available",
      "Weight-based recommendation available",
    ],
  },
  {
    id: "2",
    name: "Luxury 6x6 Bed Frame",
    category: "Bedroom",
    price: 420000,
    description:
      "Modern luxury bed frame designed for durability and elegant bedroom interiors.",
    features: [
      "6x6 frame",
      "Premium finish",
      "Strong construction",
    ],
  },
  {
    id: "3",
    name: "Modern L-Shape Sofa",
    category: "Living Room",
    price: 780000,
    description:
      "Spacious contemporary sofa built for modern living rooms.",
    features: [
      "L-shaped design",
      "High-density foam",
      "Contemporary styling",
    ],
  },
];

/*
 * Customer-facing mattress sizing convention.
 *
 * Original catalogue dimensions remain in inches internally
 * so catalogue matching and pricing remain exact.
 */
const mattressSizeLabels: Record<number, string> = {
  30: "2½ ft",
  36: "3 ft",
  42: "3½ ft",
  48: "4 ft",
  54: "4½ ft",
  60: "5 ft",
  63: "5½ ft",
  71: "6 ft",
  72: "6 ft",
  75: "6 ft",
  79: "6½ ft",
  84: "7 ft",
};

function formatMattressSize(inches: number): string {
  return (
    mattressSizeLabels[inches] ??
    `${inches}"`
  );
}

function formatSizePair(
  lengthInches: number,
  widthInches: number
): string {
  return `${lengthInches} × ${widthInches} (${formatMattressSize(
    lengthInches
  )} × ${formatMattressSize(widthInches)})`;
}

function formatFullDimension(
  lengthInches: number,
  widthInches: number,
  thicknessInches: number
): string {
  return `${lengthInches} × ${widthInches} × ${thicknessInches}" (${formatMattressSize(
    lengthInches
  )} × ${formatMattressSize(
    widthInches
  )} × ${thicknessInches}")`;
}

function formatCurrency(
  value: number
): string {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(value);
}

function isCatalogueManager(
  role: string
): boolean {
  return (
    role === "SUPER_ADMIN" ||
    role === "ADMIN" ||
    role === "STAFF"
  );
}

export default function InteriorProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const product = products.find(
    (item) => item.id === id
  );

  const isMattress =
    product?.category === "Mattress";

  const [user, setUser] =
    useState<CurrentUser | null>(null);

  const [userLoading, setUserLoading] =
    useState(true);

  const [
    catalogueProduct,
    setCatalogueProduct,
  ] =
    useState<PublicCatalogueProduct | null>(
      null
    );

  const [
    catalogueLoading,
    setCatalogueLoading,
  ] = useState(isMattress);

  /*
   * Load current user.
   *
   * Failure to load the user does not block the
   * customer marketplace. It only means that the
   * admin shortcut will not be displayed.
   */
  useEffect(() => {
    let mounted = true;

    async function loadCurrentUser() {
      try {
        const response = await fetch(
          "/api/user/me",
          {
            cache: "no-store",
          }
        );

        if (!response.ok) {
          if (mounted) {
            setUser(null);
          }

          return;
        }

        const data: UserResponse =
          await response.json();

        if (
          mounted &&
          data.success &&
          data.user
        ) {
          setUser(data.user);
        } else if (mounted) {
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Current user loading error:",
          error
        );

        if (mounted) {
          setUser(null);
        }
      } finally {
        if (mounted) {
          setUserLoading(false);
        }
      }
    }

    loadCurrentUser();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * Load public catalogue product image.
   *
   * The current Vita Supreme marketplace product maps
   * to the catalogue product named "Vita Supreme".
   */
  useEffect(() => {
    if (!isMattress || !product) {
      setCatalogueLoading(false);
      return;
    }

    const lookupName = "Vita Supreme";

    let cancelled = false;

    async function loadCatalogueProduct() {
      try {
        const response = await fetch(
          "/api/catalogue/public",
          {
            cache: "no-store",
          }
        );

        const data: PublicCatalogueResponse =
          await response.json();

        if (!response.ok || !data.success) {
          return;
        }

        const searchName =
          lookupName
            .trim()
            .toLowerCase();

        const availableProducts =
          data.products ?? [];

        const matchingProduct =
          availableProducts.find(
            (item) =>
              item.name
                .trim()
                .toLowerCase() ===
              searchName
          ) ??
          availableProducts.find(
            (item) =>
              item.name
                .trim()
                .toLowerCase()
                .includes(searchName) ||
              searchName.includes(
                item.name
                  .trim()
                  .toLowerCase()
              )
          ) ??
          null;

        if (!cancelled) {
          setCatalogueProduct(
            matchingProduct
          );
        }
      } catch (error) {
        console.error(
          "Product catalogue loading error:",
          error
        );
      } finally {
        if (!cancelled) {
          setCatalogueLoading(false);
        }
      }
    }

    loadCatalogueProduct();

    return () => {
      cancelled = true;
    };
  }, [isMattress, product]);

  const primaryImage =
    catalogueProduct?.images.find(
      (image) => image.isPrimary
    )?.imageUrl ??
    catalogueProduct?.images[0]
      ?.imageUrl ??
    null;

  const mattressModels = useMemo(() => {
    return Array.from(
      new Set(
        mattressCatalogue.map(
          (item) => item.model
        )
      )
    ).sort();
  }, []);

  const defaultModel =
    mattressModels.find((model) =>
      model.toLowerCase().includes("supreme")
    ) ??
    mattressModels[0] ??
    "";

  const [selectedModel, setSelectedModel] =
    useState(defaultModel);

  const modelCatalogue = useMemo(() => {
    return mattressCatalogue.filter(
      (item) =>
        item.model === selectedModel
    );
  }, [selectedModel]);

  const dimensionGroups = useMemo(() => {
    const groups = new Map<
      string,
      {
        lengthInches: number;
        widthInches: number;
        label: string;
      }
    >();

    for (const item of modelCatalogue) {
      if (
        item.lengthInches == null ||
        item.widthInches == null
      ) {
        continue;
      }

      const key =
        `${item.lengthInches}-${item.widthInches}`;

      if (!groups.has(key)) {
        groups.set(key, {
          lengthInches:
            item.lengthInches,
          widthInches:
            item.widthInches,
          label: formatSizePair(
            item.lengthInches,
            item.widthInches
          ),
        });
      }
    }

    return Array.from(
      groups.values()
    ).sort(
      (a, b) =>
        a.lengthInches -
          b.lengthInches ||
        a.widthInches -
          b.widthInches
    );
  }, [modelCatalogue]);

  const [
    selectedDimensionKey,
    setSelectedDimensionKey,
  ] = useState("");

  const activeDimensionKey =
    dimensionGroups.some(
      (dimension) =>
        `${dimension.lengthInches}-${dimension.widthInches}` ===
        selectedDimensionKey
    )
      ? selectedDimensionKey
      : dimensionGroups[0]
        ? `${dimensionGroups[0].lengthInches}-${dimensionGroups[0].widthInches}`
        : "";

  const selectedDimension =
    dimensionGroups.find(
      (dimension) =>
        `${dimension.lengthInches}-${dimension.widthInches}` ===
        activeDimensionKey
    );

  const thicknessOptions = useMemo(() => {
    if (!selectedDimension) {
      return [];
    }

    return modelCatalogue
      .filter(
        (item) =>
          item.lengthInches ===
            selectedDimension.lengthInches &&
          item.widthInches ===
            selectedDimension.widthInches &&
          item.thicknessInches != null &&
          item.price != null
      )
      .sort(
        (a, b) =>
          (a.thicknessInches ?? 0) -
          (b.thicknessInches ?? 0)
      );
  }, [
    modelCatalogue,
    selectedDimension,
  ]);

  const [
    selectedThickness,
    setSelectedThickness,
  ] = useState<number | null>(null);

  const activeThickness =
    thicknessOptions.some(
      (item) =>
        item.thicknessInches ===
        selectedThickness
    )
      ? selectedThickness
      : thicknessOptions[0]
          ?.thicknessInches ??
        null;

  const selectedCatalogueItem =
    thicknessOptions.find(
      (item) =>
        item.thicknessInches ===
        activeThickness
    );

  const [quantity, setQuantity] =
    useState(1);

  const unitPrice =
    selectedCatalogueItem?.price ??
    null;

  const totalPrice =
    unitPrice !== null
      ? unitPrice * quantity
      : null;

  if (!product) {
    return (
      <main className="min-h-screen bg-slate-50">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h1 className="text-4xl font-black text-blue-950">
            Product not found
          </h1>

          <p className="mt-4 text-slate-600">
            The requested product could not be found.
          </p>

          <Link
            href="/marketplace/interior"
            className="mt-8 inline-flex rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800"
          >
            Back to Interior Needs
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-2">

          {/* PRODUCT IMAGE */}

          <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden rounded-3xl bg-slate-200">
            {primaryImage ? (
              <img
                src={primaryImage}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-slate-500">
                {catalogueLoading
                  ? "Loading Product Image..."
                  : "Product Image"}
              </span>
            )}
          </div>

          {/* PRODUCT INFORMATION */}

          <div>
            <p className="font-semibold uppercase tracking-wide text-blue-900">
              {product.category}
            </p>

            <h1 className="mt-3 text-4xl font-black text-blue-950 md:text-5xl">
              {product.name}
            </h1>

            {isMattress ? (
              <p className="mt-6 text-lg leading-8 text-slate-600">
                Choose your preferred mattress
                model, size and thickness. The
                price is based on the current
                mattress price catalogue.
              </p>
            ) : (
              <>
                <p className="mt-6 text-4xl font-black text-blue-900">
                  {formatCurrency(
                    product.price ?? 0
                  )}
                </p>

                <p className="mt-6 text-lg leading-8 text-slate-600">
                  {product.description}
                </p>
              </>
            )}

            {/* ADMIN MANAGEMENT SHORTCUT */}

            {!userLoading &&
              user &&
              isCatalogueManager(
                user.role
              ) &&
              isMattress && (
                <div className="mt-6 rounded-2xl border border-blue-200 bg-blue-50 p-5">
                  <p className="text-sm font-semibold text-blue-800">
                    Catalogue Administration
                  </p>

                  <p className="mt-1 text-sm text-blue-700">
                    You are signed in as{" "}
                    <span className="font-bold">
                      {user.role}
                    </span>
                    .
                  </p>

                  <Link
                    href="/dashboard/catalogue"
                    className="mt-4 inline-flex rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white transition hover:bg-blue-800"
                  >
                    Manage Catalogue
                  </Link>
                </div>
              )}

            {/* MATTRESS CONFIGURATION */}

            {isMattress && (
              <>
                <div className="mt-8 space-y-6 rounded-2xl border border-slate-200 bg-white p-6">

                  {/* MODEL */}

                  <div>
                    <label
                      htmlFor="mattress-model"
                      className="block text-sm font-bold text-slate-800"
                    >
                      Mattress Model
                    </label>

                    <select
                      id="mattress-model"
                      value={selectedModel}
                      onChange={(event) => {
                        setSelectedModel(
                          event.target.value
                        );
                        setSelectedDimensionKey(
                          ""
                        );
                        setSelectedThickness(
                          null
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    >
                      {mattressModels.map(
                        (model) => (
                          <option
                            key={model}
                            value={model}
                          >
                            {model}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* SIZE */}

                  <div>
                    <label
                      htmlFor="mattress-dimension"
                      className="block text-sm font-bold text-slate-800"
                    >
                      Mattress Size
                    </label>

                    <select
                      id="mattress-dimension"
                      value={
                        activeDimensionKey
                      }
                      onChange={(event) => {
                        setSelectedDimensionKey(
                          event.target.value
                        );
                        setSelectedThickness(
                          null
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    >
                      {dimensionGroups.map(
                        (dimension) => {
                          const key =
                            `${dimension.lengthInches}-${dimension.widthInches}`;

                          return (
                            <option
                              key={key}
                              value={key}
                            >
                              {dimension.label}
                            </option>
                          );
                        }
                      )}
                    </select>

                    {selectedDimension && (
                      <p className="mt-2 text-sm text-slate-500">
                        Catalogue size:{" "}
                        {
                          selectedDimension.lengthInches
                        }{" "}
                        ×{" "}
                        {
                          selectedDimension.widthInches
                        }{" "}
                        —{" "}
                        {formatMattressSize(
                          selectedDimension.lengthInches
                        )}{" "}
                        ×{" "}
                        {formatMattressSize(
                          selectedDimension.widthInches
                        )}
                      </p>
                    )}
                  </div>

                  {/* THICKNESS */}

                  <div>
                    <label
                      htmlFor="mattress-thickness"
                      className="block text-sm font-bold text-slate-800"
                    >
                      Thickness / Height
                    </label>

                    <select
                      id="mattress-thickness"
                      value={
                        activeThickness ?? ""
                      }
                      onChange={(event) => {
                        const value =
                          event.target.value;

                        setSelectedThickness(
                          value === ""
                            ? null
                            : Number(value)
                        );
                      }}
                      className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-900 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                    >
                      {thicknessOptions
                        .filter(
                          (
                            item
                          ): item is typeof item & {
                            thicknessInches: number;
                          } =>
                            item.thicknessInches !=
                            null
                        )
                        .map((item) => (
                          <option
                            key={
                              item.thicknessInches
                            }
                            value={
                              item.thicknessInches
                            }
                          >
                            {
                              item.thicknessInches
                            }
                            "
                          </option>
                        ))}
                    </select>
                  </div>

                  {/* SELECTED MATTRESS */}

                  {selectedCatalogueItem && (
                    <div className="rounded-2xl bg-blue-50 p-5">
                      <p className="text-sm font-semibold text-blue-700">
                        Selected Mattress
                      </p>

                      <p className="mt-2 text-2xl font-black text-blue-950">
                        {
                          selectedCatalogueItem.model
                        }
                      </p>

                      {selectedCatalogueItem.lengthInches !=
                        null &&
                        selectedCatalogueItem.widthInches !=
                          null &&
                        selectedCatalogueItem.thicknessInches !=
                          null && (
                          <p className="mt-2 text-lg font-semibold text-slate-800">
                            {formatFullDimension(
                              selectedCatalogueItem.lengthInches,
                              selectedCatalogueItem.widthInches,
                              selectedCatalogueItem.thicknessInches
                            )}
                          </p>
                        )}

                      {selectedCatalogueItem.code && (
                        <p className="mt-1 text-sm text-slate-500">
                          Product code:{" "}
                          {
                            selectedCatalogueItem.code
                          }
                        </p>
                      )}
                    </div>
                  )}

                  {/* PRICE */}

                  <div className="rounded-2xl bg-slate-900 p-6 text-white">
                    <p className="text-sm font-medium text-slate-300">
                      Price per mattress
                    </p>

                    <p className="mt-2 text-4xl font-black">
                      {unitPrice !== null
                        ? formatCurrency(
                            unitPrice
                          )
                        : "Price unavailable"}
                    </p>

                    <p className="mt-2 text-sm text-slate-300">
                      VAT inclusive • Effective
                      March 30, 2026
                    </p>

                    {quantity > 1 &&
                      totalPrice !== null && (
                        <div className="mt-4 border-t border-slate-700 pt-4">
                          <p className="text-sm text-slate-300">
                            Total for{" "}
                            {quantity}{" "}
                            mattresses
                          </p>

                          <p className="mt-1 text-2xl font-bold">
                            {formatCurrency(
                              totalPrice
                            )}
                          </p>
                        </div>
                      )}
                  </div>
                </div>

                {/* BUY RIGHT */}

                <div className="mt-8 rounded-2xl border border-yellow-300 bg-yellow-50 p-6">
                  <h2 className="text-xl font-bold text-yellow-900">
                    Buy Right Recommendation
                  </h2>

                  <p className="mt-2 leading-7 text-yellow-800">
                    The appropriate mattress
                    category should be selected
                    according to the combined
                    weight of everyone sleeping on
                    the mattress.
                  </p>

                  <Link
                    href="/marketplace/interior"
                    className="mt-5 inline-flex rounded-xl bg-blue-900 px-5 py-3 font-semibold text-white hover:bg-blue-800"
                  >
                    Open Weight Guide
                  </Link>
                </div>
              </>
            )}

            {/* FEATURES */}

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-xl font-bold text-blue-950">
                Key Features
              </h2>

              <ul className="mt-4 space-y-3">
                {product.features.map(
                  (feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3"
                    >
                      <span className="mt-2 h-2 w-2 rounded-full bg-blue-900" />

                      <span className="text-slate-700">
                        {feature}
                      </span>
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* QUANTITY */}

            <div className="mt-8">
              <label
                htmlFor="quantity"
                className="block text-sm font-semibold text-slate-800"
              >
                Quantity
              </label>

              <input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(event) =>
                  setQuantity(
                    Math.max(
                      1,
                      Number(
                        event.target.value
                      ) || 1
                    )
                  )
                }
                className="mt-2 w-32 rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* ACTIONS */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/marketplace/interior"
                className="rounded-xl border-2 border-blue-900 px-6 py-3 font-semibold text-blue-900 hover:bg-blue-900 hover:text-white"
              >
                Back to Products
              </Link>

              <button
                type="button"
                disabled={
                  isMattress &&
                  !selectedCatalogueItem
                }
                className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}