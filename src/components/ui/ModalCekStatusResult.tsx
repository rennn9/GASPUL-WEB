"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

type StatusEntry = {
  id: number;
  status: string;
  keterangan?: string | null;
  created_at: string;
};

interface ResultProps {
  open: boolean;
  error?: string | null;
  data?: any;
  onClose: () => void;
}

const badgeColor = (status?: string) => {
  if (!status) return "bg-gray-200 text-gray-800";
  const s = status.toLowerCase();

  if (s.includes("selesai")) return "bg-green-100/70 text-green-900";
  if (s.includes("perlu") || s.includes("perbaikan"))
    return "bg-yellow-100/70 text-yellow-900";
  if (s.includes("tolak") || s.includes("ditolak"))
    return "bg-red-100/70 text-red-900";

  return "bg-blue-100/70 text-blue-900";
};

export default function ModalCekStatusResult({
  open,
  error,
  data,
  onClose,
}: ResultProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  /* Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* Esc close */
  useEffect(() => {
    if (!open) return;
    const fn = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open]);

  if (!open) return null;
  if (!data && !error) return null;

  /* URL berkas */
  const berkasUrl =
    data?.berkas_url ||
    (data?.info?.berkas &&
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/storage/berkas-layanan/${data.info.berkas}`);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* MODAL WRAPPER / GLASSMORPH */}
      <motion.div
        className="
          relative 
          w-full max-w-2xl 
          h-[90vh] sm:h-auto 
          flex flex-col
          rounded-2xl 
          shadow-2xl
          bg-white/40 
          border border-white/40 
          backdrop-blur-xl
          overflow-hidden
        "
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/40">
          <div>
            <h2 className="text-base font-semibold text-gray-900 drop-shadow">
              Hasil Pencarian Status
            </h2>
            <p className="text-xs text-gray-800/80 mt-0.5">
              Nomor registrasi → detail pengajuan
            </p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="
              w-9 h-9 flex items-center justify-center 
              rounded-full bg-white/70 hover:bg-white 
              shadow-md text-gray-900
            "
          >
            <X size={18} />
          </button>
        </div>

        {/* CONTENT (scrollable area) */}
        <div className="p-5 overflow-y-auto space-y-6">
          {error ? (
            <div className="bg-red-50/80 border border-red-200/50 backdrop-blur p-4 rounded-xl shadow-sm">
              <p className="text-red-800 font-semibold">
                Nomor registrasi tidak ditemukan
              </p>
              {typeof error === "string" && (
                <p className="text-sm text-red-700 mt-1">{error}</p>
              )}
            </div>
          ) : data ? (
            <>
              {/* INFO SINGKAT */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700">Nama</p>
                  <p className="font-semibold text-gray-900">
                    {data.info?.nama || data.info?.nik || "-"}
                  </p>
                </div>

                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700">No Registrasi</p>
                  <p className="font-semibold text-gray-900">
                    {data.info?.no_registrasi}
                  </p>
                </div>
              </div>

              {/* BIDANG / LAYANAN / STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700">Bidang</p>
                  <p className="font-semibold text-gray-900">
                    {data.info?.bidang}
                  </p>
                </div>

                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700">Layanan</p>
                  <p className="font-semibold text-gray-900">
                    {data.info?.layanan}
                  </p>
                </div>

                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700">Status Terakhir</p>
                  <p
                    className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-medium ${badgeColor(
                      data.status_terakhir?.status
                    )}`}
                  >
                    {data.status_terakhir?.status ||
                      data.info?.last_status?.status ||
                      "-"}
                  </p>
                </div>
              </div>

              {/* BERKAS + SURAT BALASAN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700 font-medium">Berkas</p>

                  {berkasUrl ? (
                    <a
                      href={berkasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-900 underline font-semibold mt-1 inline-block"
                    >
                      Lihat Berkas
                    </a>
                  ) : (
                    <p className="text-sm text-gray-800 mt-1">
                      Tidak ada berkas
                    </p>
                  )}
                </div>

                <div className="rounded-xl p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-xs text-gray-700 font-medium">
                    Surat Balasan
                  </p>

                  {data?.surat_balasan_url ? (
                    <a
                      href={data.surat_balasan_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-blue-900 underline font-semibold mt-1 inline-block"
                    >
                      Lihat Surat Balasan
                    </a>
                  ) : (
                    <p className="text-sm text-gray-800 mt-1">
                      Tidak ada surat balasan
                    </p>
                  )}
                </div>
              </div>

              {/* TIMELINE */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 mb-2">
                  Riwayat Status
                </h3>
                <ol className="space-y-3">
                  {(data.status_history ||
                    data.info?.status_history ||
                    []
                  ).map((entry: StatusEntry) => (
                    <li key={entry.id} className="flex gap-3 items-start">
                      <div className="w-2.5 h-2.5 rounded-full mt-2 bg-gray-600/70 backdrop-blur" />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900">
                            {entry.status}
                          </p>
                          <time className="text-xs text-gray-700">
                            {new Date(entry.created_at).toLocaleString("id-ID")}
                          </time>
                        </div>
                        {entry.keterangan && (
                          <p className="text-sm text-gray-800 mt-1">
                            {entry.keterangan}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </>
          ) : (
            <p className="text-center py-8 text-gray-700">
              Menunggu input nomor registrasi…
            </p>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
