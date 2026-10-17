const rupiah = (angka) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(angka);

class Product {
  static jumlahProduk = 0;

  constructor(nama, harga) {
    this.nama = nama;
    this.harga = harga;
    Product.jumlahProduk++;
  }

  get harga() {
    return this._harga;
  }

  set harga(nilai) {
    if (!(nilai >= 0)) throw new Error("Harga harus berupa angka 0 atau lebih");
    this._harga = nilai;
  }

  getHargaAkhir() {
    return this.harga;
  }

  getInfo() {
    return `${this.nama} - ${rupiah(this.getHargaAkhir())}`;
  }
}

class DigitalProduct extends Product {
  constructor(nama, harga, ukuranMB) {
    super(nama, harga);
    this.ukuranMB = ukuranMB;
  }

  getInfo() {
    return `${super.getInfo()} | Digital, ${this.ukuranMB} MB, tanpa ongkir`;
  }
}

class PhysicalProduct extends Product {
  constructor(nama, harga, beratKg, ongkirPerKg = 10000) {
    super(nama, harga);
    this.beratKg = beratKg;
    this.ongkirPerKg = ongkirPerKg;
  }

  getOngkir() {
    return this.beratKg * this.ongkirPerKg;
  }

  getHargaAkhir() {
    return this.harga + this.getOngkir();
  }

  getInfo() {
    return `${super.getInfo()} | Fisik, ${this.beratKg} kg (ongkir ${rupiah(this.getOngkir())})`;
  }
}

const escapeHtml = (teks) =>
  String(teks)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
const $ = (id) => document.getElementById(id);

const produk = [
  new DigitalProduct("E-book JavaScript Modern", 75000, 12),
  new PhysicalProduct("Mouse Gaming", 150000, 0.2),
  new PhysicalProduct("Keyboard Mekanik", 850000, 1.1),
];

const render = () => {
  $("daftar").innerHTML = produk
    .map(
      (p) => `<tr>
      <td>${p.constructor.name}</td>
      <td>${escapeHtml(p.getInfo())}</td>
      <td>${rupiah(p.getHargaAkhir())}</td>
      <td>Product: ${p instanceof Product}<br>Digital: ${p instanceof DigitalProduct}<br>Fisik: ${p instanceof PhysicalProduct}</td>
    </tr>`,
    )
    .join("");

  const total = produk.reduce((jumlah, p) => jumlah + p.getHargaAkhir(), 0);
  $("total").textContent =
    `Jumlah produk dibuat: ${Product.jumlahProduk} | Total harga akhir: ${rupiah(total)}`;
};

$("jenis").addEventListener("change", () => {
  $("labelEkstra").textContent =
    $("jenis").value === "digital" ? "Ukuran file (MB)" : "Berat (kg)";
});

$("tambahBtn").addEventListener("click", () => {
  try {
    const nama = $("nama").value.trim();
    const harga = Number($("harga").value);
    const ekstra = Number($("ekstra").value);
    if (!nama) throw new Error("Nama produk wajib diisi");
    if (!(ekstra > 0))
      throw new Error("Isi ukuran atau berat dengan angka lebih dari 0");

    const baru =
      $("jenis").value === "digital"
        ? new DigitalProduct(nama, harga, ekstra)
        : new PhysicalProduct(nama, harga, ekstra);

    produk.push(baru);
    $("pesan").textContent = "";
    $("nama").value = $("harga").value = $("ekstra").value = "";
    render();
  } catch (error) {
    $("pesan").textContent = error.message;
  }
});

render();
