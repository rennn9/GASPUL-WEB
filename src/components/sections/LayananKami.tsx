"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CardLayanan from "@/components/ui/CardLayanan";
import ModalDaftarLayanan from "@/components/ui/ModalDaftarLayanan";
import ModalFormLayanan from "@/components/ui/ModalFormLayanan";
import { layananPerBidang } from "@/data/layanan";

import TataUsaha from "@/assets/images/layanan-tatausaha.webp";
import BimasIslam from "@/assets/images/layanan-bimasislam.webp";
import BimasKatolik from "@/assets/images/layanan-bimaskatolik.webp";
import BimasKristen from "@/assets/images/layanan-bimaskristen.webp";
import BimasHindu from "@/assets/images/layanan-bimashindu.webp";
import BimasBuddha from "@/assets/images/layanan-bimasbudha.webp";
import Madrasah from "@/assets/images/layanan-madrasah.webp";

const layananData = [
  { title: "Bagian Tata Usaha", slug: "tata-usaha", image: TataUsaha },
  { title: "Bidang Bimbingan Masyarakat Islam", slug: "bimas-islam", image: BimasIslam },
  { title: "Bidang Pendidikan Madrasah", slug: "pendidikan-madrasah", image: Madrasah },
  { title: "Bimas Katolik", slug: "bimas-katolik", image: BimasKatolik },
  { title: "Bimas Kristen", slug: "bimas-kristen", image: BimasKristen },
  { title: "Bimas Hindu", slug: "bimas-hindu", image: BimasHindu },
  { title: "Bimas Buddha", slug: "bimas-buddha", image: BimasBuddha },
];

const bidangMap: any = {
  "tata-usaha": "Bagian Tata Usaha",
  "bimas-islam": "Bidang Bimbingan Masyarakat Islam",
  "bimas-katolik": "Bimas Katolik",
  "bimas-kristen": "Bimas Kristen",
  "bimas-hindu": "Bimas Hindu",
  "bimas-buddha": "Bimas Buddha",
  "pendidikan-madrasah": "Bidang Pendidikan Madrasah",
};

const LayananKami = () => {
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const [openForm, setOpenForm] = useState(false);
  const [selectedLayanan, setSelectedLayanan] = useState("");

  const selectedLayananData =
    openSlug ? layananPerBidang[bidangMap[openSlug]] : [];

  return (
    <section id="layanan" className="py-12 bg-gray-50 scroll-mt-20">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl md:text-4xl font-bold text-center text-gray-800 mb-10">
          LAYANAN KAMI
        </h2>

        {/* Responsive Grid */}
        <div
          className="
            grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5
            gap-2 sm:gap-3 md:gap-4
            justify-center
            mx-auto
          "
        >
          {layananData.map((item) => (
            <motion.div
              key={item.slug}
              className="flex justify-center"
            >
              <div className="max-w-[140px] sm:max-w-[150px] md:max-w-[160px]">
                <CardLayanan
                  title={item.title}
                  image={item.image}
                  onClick={() => setOpenSlug(item.slug)}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal Daftar Layanan */}
      {openSlug && !openForm && (
        <ModalDaftarLayanan
          title={bidangMap[openSlug]}
          layanan={selectedLayananData}
          onClose={() => setOpenSlug(null)}
          onSelect={(item) => {
            setSelectedLayanan(item);
            setOpenForm(true);
          }}
        />
      )}

      {/* Modal Form */}
      {openForm && openSlug && (
        <ModalFormLayanan
          bidang={bidangMap[openSlug]}
          layanan={selectedLayanan}
          onBack={() => setOpenForm(false)}
        />
      )}
    </section>
  );
};

export default LayananKami;
