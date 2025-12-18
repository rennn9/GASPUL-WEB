"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import ModalSurvey from "./ModalSurvey";

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
  onRefresh?: () => void;
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
  onRefresh,
}: ResultProps) {
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);
  const [showSurveyModal, setShowSurveyModal] = useState(false);
  const [surveyData, setSurveyData] = useState<any>(null);

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
          h-[92vh] sm:h-auto
          flex flex-col
          rounded-2xl sm:rounded-2xl rounded-t-2xl
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
        <div className="flex items-center justify-between px-3 sm:px-5 py-2.5 sm:py-4 border-b border-white/40">
          <div>
            <h2 className="text-sm sm:text-base font-semibold text-gray-900 drop-shadow">
              Hasil Pencarian Status
            </h2>
            <p className="text-[10px] sm:text-xs text-gray-800/80 mt-0.5 hidden sm:block">
              Nomor registrasi → detail pengajuan
            </p>
          </div>

          <button
            ref={closeBtnRef}
            onClick={onClose}
            className="
              w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center
              rounded-full bg-white/70 hover:bg-white
              shadow-md text-gray-900
            "
          >
            <X size={16} className="sm:hidden" />
            <X size={18} className="hidden sm:block" />
          </button>
        </div>

        {/* CONTENT (scrollable area) */}
        <div className="p-3 sm:p-5 overflow-y-auto space-y-3 sm:space-y-6">
          {error ? (
            <div className="bg-red-50/80 border border-red-200/50 backdrop-blur p-3 sm:p-4 rounded-xl shadow-sm">
              <p className="text-sm sm:text-base text-red-800 font-semibold">
                Nomor registrasi tidak ditemukan
              </p>
              {typeof error === "string" && (
                <p className="text-xs sm:text-sm text-red-700 mt-1">{error}</p>
              )}
            </div>
          ) : data ? (
            <>
              {/* INFO SINGKAT */}
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700">Nama</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mt-0.5 line-clamp-1">
                    {data.info?.nama || data.info?.nik || "-"}
                  </p>
                </div>

                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <div className="flex items-center justify-between mb-0.5 sm:mb-1">
                    <p className="text-[10px] sm:text-xs text-gray-700">No Reg</p>
                    {data.has_filled_survey && (
                      <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-100 text-green-800 text-[9px] sm:text-xs font-medium">
                        <svg
                          className="w-2.5 h-2.5 sm:w-3 sm:h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="hidden sm:inline">Survey</span>
                      </span>
                    )}
                  </div>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mt-0.5 line-clamp-1">
                    {data.info?.no_registrasi}
                  </p>
                </div>
              </div>

              {/* BIDANG / LAYANAN / STATUS */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700">Bidang</p>
                  <p className="text-sm sm:text-base font-semibold text-gray-900 mt-0.5">
                    {data.info?.bidang}
                  </p>
                </div>

                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700">Layanan</p>
                  <p className="text-[11px] sm:text-base font-semibold text-gray-900 mt-0.5 leading-tight sm:leading-normal">
                    {data.info?.layanan}
                  </p>
                </div>

                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700">Status Terakhir</p>
                  <p
                    className={`inline-block mt-0.5 sm:mt-1 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${badgeColor(
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
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700 font-medium">Berkas</p>

                  {berkasUrl ? (
                    <a
                      href={berkasUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs sm:text-sm text-blue-900 underline font-semibold mt-0.5 sm:mt-1 inline-block"
                    >
                      Lihat Berkas
                    </a>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-800 mt-0.5 sm:mt-1">
                      Tidak ada berkas
                    </p>
                  )}
                </div>

                <div className="rounded-lg sm:rounded-xl p-2.5 sm:p-4 border border-white/50 bg-white/50 backdrop-blur shadow">
                  <p className="text-[10px] sm:text-xs text-gray-700 font-medium">
                    Surat Balasan
                  </p>

                  {data?.surat_balasan_url ? (
                    <>
                      {data.has_filled_survey ? (
                        // Survey completed → enabled link
                        <a
                          href={data.surat_balasan_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs sm:text-sm text-blue-900 underline font-semibold mt-0.5 sm:mt-1 inline-block"
                        >
                          Lihat Surat Balasan
                        </a>
                      ) : (
                        // Survey NOT completed → disabled + button
                        <div className="space-y-1.5 sm:space-y-2 mt-0.5 sm:mt-1">
                          <p className="text-xs sm:text-sm text-gray-600 italic">
                            Surat balasan tersedia
                          </p>
                          <button
                            onClick={() => {
                              setSurveyData({
                                id: data.info.id,
                                nama: data.info.nama,
                                bidang: data.info.bidang,
                                telepon: data.info.telepon,
                              });
                              setShowSurveyModal(true);
                            }}
                            className="
                              px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg
                              bg-green-600 hover:bg-green-700
                              text-white text-xs sm:text-sm font-semibold
                              transition w-full sm:w-auto
                            "
                          >
                            Isi Survey Untuk Akses
                          </button>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-xs sm:text-sm text-gray-800 mt-0.5 sm:mt-1">
                      Tidak ada surat balasan
                    </p>
                  )}
                </div>
              </div>

              {/* TIMELINE */}
              <div>
                <h3 className="text-xs sm:text-sm font-semibold text-gray-900 mb-1.5 sm:mb-2">
                  Riwayat Status
                </h3>
                <ol className="space-y-2 sm:space-y-3">
                  {(data.status_history ||
                    data.info?.status_history ||
                    []
                  ).map((entry: StatusEntry) => (
                    <li key={entry.id} className="flex gap-2 sm:gap-3 items-start">
                      <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full mt-1.5 sm:mt-2 bg-gray-600/70 backdrop-blur flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-0.5 sm:gap-2">
                          <p className="text-xs sm:text-sm font-medium text-gray-900 truncate">
                            {entry.status}
                          </p>
                          <time className="text-[10px] sm:text-xs text-gray-700 flex-shrink-0">
                            {new Date(entry.created_at).toLocaleString("id-ID", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit"
                            })}
                          </time>
                        </div>
                        {entry.keterangan && (
                          <p className="text-xs sm:text-sm text-gray-800 mt-0.5 sm:mt-1">
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

      {/* SURVEY MODAL */}
      <ModalSurvey
        open={showSurveyModal}
        layananData={surveyData}
        onClose={() => setShowSurveyModal(false)}
        onSuccess={() => {
          if (onRefresh) {
            onRefresh();
          }
        }}
      />
    </motion.div>
  );
}
