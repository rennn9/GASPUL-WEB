import "./globals.css";
import type { Metadata } from "next";
import { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SiennaWidget from "@/components/layout/SiennaWidget";

export const metadata: Metadata = {
  title: "Kementerian Agama Prov. Sulawesi Barat - GASPUL",
  description:
    "Website resmi Gerakan Aktif Sistematis Pelayanan Unggul (GASPUL) - Kementerian Agama Provinsi Sulawesi Barat.",
  keywords: [
    "Kementerian Agama Sulawesi Barat",
    "GASPUL",
    "Pelayanan Publik Kemenag",
    "Kemenag Sulbar",
    "Layanan Keagamaan",
  ],
  authors: [{ name: "Kementerian Agama Provinsi Sulawesi Barat" }],
  openGraph: {
    title: "GASPUL",
    description:
      "Gerakan Aktif Sistematis Pelayanan Unggul (GASPUL) dari Kementerian Agama Provinsi Sulawesi Barat.",
    url: "https://gaspul.kemenagsulbar.go.id",
    siteName: "GASPUL - Kemenag Sulbar",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/assets/images/logo-gaspul.png",
        width: 512,
        height: 512,
        alt: "Logo GASPUL",
      },
    ],
  },
  icons: {
    icon: "/assets/images/logo-gaspul.ico",
    shortcut: "/assets/images/logo-gaspul.ico",
    apple: "/assets/images/logo-gaspul.ico",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className="flex flex-col min-h-screen bg-white text-gray-900">
        <Header />
        <main className="flex-1">{children}</main>
        <SiennaWidget />
      </body>
    </html>
  );
}
