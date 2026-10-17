const tambah = (a, b) => a + b;
const kuadrat = (x) => x * x;
const sapa = () => "Halo dari arrow function!";
const buatSiswa = (nama, umur) => ({ nama, umur });
const hitungTotal = (harga, jumlah) => {
  const subtotal = harga * jumlah;
  const pajak = subtotal * 0.11;
  return subtotal + pajak;
};

const diskon = (harga, persen = 10) => harga - (harga * persen) / 100;
const jumlahkan = (...angka) => angka.reduce((total, n) => total + n, 0);
const perkenalan = ({ nama, umur }) => `Nama saya ${nama}, umur ${umur} tahun.`;
const pengali = (faktor) => (angka) => angka * faktor;
const gandakan = (daftar) => daftar.map((n) => n * 2);

const escapeHtml = (teks) =>
  String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const jalankan = () => {
  const a = Number(document.getElementById("angkaA").value);
  const b = Number(document.getElementById("angkaB").value);

  const daftar = [
    {
      jenis: "Dua parameter, return implisit",
      kode: "const tambah = (a, b) => a + b;",
      hasil: `tambah(${a}, ${b}) = ${tambah(a, b)}`,
    },
    {
      jenis: "Satu parameter tanpa kurung",
      kode: "const kuadrat = x => x * x;",
      hasil: `kuadrat(${a}) = ${kuadrat(a)}`,
    },
    {
      jenis: "Tanpa parameter",
      kode: 'const sapa = () => "Halo...";',
      hasil: `sapa() = ${sapa()}`,
    },
    {
      jenis: "Return objek",
      kode: "const buatSiswa = (nama, umur) => ({ nama, umur });",
      hasil: `buatSiswa("Budi", ${a}) = ${JSON.stringify(buatSiswa("Budi", a))}`,
    },
    {
      jenis: "Body block + return",
      kode: "const hitungTotal = (harga, jumlah) => { ... return subtotal + pajak; };",
      hasil: `hitungTotal(${a * 1000}, ${b}) = ${hitungTotal(a * 1000, b)}`,
    },
    {
      jenis: "Default parameter",
      kode: "const diskon = (harga, persen = 10) => ...;",
      hasil: `diskon(${a * 1000}) = ${diskon(a * 1000)} | diskon(${a * 1000}, 50) = ${diskon(a * 1000, 50)}`,
    },
    {
      jenis: "Rest parameter",
      kode: "const jumlahkan = (...angka) => angka.reduce(...);",
      hasil: `jumlahkan(${a}, ${b}, 10) = ${jumlahkan(a, b, 10)}`,
    },
    {
      jenis: "Destructuring parameter",
      kode: "const perkenalan = ({ nama, umur }) => `...`;",
      hasil: perkenalan({ nama: "Budi", umur: a }),
    },
    {
      jenis: "Currying",
      kode: "const pengali = faktor => angka => angka * faktor;",
      hasil: `pengali(${a})(${b}) = ${pengali(a)(b)}`,
    },
    {
      jenis: "Callback di map()",
      kode: "const gandakan = daftar => daftar.map(n => n * 2);",
      hasil: `gandakan([${a}, ${b}]) = [${gandakan([a, b])}]`,
    },
  ];

  document.getElementById("hasil").innerHTML = daftar
    .map(
      ({ jenis, kode, hasil }, i) =>
        `<tr><td>${i + 1}</td><td>${jenis}</td><td><code>${escapeHtml(kode)}</code></td><td>${escapeHtml(hasil)}</td></tr>`,
    )
    .join("");
};

document.getElementById("runBtn").addEventListener("click", jalankan);
jalankan();
