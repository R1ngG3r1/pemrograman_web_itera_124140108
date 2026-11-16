from library_item import LibraryItem


# class Member: anggota perpustakaan, daftar pinjaman bersifat private
class Member:
    MAKS_PINJAM = 3

    # constructor: simpan nama dan nim (public), daftar pinjam (private)
    def __init__(self, nama: str, nim: str):
        self.nama = nama
        self.nim = nim
        self.__daftar_pinjam = []

    # property: jumlah item yang sedang dipinjam
    @property
    def jumlah_pinjaman(self) -> int:
        return len(self.__daftar_pinjam)

    # Fungsi logika pinjam item
    def pinjam(self, item: LibraryItem) -> bool:
        if item is None:
            print(f"[{self.nama}] Gagal: item tidak ditemukan!")
            return False
        if self.jumlah_pinjaman >= self.MAKS_PINJAM:
            print(f"[{self.nama}] Gagal: batas peminjaman {self.MAKS_PINJAM} item tercapai!")
            return False
        if not item.pinjam():
            print(f"[{self.nama}] Gagal: '{item.judul}' sedang dipinjam!")
            return False
        self.__daftar_pinjam.append(item)
        print(f"[{self.nama}] Berhasil meminjam: {item.judul}")
        return True

    # Fungsi mengembalikan item dan menghitung denda
    def kembalikan(self, item: LibraryItem, hari_terlambat: int = 0) -> bool:
        if item not in self.__daftar_pinjam:
            print(f"[{self.nama}] Gagal: item tersebut tidak sedang dipinjam olehmu!")
            return False
        item.kembalikan()
        self.__daftar_pinjam.remove(item)
        denda = item.hitung_denda(hari_terlambat)
        print(f"[{self.nama}] Berhasil mengembalikan: {item.judul} | Denda: Rp {denda:,.0f}")
        return True

    # Fungsi menampilkan daftar item yang sedang dipinjma
    def tampilkan_pinjaman(self):
        print(f"\n=== PINJAMAN {self.nama.upper()} ({self.jumlah_pinjaman}/{self.MAKS_PINJAM}) ===")
        if not self.__daftar_pinjam:
            print("Tidak ada item yang sedang dipinjam.")
            return
        for item in self.__daftar_pinjam:
            print(f" - {item.judul}")

    # Fungsi menampilkan data anggota perpustakaan 
    def __str__(self) -> str:
        return f"Member: {self.nama} (NIM: {self.nim}) | Pinjaman: {self.jumlah_pinjaman}"