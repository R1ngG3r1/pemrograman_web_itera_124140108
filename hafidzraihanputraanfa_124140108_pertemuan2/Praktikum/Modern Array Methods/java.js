const mahasiswa = [
  { nama: "Andi", kelas: "RA", nilai: 85, umur: 19 },
  { nama: "Bunga", kelas: "RA", nilai: 90, umur: 20 },
  { nama: "Citra", kelas: "RA", nilai: 78, umur: 19 },
  { nama: "Dimas", kelas: "RA", nilai: 66, umur: 21 },
  { nama: "Eka", kelas: "RB", nilai: 92, umur: 20 },
  { nama: "Fajar", kelas: "RB", nilai: 74, umur: 22 },
  { nama: "Gita", kelas: "RB", nilai: 88, umur: 19 },
  { nama: "Hana", kelas: "RB", nilai: 81, umur: 20 },
];

const hitungRataRata = (data, key) => {
  if (data.length === 0) return 0;
  const total = data.reduce((jumlah, item) => jumlah + item[key], 0);
  return total / data.length;
};

const rataRataPerGrup = (data, grupKey, nilaiKey) => {
  const grup = data.reduce((hasil, item) => {
    const nama = item[grupKey];
    return { ...hasil, [nama]: [...(hasil[nama] ?? []), item] };
  }, {});

  return Object.entries(grup).map(([nama, anggota]) => ({
    nama,
    jumlah: anggota.length,
    rataRata: hitungRataRata(anggota, nilaiKey),
  }));
};

const $ = (id) => document.getElementById(id);

const render = () => {
  const field = $("field").value;
  const kelas = $("kelas").value;
  const terpilih =
    kelas === "all"
      ? mahasiswa
      : mahasiswa.filter((item) => item.kelas === kelas);

  $("tabel").innerHTML = terpilih
    .map(
      ({ nama, kelas, nilai, umur }) =>
        `<tr><td>${nama}</td><td>${kelas}</td><td>${nilai}</td><td>${umur}</td></tr>`,
    )
    .join("");

  $("rataRata").innerHTML =
    `Rata-rata <strong>${field}</strong> (${kelas === "all" ? "semua kelas" : `kelas ${kelas}`}, ${terpilih.length} data): <strong>${hitungRataRata(terpilih, field).toFixed(2)}</strong>`;

  $("grup").innerHTML = rataRataPerGrup(mahasiswa, "kelas", field)
    .map(
      ({ nama, jumlah, rataRata }) =>
        `<tr><td>${nama}</td><td>${jumlah}</td><td>${rataRata.toFixed(2)}</td></tr>`,
    )
    .join("");
};

$("field").addEventListener("change", render);
$("kelas").addEventListener("change", render);
render();
