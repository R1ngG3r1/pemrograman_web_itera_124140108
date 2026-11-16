from abc import ABC, abstractmethod

class FileStorage(ABC):
    @abstractmethod
    def upload_file(self, nama_file: str, data_bytes: bytes):
        pass

    @abstractmethod
    def download_file(self, nama_file: str):
        pass


class LocalDiskStorage(FileStorage):
    def __init__(self, folder: str):
        self.folder = folder
        self.berkas = {}

    def upload_file(self, nama_file: str, data_bytes: bytes):
        self.berkas[nama_file] = data_bytes
        print(f"[LOCAL] '{nama_file}' ({len(data_bytes)} byte) disimpan di folder {self.folder}")
        return True

    def download_file(self, nama_file: str):
        if nama_file not in self.berkas:
            print(f"[LOCAL] '{nama_file}' tidak ditemukan di folder {self.folder}")
            return None
        print(f"[LOCAL] '{nama_file}' diambil dari folder {self.folder}")
        return self.berkas[nama_file]


class CloudStorage(FileStorage):
    def __init__(self, nama_bucket: str):
        self.nama_bucket = nama_bucket
        self.berkas = {}

    def upload_file(self, nama_file: str, data_bytes: bytes):
        self.berkas[nama_file] = data_bytes
        print(f"[CLOUD] '{nama_file}' ({len(data_bytes)} byte) diunggah ke bucket {self.nama_bucket}")
        return True

    def download_file(self, nama_file: str):
        if nama_file not in self.berkas:
            print(f"[CLOUD] '{nama_file}' tidak ada di bucket {self.nama_bucket}")
            return None
        print(f"[CLOUD] '{nama_file}' diunduh dari bucket {self.nama_bucket}")
        return self.berkas[nama_file]


if __name__ == "__main__":
    lokal = LocalDiskStorage("C:/data_lokal")
    cloud = CloudStorage("bucket-itera")

    for storage in [lokal, cloud]:
        storage.upload_file("catatan.txt", b"isi catatan praktikum")
        hasil = storage.download_file("catatan.txt")
        print("Isi file:", hasil)
        storage.download_file("tidak_ada.txt")
        print()

    try:
        FileStorage()
    except TypeError as err:
        print("FileStorage tidak bisa dibuat:", err)