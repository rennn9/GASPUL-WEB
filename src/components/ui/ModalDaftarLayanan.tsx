"use client";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useState } from "react";

interface ModalDaftarLayananProps {
  title: string;
  layanan: string[];
  onClose: () => void;
  onSelect: (layanan: string) => void;
}

const ModalDaftarLayanan = ({
  title,
  layanan,
  onClose,
  onSelect,
}: ModalDaftarLayananProps) => {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] p-6 flex flex-col relative"
      >
        {/* CLOSE */}
<button
  onClick={onClose}
  className="
    absolute top-4 right-4
    w-10 h-10 flex items-center justify-center
    rounded-full

    backdrop-blur-md bg-white/30 
    border border-white/40

    text-gray-700
    transition-all duration-300

    shadow-[0_0_8px_rgba(0,0,0,0.15)]
    hover:shadow-[0_0_15px_rgba(0,0,0,0.25)]
    hover:scale-110 hover:rotate-90
    active:scale-95
  "
>
  <X size={20} strokeWidth={2.5} />
</button>


        <h3 className="text-xl font-bold text-gray-800 mb-4 text-center">
          {title}
        </h3>

        {/* LIST */}
        <div className="overflow-y-auto flex-1 pr-1 mb-24">
          {layanan?.length ? (
            <ul className="space-y-3">
              {layanan.map((item, i) => (
                <li
                  key={i}
                  onClick={() => setSelected(item)}
                  className={`
                    p-3 rounded-xl cursor-pointer border 
                    flex items-center justify-between
                    transition-all duration-300
                    ${
                      selected === item
                        ? "bg-blue-50 border-blue-500 text-blue-700 shadow"
                        : "bg-gray-100 border-gray-300 text-gray-800"
                    }
                  `}
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-center">
              Belum ada layanan terdaftar.
            </p>
          )}
        </div>

        {/* BUTTON FIXED BOTTOM */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t rounded-b-2xl">
          <button
            disabled={!selected}
            onClick={() => selected && onSelect(selected)}
            className={`
              w-full py-3 rounded-xl font-semibold transition-all duration-300

              ${
                !selected
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-violet-600 text-white shadow-lg hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95"
              }
            `}
          >
            Registrasi
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ModalDaftarLayanan;