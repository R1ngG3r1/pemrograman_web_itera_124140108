class Karyawan:
    UMR_MINIMAL = 3_200_000  

    def __init__(self, nama: str, jabatan: str, gaji_pokok: float):
        self.nama = nama         
        self.jabatan = jabatan   
        self.__gaji_pokok = self.UMR_MINIMAL
        self.gaji = gaji_pokok   

    @property
    def gaji(self) -> float:
        return self.__gaji_pokok

    @gaji.setter
    def gaji(self, nilai_baru: float):
        if nilai_baru < self.UMR_MINIMAL:
            print(f"Gagal: gaji pokok tidak boleh di bawah UMR (Rp {self.UMR_MINIMAL:,})!")
            return
        self.__gaji_pokok = nilai_baru

    def hitung_gaji_bersih(self, pajak_persen: float):
        if not 0 <= pajak_persen <= 100:
            return "pajak tidak valid"
        potongan = self.__gaji_pokok * pajak_persen / 100
        return self.__gaji_pokok - potongan

if __name__ == "__main__":
    budi = Karyawan("Budi", "Staf IT", 5_000_000)
    print("Gaji awal       :", budi.gaji)
    print("Gaji bersih 5%  :", budi.hitung_gaji_bersih(5))
    print("Pajak 150%      :", budi.hitung_gaji_bersih(150))

    budi.gaji = 6_000_000
    print("Gaji sekarang   :", budi.gaji)
    budi.gaji = 2_000_000
    print("Gaji tetap      :", budi.gaji)
    sinta = Karyawan("Sinta", "Magang", 1_500_000)
    print("Gaji Sinta      :", sinta.gaji)