"use client";

import "./globals.css";
import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white`}>
        {/* WRAPPER UTAMA */}
        <div className="flex flex-col min-h-screen">
          
          {/* HEADER (jika ada) */}
          {/* <Header /> */}

          {/* ISI HALAMAN */}
          <main className="flex-1 w-full bg-white">
            {children}
          </main>

          {/* FOOTER — Pastikan hanya render jika tidak di-hide */}
          {/* 
          {showFooter && (
            <footer className="bg-gray-100 py-6 border-t">
              <Footer />
            </footer>
          )}
          */}
        </div>
      </body>
    </html>
  );
}
