"use client";
import React, { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";
import SiennaWidget from "./SiennaWidget";

type Props = {
  children: ReactNode;
};

const LayoutWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <SiennaWidget /> {/* Floating accessibility widget */}
    </div>
  );
};

export default LayoutWrapper;
