import { PropertyDocument } from "./propertyTypes";

export const documents: Record<string, PropertyDocument[]> = {
  STC001: [
    {
      title: "Certificate of Occupancy (C of O)",
      available: true,
    },
    {
      title: "Approved Building Plan",
      available: true,
    },
    {
      title: "Survey Plan",
      available: true,
    },
    {
      title: "Deed of Assignment",
      available: true,
    },
    {
      title: "Governor's Consent",
      available: false,
    },
  ],

  STC002: [
    {
      title: "Certificate of Occupancy (C of O)",
      available: true,
    },
    {
      title: "Survey Plan",
      available: true,
    },
    {
      title: "Deed of Assignment",
      available: true,
    },
  ],

  STC003: [
    {
      title: "Registered Survey",
      available: true,
    },
    {
      title: "Receipt",
      available: true,
    },
    {
      title: "Allocation Letter",
      available: true,
    },
  ],
};