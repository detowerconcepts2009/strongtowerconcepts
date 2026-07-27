"use client";

import { useState } from "react";

interface ScheduleInspectionProps {
  agentName: string;
  propertyTitle: string;
}

export default function ScheduleInspection({
  agentName,
}: ScheduleInspectionProps) {

  const [loading, setLoading] = useState(false);

  const bookInspection = () => {

    setLoading(true);

    setTimeout(() => {

      alert(
        `Inspection request submitted.\n\nAgent: ${agentName}\n\nInspection payment will be enabled in the next phase.`
      );

      setLoading(false);

    }, 800);

  };

  return (

    <div>

      <h3 className="mb-2 text-lg font-bold text-blue-950">
        Schedule Inspection
      </h3>

      <p className="mb-5 text-sm text-gray-600">
        Book an inspection before the property's exact location is revealed.
      </p>

      <button
        onClick={bookInspection}
        disabled={loading}
        className="w-full rounded-xl bg-emerald-600 px-5 py-4 font-semibold text-white transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {loading ? "Submitting..." : "Book Inspection"}
      </button>

    </div>

  );

}