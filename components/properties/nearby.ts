import { NearbyPlaces } from "./propertyTypes";

export const nearby: Record<string, NearbyPlaces> = {
  STC001: {
    schools: [
      {
        name: "Greensprings School",
        distance: "3 mins",
      },
      {
        name: "Lekki British School",
        distance: "6 mins",
      },
    ],

    hospitals: [
      {
        name: "Evercare Hospital",
        distance: "8 mins",
      },
      {
        name: "Reddington Hospital",
        distance: "10 mins",
      },
    ],

    shopping: [
      {
        name: "Shoprite Circle Mall",
        distance: "5 mins",
      },
      {
        name: "Lekki Mall",
        distance: "7 mins",
      },
    ],

    transport: [
      {
        name: "Lekki Toll Gate",
        distance: "4 mins",
      },
      {
        name: "BRT Terminal",
        distance: "9 mins",
      },
    ],
  },

  STC002: {
    schools: [
      {
        name: "Corona School",
        distance: "5 mins",
      },
    ],

    hospitals: [
      {
        name: "Lagoon Hospital",
        distance: "7 mins",
      },
    ],

    shopping: [
      {
        name: "Palms Shopping Mall",
        distance: "6 mins",
      },
    ],

    transport: [
      {
        name: "Falomo Bridge",
        distance: "4 mins",
      },
    ],
  },

  STC003: {
    schools: [
      {
        name: "Government Primary School",
        distance: "10 mins",
      },
    ],

    hospitals: [
      {
        name: "General Hospital",
        distance: "15 mins",
      },
    ],

    shopping: [
      {
        name: "Local Market",
        distance: "8 mins",
      },
    ],

    transport: [
      {
        name: "Lekki-Epe Expressway",
        distance: "3 mins",
      },
    ],
  },
};