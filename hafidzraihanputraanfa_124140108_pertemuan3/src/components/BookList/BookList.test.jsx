import React from 'react';
import { vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import BookList from './BookList';

const books = [
  { id: 1, title: 'Laskar Pelangi', author: 'Andrea Hirata', status: 'milik' },
  { id: 2, title: 'Bumi', author: 'Tere Liye', status: 'baca' },
];

describe('Komponen BookList', () => {
  test('merender judul semua buku', () => {
    render(<BookList books={books} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Laskar Pelangi')).toBeInTheDocument();
    expect(screen.getByText('Bumi')).toBeInTheDocument();
  });

  test('menampilkan pesan kosong jika tidak ada buku', () => {
    render(<BookList books={[]} onEdit={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText('Belum ada buku yang cocok.')).toBeInTheDocument();
  });

  test('memanggil onDelete dengan id buku saat tombol Hapus diklik', () => {
    const mockDelete = vi.fn();
    render(<BookList books={books} onEdit={vi.fn()} onDelete={mockDelete} />);
    fireEvent.click(screen.getAllByText('Hapus')[0]);
    expect(mockDelete).toHaveBeenCalledWith(1);
  });
});