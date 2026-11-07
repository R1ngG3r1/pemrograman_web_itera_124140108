def hitung_bmi(berat: float, tinggi: float) -> float:
    """
    Menghitung nilai BMI.
    Parameter: berat (kg) dan tinggi (m) bertipe float
    Mengembalikan nilai: berat / (tinggi * tinggi) bertipe float
    """
    return berat / (tinggi * tinggi)


def tentukan_kategori(bmi: float) -> str:
    """
    Menentukan kategori BMI dengan if-elif-else.
    Parameter: bmi bertipe float
    Mengembalikan nilai: kategori berat badan bertipe string
    """
    if bmi < 18.5:
        kategori = "Berat badan kurang"
    elif bmi < 25:
        kategori = "Berat badan normal"
    elif bmi < 30:
        kategori = "Berat badan berlebih"
    else:
        kategori = "Obesitas"
    return kategori


berat_badan = float(input("Masukkan berat badan (kg): "))
tinggi_badan = float(input("Masukkan tinggi badan (m): "))

nilai_bmi = hitung_bmi(berat_badan, tinggi_badan)
kategori_bmi = tentukan_kategori(nilai_bmi)

print("\n--- HASIL PERHITUNGAN ---")
print(f"Berat Badan : {berat_badan:.2f} kg")
print(f"Tinggi Badan: {tinggi_badan:.2f} m")
print(f"Nilai BMI   : {nilai_bmi:.2f}")
print(f"Kategori    : {kategori_bmi}")
