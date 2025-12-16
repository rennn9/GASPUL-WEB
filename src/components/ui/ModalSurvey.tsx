"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";

// Survey questions and options
const SURVEY_QUESTIONS = [
  {
    id: 1,
    question: "Bagaimana pendapat Saudara tentang kesesuaian persyaratan pelayanan dengan jenis pelayanannya?",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"],
  },
  {
    id: 2,
    question: "Bagaimana pemahaman Saudara tentang kemudahan prosedur pelayanan di unit ini?",
    options: ["Tidak mudah", "Kurang mudah", "Mudah", "Sangat mudah"],
  },
  {
    id: 3,
    question: "Bagaimana pendapat Saudara tentang kecepatan waktu dalam memberikan pelayanan?",
    options: ["Tidak cepat", "Kurang cepat", "Cepat", "Sangat cepat"],
  },
  {
    id: 4,
    question: "Bagaimana pendapat Saudara tentang kewajaran biaya/tarif dalam pelayanan?",
    options: ["Sangat mahal", "Cukup mahal", "Murah", "Gratis"],
  },
  {
    id: 5,
    question: "Bagaimana pendapat Saudara tentang kesesuaian produk pelayanan antara yang tercantum dalam standar pelayanan dengan hasil yang diberikan?",
    options: ["Tidak sesuai", "Kurang sesuai", "Sesuai", "Sangat sesuai"],
  },
  {
    id: 6,
    question: "Bagaimana pendapat Saudara tentang kompetensi/kemampuan petugas dalam pelayanan?",
    options: ["Tidak kompeten", "Kurang kompeten", "Kompeten", "Sangat kompeten"],
  },
  {
    id: 7,
    question: "Bagaimana pendapat Saudara tentang perilaku petugas dalam pelayanan terkait kesopanan dan keramahan?",
    options: ["Tidak sopan dan ramah", "Kurang sopan dan ramah", "Sopan dan ramah", "Sangat sopan dan ramah"],
  },
  {
    id: 8,
    question: "Bagaimana pendapat Saudara tentang kualitas sarana dan prasarana?",
    options: ["Buruk", "Cukup", "Baik", "Sangat Baik"],
  },
  {
    id: 9,
    question: "Bagaimana pendapat Saudara tentang penanganan pengaduan pengguna layanan?",
    options: ["Tidak ada", "Ada tetapi tidak berfungsi", "Berfungsi kurang maksimal", "Dikelola dengan baik"],
  },
];

interface ModalSurveyProps {
  open: boolean;
  layananData: {
    id: number;
    nama: string;
    bidang: string;
    telepon?: string;
  } | null;
  onClose: () => void;
  onSuccess: () => void;
}

export default function ModalSurvey({
  open,
  layananData,
  onClose,
  onSuccess,
}: ModalSurveyProps) {
  // Form state
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [usia, setUsia] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [pendidikan, setPendidikan] = useState("");
  const [pekerjaan, setPekerjaan] = useState("");
  const [saran, setSaran] = useState("");

  // UI state
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const modalRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // ESC key to close
  useEffect(() => {
    if (!open) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [open, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      setAnswers({});
      setUsia("");
      setJenisKelamin("");
      setPendidikan("");
      setPekerjaan("");
      setSaran("");
      setError(null);
      setSuccess(false);
    }
  }, [open]);

  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (Object.keys(answers).length < 9) {
      setError("Mohon jawab semua pertanyaan pilihan ganda.");
      return;
    }

    if (!usia || !jenisKelamin || !pendidikan || !pekerjaan) {
      setError("Mohon isi semua data diri (usia, jenis kelamin, pendidikan, pekerjaan).");
      return;
    }

    if (parseInt(usia) < 1 || parseInt(usia) > 120) {
      setError("Usia harus antara 1-120 tahun.");
      return;
    }

    if (!layananData) {
      setError("Data layanan tidak ditemukan.");
      return;
    }

    setSubmitting(true);

    try {
      // Value mapping for each answer option (1-4 scale)
      const skalaNilai: Record<string, number> = {
        // Question 1: Kesesuaian persyaratan
        "Tidak sesuai": 1,
        "Kurang sesuai": 2,
        "Sesuai": 3,
        "Sangat sesuai": 4,
        // Question 2: Kemudahan prosedur
        "Tidak mudah": 1,
        "Kurang mudah": 2,
        "Mudah": 3,
        "Sangat mudah": 4,
        // Question 3: Kecepatan waktu
        "Tidak cepat": 1,
        "Kurang cepat": 2,
        "Cepat": 3,
        "Sangat cepat": 4,
        // Question 4: Kewajaran biaya (reversed)
        "Sangat mahal": 1,
        "Cukup mahal": 2,
        "Murah": 3,
        "Gratis": 4,
        // Question 5: Kesesuaian produk
        // (same as Q1)
        // Question 6: Kompetensi petugas
        "Tidak kompeten": 1,
        "Kurang kompeten": 2,
        "Kompeten": 3,
        "Sangat kompeten": 4,
        // Question 7: Perilaku petugas
        "Tidak sopan dan ramah": 1,
        "Kurang sopan dan ramah": 2,
        "Sopan dan ramah": 3,
        "Sangat sopan dan ramah": 4,
        // Question 8: Kualitas sarana
        "Buruk": 1,
        "Cukup": 2,
        "Baik": 3,
        "Sangat Baik": 4,
        // Question 9: Penanganan pengaduan
        "Tidak ada": 1,
        "Ada tetapi tidak berfungsi": 2,
        "Berfungsi kurang maksimal": 3,
        "Dikelola dengan baik": 4,
      };

      // Convert answers to JSON object format with question as key
      const jawabanObject: Record<string, { jawaban: string; nilai: number }> = {};

      SURVEY_QUESTIONS.forEach((q) => {
        const answer = answers[q.id] || "";
        const nilai = skalaNilai[answer] || 0;

        jawabanObject[q.question] = {
          jawaban: answer,
          nilai: nilai,
        };
      });

      const payload = {
        layanan_publik_id: layananData.id,
        nama_responden: layananData.nama,
        bidang: layananData.bidang,
        no_hp_wa: layananData.telepon || "",
        usia: parseInt(usia),
        jenis_kelamin: jenisKelamin,
        pendidikan,
        pekerjaan,
        tanggal: new Date().toISOString().split("T")[0],
        jawaban: jawabanObject,
        saran: saran || "",
      };

      const response = await fetch(
        "http://192.168.1.5:8000/api/survey",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Gagal mengirim survey");
      }

      setSuccess(true);

      // Wait 1.5 seconds to show success message, then trigger callbacks
      setTimeout(() => {
        onSuccess();
        onClose();
      }, 1500);

    } catch (err: any) {
      setError(err.message || "Terjadi kesalahan saat mengirim survey");
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

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

      {/* MODAL */}
      <motion.div
        ref={modalRef}
        className="
          relative w-full max-w-3xl
          h-[90vh] sm:h-[85vh]
          flex flex-col
          rounded-2xl shadow-2xl
          bg-white/40 border border-white/40
          backdrop-blur-xl
          overflow-hidden
        "
        initial={{ y: 40, scale: 0.96 }}
        animate={{ y: 0, scale: 1 }}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/40">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              Survey Kepuasan Layanan
            </h2>
            <p className="text-xs text-gray-800/80 mt-0.5">
              Mohon isi survey sebelum mengakses surat balasan
            </p>
          </div>
          <button
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

        {/* SCROLLABLE CONTENT */}
        <div className="flex-1 overflow-y-auto p-5">
          {success ? (
            <div className="flex flex-col items-center justify-center h-full">
              <CheckCircle2 size={64} className="text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Survey Berhasil Dikirim!
              </h3>
              <p className="text-gray-700 text-center">
                Terima kasih atas partisipasi Anda. Anda sekarang dapat mengakses surat balasan.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* AUTO-FILLED INFO */}
              <div className="rounded-xl p-4 bg-blue-50/70 border border-blue-200/50">
                <p className="text-sm font-semibold text-blue-900 mb-2">
                  Data Anda
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-blue-700">Nama:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {layananData?.nama}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">Bidang:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {layananData?.bidang}
                    </span>
                  </div>
                  <div>
                    <span className="text-blue-700">No. HP/WA:</span>{" "}
                    <span className="font-medium text-gray-900">
                      {layananData?.telepon || "-"}
                    </span>
                  </div>
                </div>
              </div>

              {/* MANUAL INPUT FIELDS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Usia */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Usia <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="number"
                    value={usia}
                    onChange={(e) => setUsia(e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-lg
                      bg-white/70 border border-gray-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      text-gray-900
                    "
                    min="1"
                    max="120"
                    required
                  />
                </div>

                {/* Jenis Kelamin */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Jenis Kelamin <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={jenisKelamin}
                    onChange={(e) => setJenisKelamin(e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-lg
                      bg-white/70 border border-gray-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      text-gray-900
                    "
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                {/* Pendidikan */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Pendidikan <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={pendidikan}
                    onChange={(e) => setPendidikan(e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-lg
                      bg-white/70 border border-gray-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      text-gray-900
                    "
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="SD">SD</option>
                    <option value="SMP">SMP</option>
                    <option value="SMA/SMK">SMA/SMK</option>
                    <option value="D3">D3</option>
                    <option value="S1">S1</option>
                    <option value="S2">S2</option>
                    <option value="S3">S3</option>
                  </select>
                </div>

                {/* Pekerjaan */}
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-1">
                    Pekerjaan <span className="text-red-600">*</span>
                  </label>
                  <select
                    value={pekerjaan}
                    onChange={(e) => setPekerjaan(e.target.value)}
                    className="
                      w-full px-3 py-2 rounded-lg
                      bg-white/70 border border-gray-300
                      focus:ring-2 focus:ring-blue-500 focus:border-transparent
                      text-gray-900
                    "
                    required
                  >
                    <option value="">Pilih...</option>
                    <option value="Pelajar/Mahasiswa">Pelajar/Mahasiswa</option>
                    <option value="PNS">PNS</option>
                    <option value="TNI/POLRI">TNI/POLRI</option>
                    <option value="Pegawai Swasta">Pegawai Swasta</option>
                    <option value="Wiraswasta">Wiraswasta</option>
                    <option value="Petani/Nelayan">Petani/Nelayan</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                </div>
              </div>

              {/* SURVEY QUESTIONS */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-300 pb-2">
                  Pertanyaan Survey
                </h3>

                {SURVEY_QUESTIONS.map((q, idx) => (
                  <div key={q.id} className="space-y-2">
                    <p className="text-sm font-medium text-gray-900">
                      {idx + 1}. {q.question} <span className="text-red-600">*</span>
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {q.options.map((option) => (
                        <label
                          key={option}
                          className="
                            flex items-center gap-2 px-3 py-2
                            rounded-lg border border-gray-300
                            bg-white/50 hover:bg-white/80
                            cursor-pointer transition
                            text-sm
                          "
                        >
                          <input
                            type="radio"
                            name={`question-${q.id}`}
                            value={option}
                            checked={answers[q.id] === option}
                            onChange={() => handleAnswerChange(q.id, option)}
                            className="text-blue-600"
                            required
                          />
                          <span className="text-gray-900">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* SARAN (FREE TEXT) */}
              <div>
                <label className="block text-sm font-medium text-gray-900 mb-1">
                  Kritik / Saran (Opsional)
                </label>
                <textarea
                  value={saran}
                  onChange={(e) => setSaran(e.target.value)}
                  rows={4}
                  className="
                    w-full px-3 py-2 rounded-lg
                    bg-white/70 border border-gray-300
                    focus:ring-2 focus:ring-blue-500 focus:border-transparent
                    text-gray-900
                  "
                  placeholder="Masukkan kritik atau saran Anda..."
                />
              </div>

              {/* ERROR MESSAGE */}
              {error && (
                <div className="flex items-start gap-2 p-4 rounded-lg bg-red-50/80 border border-red-200">
                  <AlertCircle size={20} className="text-red-600 flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-red-800">{error}</p>
                </div>
              )}

              {/* SUBMIT BUTTON */}
              <button
                type="submit"
                disabled={submitting}
                className="
                  w-full py-3 px-4 rounded-lg
                  bg-blue-600 hover:bg-blue-700
                  text-white font-semibold
                  disabled:bg-gray-400 disabled:cursor-not-allowed
                  transition
                "
              >
                {submitting ? "Mengirim..." : "Kirim Survey"}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
