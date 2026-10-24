import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookForm from "./BookForm";

describe("Komponen BookForm", () => {
  test("menampilkan field dan tombol Tambah Buku", () => {
    render(<BookForm onSubmit={vi.fn()} />);
    expect(screen.getByLabelText("Judul")).toBeInTheDocument();
    expect(screen.getByLabelText("Penulis")).toBeInTheDocument();
    expect(screen.getByText("Tambah Buku")).toBeInTheDocument();
  });

  test("menampilkan pesan error dan tidak submit jika input kosong", () => {
    const mockSubmit = vi.fn();
    render(<BookForm onSubmit={mockSubmit} />);
    fireEvent.click(screen.getByText("Tambah Buku"));
    expect(screen.getByText("Judul wajib diisi")).toBeInTheDocument();
    expect(screen.getByText("Penulis wajib diisi")).toBeInTheDocument();
    expect(mockSubmit).not.toHaveBeenCalled();
  });

  test("memanggil onSubmit dengan data yang benar jika input valid", () => {
    const mockSubmit = vi.fn();
    render(<BookForm onSubmit={mockSubmit} />);
    fireEvent.change(screen.getByLabelText("Judul"), {
      target: { value: "Laskar Pelangi" },
    });
    fireEvent.change(screen.getByLabelText("Penulis"), {
      target: { value: "Andrea Hirata" },
    });
    fireEvent.click(screen.getByText("Tambah Buku"));
    expect(mockSubmit).toHaveBeenCalledWith({
      title: "Laskar Pelangi",
      author: "Andrea Hirata",
      status: "milik",
    });
  });
});
