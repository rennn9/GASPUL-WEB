"use client";
import React, { ReactNode } from "react";
import Head from "next/head";
import Header from "./Header";
import Footer from "./Footer";
import SiennaWidget from "./SiennaWidget";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
};

const LayoutWrapper = ({ children, title, description }: Props) => {
  const defaultTitle = "GasPul - Layanan Publik Kementerian Agama Provinsi Sulawesi Barat";
  const defaultDescription = "GasPul (Gerakan Aktif, Sistematis, Pelayanan Unggul) adalah portal layanan publik dari Kementerian Agama Provinsi Sulawesi Barat yang memudahkan masyarakat mengakses layanan secara cepat, aman, dan transparan.";

  return (
    <>
      <Head>
        <title>{title || defaultTitle}</title>
        <meta name="description" content={description || defaultDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={title || defaultTitle} />
        <meta property="og:description" content={description || defaultDescription} />
        <meta property="og:image" content="/assets/images/logo-gaspul.webp" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="GasPul Kemenag Sulawesi Barat" />

        {/* Optional: Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title || defaultTitle} />
        <meta name="twitter:description" content={description || defaultDescription} />
        <meta name="twitter:image" content="/assets/images/logo-gaspul.webp" />
      </Head>

      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <SiennaWidget /> {/* Floating accessibility widget */}
      </div>
    </>
  );
};

export default LayoutWrapper;
