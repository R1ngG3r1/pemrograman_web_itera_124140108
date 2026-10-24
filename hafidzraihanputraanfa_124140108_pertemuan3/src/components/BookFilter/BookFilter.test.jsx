import React from "react";
import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BookFilter from "./BookFilter";

describe("Komponen BookFilter", () => {
  test("memanggil onSearchChange saat mengetik di kolom pencarian", () => {
    const mockSearch = vi.fn();
    render(
      <BookFilter
        searchQuery=""
        onSearchChange={mockSearch}
        statusFilter="semua"
        onStatusChange={vi.fn()}
      />,
    );
    fireEvent.change(screen.getByLabelText("Cari buku"), {
      target: { value: "bumi" },
    });
    expect(mockSearch).toHaveBeenCalledWith("bumi");
  });
});
