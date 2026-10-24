// Custom hook: menghitung statistik buku dari daftar buku yang diberikan.  Angka tidak disimpan sebagai state, tetapi dihitung ulang setiap render sehingga selalu sinkron dengan data terbaru.
function useBookStats(books) {
  const total = books.length;

  // Hitung jumlah buku per status dengan filter()
  const milik = books.filter((b) => b.status === 'milik').length;
  const baca = books.filter((b) => b.status === 'baca').length;
  const beli = books.filter((b) => b.status === 'beli').length;

  return { total, milik, baca, beli };
}

export default useBookStats;