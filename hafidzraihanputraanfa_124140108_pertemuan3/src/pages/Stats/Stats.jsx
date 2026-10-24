import React from "react";
import { useBooks } from "../../context/BookContext";
import useBookStats from "../../hooks/useBookStats";
import "./Stats.css";

function Stats() {
  // Ambil daftar buku dari context (data yang sama dengan halaman Beranda)
  const { books } = useBooks();
  // Hitung statistik memakai custom hook
  const { total, milik, baca, beli } = useBookStats(books);

  return (
    <main className="stats container">
      <h1>Statistik Buku</h1>
      <div className="stats-grid">
        <div className="stat-card">
          <h2>{total}</h2>
          <p>Total Buku</p>
        </div>
        <div className="stat-card">
          <h2>{milik}</h2>
          <p>Dimiliki</p>
        </div>
        <div className="stat-card">
          <h2>{baca}</h2>
          <p>Sedang Dibaca</p>
        </div>
        <div className="stat-card">
          <h2>{beli}</h2>
          <p>Ingin Dibeli</p>
        </div>
      </div>
    </main>
  );
}

export default Stats;
