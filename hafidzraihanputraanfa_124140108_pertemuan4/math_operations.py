PI = 3.14159


def luas_persegi(sisi: float) -> float:
    """
    Menghitung luas persegi.
    Parameter: sisi bertipe float
    Mengembalikan nilai: sisi * sisi bertipe float
    """
    return sisi * sisi


def keliling_persegi(sisi: float) -> float:
    """
    Menghitung keliling persegi.
    Parameter: sisi bertipe float
    Mengembalikan nilai: 4 * sisi bertipe float
    """
    return 4 * sisi


def luas_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung luas persegi panjang.
    Parameter: panjang dan lebar bertipe float
    Mengembalikan nilai: panjang * lebar bertipe float
    """
    return panjang * lebar


def keliling_persegi_panjang(panjang: float, lebar: float) -> float:
    """
    Menghitung keliling persegi panjang.
    Parameter: panjang dan lebar bertipe float
    Mengembalikan nilai: 2 * (panjang + lebar) bertipe float
    """
    return 2 * (panjang + lebar)


def luas_lingkaran(jari_jari: float) -> float:
    """
    Menghitung luas lingkaran.
    Parameter: jari_jari bertipe float
    Mengembalikan nilai: PI * jari_jari * jari_jari bertipe float
    """
    return PI * jari_jari * jari_jari


def keliling_lingkaran(jari_jari: float) -> float:
    """
    Menghitung keliling lingkaran.
    Parameter: jari_jari bertipe float
    Mengembalikan nilai: 2 * PI * jari_jari bertipe float
    """
    return 2 * PI * jari_jari


def celsius_ke_fahrenheit(celsius: float) -> float:
    """
    Mengubah suhu Celsius ke Fahrenheit.
    Parameter: celsius bertipe float
    Mengembalikan nilai: celsius * 9/5 + 32 bertipe float
    """
    return celsius * 9 / 5 + 32


def celsius_ke_kelvin(celsius: float) -> float:
    """
    Mengubah suhu Celsius ke Kelvin.
    Parameter: celsius bertipe float
    Mengembalikan nilai: celsius + 273.15 bertipe float
    """
    return celsius + 273.15
