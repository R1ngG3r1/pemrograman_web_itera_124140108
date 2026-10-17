export const capitalize = (text) => {
  if (!text) return "";
  return text.charAt(0).toUpperCase() + text.slice(1);
};

// mengubah objek Date menjadi teks "YYYY-MM-DD"
export const toDateKey = (date) => {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

// menambah hari pada tanggal
export const addDays = (date, days) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

// menghitung sisa hari sebelum deadline
export const daysUntil = (dateKey) => {
  const target = new Date(`${dateKey}T00:00:00`);
  const start = new Date(`${toDateKey(new Date())}T00:00:00`);
  return Math.round((target - start) / 86400000);
};

// penanda waktu deadline
export const describeDeadline = (dateKey, completed) => {
  if (!dateKey || completed) return "";
  const diff = daysUntil(dateKey);
  if (diff < 0) return `terlambat ${-diff} hari`;
  if (diff === 0) return "Hari ini";
  if (diff === 1) return "Besok";
  return `H-${diff}`;
};

// format tampilan tanggal
export const formatTanggal = (dateKey) =>
  new Date(`${dateKey}T00:00:00`).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

export const formatBulan = (year, month) =>
  new Date(year, month, 1).toLocaleDateString("id-ID", { month: "long", year: "numeric" });

export const getCalendarCells = (year, month) => {
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, index) => index + 1)
  ];
};

export const escapeHtml = (text) =>
  String(text).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  }[char]));
