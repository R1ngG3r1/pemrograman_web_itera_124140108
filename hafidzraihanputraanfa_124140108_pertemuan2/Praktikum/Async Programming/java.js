const tunggu = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const retryDenganBackoff = async (
  fn,
  { retries = 3, delay = 500, factor = 2, onRetry } = {},
) => {
  for (let percobaan = 0; percobaan <= retries; percobaan++) {
    try {
      return await fn(percobaan + 1);
    } catch (error) {
      if (percobaan === retries) throw error; 
      const jeda = delay * factor ** percobaan;
      onRetry?.({ percobaan: percobaan + 1, jeda, error });
      await tunggu(jeda);
    }
  }
};

const buatApiTidakStabil = (gagalSebanyak, catat) => async (nomor) => {
  catat(`Percobaan ke-${nomor}: memanggil server...`);
  await tunggu(150);
  if (nomor <= gagalSebanyak) throw new Error("Server sibuk");
  return { pesan: "Data berhasil diambil" };
};

const $ = (id) => document.getElementById(id);

const ambilInput = () => ({
  gagal: Number($("gagal").value),
  retries: Number($("retries").value),
  delay: Number($("delay").value),
});

const tampilkanJadwal = () => {
  const { retries, delay } = ambilInput();
  const jeda = Array.from({ length: retries }, (_, i) => delay * 2 ** i);
  $("jadwal").textContent = jeda.length
    ? `Jeda antar percobaan: ${jeda.join(" ms, ")} ms`
    : "Tanpa retry: hanya satu percobaan.";
};

const jalankan = async () => {
  const { gagal, retries, delay } = ambilInput();
  const mulai = performance.now();
  const catat = (pesan) => {
    $("log").textContent +=
      `[+${Math.round(performance.now() - mulai)} ms] ${pesan}\n`;
  };

  $("runBtn").disabled = true;
  $("log").textContent = "";

  try {
    const hasil = await retryDenganBackoff(buatApiTidakStabil(gagal, catat), {
      retries,
      delay,
      onRetry: ({ jeda, error }) =>
        catat(`Gagal (${error.message}). Coba lagi dalam ${jeda} ms`),
    });
    catat(`Berhasil: ${hasil.pesan}`);
  } catch (error) {
    catat(`Menyerah setelah ${retries + 1} percobaan: ${error.message}`);
  } finally {
    $("runBtn").disabled = false;
  }
};

["retries", "delay"].forEach((id) =>
  $(id).addEventListener("input", tampilkanJadwal),
);
$("runBtn").addEventListener("click", jalankan);
tampilkanJadwal();
