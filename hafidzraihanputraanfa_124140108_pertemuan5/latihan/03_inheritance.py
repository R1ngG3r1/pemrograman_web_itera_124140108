class Kendaraan:
    def __init__(self, merek: str, plat: str, tahun: int):
        self.merek = merek
        self.plat = plat
        self.tahun = tahun

    def deskripsi(self) -> str:
        return f"merek: {self.merek} | plat: {self.plat} | tahun: {self.tahun}"


class Truk(Kendaraan):
    def __init__(self, merek: str, plat: str, tahun: int, kapasitas_maksimal_ton: float):
        super().__init__(merek, plat, tahun)
        self.kapasitas_maksimal_ton = kapasitas_maksimal_ton
        self.muatan_saat_ini = 0  

    def muat_barang(self, berat_ton: float) -> bool:
        if berat_ton <= 0:
            print("Gagal: berat barang harus lebih dari 0 ton!")
            return False
        elif self.muatan_saat_ini + berat_ton > self.kapasitas_maksimal_ton:
            print("Gagal: muatan melebihi kapasitas!")
            return False
        else:
            self.muatan_saat_ini += berat_ton
            print(f"Berhasil memuat {berat_ton} ton. Total muatan: {self.muatan_saat_ini} ton")
            return True

    def deskripsi(self) -> str:
        deskripsi_dasar = super().deskripsi()
        return f"{deskripsi_dasar} | muatan: {self.muatan_saat_ini} / {self.kapasitas_maksimal_ton} ton"

if __name__ == "__main__":
    truk1 = Truk("Hino", "BE 1234 AB", 2022, 10)
    truk2 = Truk("Dutro", "BE 5678 RCD", 2020, 5)

    print("=== TRUK 1 (muatan cukup) ===")
    print(truk1.deskripsi())
    truk1.muat_barang(6)
    truk1.muat_barang(3)
    print(truk1.deskripsi())

    print("\n=== TRUK 2 (muatan tidak cukup) ===")
    print(truk2.deskripsi())
    truk2.muat_barang(4)
    truk2.muat_barang(3)   # 4 + 3 > 5, harus ditolak
    print(truk2.deskripsi())