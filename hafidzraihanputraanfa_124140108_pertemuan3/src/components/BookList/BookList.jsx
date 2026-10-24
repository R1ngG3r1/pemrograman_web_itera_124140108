import React from 'react';
import PropTypes from 'prop-types';
import './BookList.css';

// Label tampilan untuk tiap status
const STATUS_LABEL = {
  milik: 'Dimiliki',
  baca: 'Sedang dibaca',
  beli: 'Ingin dibeli',
};

function BookList({ books, onEdit, onDelete }) {
  // Tampilkan pesan jika tidak ada buku
  if (books.length === 0) {
    return <p className="empty-message">Belum ada buku yang cocok.</p>;
  }

  return (
    <div className="table-wrapper">
      <table className="book-table">
        <thead>
          <tr>
            <th>No</th>
            <th>Judul</th>
            <th>Penulis</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book.id}>
              <td>{index + 1}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>
                <span className={`badge badge-${book.status}`}>
                  {STATUS_LABEL[book.status]}
                </span>
              </td>
              <td className="book-actions">
                <button onClick={() => onEdit(book)}>Edit</button>
                <button className="btn-delete" onClick={() => onDelete(book.id)}>
                  Hapus
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

BookList.propTypes = {
  books: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['milik', 'baca', 'beli']).isRequired,
    })
  ).isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default BookList;