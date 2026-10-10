// latihan 1
const mahasiswa = [
  { nama: "Hafidz", nim: "124140101", jurusan: "Teknik Informatika", nilai: 92 },
  { nama: "Raihan", nim: "124140102", jurusan: "Sistem Informatika", nilai: 94 },
  { nama: "Putra", nim: "124140103", jurusan: "Teknik Informatika", nilai: 96 },
  { nama: "Anfa", nim: "124140104", jurusan: "Teknik Informatika", nilai: 98 },
  { nama: "Rina", nim: "124140105", jurusan: "Sistem Informatika", nilai: 100 }
];

const barisTabel = mahasiswa.map((mhs, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${mhs.nama}</td>
      <td>${mhs.nim}</td>
      <td>${mhs.jurusan}</td>
      <td>${mhs.nilai}</td>
    </tr>
  `).join("");

document.getElementById("result").innerHTML += `
  <table border="1" cellpadding="6">
    <tr>
      <th>No</th>
      <th>Nama</th>
      <th>NIM</th>
      <th>Jurusan</th>
      <th>Nilai</th>
    </tr>
    ${barisTabel}
  </table>
`;

// latihan 2
function cariNilaiTertinggi(daftar) {
  return daftar.reduce((tertinggi, mhs) => {
    return mhs.nilai > tertinggi.nilai ? mhs : tertinggi;
  });
}

const mhsTertinggi = cariNilaiTertinggi(mahasiswa);
document.getElementById("result").innerHTML += `
  <p><strong>Nilai tertinggi:</strong> ${mhsTertinggi.nama} (${mhsTertinggi.nim}) dengan nilai ${mhsTertinggi.nilai}</p>
`;

function urutkanNama(daftar, arah) {
  const hasil = [...daftar].sort((a, b) => a.nama.localeCompare(b.nama));
  if (arah === "desc") {
    hasil.reverse();
  }
  return hasil;
}

function buatTabel(daftar, judul) {
  const baris = daftar.map((mhs, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${mhs.nama}</td>
        <td>${mhs.nim}</td>
        <td>${mhs.jurusan}</td>
        <td>${mhs.nilai}</td>
      </tr>
    `).join("");

  return `
    <h3>${judul}</h3>
    <table border="1" cellpadding="6">
      <tr>
        <th>No</th>
        <th>Nama</th>
        <th>NIM</th>
        <th>Jurusan</th>
        <th>Nilai</th>
      </tr>
      ${baris}
    </table>
  `;
}

document.getElementById("result").innerHTML += buatTabel(urutkanNama(mahasiswa, "asc"), "Urut Nama (A-Z)");
document.getElementById("result").innerHTML += buatTabel(urutkanNama(mahasiswa, "desc"), "Urut Nama (Z-A)");