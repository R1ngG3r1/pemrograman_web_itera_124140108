import { API_URL, STORAGE_KEY, PRIORITIES, PRIORITY_LABELS } from "./modules/data.js";
import { capitalize, toDateKey, addDays } from "./modules/utils.js";

// Model untuk satu item tugas
export class TaskItem {
  constructor({
    id,
    title,
    description = "",
    dueDate = "",
    course = "",
    priority = "normal",
    completed = false,
    createdAt = new Date().toISOString()
  }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.dueDate = dueDate; 
    this.course = course; 
    this.priority = priority in PRIORITY_LABELS ? priority : "normal";
    this.completed = completed;
    this.createdAt = createdAt;
  }

  // penanda terlambat
  get isOverdue() {
    return !this.completed && this.dueDate !== "" && this.dueDate < toDateKey(new Date());
  }
}

// Pengelola state aplikasi
export class DashboardApp {
  constructor() {
    const saved = this.load();
    this.tasks = saved ?? [];
    this.needsInitialFetch = saved === null; // true jika localStorage masih kosong
  }

  // Baca data dari localStorage (null jika belum pernah disimpan)
  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw).map((item) => new TaskItem(item)) : null;
    } catch (error) {
      console.error("Data localStorage rusak:", error);
      return null;
    }
  }

  save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tasks));
  }

  //Mengambil 5 tugas contoh dari API, lalu menyimpannya ke localStorage
  async fetchInitialTasks() {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Gagal memuat data awal (status ${response.status})`);
    }
    const data = await response.json();
    this.tasks = data.map(
      ({ id, title, completed }, index) =>
        new TaskItem({
          id,
          title: capitalize(title),
          description: "Tugas contoh dari API",
          dueDate: toDateKey(addDays(new Date(), index + 1)),
          completed
        })
    );
    this.save();
  }

  // Dipanggil sekali saat aplikasi dibuka
  async init() {
    if (this.needsInitialFetch) {
      await this.fetchInitialTasks();
      this.needsInitialFetch = false;
    }
  }

  addTask({ title, description, dueDate, course, priority }) {
    const task = new TaskItem({ id: Date.now(), title, description, dueDate, course, priority });
    this.tasks = [...this.tasks, task]; 
    this.save();
  }

  updateTask(id, changes) {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? new TaskItem({ ...task, ...changes }) : task
    );
    this.save();
  }

  toggleTask(id) {
    const task = this.tasks.find((item) => item.id === id);
    if (task) this.updateTask(id, { completed: !task.completed });
  }

  deleteTask(id) {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    this.save();
  }

// Daftar mata kuliah tanpa duplikat
  getCourses() {
    return [...new Set(this.tasks.map(({ course }) => course).filter(Boolean))].sort();
  }

//Tugas yang ditampilkan: disaring (kata kunci, status, matkul) lalu diurutkan
  getVisibleTasks({ keyword = "", status = "all", course = "all" } = {}) {
    const query = keyword.trim().toLowerCase();
    const matchStatus = ({ completed }) =>
      status === "done" ? completed : status === "pending" ? !completed : true;
    const matchCourse = (task) => course === "all" || task.course === course;

    return this.tasks
      .filter(matchStatus)
      .filter(matchCourse)
      .filter((task) =>
        `${task.title} ${task.description} ${task.course}`.toLowerCase().includes(query)
      )
      .sort(
        (a, b) =>
          a.completed - b.completed ||
          (a.dueDate || "9999").localeCompare(b.dueDate || "9999") ||
          PRIORITIES.indexOf(a.priority) - PRIORITIES.indexOf(b.priority)
      );
  }

// daftar tugas pada tanggal  tertentu
  getTasksByDate(dateKey) {
    return this.tasks.filter(({ dueDate }) => dueDate === dateKey);
  }

  getStats() {
    const total = this.tasks.length;
    const done = this.tasks.filter(({ completed }) => completed).length;
    const overdue = this.tasks.filter((task) => task.isOverdue).length;
    return { total, done, pending: total - done, overdue };
  }

// Kumpulkan tugas per tanggal deadline, agar kalender tahu tanggal mana yang diwarnai
  getDeadlineMap() {
    return this.tasks.reduce((map, { dueDate, title }) => {
      if (dueDate) map.set(dueDate, [...(map.get(dueDate) ?? []), title]);
      return map;
    }, new Map());
  }
}
