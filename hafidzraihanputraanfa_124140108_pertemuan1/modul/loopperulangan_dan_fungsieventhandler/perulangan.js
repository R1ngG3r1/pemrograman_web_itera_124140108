function faktorial(n) {
  if (n < 0) {
    return "Angka tidak boleh negatif ";
  }
  let hasil = 1;
  for (let i = 2; i <= n; i++) {
    hasil *= i;
  }
  return hasil;
}
let angka = 5; 
console.log(angka + "! = " + faktorial(angka));
