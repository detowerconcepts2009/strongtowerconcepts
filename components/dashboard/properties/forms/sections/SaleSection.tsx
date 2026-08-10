"use client";

import { PropertyFormData } from "../hooks/usePropertyForm";

interface SaleSectionProps {

  formData: PropertyFormData;

  updateField: (
    field: keyof PropertyFormData,
    value: string
  ) => void;

}

export default function SaleSection({

  formData,

  updateField,

}: SaleSectionProps) {

  return (

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

  );

}