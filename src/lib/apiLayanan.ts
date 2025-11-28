// src/lib/apiLayanan.ts
const BASE_URL = "http://192.168.1.29:8000/api";

export async function getNomorRegistrasi(bidang: string, layanan: string) {
  const url = `${BASE_URL}/layanan/generate-no-registrasi?bidang=${encodeURIComponent(bidang)}&layanan=${encodeURIComponent(layanan)}`;
  console.log("Fetching nomor registrasi from:", url);

  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
    });

    if (!res.ok) {
      console.error("Failed to fetch nomor registrasi:", res.status, res.statusText);
      throw new Error("Gagal mengambil nomor registrasi");
    }

    const data = await res.json();
    console.log("Nomor registrasi received:", data.no_registrasi);
    return data.no_registrasi;
  } catch (err) {
    console.error("Error getNomorRegistrasi:", err);
    return null;
  }
}



export async function submitFormLayanan(formData: FormData) {
  const url = `${BASE_URL}/layanan`;
  console.log("Submitting form to:", url);
  console.log("FormData entries:");
  formData.forEach((value, key) => console.log(key, value));

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
    console.log("Submit response:", data);
    return data;
  } catch (err) {
    console.error("Submit error:", err);
    return null;
  }
}

