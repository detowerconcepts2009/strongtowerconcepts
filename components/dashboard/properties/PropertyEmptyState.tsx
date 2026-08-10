"use client";

import { Building2 } from "lucide-react";

interface PropertyEmptyStateProps {
  title?: string;
  description?: string;
}

export default function PropertyEmptyState({
  title = "No Properties Yet",
  description = "You haven't added any property yet. Once properties are created, they will appear here.",
}: PropertyEmptyStateProps) {

  return (

    <div className="rounded-2xl bg-white p-16 text-center shadow-sm">

      <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-blue-100">

        <Building2
          size={40}
          className="text-blue-700"
        />

      </div>

      <h2 className="mt-6 text-2xl font-bold text-slate-900">
        {title}
      </h2>

      <p className="mx-auto mt-3 max-w-lg text-slate-500">
        {description}
      </p>

    </div>

  );

}