// Sumber data: endpoint API, kunci localStorage, dan daftar prioritas
export const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5";
export const STORAGE_KEY = "dashboard-tugas-v2";

export const PRIORITY_LABELS = {
  tinggi: "Tinggi",
  normal: "Normal",
  rendah: "Rendah"
};
export const PRIORITIES = Object.keys(PRIORITY_LABELS);
