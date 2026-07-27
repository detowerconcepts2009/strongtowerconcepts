import {
  Building2,
  Globe,
  BadgeCheck,
  GraduationCap,
  Palette,
  ShieldCheck,
} from "lucide-react";

import ServiceCard from "./ServiceCard";

export default function ServiceGrid() {

  const services = [

    {
      title: "CAC Registration",
      description: "Business registration, NGO, Business Name and Company incorporation.",
      href: "/services/cac",
      icon: Building2,
      featured: true,
    },

    {
      title: "NIN Services",
      description: "NIN enrolment, modification, printing and verification.",
      href: "/services/nin",
      icon: BadgeCheck,
      featured: true,
    },

    {
      title: "Website Development",
      description: "Professional websites, portals and business applications.",
      href: "/services/web-development",
      icon: Globe,
    },

    {
      title: "Branding & Graphics",
      description: "Logo design, flyers, banners, business identity and printing.",
      href: "/services/branding",
      icon: Palette,
    },

    {
      title: "Educational Services",
      description: "WAEC, NECO, JAMB, Admission processing and CBT registration.",
      href: "/services/education",
      icon: GraduationCap,
    },

    {
      title: "CCTV Installation",
      description: "Security cameras, access control and surveillance systems.",
      href: "/services/cctv",
      icon: ShieldCheck,
    },

  ];

  return (

    <section className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

      {services.map((service) => (

        <ServiceCard
          key={service.title}
          {...service}
        />

      ))}

    </section>

  );

}