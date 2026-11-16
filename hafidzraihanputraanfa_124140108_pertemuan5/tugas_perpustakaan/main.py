from library_item import Book, Magazine
from library import Library
from member import Member


if __name__ == "__main__":
    perpus = Library("Perpustakaan ITERA")

    print("--- 1. Menambah Item ---")
    perpus.tambah_item(Book("B001", "Bumi Manusia", 1980, "Pramoedya Ananta Toer", 535))
    perpus.tambah_item(Book("B002", "Clean Code", 2008, "Robert C. Martin", 464))
    perpus.tambah_item(Magazine("M001", "Tempo", 2026, "November 2026", "PT Tempo Inti Media"))
    perpus.tambah_item(Magazine("M002", "National Geographic", 2025, "Oktober 2025", "NatGeo Indonesia"))
    perpus.tambah_item(Book("B001", "Atomic Habits", 2018, "James Clear", 320))

    perpus.tampilkan_katalog()

    print("\n--- 2. Mencari Item ---")
    print("Cari judul 'clean':")
    for item in perpus.cari_berdasarkan_judul("clean"):
        print(" ", item)
    print("Cari id 'M001':")
    print(" ", perpus.cari_berdasarkan_id("M001"))
    print("Cari id 'X999':", perpus.cari_berdasarkan_id("X999"))

    print("\n--- 3. Status Ketersediaan ---")
    hafidz = Member("Hafidz Raihan", "124140108")
    putra = Member("Putra Anfa", "124140108")

    hafidz.pinjam(perpus.cari_berdasarkan_id("B001"))
    putra.pinjam(perpus.cari_berdasarkan_id("B001"))
    putra.pinjam(perpus.cari_berdasarkan_id("X999"))
    hafidz.pinjam(perpus.cari_berdasarkan_id("M001"))

    perpus.tampilkan_tersedia()
    hafidz.tampilkan_pinjaman()

    print("\n--- 4. Pengembalian & Denda ---")
    hafidz.kembalikan(perpus.cari_berdasarkan_id("B001"), hari_terlambat=3)
    hafidz.kembalikan(perpus.cari_berdasarkan_id("M001"), hari_terlambat=3)
    hafidz.kembalikan(perpus.cari_berdasarkan_id("B002"))

    perpus.tampilkan_katalog()

    print("\n--- 5. Uji Proteksi Atribut ---")
    buku = perpus.cari_berdasarkan_id("B002")
    try:
        buku.is_dipinjam = True
    except AttributeError as err:
        print("Ubah is_dipinjam langsung GAGAL:", err)
    try:
        print(perpus.__koleksi)
    except AttributeError:
        print("Akses perpus.__koleksi langsung GAGAL karena terlindungi (AttributeError)!")