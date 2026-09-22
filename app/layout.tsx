import type { Metadata } from "next";
import "./globals.css";
import { CartProvider } from "@/components/cart/CartProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://strongtowerconcepts.com.ng"),

  title: {
    default: "Strong Tower Concepts",
    template: "%s | Strong Tower Concepts",
  },

  description:
    "Strong Tower Concepts - One Vision, Many Solutions, Endless Value. Property Marketplace, Interior Needs, ICT Services, Website Development, Web Hosting, CAC Registration and Business Solutions.",

  keywords: [
    "Strong Tower Concepts",
    "Real Estate Nigeria",
    "Property Marketplace",
    "Interior Needs",
    "ICT Services",
    "Website Development",
    "Web Hosting",
    "CAC Registration",
    "Business Solutions",
  ],

  authors: [{ name: "Strong Tower Concepts" }],

  creator: "Strong Tower Concepts",

  icons: {
    icon: "/favicon.ico",
  },

  openGraph: {
    title: "Strong Tower Concepts",
    description:
      "One Vision, Many Solutions, Endless Value. Property Marketplace, Interior Needs, ICT Services, Website Development, Web Hosting, CAC Registration and Business Solutions.",
    url: "https://strongtowerconcepts.com.ng",
    siteName: "Strong Tower Concepts",
    images: [
      {
        url: "/images/logo/stc-og.png",
        width: 1200,
        height: 630,
        alt: "Strong Tower Concepts - One Vision, Many Solutions, Endless Value",
      },
    ],
    locale: "en_NG",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Strong Tower Concepts",
    description:
      "One Vision, Many Solutions, Endless Value. Property Marketplace, Interior Needs, ICT Services, Website Development, Web Hosting, CAC Registration and Business Solutions.",
    images: ["/images/logo/stc-og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  );
}