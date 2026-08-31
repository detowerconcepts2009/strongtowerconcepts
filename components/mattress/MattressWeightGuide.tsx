"use client";

import { useMemo, useState } from "react";

interface Recommendation {
  category: string;
  mattresses: string[];
}

const recommendations: Recommendation[] = [
  {
    category: "Under 50 kg",
    mattresses: ["Vita Shine"],
  },
  {
    category: "Up to 70 kg",
    mattresses: ["Vita Grand", "Vita Corona"],
  },
  {
    category: "Up to 100 kg",
    mattresses: [
      "Vita Haven",
      "Vita Supreme",
      "Spring Flex",
    ],
  },
  {
    category: "Above 100 kg",
    mattresses: [
      "Vita Sizzler",
      "Spring Firm",
    ],
  },
];

export default function MattressWeightGuide() {
  const [people, setPeople] = useState(1);
  const [weights, setWeights] = useState<string[]>([""]);

  const totalWeight = useMemo(() => {
    return weights.reduce((total, value) => {
      const weight = Number(value);

      if (
        !Number.isFinite(weight) ||
        weight <= 0
      ) {
        return total;
      }

      return total + weight;
    }, 0);
  }, [weights]);

  const recommendation = useMemo(() => {
    if (totalWeight <= 0) {
      return null;
    }

    if (totalWeight < 50) {
      return recommendations[0];
    }

    if (totalWeight <= 70) {
      return recommendations[1];
    }

    if (totalWeight <= 100) {
      return recommendations[2];
    }

    return recommendations[3];
  }, [totalWeight]);

  function updatePeopleCount(
    value: string
  ) {
    const count = Math.min(
      10,
      Math.max(1, Number(value) || 1)
    );

    setPeople(count);

    setWeights((current) => {
      const updated = Array.from(
        { length: count },
        (_, index) => current[index] || ""
      );

      return updated;
    });
  }

  function updateWeight(
    index: number,
    value: string
  ) {
    setWeights((current) => {
      const updated = [...current];

      updated[index] = value;

      return updated;
    });
  }

  return (
    <section className="rounded-3xl bg-blue-950 px-6 py-10 text-white shadow-xl md:px-10">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-yellow-400">
            Vitafoam Buy Right Guide
          </p>

          <h2 className="mt-2 text-3xl font-black md:text-4xl">
            Find the right mattress for your sleepers
          </h2>

          <p className="mt-3 max-w-2xl text-blue-100">
            Tell us how many people will sleep on the
            mattress and enter each person's weight.
            We'll calculate the total sleeping weight and
            recommend the applicable mattress category
            from the supplied Vitafoam guide.
          </p>
        </div>

        <div className="rounded-2xl bg-white p-5 text-slate-900 shadow-lg md:p-6">
          <label
            htmlFor="number-of-sleepers"
            className="block text-sm font-semibold"
          >
            How many people will sleep on the mattress?
          </label>

          <select
            id="number-of-sleepers"
            value={people}
            onChange={(event) =>
              updatePeopleCount(
                event.target.value
              )
            }
            className="mt-2 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
          >
            {Array.from(
              { length: 10 },
              (_, index) => index + 1
            ).map((number) => (
              <option
                key={number}
                value={number}
              >
                {number}{" "}
                {number === 1
                  ? "person"
                  : "people"}
              </option>
            ))}
          </select>

          <div className="mt-6 space-y-4">
            {weights.map((weight, index) => (
              <div key={index}>
                <label
                  htmlFor={`sleeper-${index}`}
                  className="block text-sm font-semibold"
                >
                  Person {index + 1} weight
                </label>

                <div className="relative mt-2">
                  <input
                    id={`sleeper-${index}`}
                    type="number"
                    min="1"
                    step="0.1"
                    value={weight}
                    onChange={(event) =>
                      updateWeight(
                        index,
                        event.target.value
                      )
                    }
                    placeholder="Enter weight"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 pr-14 outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
                  />

                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-500">
                    kg
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-2xl bg-blue-50 p-5">
            <p className="text-sm font-semibold text-blue-900">
              Total sleeping weight
            </p>

            <p className="mt-1 text-3xl font-black text-blue-950">
              {totalWeight > 0
                ? `${totalWeight.toFixed(1)} kg`
                : "—"}
            </p>
          </div>

          {recommendation && (
            <div className="mt-6 rounded-2xl bg-slate-50 p-5">
              <p className="text-sm font-semibold text-blue-900">
                Recommended category
              </p>

              <h3 className="mt-1 text-2xl font-black text-slate-900">
                {recommendation.category}
              </h3>

              <p className="mt-2 text-sm text-slate-600">
                Based on the total sleeping weight.
              </p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                {recommendation.mattresses.map(
                  (mattress) => (
                    <div
                      key={mattress}
                      className="rounded-xl border border-slate-200 bg-white p-4"
                    >
                      <p className="font-bold text-blue-950">
                        {mattress}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Recommended by the supplied
                        Vitafoam Buy Right guide.
                      </p>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {!recommendation &&
            totalWeight === 0 && (
              <div className="mt-6 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
                Enter the weight of each sleeper to
                calculate the total.
              </div>
            )}
        </div>

        <div className="mt-6 rounded-2xl border border-blue-800 bg-blue-900/50 p-5">
          <p className="font-semibold text-yellow-400">
            Important
          </p>

          <p className="mt-2 text-sm leading-6 text-blue-100">
            The supplied Vitafoam guide also identifies
            Vita Twill, Vita Galaxy Orthopedic and Galaxy
            Classic as suitable across weight categories,
            but specifically states that they are not
            suitable for children.
          </p>
        </div>
      </div>
    </section>
  );
}