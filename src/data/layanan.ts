export interface LayananBidang {
  slug: string; // untuk URL
  title: string; // nama bidang
  description: string; // deskripsi singkat bidang
  layanan: string[]; // daftar layanan di bidang tsb
}

export const layananPerBidang: Record<string, string[]> = {
  "Bagian Tata Usaha": [
    "Permohonan Audiensi",
    "Penerbitan Surat Izin Magang",
    "Penerbitan Surat Izin Penelitian",
    "Permohonan Data dan Informasi Keagamaan",
    "Permohonan Rohaniwan",
    "Penerbitan Rekomendasi Kegiatan Keagamaan",
    "Pelayanan Do'a Keagamaan",
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan",
  ],
  "Bidang Bimbingan Masyarakat Islam": [
    "Penerbitan Izin Operasional Lembaga Amil Zakat Kabupaten",
    "Penerbitan Izin Operasional Lembaga Amil Zakat Nasional Perwakilan Provinsi",
    "Kalibrasi Arah Kiblat",
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan",
  ],
  "Bimas Kristen": [
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Kristen",
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan Kristen",
  ],
  "Bimas Katolik": [
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan Katolik",
  ],
  "Bimas Hindu": [
    "Layanan Surat Tanda Lapor / Tanda Daftar Rumah Ibadah / Lembaga Keagamaan Hindu",
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan Hindu",
  ],
  "Bimas Buddha": [
    "Layanan Bantuan Rumah Ibadah / Lembagan Keagamaan Buddha",
  ],
};

