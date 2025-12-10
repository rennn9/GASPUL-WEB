// src/lib/apiLayanan.ts

const BASE_URL = "http://192.168.1.5:8000/api";

// const BASE_URL = "https://antrian.gaspul.com/api";

/* ============================================================
   1. GENERATE NOMOR REGISTRASI
   ============================================================ */
export async function getNomorRegistrasi(bidang: string, layanan: string) {
  const url = `${BASE_URL}/layanan/generate-no-registrasi?bidang=${encodeURIComponent(
    bidang
  )}&layanan=${encodeURIComponent(layanan)}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (!res.ok) throw new Error("Gagal mengambil nomor registrasi");

    const data = await res.json();
    return data.no_registrasi ?? null;
  } catch (err) {
    console.error("Error getNomorRegistrasi:", err);
    return null;
  }
}

/* ============================================================
   2. SUBMIT FORM LAYANAN
   ============================================================ */
export async function submitFormLayanan(formData: FormData) {
  const url = `${BASE_URL}/layanan`;

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      console.error("Submit failed:", res.status, res.statusText);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Submit error:", err);
    return null;
  }
}

/* ============================================================
   3. CEK STATUS PENGAJUAN
   ============================================================ */
export async function cekStatusPengajuan(noReg: string) {
  const url = `${BASE_URL}/cek-status?no_registrasi=${encodeURIComponent(
    noReg.trim()
  )}`;

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      cache: "no-store",
    });

    if (res.status === 404) {
      return {
        success: false,
        message: "Nomor registrasi tidak ditemukan",
      };
    }

    if (!res.ok) {
      return {
        success: false,
        message: "Gagal mengambil status pengajuan",
      };
    }

    const data = await res.json();
    return {
      success: true,
      data: data.data,
    };
  } catch (err) {
    console.error("Error cekStatusPengajuan:", err);
    return {
      success: false,
      message: "Terjadi kesalahan jaringan",
    };
  }
}


// // src/lib/apiLayanan.ts
// const BASE_URL = "http://192.168.1.5:8000/api";

// export async function getNomorRegistrasi(bidang: string, layanan: string) {
//   const url = `${BASE_URL}/layanan/generate-no-registrasi?bidang=${encodeURIComponent(bidang)}&layanan=${encodeURIComponent(layanan)}`;
//   console.log("Fetching nomor registrasi from:", url);

//   try {
//     const res = await fetch(url, {
//       method: "GET",
//       headers: { Accept: "application/json" },
//     });

//     if (!res.ok) {
//       console.error("Failed to fetch nomor registrasi:", res.status, res.statusText);
//       throw new Error("Gagal mengambil nomor registrasi");
//     }

//     const data = await res.json();
//     console.log("Nomor registrasi received:", data.no_registrasi);
//     return data.no_registrasi;
//   } catch (err) {
//     console.error("Error getNomorRegistrasi:", err);
//     return null;
//   }
// }



// export async function submitFormLayanan(formData: FormData) {
//   const url = `${BASE_URL}/layanan`;
//   console.log("Submitting form to:", url);
//   console.log("FormData entries:");
//   formData.forEach((value, key) => console.log(key, value));

//   try {
//     const res = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!res.ok) {
//       console.error("Submit failed:", res.status, res.statusText);
//       return null;
//     }

//     const data = await res.json();
//     console.log("Submit response:", data);
//     return data;
//   } catch (err) {
//     console.error("Submit error:", err);
//     return null;
//   }
// }

