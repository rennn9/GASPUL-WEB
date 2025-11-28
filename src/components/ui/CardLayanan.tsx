"use client";

import React from "react";
import Image, { StaticImageData } from "next/image";

type Props = {
  title: string;
  image: string | StaticImageData;
  onClick: () => void;
};

const CardLayanan = ({ title, image, onClick }: Props) => {
  return (
<button
  onClick={onClick}
  title={title}
  className="
    group shrink-0 relative
    w-[110px] sm:w-[130px] md:w-[150px]
    rounded-xl overflow-hidden bg-white shadow-md
    flex flex-col
    transition-all duration-500
    md:hover:scale-[1.03] active:scale-[0.98]

    /* BASE LAYER */
    before:absolute before:inset-0
    before:rounded-xl
    before:border-2 before:border-transparent
    before:transition-all before:duration-500
    before:pointer-events-none

    /* HOVER EFFECT */
    md:hover:before:border-[#d4af37]/80
    md:hover:before:shadow-[0_0_20px_8px_rgba(212,175,55,0.35)]
    md:hover:before:blur-[2px]

    /* CLICK EFFECT – lebih kuat & intens */
    active:before:border-[#d4af37]
    active:before:shadow-[0_0_28px_12px_rgba(212,175,55,0.5)]
    active:before:blur-[3px]
  "
>

      {/* ICON / IMAGE */}
      <div className="relative w-full aspect-square">
        <Image
          src={image}
          alt={title}
          fill
          loading="lazy"
          className="object-cover object-center duration-500 md:group-hover:scale-105"
          sizes="150px"
        />
      </div>

      {/* TITLE */}
      <div className="px-2 py-2 bg-white flex items-center justify-center min-h-[50px]">
        <h3 className="text-[10px] sm:text-xs md:text-sm font-semibold text-gray-800 text-center leading-tight">
          {title}
        </h3>
      </div>
    </button>
  );
};

export default CardLayanan;
