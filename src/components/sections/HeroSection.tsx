"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import logoGaspul from "@/assets/images/logo-gaspul.webp";

const HeroSection = () => {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden flex items-center justify-center">
      {/* Video Background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute top-0 left-0 w-full h-full object-cover brightness-75"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Decorative Shape */}
      <div className="absolute left-0 top-0 w-[30%] h-full bg-white/10 backdrop-blur-[1px] clip-diagonal"></div>

      {/* Content */}
      <motion.div
        className="
          absolute w-full flex flex-col items-end
          md:right-12 md:top-1/4
          right-4
          gap-2 md:gap-4
          px-4
          md:px-0
          top-1/2 -translate-y-1/2 md:translate-y-0
        "
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        {/* Logo + Soft Floor Glow */}
        <div className="relative flex items-center justify-center md:justify-end">
          <div
            className="
              absolute 
              bottom-[-12px]
              left-1/2 
              -translate-x-1/2
              w-[88%] md:w-[100%]
              h-[55px] md:h-[80px]
              bg-gradient-to-t 
              from-black/55
              via-black/30
              to-transparent
              blur-[15px] md:blur-[24px]
              opacity-70
              pointer-events-none
            "
          />

          <Image
            src={logoGaspul}
            alt="Logo Gaspul"
            className="relative z-10 drop-shadow-[0_0_16px_rgba(0,0,0,0.6)]"
            sizes="(max-width: 768px) 200px, 340px"
            style={{ width: 'auto', height: 'auto' }}
          />
        </div>

        {/* Text */}
        <h1
          className="
            text-xl md:text-5xl 
            font-extrabold leading-tight 
            tracking-tight
            drop-shadow-[0_0_10px_rgba(0,0,0,0.6)]
            text-right
            w-full md:w-auto
          "
        >
          GERAKAN AKTIF, SISTEMATIS,
          <br />
          <span className="text-green-300 drop-shadow-[0_0_12px_rgba(0,0,0,0.7)]">
            PELAYANAN UNGGUL
          </span>
        </h1>
      </motion.div>
    </section>
  );
};

export default HeroSection;
