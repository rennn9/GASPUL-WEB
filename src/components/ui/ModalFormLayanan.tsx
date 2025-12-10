"use client";

import { motion } from "framer-motion";
import { X, Upload } from "lucide-react";
import { persyaratanLayanan } from "@/data/layanan";
import { useEffect, useState, useRef } from "react";
import { getNomorRegistrasi, submitFormLayanan } from "@/lib/apiLayanan";
import Lottie from "lottie-react";
import successAnim from "@/assets/lottie/success.json";

interface ModalFormProps {
  bidang: string;
  layanan: string;
  onBack: () => void;
}

/* ===========================
   Success Popup (auto-close)
   =========================== */
const SuccessPopup = ({ message = "Pengajuan Berhasil!", onClose }: { message?: string; onClose: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[999] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-white rounded-2xl shadow-xl p-6 pb-8 text-center max-w-sm w-full"
      >
        <Lottie animationData={successAnim} loop={false} className="w-40 mx-auto" />
        <h2 className="text-xl font-semibold text-gray-800 mt-2">{message}</h2>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-xl shadow hover:scale-105 transition"
        >
          Oke
        </button>
      </motion.div>
    </motion.div>
  );
};

/* ===========================
   ModalFormLayanan (FULL)
   =========================== */
const ModalFormLayanan = ({ bidang, layanan, onBack }: ModalFormProps) => {
  const [persyaratanText, setPersyaratanText] = useState("");
  const [noRegistrasi, setNoRegistrasi] = useState("Loading...");
  const [nik, setNik] = useState("");

  // VALIDASI NIK
  const [nikError, setNikError] = useState("");

  // === FIELD TAMBAHAN ===
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [telepon, setTelepon] = useState("");

  const nikValid = nik.trim().length === 16 && nikError === "";

  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const persyaratanRef = useRef<HTMLTextAreaElement>(null);

  const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB

  // fetch nomor & persyaratan
  useEffect(() => {
    const data = persyaratanLayanan[bidang]?.[layanan] || [];
    const formatted = data.map((item, i) => `${i + 1}. ${item}`).join("\n");
    setPersyaratanText(formatted);

    async function fetchNoReg() {
      const nomor = await getNomorRegistrasi(bidang, layanan);
      setNoRegistrasi(nomor || "Gagal memuat nomor");
    }
    fetchNoReg();
  }, [bidang, layanan]);

  // auto-resize textarea persyaratan
  useEffect(() => {
    if (persyaratanRef.current) {
      persyaratanRef.current.style.height = "auto";
      persyaratanRef.current.style.height = persyaratanRef.current.scrollHeight + "px";
    }
  }, [persyaratanText]);

  // format MB
  function formatMB(bytes: number) {
    return (bytes / 1024 / 1024).toFixed(2) + " MB";
  }

  // handle file validation
  function handleFiles(selected: FileList | null) {
    if (!selected) return;

    const newFiles = Array.from(selected);

    const invalidFiles = newFiles.filter((f) => f.type !== "application/pdf");
    if (invalidFiles.length > 0) {
      const list = invalidFiles.map((f) => f.name).join(", ");
      setFileError(`File bukan PDF: ${list}. Hanya file PDF yang diperbolehkan.`);
      return;
    }

    const oversize = newFiles.filter((f) => f.size > MAX_FILE_SIZE);
    if (oversize.length > 0) {
      const list = oversize.map((f) => `${f.name} (${formatMB(f.size)})`).join(", ");
      setFileError(`File terlalu besar: ${list}. Batas per-file ${(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)}MB.`);
      return;
    }

    setFileError(null);
    setFiles((prev) => [...prev, ...newFiles]);
  }

  function removeFile(index: number) {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }

  // email format validation
  function isValidEmail(email: string) {
    if (!email) return true; // email opsional
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  // ===========================
  //       HANDLE SUBMIT
  // ===========================
  async function handleSubmit(e?: React.FormEvent) {
    if (e) e.preventDefault();
    if (loading) return;

    if (!nik.trim()) {
      alert("NIK tidak boleh kosong");
      return;
    }

    // Validasi panjang NIK
    if (nik.length !== 16) {
      setNikError("NIK harus tepat 16 digit.");
      return;
    }

    if (nikValid) {
      if (!nama.trim()) {
        alert("Nama wajib diisi.");
        return;
      }
      if (!telepon.trim()) {
        alert("Telepon wajib diisi.");
        return;
      }
      if (!isValidEmail(email)) {
        alert("Format email tidak valid.");
        return;
      }
    }

    if (files.length === 0) {
      alert("Harap upload minimal 1 file");
      return;
    }

    if (fileError) {
      alert("Perbaiki error file terlebih dahulu.");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("nik", nik);
      formData.append("no_registrasi", noRegistrasi);
      formData.append("bidang", bidang);
      formData.append("layanan", layanan);

      // === TAMBAHKAN FIELD BARU ===
      formData.append("nama", nama);
      formData.append("email", email);
      formData.append("telepon", telepon);

      files.forEach((f) => formData.append("berkas[]", f));

      const res = await submitFormLayanan(formData);
      setLoading(false);

      if (res?.success) {
        setShowSuccess(true);
      } else {
        alert(res?.message || "Gagal mengirim pengajuan.");
      }
    } catch (err) {
      setLoading(false);
      console.error("Submit error:", err);
      alert("Terjadi kesalahan saat mengirim.");
    }
  }

  const buttonDisabled = nik.trim() === "" || files.length === 0 || !!fileError || loading;

  return (
    <>
      {showSuccess && (
        <SuccessPopup
          message="Pengajuan Berhasil Dikirim!"
          onClose={() => {
            setShowSuccess(false);
            onBack();
          }}
        />
      )}

      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onBack}
      >
        <motion.div
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] flex flex-col overflow-hidden relative"
        >
          {/* close */}
          <button
            className="absolute top-4 right-4 text-gray-600 hover:text-gray-900 z-20"
            onClick={onBack}
          >
            <X size={24} />
          </button>

          {/* header */}
          <div className="sticky top-0 bg-white z-10 pt-6 pb-4 border-b">
            <h3 className="text-2xl font-bold text-gray-900 text-center">Form Pengajuan</h3>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto px-6 py-4 space-y-5 text-gray-800">

            {/* NIK */}
            <div>
              <label className="text-sm font-medium text-gray-700">NIK</label>
              <input
                type="text"
                value={nik}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, "");
                  setNik(value);

                  if (value.length === 0) setNikError("");
                  else if (value.length < 16) setNikError("NIK harus berjumlah 16 digit.");
                  else if (value.length > 16) setNikError("NIK tidak boleh lebih dari 16 digit.");
                  else setNikError("");
                }}
                placeholder="Masukkan NIK"
                className="w-full border border-gray-300 rounded-xl p-3"
              />

              {nikError && (
                <p className="text-red-500 text-sm mt-1">{nikError}</p>
              )}
            </div>

            {/* FIELD TAMBAHAN - tampil jika NIK valid */}
            {nikValid && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">

                {/* Nama */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Nama (wajib)</label>
                  <input
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan Nama"
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Email (opsional)</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Masukkan Email"
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />
                </div>

                {/* Telepon */}
                <div>
                  <label className="text-sm font-medium text-gray-700">Telepon (wajib)</label>
                  <input
                    type="text"
                    value={telepon}
                    onChange={(e) => setTelepon(e.target.value)}
                    placeholder="Masukkan Nomor Telepon"
                    className="w-full border border-gray-300 rounded-xl p-3"
                  />
                </div>
              </motion.div>
            )}

            {/* No Registrasi */}
            <div>
              <label className="text-sm font-medium text-gray-700">No Registrasi</label>
              <input readOnly value={noRegistrasi} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100" />
            </div>

            {/* Bidang */}
            <div>
              <label className="text-sm font-medium text-gray-700">Bidang</label>
              <input readOnly value={bidang} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100" />
            </div>

            {/* Layanan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Layanan</label>
              <input readOnly value={layanan} className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100" />
            </div>

            {/* Persyaratan */}
            <div>
              <label className="text-sm font-medium text-gray-700">Persyaratan</label>
              <textarea
                ref={persyaratanRef}
                readOnly
                value={persyaratanText}
                className="w-full border border-gray-300 rounded-xl p-3 bg-gray-100 resize-none overflow-hidden"
              />
            </div>

            {/* Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">Upload Berkas</label>

              <input
                type="file"
                multiple
                ref={fileInputRef}
                onChange={(e) => handleFiles(e.target.files)}
                className="hidden"
              />

              {/* Dropzone */}
              <div
                className="mt-2 border-2 border-dashed border-gray-400 rounded-xl p-6 text-center text-gray-600 cursor-pointer hover:border-blue-500 transition"
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  handleFiles(e.dataTransfer.files);
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <Upload size={30} className="opacity-60" />
                  <p className="text-sm">
                    Drop files here or <span className="text-blue-600">click to upload</span>
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Maks per-file: {(MAX_FILE_SIZE / 1024 / 1024).toFixed(0)} MB
                  </p>
                  <p className="text-xs text-red-500 mt-1">Hanya file PDF yang dapat diupload</p>
                </div>
              </div>

              {/* File error */}
              {fileError && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 p-3 rounded-xl bg-red-100 text-red-700 border border-red-300 text-sm"
                >
                  <strong className="font-medium block mb-1">⚠️ File bermasalah</strong>
                  <div className="whitespace-pre-wrap text-xs">{fileError}</div>
                </motion.div>
              )}

              {/* Daftar file */}
              {files.length > 0 && (
                <div className="mt-3 bg-gray-100 rounded-xl p-3 text-sm text-gray-700 space-y-2 max-h-60 overflow-y-auto">
                  {files.map((f, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="text-gray-800">📄</span>
                        <div className="min-w-0">
                          <div className="font-medium truncate" title={f.name}>
                            {f.name}
                          </div>
                          <div className="text-xs text-gray-500">{formatMB(f.size)}</div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        className="text-red-500 text-xs hover:underline"
                      >
                        Hapus
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="h-24" />
          </form>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white p-4 border-t">
            <button
              onClick={handleSubmit}
              disabled={buttonDisabled}
              className={`w-full py-3 rounded-xl font-semibold transition
                ${buttonDisabled
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg hover:scale-[1.02]"}
              `}
            >
              {loading ? "Mengirim..." : "🚀 Kirim Pengajuan"}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default ModalFormLayanan;
