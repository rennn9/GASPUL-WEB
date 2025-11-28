"use client";

import { motion } from "framer-motion";
import Lottie from "lottie-react";
import successAnim from "@/assets/lottie/success.json";

interface SuccessPopupProps {
  message?: string;
  onClose: () => void;
}

const SuccessPopup = ({ message = "Pengajuan Berhasil!", onClose }: SuccessPopupProps) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ y: 40, scale: 0.9, opacity: 0 }}
        animate={{ y: 0, scale: 1, opacity: 1 }}
        exit={{ y: 40, scale: 0.9, opacity: 0 }}
        className="
          relative bg-white/90 backdrop-blur-xl 
          rounded-3xl p-7 pb-10 text-center max-w-sm w-full 
          shadow-[0_8px_30px_rgba(0,0,0,0.12)]
          border border-white/40
        "
      >
        {/* Glow decorative elements */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-28 h-28 bg-green-400/30 blur-3xl rounded-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-emerald-400/20 blur-2xl rounded-full pointer-events-none" />

        {/* Lottie Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        >
          <Lottie animationData={successAnim} loop={false} className="w-36 mx-auto" />
        </motion.div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mt-3 tracking-tight">
          {message}
        </h2>

        {/* Mini subtitle for more fun vibes */}
        <p className="text-gray-500 text-sm mt-1">
          Everything looks perfect ✨
        </p>

        {/* Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.03 }}
          onClick={onClose}
          className="
            mt-6 w-full py-3 
            bg-gradient-to-r from-emerald-500 to-green-600
            text-white font-semibold rounded-2xl 
            shadow-[0_4px_14px_rgba(16,185,129,0.35)]
            transition-all
          "
        >
          Oke!
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default SuccessPopup;
