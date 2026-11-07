import math_operations
from math_operations import luas_lingkaran, keliling_lingkaran

print("--- Persegi ---")
sisi1 = 5
print(f"Sisi {sisi1}")
print(f"Luas     : {math_operations.luas_persegi(sisi1):.2f}")
print(f"Keliling : {math_operations.keliling_persegi(sisi1):.2f}")
print(" ")

sisi2 = 12.8
print(f"Sisi {sisi2}")
print(f"Luas     : {math_operations.luas_persegi(sisi2):.2f}")
print(f"Keliling : {math_operations.keliling_persegi(sisi2):.2f}")

print("--- Persegi Panjang ---")
panjang1 = 10
lebar1 = 5
luas1 = math_operations.luas_persegi_panjang(panjang1, lebar1)
keliling1 = math_operations.keliling_persegi_panjang(panjang1, lebar1)
print(f"Panjang: {panjang1}, lebar: {lebar1}")
print(f"Luas     : {luas1:.2f}")
print(f"Keliling : {keliling1:.2f}")
print(" ")

panjang2 = 7.5
lebar2 = 3.5
luas2 = math_operations.luas_persegi_panjang(panjang2, lebar2)
keliling2 = math_operations.keliling_persegi_panjang(panjang2, lebar2)
print(f"Panjang  : {panjang2}, lebar: {lebar2}")
print(f"Luas     : {luas2:.2f}")
print(f"Keliling : {keliling2:.2f}")

print("--- Lingkaran ---")
print(f"Nilai PI : {math_operations.PI}")
jari1 = 7
print(f"Jari-jari: {jari1}")
print(f"Luas     : {luas_lingkaran(jari1):.2f}")
print(f"Keliling : {keliling_lingkaran(jari1):.2f}")
print(" ")

jari2 = 4.5
print(f"Jari-jari: {jari2}")
print(f"Luas     : {luas_lingkaran(jari2):.2f}")
print(f"Keliling : {keliling_lingkaran(jari2):.2f}")

print("--- Konversi Suhu ---")
suhu1 = -45
suhu2 = 45
print(f"{suhu1} C = {math_operations.celsius_ke_fahrenheit(suhu1):.2f} F")
print(f"{suhu1} C = {math_operations.celsius_ke_kelvin(suhu1):.2f} K")
print(f"{suhu2} C = {math_operations.celsius_ke_fahrenheit(suhu2):.2f} F")
print(f"{suhu2} C = {math_operations.celsius_ke_kelvin(suhu2):.2f} K")
