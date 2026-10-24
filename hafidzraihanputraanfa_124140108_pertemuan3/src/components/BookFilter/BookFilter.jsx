import React from "react";
import PropTypes from "prop-types";
import "./BookFilter.css";

function BookFilter({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusChange,
}) {
  return (
    <div className="book-filter">
      {/* Pencarian berdasarkan judul atau penulis  */}
      <input
        type="text"
        placeholder="Cari judul atau penulis..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        aria-label="Cari buku"
      />

      {/* Filter berdasarkan status */}
      <select
        value={statusFilter}
        onChange={(e) => onStatusChange(e.target.value)}
        aria-label="Filter status"
      >
        <option value="semua">Semua status</option>
        <option value="milik">Dimiliki</option>
        <option value="baca">Sedang dibaca</option>
        <option value="beli">Ingin dibeli</option>
      </select>
    </div>
  );
}

BookFilter.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  statusFilter: PropTypes.oneOf(["semua", "milik", "baca", "beli"]).isRequired,
  onStatusChange: PropTypes.func.isRequired,
};

export default BookFilter;
