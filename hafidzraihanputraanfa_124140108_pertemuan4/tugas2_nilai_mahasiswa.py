def hitung_nilai_akhir(uts: float, uas: float, tugas: float) -> float:
    """
    Menghitung nilai akhir mahasiswa.
    Parameter: nilai uts, uas, dan tugas bertipe float
    Mengembalikan nilai: (30% * uts) + (40% * uas) + (30% * tugas)
    """
    return (0.3 * uts) + (0.4 * uas) + (0.3 * tugas)


def tentukan_grade(nilai: float) -> str:
    """
    Menentukan grade berdasarkan nilai akhir.
    Parameter: nilai akhir bertipe float
    Mengembalikan nilai: grade A, B, C, D, atau E bertipe string
    """
    if nilai >= 80:
        return "A"
    elif nilai >= 70:
        return "B"
    elif nilai >= 60:
        return "C"
    elif nilai >= 50:
        return "D"
    else:
        return "E"


data_mahasiswa = [
    {"nama": "Hafidz", "nim": "124140001",
     "nilai_uts": 92, "nilai_uas": 90, "nilai_tugas": 88},
    {"nama": "Raihan", "nim": "124140002",
     "nilai_uts": 75, "nilai_uas": 70, "nilai_tugas": 80},
    {"nama": "Putra", "nim": "124140003",
     "nilai_uts": 89, "nilai_uas": 75, "nilai_tugas": 90},
    {"nama": "Anfa", "nim": "124140004",
     "nilai_uts": 76, "nilai_uas": 78, "nilai_tugas": 80},
    {"nama": "Rheina", "nim": "124140005",
     "nilai_uts": 90, "nilai_uas": 94, "nilai_tugas": 100},
]

for mhs in data_mahasiswa:
    mhs["nilai_akhir"] = hitung_nilai_akhir(
        mhs["nilai_uts"], mhs["nilai_uas"], mhs["nilai_tugas"])
    mhs["grade"] = tentukan_grade(mhs["nilai_akhir"])

print(f"{'Nama':<10}{'NIM':<12}{'Nilai Akhir':>12}{'Grade':>8}")
print("-" * 42)
for mhs in data_mahasiswa:
    print(f"{mhs['nama']:<10}{mhs['nim']:<12}"
          f"{mhs['nilai_akhir']:>12.2f}{mhs['grade']:>8}")

tertinggi = max(data_mahasiswa, key=lambda m: m["nilai_akhir"])
terendah = min(data_mahasiswa, key=lambda m: m["nilai_akhir"])

print(f"\nNilai tertinggi: {tertinggi['nama']} "
      f"({tertinggi['nim']}) = {tertinggi['nilai_akhir']:.2f}")
print(f"Nilai terendah : {terendah['nama']} "
      f"({terendah['nim']}) = {terendah['nilai_akhir']:.2f}")
