"use client";

import { PropertyFormData } from "../hooks/usePropertyForm";

interface ShortletSectionProps {

  formData: PropertyFormData;

  updateField: (
    field: keyof PropertyFormData,
    value: string
  ) => void;

}

export default function ShortletSection({

  formData,

  updateField,

}: ShortletSectionProps) {

  return (

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

  );

}