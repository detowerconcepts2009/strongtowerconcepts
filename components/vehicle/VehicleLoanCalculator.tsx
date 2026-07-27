"use client";

import { useMemo, useState } from "react";

export default function VehicleLoanCalculator() {

  const [price, setPrice] = useState(42500000);
  const [deposit, setDeposit] = useState(10000000);
  const [years, setYears] = useState(3);
  const [interest, setInterest] = useState(18);

  const repayment = useMemo(() => {

    const principal = Math.max(price - deposit, 0);

    const monthlyRate = interest / 100 / 12;

    const months = years * 12;

    if (principal === 0) return 0;

    if (monthlyRate === 0) {
      return principal / months;
    }

    return (
      (principal *
        monthlyRate *
        Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
    );

  }, [price, deposit, years, interest]);

  return (

    <section className="rounded-2xl bg-white p-8 shadow-lg">

      <h2 className="mb-8 text-3xl font-bold text-blue-950">

        Vehicle Loan Calculator

      </h2>

      <div className="grid gap-6 md:grid-cols-2">

        <div>

          <label className="mb-2 block font-semibold">

            Vehicle Price (₦)

          </label>

          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Deposit (₦)

          </label>

          <input
            type="number"
            value={deposit}
            onChange={(e) => setDeposit(Number(e.target.value))}
            className="w-full rounded-xl border p-4"
          />

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Loan Duration (Years)

          </label>

          <select
            value={years}
            onChange={(e) => setYears(Number(e.target.value))}
            className="w-full rounded-xl border p-4"
          >

            <option value={1}>1 Year</option>
            <option value={2}>2 Years</option>
            <option value={3}>3 Years</option>
            <option value={4}>4 Years</option>
            <option value={5}>5 Years</option>

          </select>

        </div>

        <div>

          <label className="mb-2 block font-semibold">

            Interest Rate (%)

          </label>

          <input
            type="number"
            value={interest}
            onChange={(e) => setInterest(Number(e.target.value))}
            className="w-full rounded-xl border p-4"
          />

        </div>

      </div>

      <div className="mt-10 rounded-xl bg-blue-900 p-6 text-white">

        <h3 className="text-xl font-bold">

          Estimated Monthly Repayment

        </h3>

        <p className="mt-4 text-4xl font-bold">

          ₦{repayment.toLocaleString(undefined,{
            maximumFractionDigits:0,
          })}

        </p>

      </div>

    </section>

  );

}