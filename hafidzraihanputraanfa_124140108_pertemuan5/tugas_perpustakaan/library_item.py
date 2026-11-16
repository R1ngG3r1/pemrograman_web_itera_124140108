from abc import ABC, abstractmethod


# abstract class LibraryItem: Blueprint untuk class lainnya
class LibraryItem(ABC):
    # constructor: simpan id, judul, tahun (protected) dan status dipinjam (private)
    def __init__(self, item_id: str, judul: str, tahun_terbit: int):
        self._item_id = item_id
        self._judul = judul
        self._tahun_terbit = tahun_terbit
        self.__dipinjam = False

    # property: baca id item 
    @property
    def item_id(self) -> str:
        return self._item_id

    # property: baca judul item 
    @property
    def judul(self) -> str:
        return self._judul

    # property: baca tahun terbit 
    @property
    def tahun_terbit(self) -> int:
        return self._tahun_terbit

    # property: baca status dipinjam
    @property
    def is_dipinjam(self) -> bool:
        return self.__dipinjam

    # Fungsi seleksi status pinjam
    def pinjam(self) -> bool:
        if self.__dipinjam:
            return False
        self.__dipinjam = True
        return True

    # Fungsi item dikembalikan
    def kembalikan(self) -> bool:
        if not self.__dipinjam:
            return False
        self.__dipinjam = False
        return True

    # abstract method: detail item 
    @abstractmethod
    def get_detail(self) -> str:
        pass

    # abstract method: hitung denda
    @abstractmethod
    def hitung_denda(self, hari_terlambat: int) -> float:
        pass

    # Fungsi menampilkan keterangn item 
    def __str__(self) -> str:
        status = "Dipinjam" if self.__dipinjam else "Tersedia"
        return f"[{self.item_id}] {self.get_detail()} | Status: {status}"

# subclass Book
class Book(LibraryItem):
    DENDA_PER_HARI = 1000

    # constructor subclass book yang mengimplemntasikan constuktor super class
    def __init__(self, item_id: str, judul: str, tahun_terbit: int, penulis: str, jumlah_halaman: int):
        super().__init__(item_id, judul, tahun_terbit)
        self.penulis = penulis
        self.jumlah_halaman = jumlah_halaman

    # Fungsi detail pada subclass Book (implementasi abstract method superclass)
    def get_detail(self) -> str:
        return f"Buku '{self.judul}' oleh {self.penulis} ({self.tahun_terbit}), {self.jumlah_halaman} hlm"

    # Fungsi hitung denda subclass Book (implementasi abstract method superclass)
    def hitung_denda(self, hari_terlambat: int) -> float:
        if hari_terlambat <= 0:
            return 0.0
        return hari_terlambat * self.DENDA_PER_HARI


# subclass Magazine
class Magazine(LibraryItem):
    DENDA_PER_HARI = 500

    # constructor subclass magazine yang mengimplemntasikan constuktor super class
    def __init__(self, item_id: str, judul: str, tahun_terbit: int, edisi: str, penerbit: str):
        super().__init__(item_id, judul, tahun_terbit)
        self.edisi = edisi
        self.penerbit = penerbit

     # Fungsi detail subclass magazine (implementasi abstract method superclass)
    def get_detail(self) -> str:
        return f"Majalah '{self.judul}' edisi {self.edisi} - {self.penerbit} ({self.tahun_terbit})"

     # Fungsi hitung denda subclass magazine (implementasi abstract method superclass)
    def hitung_denda(self, hari_terlambat: int) -> float:
        if hari_terlambat <= 0:
            return 0.0
        return hari_terlambat * self.DENDA_PER_HARI