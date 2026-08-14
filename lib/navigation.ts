export interface NavigationChild {
  label: string;
  href: string;
}

export interface NavItem {
  label: string;
  href?: string;
  children?: NavigationChild[];
}

export const navigation: NavItem[] = [
  {
    label: "Home",
    href: "/",
  },

  {
    label: "Marketplace",
    children: [
      {
        label: "Properties",
        href: "/marketplace/properties",
      },
      {
        label: "Vehicles",
        href: "/marketplace/vehicles",
      },
      {
        label: "Interior Needs",
        href: "/marketplace/interior",
      },
      {
        label: "Electronics",
        href: "/marketplace/electronics",
      },
      {
        label: "General Merchandise",
        href: "/marketplace/general",
      },
    ],
  },

  {
    label: "Professional Services",
    children: [
      {
        label: "CAC Registration",
        href: "/services/cac",
      },
      {
        label: "TIN Registration",
        href: "/services/tin",
      },
      {
        label: "NIN Services",
        href: "/services/nin",
      },
      {
        label: "JAMB Registration",
        href: "/services/jamb",
      },
      {
        label: "WAEC Registration",
        href: "/services/waec",
      },
      {
        label: "NECO Registration",
        href: "/services/neco",
      },
      {
        label: "NABTEB Registration",
        href: "/services/nabteb",
      },
      {
        label: "Post-UTME Registration",
        href: "/services/post-utme",
      },
      {
        label: "Website Development",
        href: "/services/web-development",
      },
      {
        label: "Web Hosting",
        href: "/services/web-hosting",
      },
      {
        label: "Branding & Graphics",
        href: "/services/branding",
      },
      {
        label: "CCTV Installation",
        href: "/services/cctv",
      },
      {
        label: "Cargo & Logistics",
        href: "/services/cargo",
      },
    ],
  },

  {
    label: "Become a Partner",
    href: "/partner",
  },

  {
    label: "About",
    href: "/about",
  },

  {
    label: "Contact",
    href: "/contact",
  },
];