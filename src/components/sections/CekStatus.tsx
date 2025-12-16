// src/components/sections/CekStatus.tsx
"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Search, AlertCircle } from "lucide-react";
import ModalCekStatusResult from "@/components/ui/ModalCekStatusResult";
import { cekStatusPengajuan } from "@/lib/apiLayanan";

export default function CekStatus() {
  const [inputVal, setInputVal] = useState("");
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setResultData(null);
    setErrorMessage(null);

    if (!inputVal.trim()) {
      setErrorMessage("⚠️ Masukkan nomor registrasi.");
      return;
    }

    setLoading(true);
    try {
      const res = await cekStatusPengajuan(inputVal.trim());

      if (!res.success) {
        setErrorMessage(res.message || "Nomor registrasi tidak ditemukan.");
      } else {
        setResultData(res.data);
        setModalOpen(true); // Hanya buka modal jika data ditemukan
      }
    } catch (err: any) {
      setErrorMessage("Tidak dapat terhubung ke server.");
    } finally {
      setLoading(false);
    }
  };

  const handleRefreshStatus = async () => {
    if (resultData?.info?.no_registrasi) {
      const res = await cekStatusPengajuan(resultData.info.no_registrasi);
      if (res.success) {
        setResultData(res.data);
      }
    }
  };

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background & Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-100 via-white to-slate-200" />
      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-blue-300/20 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-purple-300/20 blur-3xl" />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.h2
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Cek Status Pengajuan
        </motion.h2>

        <motion.p
          className="text-gray-600 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Masukkan nomor registrasi untuk melihat detail terbaru pengajuan Anda.
        </motion.p>

        {/* Search Box */}
        <motion.form
          onSubmit={handleSubmit}
          className="max-w-xl mx-auto flex flex-col items-center"
        >
          <div className="flex w-full items-center bg-white/70 backdrop-blur-xl shadow-lg shadow-black/5 border border-gray-200 rounded-2xl px-5 py-3">
            <Search className="text-gray-600 mr-3" size={22} />
            <input
              type="text"
              placeholder="Masukkan Nomor Registrasi..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value.toUpperCase())}
              className="w-full bg-transparent outline-none text-gray-900 placeholder-gray-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={loading}
              className="px-5 py-2 rounded-xl bg-blue-600 text-white font-semibold shadow-md disabled:opacity-60"
            >
              {loading ? "Mencari..." : "Cek"}
            </motion.button>
          </div>

          {/* Error message */}
          {errorMessage && (
            <div className="mt-4 flex items-center justify-center gap-2 bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-xl w-full max-w-xl">
              <AlertCircle size={20} />
              <span className="text-sm">{errorMessage}</span>
            </div>
          )}
        </motion.form>
      </div>

      {/* Modal hanya untuk hasil valid */}
      <ModalCekStatusResult
        open={modalOpen}
        data={resultData || undefined}
        onClose={() => setModalOpen(false)}
        onRefresh={handleRefreshStatus}
      />
    </section>
  );
}





// // src/components/sections/CekStatus.tsx
// "use client";
// import React, { useState } from "react";
// import ModalCekStatusInput from "@/components/ui/ModalCekStatusInput";
// import ModalCekStatusResult from "@/components/ui/ModalCekStatusResult";
// import { motion } from "framer-motion";

// export default function CekStatus() {
//   const [openInput, setOpenInput] = useState(false);
//   const [resultOpen, setResultOpen] = useState(false);
//   const [resultData, setResultData] = useState<any | null>(null);
//   const [resultError, setResultError] = useState<string | null>(null);

// const handleResult = (payload: { data?: any; error?: string | null }) => {
//   if (payload.error) {
//     // ❗ Jika error → JANGAN buka modal hasil
//     setResultError(payload.error);
//     setResultData(null);
//     return;
//   }

//   // Jika sukses → tampilkan modal hasil
//   setResultData(payload.data);
//   setResultError(null);
//   setResultOpen(true);
// };


//   return (
//     <section aria-labelledby="cekstatus-heading" className="py-12">
//       <div className="max-w-7xl mx-auto px-6 text-center">
//         <h2
//           id="cekstatus-heading"
//           className="text-2xl font-semibold text-gray-900 mb-4"
//         >
//           Cek Status Pengajuan
//         </h2>

//         <p className="text-sm text-gray-700 mb-8">
//           Masukkan nomor registrasi untuk melihat detail status pengajuan Anda.
//         </p>

//         {/* === BUTTON CENTERED & HIGH CONTRAST === */}
//         <motion.button
//           onClick={() => setOpenInput(true)}
//           className="
//             inline-flex items-center gap-3 
//             px-6 py-3 rounded-xl 
//             bg-white 
//             border border-gray-300 
//             shadow-sm 
//             hover:bg-gray-50 
//             focus:outline-none 
//             focus-visible:ring-2 
//             focus-visible:ring-blue-600 
//             focus-visible:ring-offset-2
//           "
//           whileHover={{ scale: 1.03 }}
//           whileTap={{ scale: 0.97 }}
//           aria-haspopup="dialog"
//         >
//           {/* ICON — DARK FOR HIGH CONTRAST */}
//           <svg
//             width="20"
//             height="20"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//             strokeWidth="2"
//             className="text-gray-900"
//             aria-hidden
//           >
//             <path
//               d="M11 4a7 7 0 100 14 7 7 0 000-14z"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//             <path
//               d="M21 21l-4.35-4.35"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             />
//           </svg>

//           <span className="font-semibold text-gray-900">
//             Cek Status Pengajuan
//           </span>
//         </motion.button>
//       </div>

//       {/* Modals */}
//       <ModalCekStatusInput
//         open={openInput}
//         onClose={() => setOpenInput(false)}
//         onResult={handleResult}
//       />

//       <ModalCekStatusResult
//         open={resultOpen}
//         error={resultError}
//         data={resultData}
//         onClose={() => setResultOpen(false)}
//       />
//     </section>
//   );
// }
