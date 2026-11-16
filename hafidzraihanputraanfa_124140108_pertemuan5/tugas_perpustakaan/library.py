from library_item import LibraryItem


# class Library: kelola koleksi item, koleksi disimpan private di __koleksi
class Library:
    # constructor: simpan nama perpustakaan dan koleksi kosong (private)
    def __init__(self, nama: str):
        self.nama = nama
        self.__koleksi = []

    # property: jumlah seluruh item di koleksi
    @property
    def jumlah_item(self) -> int:
        return len(self.__koleksi)

    # fungsi tambah item ke koleksi
    def tambah_item(self, item: LibraryItem) -> bool:
        if self.cari_berdasarkan_id(item.item_id) is not None:
            print(f"Gagal: id '{item.item_id}' sudah terdaftar!")
            return False
        self.__koleksi.append(item)
        print(f"Berhasil menambahkan: {item.judul} ({item.item_id})")
        return True

    # Fungsi mencari item berdasrkan id
    def cari_berdasarkan_id(self, item_id: str):
        for item in self.__koleksi:
            if item.item_id == item_id:
                return item
        return None

    # Fungis mencari item berdasrkan kata kunci yang dimasukkan 
    def cari_berdasarkan_judul(self, kata_kunci: str) -> list:
        kata_kunci = kata_kunci.lower()
        return [item for item in self.__koleksi if kata_kunci in item.judul.lower()]

    # Fungsi menampilkan seluruh item yang ada pada koleksi
    def tampilkan_katalog(self):
        print(f"\n=== KATALOG {self.nama.upper()} ({self.jumlah_item} item) ===")
        for item in self.__koleksi:
            print(item)

    # Fungsi menampilkan semua item yang tidak dipinjam
    def tampilkan_tersedia(self):
        print(f"\n=== ITEM TERSEDIA DI {self.nama.upper()} ===")
        tersedia = [item for item in self.__koleksi if not item.is_dipinjam]
        if not tersedia:
            print("Tidak ada item yang tersedia.")
            return
        for item in tersedia:
            print(item)