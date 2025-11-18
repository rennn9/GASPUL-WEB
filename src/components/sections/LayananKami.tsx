"use client";
import React, { useEffect } from "react";
import CardLayanan from "@/components/ui/CardLayanan";
import { motion, useAnimation, easeOut } from "framer-motion";

// Import gambar
import TataUsaha from "@/assets/images/layanan-tatausaha.webp";
import BimasIslam from "@/assets/images/layanan-bimasislam.webp";
import BimasKatolik from "@/assets/images/layanan-bimaskatolik.webp";
import BimasKristen from "@/assets/images/layanan-bimaskristen.webp";
import BimasHindu from "@/assets/images/layanan-bimashindu.webp";
import BimasBuddha from "@/assets/images/layanan-bimasbudha.webp";

// Data layanan
const layananData = [
  {
    title: "Bagian Tata Usaha",
    image: TataUsaha,
    href: "/layanan/tata-usaha",
  },
  {
    title: "Bidang Bimbingan Masyarakat Islam",
    image: BimasIslam,
    href: "/layanan/bimas-islam",
  },
  {
    title: "Bimas Katolik",
    image: BimasKatolik,
    href: "/layanan/bimas-katolik",
  },
  {
    title: "Bimas Kristen",
    image: BimasKristen,
    href: "/layanan/bimas-kristen",
  },
  {
    title: "Bimas Hindu",
    image: BimasHindu,
    href: "/layanan/bimas-hindu",
  },
  {
    title: "Bimas Buddha",
    image: BimasBuddha,
    href: "/layanan/bimas-buddha",
  },
];

const LayananKami = () => {
  const controls = useAnimation();

  // ✅ Jalankan animasi otomatis bila user datang dari link #layanan
  useEffect(() => {
    if (window.location.hash === "#layanan") {
      controls.start("visible");
    }
  }, [controls]);

  const fadeVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: easeOut },
    },
  };

  return (
    <section
      id="layanan"
      className="py-16 bg-gray-50 scroll-mt-20"
      aria-labelledby="layanan-heading"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Judul Section */}
        <motion.h2
          id="layanan-heading"
          className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12"
          variants={fadeVariants}
          initial="hidden"
          animate={controls}
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          LAYANAN KAMI
        </motion.h2>

        {/* Grid Card Layanan */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          variants={fadeVariants}
          initial="hidden"
          animate={controls}
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          {layananData.map((layanan) => (
            <CardLayanan
              key={layanan.title}
              title={layanan.title}
              image={layanan.image}
              href={layanan.href}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LayananKami;
