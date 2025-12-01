"use client";
import React from "react";
import Image from "next/image";
import LogoKemenag from "@/assets/images/logo-kemenag.webp";
import LogoGaspul from "@/assets/images/logo-gaspul.webp";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300/40 pt-10 pb-12 bg-white w-full">
      <div className="max-w-7xl mx-auto px-6 text-center">

        {/* Logos */}
        <div className="flex justify-center items-center space-x-6 mb-6">
          <Image src={LogoKemenag} alt="Logo Kementerian Agama" width={50} height={50} />
          <Image src={LogoGaspul} alt="Logo GASPUL" width={50} height={50} />
        </div>

        {/* Kontak */}
        <div className="text-gray-700 space-y-1">
          <h3 className="font-bold text-lg">Alamat</h3>
          <p>
            Kementerian Agama Provinsi Sulawesi Barat. <br />
            Jl. Abdul Malik Pattana Endeng No.46, Simboro, Kec. Simboro Dan Kepulauan, 
            Kabupaten Mamuju, Sulawesi Barat 91512
          </p>
        </div>

        <p className="mt-6 text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} GASPUL - Kementerian Agama Sulawesi Barat. All rights reserved.
        </p>

      </div>
    </footer>
  );
};

export default Footer;
