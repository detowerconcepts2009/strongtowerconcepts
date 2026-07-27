"use client";

import Link from "next/link";

import {
  FaWhatsapp,
  FaPhoneAlt,
  FaEnvelope,
  FaCalendarCheck,
} from "react-icons/fa";

interface ContactButtonsProps {
  agentName: string;
  phone: string;
  whatsapp: string;
  email: string;
  listingTitle: string;
}

export default function ContactButtons({
  agentName,
  phone,
  whatsapp,
  email,
  listingTitle,
}: ContactButtonsProps) {

  const message = encodeURIComponent(

`Hello ${agentName},

I am interested in this property:

${listingTitle}

Kindly let me know if it is still available.

Thank you.`

  );

  return (

    <div className="space-y-4">

      <Link
        href={`https://wa.me/${whatsapp}?text=${message}`}
        target="_blank"
        className="flex items-center justify-center gap-3 rounded-xl bg-green-600 py-4 font-semibold text-white transition hover:bg-green-700"
      >

        <FaWhatsapp />

        WhatsApp Agent

      </Link>

      <a
        href={`tel:${phone}`}
        className="flex items-center justify-center gap-3 rounded-xl bg-blue-900 py-4 font-semibold text-white transition hover:bg-blue-950"
      >

        <FaPhoneAlt />

        Call Agent

      </a>

      <a
        href={`mailto:${email}?subject=Property Enquiry&body=${message}`}
        className="flex items-center justify-center gap-3 rounded-xl border border-blue-900 py-4 font-semibold text-blue-900 transition hover:bg-blue-50"
      >

        <FaEnvelope />

        Send Email

      </a>

      <button
        type="button"
        className="flex w-full items-center justify-center gap-3 rounded-xl bg-amber-500 py-4 font-semibold text-white transition hover:bg-amber-600"
      >

        <FaCalendarCheck />

        Inspection Booking Opens Here

      </button>

    </div>

  );

}