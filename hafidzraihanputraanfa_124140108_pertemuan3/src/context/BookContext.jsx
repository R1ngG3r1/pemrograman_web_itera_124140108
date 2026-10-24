import React, { createContext, useContext } from 'react';
import PropTypes from 'prop-types';
import useLocalStorage from '../hooks/useLocalStorage';

// Wadah context untuk data buku
const BookContext = createContext();

// Hook untuk mengakses context (error jika dipakai di luar Provider)
export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks harus digunakan di dalam BookProvider');
  }
  return context;
}

export function BookProvider({ children }) {
  // State buku, otomatis tersimpan di localStorage
  const [books, setBooks] = useLocalStorage('books_data', []);

  // Fungsi tambah buku
  const addBook = (newBook) => setBooks([...books, newBook]);

  // Fungsi edit buku (gabungkan data lama dengan data baru)
  const updateBook = (bookId, updatedData) =>
    setBooks(books.map(b => b.id === bookId ? { ...b, ...updatedData } : b));

  // Fungsi hapus buku
  const deleteBook = (bookId) => setBooks(books.filter(b => b.id !== bookId));

  // Data dan fungsi yang dibagikan ke komponen lain
  const value = {
    books,
    addBook,
    updateBook,
    deleteBook,
  };

  return (
    <BookContext.Provider value={value}>
      {children}
    </BookContext.Provider>
  );
}

// Validasi tipe props
BookProvider.propTypes = {
  children: PropTypes.node.isRequired,
};