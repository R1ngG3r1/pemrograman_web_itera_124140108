import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext';
import BookForm from '../../components/BookForm/BookForm';
import BookList from '../../components/BookList/BookList';
import BookFilter from '../../components/BookFilter/BookFilter';
import './Home.css';

function Home() {
  // Data dan fungsi dari context
  const { books, addBook, updateBook, deleteBook } = useBooks();

  // State halaman: buku yang diedit, kata pencarian, dan filter status
  const [editingBook, setEditingBook] = useState(null); 
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('semua');

  // Simpan form: kalau sedang edit -> ubah buku, kalau tidak -> tambah buku baru
  const handleSubmit = (data) => {
    if (editingBook) {
      updateBook(editingBook.id, data);
      setEditingBook(null);
    } else {
      addBook({ id: Date.now(), ...data });
    }
  };

  // Hapus buku; jika buku itu sedang diedit, batalkan mode edit
  const handleDelete = (bookId) => {
    if (editingBook && editingBook.id === bookId) {
      setEditingBook(null);
    }
    deleteBook(bookId);
  };

  // Saring buku berdasarkan status DAN kata kunci (judul / penulis)
  const query = searchQuery.toLowerCase();
  const filteredBooks = books.filter((book) => {
    const matchStatus = statusFilter === 'semua' || book.status === statusFilter;
    const matchSearch =
      book.title.toLowerCase().includes(query) ||
      book.author.toLowerCase().includes(query);
    return matchStatus && matchSearch;
  });

  return (
    <main className="home container">
      <h1>Manajemen Buku</h1>

      <BookForm
        onSubmit={handleSubmit}
        initialData={editingBook}
        onCancel={() => setEditingBook(null)}
      />

      <BookFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
      />

      <BookList
        books={filteredBooks}
        onEdit={setEditingBook}
        onDelete={handleDelete}
      />
    </main>
  );
}

export default Home;