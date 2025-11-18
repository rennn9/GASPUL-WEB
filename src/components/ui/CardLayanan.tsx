"use client";
import React from "react";
import Image, { StaticImageData } from "next/image";
import { motion } from "framer-motion";

type Props = {
  title: string;
  image: string | StaticImageData;
  href: string;
};

const CardLayanan = ({ title, image, href }: Props) => {
  return (
    <a
      href={href}
      title={title}
      className="group block rounded-xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-[1.03]"
    >
      <div className="relative h-56 md:h-64 w-full">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, 33vw"
          priority={false}
        />
      </div>
      <motion.div
        className="p-4 bg-white"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-green-700">
          {title}
        </h3>
      </motion.div>
    </a>
  );
};

export default CardLayanan;
