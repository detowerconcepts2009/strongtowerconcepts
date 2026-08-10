"use client";

import { useMemo, useState } from "react";

import states from "@/data/nigeria/states";
import nigeriaLGAs from "@/data/nigeria/lgas";

export default function PropertyForm() {

  const [loading, setLoading] = useState(false);

  const [errorMessage, setErrorMessage] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const [formData, setFormData] = useState({

    /* Listing */

    title: "",

    price: "",

    bedrooms: "",

    bathrooms: "",

    toilets: "",

    /* Property */

    category: "",

    purpose: "",

    state: "",

    lga: "",

    address: "",

    /* Sale */

    negotiable: "No",

    titleDocument: "",

    /* Rent */

    rentDuration: "Yearly",

    serviceCharge: "",

    cautionFee: "",

    agencyFee: "",

    /* Shortlet */

    pricePerNight: "",

    minimumNights: "",

    maximumGuests: "",

    cleaningFee: "",

    checkIn: "",

    checkOut: "",

  });

  const availableLGAs = useMemo(() => {

    if (!formData.state) {
      return [];
    }

    return nigeriaLGAs[formData.state] ?? [];

  }, [formData.state]);

  function updateField(
    field: keyof typeof formData,
    value: string
  ) {

    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

  }

  function changeState(value: string) {

    setFormData((previous) => ({
      ...previous,
      state: value,
      lga: "",
    }));

  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {

    e.preventDefault();

    setLoading(true);

    setErrorMessage("");

    setSuccessMessage("");

    try {

      const response = await fetch(
        "/api/properties",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        setErrorMessage(
          data.message ||
          "Unable to create property."
        );

        return;

      }

      console.log(
        "Property created:",
        data
      );

      setSuccessMessage(
        "Property created successfully."
      );

    } catch (error) {

      console.error(error);

      setErrorMessage(
        "Something went wrong while creating the property."
      );

    } finally {

      setLoading(false);

    }

  }

  return (

    <form
      onSubmit={handleSubmit}
      className="space-y-12"
    >

      {errorMessage && (

        <div className="rounded-xl border border-red-300 bg-red-50 px-5 py-4 text-red-700">

          {errorMessage}

        </div>

      )}

      {successMessage && (

        <div className="rounded-xl border border-green-300 bg-green-50 px-5 py-4 text-green-700">

          {successMessage}

        </div>

      )}

      {/* ==========================================
          BASIC INFORMATION
      =========================================== */}

      <section>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Basic Information
          </h2>

          <p className="mt-2 text-slate-500">
            Enter the basic information about this property.
          </p>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Property Title
            </label>

            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                updateField(
                  "title",
                  e.target.value
                )
              }
              placeholder="Luxury 4 Bedroom Duplex"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Property Category
            </label>

            <select
              value={formData.category}
              onChange={(e) =>
                updateField(
                  "category",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            >

              <option value="">
                Select Category
              </option>

              <option value="LAND">
                Land
              </option>

              <option value="HOUSE">
                House
              </option>

              <option value="APARTMENT">
                Apartment
              </option>

              <option value="OFFICE">
                Office
              </option>

              <option value="SHOP">
                Shop
              </option>

              <option value="WAREHOUSE">
                Warehouse
              </option>

              <option value="HOTEL">
                Hotel
              </option>

              <option value="COMMERCIAL">
                Commercial
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Property Purpose
            </label>

            <select
              value={formData.purpose}
              onChange={(e) =>
                updateField(
                  "purpose",
                  e.target.value
                )
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            >

              <option value="">
                Select Purpose
              </option>

              <option value="SALE">
                For Sale
              </option>

              <option value="RENT">
                For Rent
              </option>

              <option value="SHORTLET">
                Short Let
              </option>

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              State
            </label>

            <select
              value={formData.state}
              onChange={(e) =>
                changeState(e.target.value)
              }
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            >

              <option value="">
                Select State
              </option>

              {states.map((state) => (

                <option
                  key={state}
                  value={state}
                >
                  {state}
                </option>

              ))}

            </select>

          </div>

          <div>

            <label className="mb-2 block font-medium">
              LGA
            </label>

            <select
              value={formData.lga}
              onChange={(e) =>
                updateField(
                  "lga",
                  e.target.value
                )
              }
              disabled={!formData.state}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900 disabled:bg-slate-100"
            >

              <option value="">

                {formData.state
                  ? "Select LGA"
                  : "Select State First"}

              </option>

              {availableLGAs.map((lga) => (

                <option
                  key={lga}
                  value={lga}
                >
                  {lga}
                </option>

              ))}

            </select>

          </div>

          <div className="md:col-span-2">

            <label className="mb-2 block font-medium">
              Property Address
            </label>

            <textarea
              rows={4}
              value={formData.address}
              onChange={(e) =>
                updateField(
                  "address",
                  e.target.value
                )
              }
              placeholder="Enter the complete property address..."
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

        </div>

      </section>

      {/* ==========================================
          LISTING INFORMATION
      =========================================== */}

      <section>

        <div>

          <h2 className="text-2xl font-bold text-slate-900">
            Listing Information
          </h2>

          <p className="mt-2 text-slate-500">
            Enter details that buyers or tenants will see.
          </p>

        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          <div>

            <label className="mb-2 block font-medium">
              Price (₦)
            </label>

            <input
              type="number"
              value={formData.price}
              onChange={(e) =>
                updateField(
                  "price",
                  e.target.value
                )
              }
              placeholder="50000000"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Bedrooms
            </label>

            <input
              type="number"
              value={formData.bedrooms}
              onChange={(e) =>
                updateField(
                  "bedrooms",
                  e.target.value
                )
              }
              placeholder="4"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Bathrooms
            </label>

            <input
              type="number"
              value={formData.bathrooms}
              onChange={(e) =>
                updateField(
                  "bathrooms",
                  e.target.value
                )
              }
              placeholder="5"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

          <div>

            <label className="mb-2 block font-medium">
              Toilets
            </label>

            <input
              type="number"
              value={formData.toilets}
              onChange={(e) =>
                updateField(
                  "toilets",
                  e.target.value
                )
              }
              placeholder="5"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-900"
            />

          </div>

        </div>

        {/* =====================================
            SALE DETAILS
        ====================================== */}

        {formData.purpose === "SALE" && (

          <div className="mt-10 rounded-2xl border border-blue-100 bg-blue-50 p-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Sale Details
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Negotiable
                </label>

                <select
                  value={formData.negotiable}
                  onChange={(e) =>
                    updateField(
                      "negotiable",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >

                  <option value="No">
                    No
                  </option>

                  <option value="Yes">
                    Yes
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Title Document
                </label>

                <select
                  value={formData.titleDocument}
                  onChange={(e) =>
                    updateField(
                      "titleDocument",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >

                  <option value="">
                    Select Title
                  </option>

                  <option value="C of O">
                    C of O
                  </option>

                  <option value="Governor Consent">
                    Governor Consent
                  </option>

                  <option value="Registered Survey">
                    Registered Survey
                  </option>

                  <option value="Deed of Assignment">
                    Deed of Assignment
                  </option>

                </select>

              </div>

            </div>

          </div>

        )}

        {/* =====================================
            RENT DETAILS
        ====================================== */}

        {formData.purpose === "RENT" && (

          <div className="mt-10 rounded-2xl border border-green-100 bg-green-50 p-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Rental Details
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Rent Duration
                </label>

                <select
                  value={formData.rentDuration}
                  onChange={(e) =>
                    updateField(
                      "rentDuration",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                >

                  <option value="Yearly">
                    Yearly
                  </option>

                  <option value="Monthly">
                    Monthly
                  </option>

                </select>

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Service Charge (₦)
                </label>

                <input
                  type="number"
                  value={formData.serviceCharge}
                  onChange={(e) =>
                    updateField(
                      "serviceCharge",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Caution Fee (₦)
                </label>

                <input
                  type="number"
                  value={formData.cautionFee}
                  onChange={(e) =>
                    updateField(
                      "cautionFee",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Agency Fee (₦)
                </label>

                <input
                  type="number"
                  value={formData.agencyFee}
                  onChange={(e) =>
                    updateField(
                      "agencyFee",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

            </div>

          </div>

        )}

        {/* =====================================
            SHORTLET DETAILS
        ====================================== */}

        {formData.purpose === "SHORTLET" && (

          <div className="mt-10 rounded-2xl border border-purple-100 bg-purple-50 p-6">

            <h3 className="text-lg font-semibold text-slate-900">
              Shortlet Details
            </h3>

            <div className="mt-6 grid gap-6 md:grid-cols-2">

              <div>

                <label className="mb-2 block font-medium">
                  Price Per Night (₦)
                </label>

                <input
                  type="number"
                  value={formData.pricePerNight}
                  onChange={(e) =>
                    updateField(
                      "pricePerNight",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Minimum Nights
                </label>

                <input
                  type="number"
                  value={formData.minimumNights}
                  onChange={(e) =>
                    updateField(
                      "minimumNights",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Maximum Guests
                </label>

                <input
                  type="number"
                  value={formData.maximumGuests}
                  onChange={(e) =>
                    updateField(
                      "maximumGuests",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Cleaning Fee (₦)
                </label>

                <input
                  type="number"
                  value={formData.cleaningFee}
                  onChange={(e) =>
                    updateField(
                      "cleaningFee",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Check-in Time
                </label>

                <input
                  type="time"
                  value={formData.checkIn}
                  onChange={(e) =>
                    updateField(
                      "checkIn",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

              <div>

                <label className="mb-2 block font-medium">
                  Check-out Time
                </label>

                <input
                  type="time"
                  value={formData.checkOut}
                  onChange={(e) =>
                    updateField(
                      "checkOut",
                      e.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3"
                />

              </div>

            </div>

          </div>

        )}

      </section>

      {/* ==========================================
          FORM ACTIONS
      =========================================== */}

      <div className="flex justify-end gap-4 border-t border-slate-200 pt-8">

        <button
          type="button"
          disabled={loading}
          className="rounded-xl border border-slate-300 px-6 py-3 font-medium hover:bg-slate-100 disabled:opacity-50"
        >
          Save Draft
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-xl bg-blue-900 px-8 py-3 font-medium text-white hover:bg-blue-800 disabled:opacity-50"
        >

          {loading
            ? "Saving..."
            : "Continue"}

        </button>

      </div>

    </form>

  );

}