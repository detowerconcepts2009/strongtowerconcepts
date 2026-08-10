"use client";

import { useMemo, useState } from "react";

import nigeriaLGAs from "@/data/nigeria/lgas";

export interface PropertyFormData {

  /* Listing */

  title: string;

  price: string;

  bedrooms: string;

  bathrooms: string;

  toilets: string;

  /* Property */

  category: string;

  purpose: string;

  state: string;

  lga: string;

  address: string;

  /* Sale */

  negotiable: string;

  titleDocument: string;

  /* Rent */

  rentDuration: string;

  serviceCharge: string;

  cautionFee: string;

  agencyFee: string;

  /* Shortlet */

  pricePerNight: string;

  minimumNights: string;

  maximumGuests: string;

  cleaningFee: string;

  checkIn: string;

  checkOut: string;

}

export function usePropertyForm() {

  const [loading, setLoading] =
    useState(false);

  const [errorMessage, setErrorMessage] =
    useState("");

  const [formData, setFormData] =
    useState<PropertyFormData>({

      title: "",

      price: "",

      bedrooms: "",

      bathrooms: "",

      toilets: "",

      category: "",

      purpose: "",

      state: "",

      lga: "",

      address: "",

      negotiable: "No",

      titleDocument: "",

      rentDuration: "Yearly",

      serviceCharge: "",

      cautionFee: "",

      agencyFee: "",

      pricePerNight: "",

      minimumNights: "",

      maximumGuests: "",

      cleaningFee: "",

      checkIn: "",

      checkOut: "",

    });

  const availableLGAs =
    useMemo(() => {

      if (!formData.state) {

        return [];

      }

      return nigeriaLGAs[
        formData.state
      ] ?? [];

    }, [formData.state]);

  function updateField(

    field: keyof PropertyFormData,

    value: string

  ) {

    setFormData((previous) => ({

      ...previous,

      [field]: value,

    }));

  }

  function changeState(
    value: string
  ) {

    setFormData((previous) => ({

      ...previous,

      state: value,

      lga: "",

    }));

  }

  return {

    loading,

    setLoading,

    errorMessage,

    setErrorMessage,

    formData,

    setFormData,

    availableLGAs,

    updateField,

    changeState,

  };

}