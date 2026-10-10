const KunciKeranjang = "Keranjang ahmeng";
const harga_minimal = 500;
const BATAS_DISKON = 50000;
const PERSEN_DISKON = 10;

let keranjang = muatKeranjang();

const formBarang = document.getElementById("form-barang");
const inputNama = document.getElementById("input-nama");
const inputHarga = document.getElementById("input-harga");
const inputQty = document.getElementById("input-qty");
const inputBayar = document.getElementById("input-bayar");
const keranjangIsi = document.getElementById("keranjang-isi");
const kembalian = document.getElementById("kembalian");
const kembalianLabel = document.getElementById("kembalian-label");
const kembalianNilai = document.getElementById("kembalian-nilai");

function formatRupiah(angka) {
  return "Rp " + angka.toLocaleString("id-ID");
}

function amankan(teks) {
  return teks
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function muatKeranjang() {
  try {
    const data = JSON.parse(localStorage.getItem(KunciKeranjang));
    return Array.isArray(data) ? data : [];
  } catch (error) {
    return [];
  }
}

// [LOCALSTORAGE]
// localStorage hanya menyimpan teks, jadi array keranjang diubah dengan JSON.stringify().
// Dipanggil setiap barang ditambah atau dihapus. muatKeranjang() membacanya kembali dengan JSON.parse().
function simpanKeranjang() {
  localStorage.setItem(KunciKeranjang, JSON.stringify(keranjang));
}

function setError(nama, pesan) {
  document.getElementById("error-" + nama).textContent = pesan;
  document
    .getElementById("input-" + nama)
    .classList.toggle("tidak-valid", pesan !== "");
}

// VALIDASI FORM
function validasiForm() {
  const nama = inputNama.value.trim();
  const harga = Number(inputHarga.value);
  const qty = Number(inputQty.value);

  let errNama = "";
  let errHarga = "";
  let errQty = "";
  // Memeriksa apakah nama barang kurang dari 3 karakter
  if (nama.length < 3) {
    errNama = "Nama barang wajib diisi, minimal 3 karakter.";
  }
  // memeriksa apakah harga  barang merupakan bilangan bulat dan tidak dibawah baatas minimal
  if (isNaN(harga) || harga < harga_minimal || harga % 1 !== 0) {
    errHarga = "Harga wajib berupa angka bulat, minimal Rp 500.";
  }
  // memeriksa apakh jumlah barang minimal 1 dan merupakan bilangan bulat
  if (isNaN(qty) || qty < 1 || qty % 1 !== 0) {
    errQty = "Jumlah wajib berupa angka bulat, minimal 1.";
  }

  setError("nama", errNama);
  setError("harga", errHarga);
  setError("qty", errQty);

  return errNama === "" && errHarga === "" && errQty === "";
}

function resetForm() {
  formBarang.reset();
  setError("nama", "");
  setError("harga", "");
  setError("qty", "");
  inputNama.focus();
}

// [KALKULATOR]
// Subtotal tiap barang = harga x qty, lalu semuanya dijumlahkan menjadi total belanja.
// Diskon 10% hanya berlaku jika total >= BATAS_DISKON.
function hitungRingkasan() {
  let total = 0;
  for (let i = 0; i < keranjang.length; i++) {
    total += keranjang[i].harga * keranjang[i].qty;
  }
  let diskon = 0;
  if (total >= BATAS_DISKON) {
    diskon = Math.round((total * PERSEN_DISKON) / 100);
  }
  return { total: total, diskon: diskon, akhir: total - diskon };
}

function tampilkanKeranjang() {
  if (keranjang.length === 0) {
    keranjangIsi.innerHTML = `<tr class="baris-kosong"><td colspan="6">Keranjang masih kosong.</td></tr>`;
    return;
  }

  let baris = "";
  for (let i = 0; i < keranjang.length; i++) {
    const item = keranjang[i];
    baris += `
      <tr>
        <td>${i + 1}</td>
        <td>${amankan(item.nama)}</td>
        <td class="sel-angka">${formatRupiah(item.harga)}</td>
        <td class="sel-angka">${item.qty}</td>
        <td class="sel-angka">${formatRupiah(item.harga * item.qty)}</td>
        <td class="sel-aksi">
          <button class="tombol tombol-hapus" data-index="${i}">Hapus</button>
        </td>
      </tr>`;
  }
  keranjangIsi.innerHTML = baris;
}

function tampilkanRingkasan() {
  const r = hitungRingkasan();

  let jumlahBarang = 0;
  for (let i = 0; i < keranjang.length; i++) {
    jumlahBarang += keranjang[i].qty;
  }

  document.getElementById("ringkasan-jumlah").textContent = jumlahBarang;
  document.getElementById("ringkasan-total").textContent = formatRupiah(
    r.total,
  );
  document.getElementById("ringkasan-diskon").textContent =
    "- " + formatRupiah(r.diskon);
  document.getElementById("ringkasan-total-akhir").textContent = formatRupiah(
    r.akhir,
  );

  const petunjuk = document.getElementById("ringkasan-petunjuk");
  if (r.diskon > 0) {
    petunjuk.textContent = "Diskon " + PERSEN_DISKON + "% didapat.";
  } else if (r.total > 0) {
    petunjuk.textContent =
      "Belanja " +
      formatRupiah(BATAS_DISKON - r.total) +
      " lagi untuk diskon " +
      PERSEN_DISKON +
      "%.";
  } else {
    petunjuk.textContent = "";
  }
}

function tampilkanKembalian() {
  const akhir = hitungRingkasan().akhir;
  const bayar = Number(inputBayar.value);

  kembalian.className = "kotak-kembalian";
  kembalianNilai.textContent = "";

  if (keranjang.length === 0) {
    kembalianLabel.textContent = "Tambahkan barang terlebih dahulu.";
  } else if (inputBayar.value === "") {
    kembalianLabel.textContent = "Masukkan uang yang diterima.";
  } else if (bayar < akhir) {
    kembalian.classList.add("kembalian-kurang");
    kembalianLabel.textContent = "Uang belum mencukupi, kurang";
    kembalianNilai.textContent = formatRupiah(akhir - bayar);
  } else {
    kembalian.classList.add("kembalian-cukup");
    kembalianLabel.textContent = "Kembalian";
    kembalianNilai.textContent = formatRupiah(bayar - akhir);
  }
}

function tampilkanSemua() {
  tampilkanKeranjang();
  tampilkanRingkasan();
  tampilkanKembalian();
}

function tambahBarang(event) {
  event.preventDefault();
  if (!validasiForm()) {
    return;
  }
  keranjang.push({
    nama: inputNama.value.trim(),
    harga: Number(inputHarga.value),
    qty: Number(inputQty.value),
  });
  simpanKeranjang();
  resetForm();
  tampilkanSemua();
}

function hapusBarang(index) {
  keranjang.splice(index, 1);
  simpanKeranjang();
  tampilkanSemua();
}

// fungsi untuk mereset keranjagn belanjaan ketika tombol transaksi digunakan
function transaksiBaru() {
  if (
    keranjang.length > 0 &&
    !confirm("Kosongkan keranjang dan mulai transaksi baru?")
  ) {
    return;
  }
  keranjang = [];
  localStorage.removeItem(KunciKeranjang);
  inputBayar.value = "";
  resetForm();
  tampilkanSemua();
}

// event hendler
formBarang.addEventListener("submit", tambahBarang);
document
  .getElementById("tombol-transaksi-baru")
  .addEventListener("click", transaksiBaru);
inputBayar.addEventListener("input", tampilkanKembalian);

keranjangIsi.addEventListener("click", function (event) {
  const index = event.target.getAttribute("data-index");
  if (index !== null) {
    hapusBarang(Number(index));
  }
});

tampilkanSemua();
