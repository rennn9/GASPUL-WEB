// ============================
// INTERFACE (Optional)
// ============================
export interface LayananBidang {
  slug: string;
  title: string;
  description: string;
  layanan: string[];
}

// ============================
// DATA: Daftar Layanan Per Bidang
// ============================
export const layananPerBidang: Record<string, string[]> = {
  "Bagian Tata Usaha": [
    "Permohonan Audiensi",
    "Penerbitan Surat Izin Magang",
    "Penerbitan Surat Izin Penelitian",
    "Permohonan Data dan Informasi Keagamaan",
    "Permohonan Rohaniwan",
    "Penerbitan Rekomendasi Kegiatan Keagamaan",
    "Pelayanan Do'a Keagamaan",
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan",
  ],

  "Bidang Bimbingan Masyarakat Islam": [
    "Penerbitan Izin Operasional Lembaga Amil Zakat Kabupaten",
    "Penerbitan Izin Operasional Lembaga Amil Zakat Nasional Perwakilan Provinsi",
    "Kalibrasi Arah Kiblat",
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan",
  ],

  "Bidang Pendidikan Madrasah": [
    "Legalisir Ijazah Madrasah",
  ],


  "Bimas Kristen": [
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Kristen",
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Kristen",
  ],

  "Bimas Katolik": [
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Katolik",
  ],

  "Bimas Hindu": [
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Hindu",
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Hindu",
  ],

  "Bimas Buddha": [
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Buddha",
  ],
};

// ============================
// DATA: Persyaratan Layanan
// ============================
export const persyaratanLayanan: Record<string, Record<string, string[]>> = {
  "Bagian Tata Usaha": {
    "Permohonan Audiensi": [
      "Surat Resmi dari institusi atau instansi",
      "Mengisi Blangko Permintaan Audiens",
      "Materi Audiens",
    ],

    "Penerbitan Surat Izin Magang": [
      "Surat Resmi dari institusi atau instansi",
      "Fotocopy resmi dari institusi atau instansi",
    ],

    "Penerbitan Surat Izin Penelitian": [
      "Surat Resmi dari Instansi atau pribadi",
      "Fotocopy KTP / Kartu Mahasiswa / Pelajar",
      "Pas foto berwarna 4x6 (3 lembar)",
      "Proposal disetujui dosen (jika mahasiswa)",
      "Mengisi Blangko Biodata",
      "Fotocopy surat pengesahan badan hukum (jika Badan Usaha)",
      "Fotocopy surat keterangan terdaftar (jika Organisasi Kemasyarakatan)",
    ],

    "Permohonan Data dan Informasi Keagamaan": [
      "Surat Resmi dari institusi atau instansi",
    ],

    "Permohonan Rohaniwan": [
      "Surat Permohonan dari institusi / instansi / lembaga",
    ],

    "Penerbitan Rekomendasi Kegiatan Keagamaan": [
      "Proposal pelaksanaan kegiatan",
      "Surat Permohonan",
    ],

    "Pelayanan Do'a Keagamaan": [
      "Surat Permohonan dari institusi / instansi / lembaga",
    ],

    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan": [
      "Juknis Pemberian Bantuan Ormas / Lembaga Keagamaan",
      "Proposal Bantuan",
    ],
  },

  "Bidang Bimbingan Masyarakat Islam": {
    "Penerbitan Izin Operasional Lembaga Amil Zakat Kabupaten": [
      "Surat Permohonan kepada Kakanwil Kemenag Prov Sulbar dengan melampirkan Rekomendasi Baznas RI",
      "Anggaran Dasar Organisasi",
      "Surat Keterangan Terdaftar sebagai Badan Hukum dari Kemenkumham",
      "Susunan Pengawas Syariat",
      "Surat Pernyataan sebagai Pengawas Syariat",
      "Daftar Pegawai minimal 8 orang",
      "Fotocopy BPJS Ketenagakerjaan & Kesehatan bagi pegawai",
      "Surat pernyataan tidak rangkap jabatan",
      "Surat pernyataan bersedia diaudit berkala",
      "Ikhtisar Perencanaan Program Pendayagunaan ZIS (min 3 kecamatan)",
      "Surat kesanggupan menghimpun dana min 3 Miliar/tahun",
    ],

    "Penerbitan Izin Operasional Lembaga Amil Zakat Nasional Perwakilan Provinsi": [
      "Surat permohonan kepada Kakanwil Prov. Sulawesi Barat",
      "Izin pembentukan LAZ dari Menteri Agama",
      "Rekomendasi Baznas Provinsi",
      "Data Muzakki dan Mustahik di Provinsi terkait",
      "Data dan Alamat Kantor Perwakilan",
      "Surat Pengangkatan Pengurus Laznas Provinsi",
      "Ikhtisar Perencanaan Program Pendayagunaan Zakat (min 3 Kab/Kota)",
    ],

    "Kalibrasi Arah Kiblat": ["Surat Permohonan"],

    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan": [
      "Tanda Daftar Rumah Ibadah Aktif / Pembangunan",
      "Rumah Ibadah tidak layak/rusak/terkena bencana",
      "Status tanah berbadan hukum",
    ],
  },

  "Bidang Pendidikan Madrasah": {
    "Legalisir Ijazah Madrasah": [
      "Pemohon adalah pemilik Ijazah/STTB/SKP Ijazah atau penerima kuasa dari pemilik",
      "Mengisi dan menandatangani formulir permohonan pengesahan",
      "Fotokopi Ijazah/STTB/SKP Ijazah",
      "Menandatangani Surat Pernyataan Tanggung Jawab Mutlak yang dibubuhi materai 10.000",
      "Menunjukkan Ijazah/STTB/SKP Ijazah asli yang akan disahkan",
      "Menyerahkan fotokopi Ijazah/STTB/SKP Ijazah yang akan disahkan paling banyak 10 (sepuluh) lembar",
    ],
  },


  "Bimas Kristen": {
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Kristen": [
      "Tanda Daftar Rumah Ibadah (Aktif/Pembangunan)",
      "Kondisi tidak layak/rusak/bencana",
      "Status tanah berbadan hukum",
    ],

    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Kristen": [
      "Surat Permohonan",
      "Rekomendasi Pastor Paroki",
      "Fotocopy Buku Rekening",
      "Surat Keterangan Rekening Aktif dari Bank",
      "Fotocopy NPWP",
      "Email Pemohon",
      "SK Kepengurusan/Kepanitiaan",
    ],
  },

  "Bimas Katolik": {
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Katolik": [
      "Tanda Daftar Rumah Ibadah (Aktif/Pembangunan)",
      "Kondisi tidak layak/rusak/bencana",
      "Status tanah berbadan hukum",
    ],
  },

  "Bimas Hindu": {
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Hindu": [
      "Tanda Daftar Rumah Ibadah (Aktif/Pembangunan)",
      "Kondisi tidak layak/rusak/bencana",
      "Status tanah berbadan hukum",
    ],

    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Hindu": [
      "Surat Permohonan (proposal)",
      "Fotocopy izin operasional Rumah Ibadah",
      "Rencana anggaran biaya",
      "Fotocopy rekening atas nama Rumah Ibadah",
      "Surat Keterangan aktif rekening dari Bank",
    ],
  },

  "Bimas Buddha": {
    "Layanan Bantuan Rumah Ibadah / Lembaga Keagamaan Buddha": [
      "Surat Permohonan (proposal)",
      "Fotocopy izin operasional Rumah Ibadah",
      "Rencana anggaran biaya",
      "Fotocopy rekening Rumah Ibadah/Vihara",
      "Surat Keterangan rekening aktif dari Bank",
    ],
  },
};
