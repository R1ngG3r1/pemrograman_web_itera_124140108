const statistik = (...angka) => {
  if (angka.length === 0) return null;

  const jumlah = angka.reduce((total, n) => total + n, 0);
  return {
    jumlahData: angka.length,
    jumlah,
    min: Math.min(...angka), 
    max: Math.max(...angka),
    average: jumlah / angka.length,
  };
};


const statistikBerlabel = (label, ...angka) => ({
  label,
  ...statistik(...angka),
});

const ambilAngka = (teks) =>
  teks
    .split(",")
    .map((item) => item.trim())
    .filter((item) => item !== "")
    .map(Number)
    .filter((n) => !Number.isNaN(n));

const hitung = () => {
  const angka = ambilAngka(document.getElementById("inputAngka").value);
  const pesan = document.getElementById("pesan");
  const hasilEl = document.getElementById("hasil");

  if (angka.length === 0) {
    pesan.textContent = "Masukkan minimal satu angka yang valid.";
    hasilEl.innerHTML = "";
    return;
  }
  pesan.textContent = "";

  const { label, jumlahData, jumlah, min, max, average } = statistikBerlabel(
    "Data kamu",
    ...angka,
  );

  hasilEl.innerHTML = `
    <div>Pemanggilan: <code>statistik(${angka.join(", ")})</code></div>
    <div>${label}: <strong>${jumlahData}</strong> angka, jumlah <strong>${jumlah}</strong></div>
    <div>Min: <strong>${min}</strong></div>
    <div>Max: <strong>${max}</strong></div>
    <div>Average: <strong>${average.toFixed(2)}</strong></div>`;
};

document.getElementById("hitungBtn").addEventListener("click", hitung);
hitung();
