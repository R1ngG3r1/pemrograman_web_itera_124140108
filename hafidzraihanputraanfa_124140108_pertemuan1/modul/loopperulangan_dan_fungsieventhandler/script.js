function hitungBMI(berat, tinggiCm) {
  const tinggiM = tinggiCm / 100;
  return berat / (tinggiM * tinggiM);
}

function kategoriBMI(bmi) {
  if (bmi < 18.5) {
    return "Kurus";
  } else if (bmi < 25) {
    return "Normal";
  } else if (bmi < 30) {
    return "Gemuk";
  } else {
    return "Obesitas";
  }
}

document.getElementById("btnHitung").addEventListener("click", function() {
  const berat = parseFloat(document.getElementById("berat").value);
  const tinggi = parseFloat(document.getElementById("tinggi").value);

  if (isNaN(berat) || isNaN(tinggi) || berat <= 0 || tinggi <= 0) {
    document.getElementById("result").innerHTML = 
      `<p>Masukkan berat dan tinggi yang valid!</p>`;
  } else {
    const bmi = hitungBMI(berat, tinggi);
    const kategori = kategoriBMI(bmi);
    document.getElementById("result").innerHTML = 
      `<p>Hasil: ${bmi.toFixed(1)}, kamu ${kategori}</p>`;
  }
});