"use client";

import { PropertyFormData } from "../hooks/usePropertyForm";
import SaleSection from "./SaleSection";
import RentSection from "./RentSection";
import ShortletSection from "./ShortletSection";

interface ListingInformationSectionProps {

  formData: PropertyFormData;

  updateField: (
    field: keyof PropertyFormData,
    value: string
  ) => void;

}

export default function ListingInformationSection({

  formData,

  updateField,

}: ListingInformationSectionProps) {

  return (

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

      {formData.purpose === "SALE" && (

        <SaleSection

          formData={formData}

          updateField={updateField}

        />

      )}

      {formData.purpose === "RENT" && (

        <RentSection

          formData={formData}

          updateField={updateField}

        />

      )}

      {formData.purpose === "SHORTLET" && (

        <ShortletSection

          formData={formData}

          updateField={updateField}

        />

      )}

    </section>

  );

}