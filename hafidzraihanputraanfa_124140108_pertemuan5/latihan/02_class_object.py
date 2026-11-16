class Buku:
   

    def __init__(self, judul, penulis, harga_asli, jumlah_halaman):
        self.judul = judul
        self.penulis = penulis
        self.harga_asli = harga_asli
        self.jumlah_halaman = jumlah_halaman

    def hitung_harga_diskon(self, persen):
        if not 0 <= persen <= 100:
            return "diskon tidak valid"
        potongan = self.harga_asli * persen / 100
        return self.harga_asli - potongan

    def __str__(self):
        return (
            f"Judul   : {self.judul}\n"
            f"Penulis : {self.penulis}\n"
            f"Harga   : Rp {self.harga_asli:,.0f}\n"
            f"Halaman : {self.jumlah_halaman}"
        )

    def __len__(self):
        """Dipanggil otomatis oleh len(buku)."""
        return self.jumlah_halaman


# --- PROGRAM UTAMA ---
if __name__ == "__main__":
    buku = Buku("Laskar Pelangi", "Andrea Hirata", 95000, 529)

    print("--- Kartu Buku ---")
    print(buku)
    print("Diskon 20%  :", buku.hitung_harga_diskon(20))
    print("Jumlah halaman:", len(buku))