"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { X, CheckCircle2, AlertCircle } from "lucide-react";
import { getSurveyQuestions, submitSurvey } from "@/lib/apiLayanan";

// TypeScript Interfaces for Dynamic Survey
interface SurveyTemplate {
  id: number;
  nama: string;
  versi: number;
  deskripsi: string | null;
}

interface SurveyOption {
  id: number;
  jawaban: string;
  poin: number;
  urutan: number;
}

interface SurveyQuestion {
  id: number;
  pertanyaan: string;
  kode_unsur: string | null;
  urutan: number;
  is_required: boolean;
  is_text_input: boolean;
  options: SurveyOption[];
}

interface SurveyTemplateData {
  template: SurveyTemplate;
  questions: SurveyQuestion[];
}

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
  // Survey data from API
  const [surveyData, setSurveyData] = useState<SurveyTemplateData | null>(null);
  const [isLoadingSurvey, setIsLoadingSurvey] = useState(false);

  // Form state - answers now store different data based on question type
  const [answers, setAnswers] = useState<Record<number, any>>({});
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

  // Fetch survey questions when modal opens
  useEffect(() => {
    if (open) {
      fetchSurveyData();
    }
  }, [open]);

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

  // Fetch survey questions from API
  const fetchSurveyData = async () => {
    setIsLoadingSurvey(true);
    setError(null);

    try {
      const result = await getSurveyQuestions();

      if (result.success && result.data) {
        setSurveyData(result.data);
      } else {
        setError(result.message || "Tidak ada template survey aktif saat ini.");
      }
    } catch (err: any) {
      console.error("Error fetching survey:", err);
      setError("Gagal memuat pertanyaan survey. Silakan coba lagi.");
    } finally {
      setIsLoadingSurvey(false);
    }
  };

  const handleAnswerChange = (questionId: number, answer: any) => {
    setAnswers((prev) => ({ ...prev, [questionId]: answer }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!surveyData) {
      setError("Data survey tidak tersedia.");
      return;
    }

    // Validation - check all required questions are answered
    const requiredQuestions = surveyData.questions.filter(q => q.is_required);
    const unansweredRequired = requiredQuestions.filter(q => {
      const answer = answers[q.id];
      if (q.is_text_input) {
        return !answer || answer.trim() === "";
      } else {
        return !answer || !answer.optionId;
      }
    });

    if (unansweredRequired.length > 0) {
      setError(`Mohon jawab semua pertanyaan yang wajib diisi (${unansweredRequired.length} pertanyaan belum dijawab).`);
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
      // Build responses array in NEW FORMAT
      const responses: Array<{
        question_id: number;
        option_id?: number;
        text_answer?: string;
        poin?: number;
      }> = [];

      surveyData.questions.forEach((question) => {
        const answer = answers[question.id];

        if (!answer) return; // Skip unanswered optional questions

        if (question.is_text_input) {
          // Text input response
          responses.push({
            question_id: question.id,
            text_answer: answer as string,
          });
        } else {
          // Multiple choice response
          responses.push({
            question_id: question.id,
            option_id: answer.optionId,
            poin: answer.poin,
          });
        }
      });

      const payload = {
        survey_template_id: surveyData.template.id,
        layanan_publik_id: layananData.id,
        nama_responden: layananData.nama,
        bidang: layananData.bidang,
        no_hp_wa: layananData.telepon || "",
        usia: parseInt(usia),
        jenis_kelamin: jenisKelamin,
        pendidikan,
        pekerjaan,
        tanggal: new Date().toISOString().split("T")[0],
        responses: responses,
        saran: saran || "",
      };

      const result = await submitSurvey(payload);

      if (!result.success) {
        throw new Error(result.message || "Gagal mengirim survey");
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
          {isLoadingSurvey ? (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mb-4"></div>
              <p className="text-gray-700">Memuat pertanyaan survey...</p>
            </div>
          ) : error && !surveyData ? (
            <div className="flex flex-col items-center justify-center h-full">
              <AlertCircle size={64} className="text-red-600 mb-4" />
              <p className="text-red-700 mb-4 text-center">{error}</p>
              <button
                onClick={fetchSurveyData}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Coba Lagi
              </button>
            </div>
          ) : success ? (
            <div className="flex flex-col items-center justify-center h-full">
              <CheckCircle2 size={64} className="text-green-600 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Survey Berhasil Dikirim!
              </h3>
              <p className="text-gray-700 text-center">
                Terima kasih atas partisipasi Anda. Anda sekarang dapat mengakses surat balasan.
              </p>
            </div>
          ) : surveyData ? (
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

              {/* SURVEY QUESTIONS - DYNAMIC */}
              <div className="space-y-5">
                <h3 className="text-sm font-semibold text-gray-900 border-b border-gray-300 pb-2">
                  Pertanyaan Survey
                </h3>

                {surveyData.questions
                  .sort((a, b) => a.urutan - b.urutan)
                  .map((question, idx) => (
                    <div key={question.id} className="space-y-2">
                      <p className="text-sm font-medium text-gray-900">
                        {idx + 1}. {question.pertanyaan}{" "}
                        {question.is_required && <span className="text-red-600">*</span>}
                      </p>

                      {question.is_text_input ? (
                        // TEXT INPUT for open-ended questions
                        <textarea
                          value={answers[question.id] || ""}
                          onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                          rows={4}
                          className="
                            w-full px-3 py-2 rounded-lg
                            bg-white/70 border border-gray-300
                            focus:ring-2 focus:ring-blue-500 focus:border-transparent
                            text-gray-900 text-sm
                          "
                          placeholder="Masukkan jawaban Anda..."
                          required={question.is_required}
                        />
                      ) : (
                        // MULTIPLE CHOICE
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {question.options
                            .sort((a, b) => a.urutan - b.urutan)
                            .map((option) => {
                              const isSelected =
                                answers[question.id]?.optionId === option.id;

                              return (
                                <label
                                  key={option.id}
                                  className={`
                                    flex items-center gap-2 px-3 py-2
                                    rounded-lg border transition text-sm cursor-pointer
                                    ${
                                      isSelected
                                        ? "border-blue-500 bg-blue-50/80"
                                        : "border-gray-300 bg-white/50 hover:bg-white/80"
                                    }
                                  `}
                                >
                                  <input
                                    type="radio"
                                    name={`question-${question.id}`}
                                    checked={isSelected}
                                    onChange={() =>
                                      handleAnswerChange(question.id, {
                                        optionId: option.id,
                                        poin: option.poin,
                                      })
                                    }
                                    className="text-blue-600"
                                    required={question.is_required}
                                  />
                                  <span className="text-gray-900">{option.jawaban}</span>
                                </label>
                              );
                            })}
                        </div>
                      )}
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
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <AlertCircle size={64} className="text-gray-400 mb-4" />
              <p className="text-gray-600">Tidak ada data survey tersedia.</p>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
