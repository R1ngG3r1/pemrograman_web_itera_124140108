import { renderHook } from "@testing-library/react";
import useBookStats from "./useBookStats";

describe("Hook useBookStats", () => {
  test("menghitung total dan jumlah per status dengan benar", () => {
    const books = [
      { id: 1, title: "A", author: "X", status: "milik" },
      { id: 2, title: "B", author: "Y", status: "milik" },
      { id: 3, title: "C", author: "Z", status: "baca" },
      { id: 4, title: "D", author: "W", status: "beli" },
    ];
    const { result } = renderHook(() => useBookStats(books));
    expect(result.current).toEqual({ total: 4, milik: 2, baca: 1, beli: 1 });
  });
});
