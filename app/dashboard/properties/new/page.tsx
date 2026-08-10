"use client";

import DashboardLayout from "@/components/dashboard/DashboardLayout";
import PropertyForm from "@/components/dashboard/properties/forms/PropertyForm";

export default function NewPropertyPage() {

  return (

    <DashboardLayout
      title="Add Property"
    >

      <div className="rounded-2xl bg-white p-8 shadow-sm">

        <PropertyForm />

      </div>

    </DashboardLayout>

  );

}