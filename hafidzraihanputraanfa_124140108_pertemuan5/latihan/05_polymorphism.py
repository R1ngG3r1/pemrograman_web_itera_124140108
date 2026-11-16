class NotifikasiEmail:
    def __init__(self, alamat_email: str):
        self.penerima = alamat_email

    def kirim(self, pesan: str, penerima: str):
        print(f"[EMAIL] Ke: {penerima} | Subjek: PENGUMUMAN | Isi: {pesan}")


class NotifikasiSMS:
    def __init__(self, nomor_hp: str):
        self.penerima = nomor_hp

    def kirim(self, pesan: str, penerima: str):
        print(f"[SMS] Ke: {penerima} | Isi: {pesan}")


class NotifikasiWhatsApp:
    def __init__(self, nomor_hp: str):
        self.penerima = nomor_hp

    def kirim(self, pesan: str, penerima: str):
        print(f"[WA] Ke: {penerima} | Pesan: {pesan}")


def broadcast_pengumuman(daftar_channel: list, pesan: str):
    print(f"\n=== BROADCAST: {pesan} ===")
    for channel in daftar_channel:
        channel.kirim(pesan, channel.penerima)


# --- PROGRAM UTAMA (TESTING) ---
if __name__ == "__main__":
    email = NotifikasiEmail("budi@itera.ac.id")
    sms = NotifikasiSMS("081234567890")
    wa = NotifikasiWhatsApp("089876543210")

    semua_channel = [email, sms, wa]
    broadcast_pengumuman(semua_channel, "DARURAT: Kampus ditutup hari ini karena banjir!")