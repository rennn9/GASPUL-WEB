import CekStatus from "@/components/sections/CekStatus";
import Head from "next/head";

export default function CekStatusPage() {
  return (
    <>
      <Head>
        <title>Cek Status Pengajuan - GasPul Kemenag Sulawesi Barat</title>
        <meta
          name="description"
          content="Cek status pengajuan layanan publik Anda dengan memasukkan nomor registrasi. Dapatkan informasi terkini tentang progress pengajuan Anda."
        />
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 via-white to-slate-200">
        <CekStatus />
      </div>
    </>
  );
}
