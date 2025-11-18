"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { layananPerBidang } from "@/data/layanan";
import { motion, easeInOut } from "framer-motion";
import Head from "next/head";
import { ArrowLeft } from "lucide-react";

const LayananDetailPage = () => {
  const { slug } = useParams();

  const bidangMap: Record<string, string> = {
    "tata-usaha": "Bagian Tata Usaha",
    "bimas-islam": "Bidang Bimbingan Masyarakat Islam",
    "bimas-katolik": "Bimas Katolik",
    "bimas-kristen": "Bimas Kristen",
    "bimas-hindu": "Bimas Hindu",
    "bimas-buddha": "Bimas Buddha",
  };

  const bidang = bidangMap[slug as string];
  const layanan = bidang ? layananPerBidang[bidang] : [];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Head>
        <title>{bidang ? `${bidang} | Layanan Kemenag` : "Layanan Tidak Ditemukan"}</title>
        <meta
          name="description"
          content={
            bidang
              ? `Daftar layanan yang tersedia di ${bidang}. Temukan informasi dan panduan lengkap mengenai layanan ${bidang} di sini.`
              : "Halaman layanan tidak ditemukan."
          }
        />
      </Head>

      <section className="py-20 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-6">
          {/* Header Bidang + Tombol Back */}
          <div className="flex items-center gap-4 mb-8 pt-10">
            <Link
              href="/#layanan"
              scroll={false}
              onClick={(e) => {
                e.preventDefault();
                const el = document.querySelector("#layanan");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                  history.pushState({}, "", "/#layanan");
                } else {
                  window.location.href = "/#layanan";
                }
              }}
              className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white shadow hover:bg-gray-100 transition"
              title="Kembali ke Beranda"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Link>

            <motion.h1
              className="text-3xl md:text-4xl font-bold text-gray-800 leading-snug"
              initial={{ opacity: 0, y: -30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.8, ease: easeInOut }}
            >
              {bidang || "Layanan Tidak Ditemukan"}
            </motion.h1>
          </div>

          {/* Daftar Layanan */}
          {layanan && layanan.length > 0 ? (
            <motion.ul
              className="space-y-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: easeInOut }}
            >
              {layanan.map((item, index) => (
                <li
                  key={index}
                  className="p-4 bg-white rounded-xl shadow hover:shadow-md transition text-gray-800 font-medium text-center sm:text-left"
                >
                  {item}
                </li>
              ))}
            </motion.ul>
          ) : (
            <motion.p
              className="text-gray-600 text-center mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Belum ada layanan yang terdaftar untuk bidang ini.
            </motion.p>
          )}
        </div>
      </section>
    </>
  );
};

export default LayananDetailPage;
