"use client";

import { PropertyFormData } from "../hooks/usePropertyForm";

interface RentSectionProps {

  formData: PropertyFormData;

  updateField: (
    field: keyof PropertyFormData,
    value: string
  ) => void;

}

export default function RentSection({

  formData,

  updateField,

}: RentSectionProps) {

  return (

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

  );

}