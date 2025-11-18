"use client";
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
    <video
    autoPlay
    loop
    muted
    playsInline
    className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
    >
    <source src="/videos/hero-bg.mp4" type="video/mp4" />
    Your browser does not support the video tag.
    </video>

      {/* Pola dekoratif sisi kiri */}
      <div className="absolute left-0 top-0 w-[30%] h-full bg-white/10 backdrop-blur-[1px] clip-diagonal"></div>

      {/* Teks Tagline */}
      <motion.div
        className="absolute right-12 top-1/3 text-right text-white drop-shadow-lg"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
          GERAKAN AKTIF, SISTEMATIS,
          <br />
          <span className="text-green-300">PELAYANAN UNGGUL</span>
        </h1>
      </motion.div>
    </section>
  );
};

export default HeroSection;
