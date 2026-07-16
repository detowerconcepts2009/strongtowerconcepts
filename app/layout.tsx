import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
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
  ],

  authors: [{ name: "Strong Tower Concepts" }],

  creator: "Strong Tower Concepts",

  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}