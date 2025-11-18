"use client";
import Link from "next/link";
import { layananPerBidang } from "@/data/layanan";
import { motion } from "framer-motion";

export default function LayananPage() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-12">
          LAYANAN KEMENTERIAN AGAMA
        </h2>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        >
          {layananPerBidang.map((bidang) => (
            <motion.div
              key={bidang.slug}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
              className="p-6 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {bidang.title}
              </h3>
              <p className="text-sm text-gray-600 mb-4 line-clamp-3">
                {bidang.description}
              </p>
              <Link
                href={`/layanan/${bidang.slug}`}
                className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Lihat Detail →
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
