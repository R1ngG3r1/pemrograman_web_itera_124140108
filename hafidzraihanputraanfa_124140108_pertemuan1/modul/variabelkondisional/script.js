const nama = "Hafidz Raihan Putra Anfa";
let umur = 18;
const asal = "Bandar Lampung";

console.log("nama: " + nama);
console.log("umur: " + umur);
console.log("Asal: " + asal);

let nilai = 85;

if (nilai >= 70) {
  console.log("Anda lulus dengan nilai " ,nilai);
} else {
  console.log("Anda tidak lulus");
}

// Switch case
let hari = 3; 
let namaHari = "";

switch (hari) {
  case 1:
    namaHari = "Monday";
    break;
  case 2:
    namaHari = "Tuesday";
    break;
  case 3:
    namaHari = "Wednesday";
    break;
  case 4:
    namaHari = "Thursday";
    break;
  case 5:
    namaHari = "Friday";
    break;
  case 6:
    namaHari = "Saturday";
    break;
  case 7:
    namaHari = "Sunday";
    break;
  default:
    namaHari = "Hari tidak valid";
}

console.log(namaHari);

