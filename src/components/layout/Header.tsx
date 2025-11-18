"use client";
import React from "react";
import Image from "next/image";
import LogoKemenag from "@/assets/images/logo-kemenag.webp";
import LogoGaspul from "@/assets/images/logo-gaspul.webp";

const Header = () => {
  return (
    <header className="w-full bg-white/90 backdrop-blur-sm shadow-md fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo dan Identitas */}
        <div className="flex items-center space-x-3">
          <Image
            src={LogoKemenag}
            alt="Logo Kementerian Agama"
            width={45}
            height={45}
            className="object-contain"
          />
          <Image
            src={LogoGaspul}
            alt="Logo GASPUL"
            width={45}
            height={45}
            className="object-contain"
          />
          <div className="ml-2">
            <p className="text-sm text-gray-700 font-semibold leading-tight">
              Kementerian Agama Provinsi Sulawesi Barat
            </p>
            <p className="text-lg font-bold text-red-600 tracking-wide">GASPUL</p>
          </div>
        </div>

        {/* Navigasi */}
        <nav className="hidden md:flex space-x-8">
          {["Beranda", "Layanan", "Berita", "Kontak"].map((item) => (
            <button
              key={item}
              className="text-gray-700 font-medium hover:text-green-700 transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
