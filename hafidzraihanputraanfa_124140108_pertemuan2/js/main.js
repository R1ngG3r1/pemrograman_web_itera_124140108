import { DashboardApp } from "./app.js";
import { PRIORITY_LABELS } from "./modules/data.js";
import {
  escapeHtml,
  formatTanggal,
  formatBulan,
  toDateKey,
  getCalendarCells,
  describeDeadline,
} from "./modules/utils.js";

const app = new DashboardApp();

const $ = (id) => document.getElementById(id);
const listEl = $("taskList");
const searchEl = $("searchInput");
const courseSelectEl = $("courseFilter");
const statusEl = $("status");
const dialogEl = $("taskDialog");
const dayDialogEl = $("dayDialog");
const confirmDialogEl = $("confirmDialog");
const formEl = $("taskForm");

const today = new Date();
let viewYear = today.getFullYear();
let viewMonth = today.getMonth();
let editingId = null;
let deletingId = null;
let statusFilter = "all";
let courseFilter = "all";

const setStatus = (message) => {
  statusEl.textContent = message;
};

// Daftar tugas
const renderBadges = ({ course, priority }) => `
  <span class="badges">
    ${course ? `<span class="badge">${escapeHtml(course)}</span>` : ""}
    <span class="badge prio-${priority}">Prioritas ${PRIORITY_LABELS[priority]}</span>
  </span>`;

const renderTask = (task) => {
  const { id, title, description, dueDate, completed, isOverdue } = task;
  const hint = describeDeadline(dueDate, completed);
  return `
    <li class="task ${completed ? "done" : ""}" data-id="${id}">
      <input type="checkbox" data-action="toggle" ${completed ? "checked" : ""} aria-label="Tandai selesai">
      <div class="task-body">
        <span class="title">${escapeHtml(title)}</span>
        ${renderBadges(task)}
        ${description ? `<span class="desc">${escapeHtml(description)}</span>` : ""}
        <span class="date ${isOverdue ? "late" : ""}">Deadline: ${dueDate ? formatTanggal(dueDate) : "-"}${hint ? ` (${hint})` : ""}</span>
      </div>
      <div class="task-actions">
        <button data-action="edit">Edit</button>
        <button data-action="delete">Hapus</button>
      </div>
    </li>`;
};

const emptyMessages = {
  all: "Belum ada tugas. Klik Tambah tugas.",
  done: "Belum ada tugas yang selesai.",
  pending: "Semua tugas sudah selesai.",
};

const renderList = () => {
  const tasks = app.getVisibleTasks({
    keyword: searchEl.value,
    status: statusFilter,
    course: courseFilter,
  });
  const filtered = searchEl.value || courseFilter !== "all";
  const emptyText = filtered
    ? "Tidak ada tugas yang cocok."
    : emptyMessages[statusFilter];
  listEl.innerHTML = tasks.length
    ? tasks.map(renderTask).join("")
    : `<li class="empty">${emptyText}</li>`;
};

// Isi pilihan filter mata kuliah dan saran isian di form
const renderCourseOptions = () => {
  const courses = app.getCourses();
  if (courseFilter !== "all" && !courses.includes(courseFilter))
    courseFilter = "all";

  const toOption = (name) =>
    `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`;
  courseSelectEl.innerHTML = `<option value="all">Semua mata kuliah</option>${courses.map(toOption).join("")}`;
  courseSelectEl.value = courseFilter;
  $("courseList").innerHTML = courses.map(toOption).join("");
};

// ringkasan matakuliah
const renderBar = (label, count, percent, className) => `
  <div class="bar-label"><span>${label}</span><span>${count} (${percent}%)</span></div>
  <div class="bar"><div class="fill ${className}" style="width: ${percent}%"></div></div>`;

const renderSummary = () => {
  const { total, done, pending, overdue } = app.getStats();
  const percent = (count) => (total ? Math.round((count / total) * 100) : 0);
  $("summary").innerHTML = `
    <p class="summary-line">
      <span>Total tugas: <strong>${total}</strong></span>
      <span class="${overdue ? "late" : ""}">Terlambat: <strong>${overdue}</strong></span>
    </p>
    ${renderBar("Terselesaikan", done, percent(done), "fill-done")}
    ${renderBar("Belum selesai", pending, percent(pending), "fill-pending")}`;
};

// kalender
const renderCalendar = () => {
  const deadlines = app.getDeadlineMap();
  const todayKey = toDateKey(new Date());

  const cells = getCalendarCells(viewYear, viewMonth).map((day) => {
    if (!day) return `<span></span>`;
    const key = toDateKey(new Date(viewYear, viewMonth, day));
    const titles = deadlines.get(key);
    const classes = `cell ${titles ? "has-deadline" : ""} ${key === todayKey ? "today" : ""}`;
    const tooltip = titles ? ` title="${escapeHtml(titles.join(", "))}"` : "";
    return `<button type="button" class="${classes}" data-date="${key}"${tooltip}>${day}</button>`;
  });

  const dayNames = ["Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Min"];
  $("calendarTitle").textContent = formatBulan(viewYear, viewMonth);
  $("calendarGrid").innerHTML =
    dayNames.map((name) => `<span class="dow">${name}</span>`).join("") +
    cells.join("");
};

const render = () => {
  renderCourseOptions();
  renderList();
  renderSummary();
  renderCalendar();
};

// Popup daftar tugas saat tanggal diklik
const renderDayTask = (task) => `
  <li class="task ${task.completed ? "done" : ""}">
    <div class="task-body">
      <span class="title">${escapeHtml(task.title)}</span>
      ${renderBadges(task)}
      ${task.description ? `<span class="desc">${escapeHtml(task.description)}</span>` : ""}
      <span class="date">${task.completed ? "Selesai" : "Belum selesai"}</span>
    </div>
  </li>`;

const openDayDialog = (dateKey) => {
  const tasks = app.getTasksByDate(dateKey);
  $("dayTitle").textContent = `Tugas pada ${formatTanggal(dateKey)}`;
  $("dayList").innerHTML = tasks.length
    ? tasks.map(renderDayTask).join("")
    : `<li class="empty">Tidak ada tugas pada tanggal ini.</li>`;
  dayDialogEl.showModal();
};

$("calendarGrid").addEventListener("click", (event) => {
  const cell = event.target.closest("[data-date]");
  if (cell) openDayDialog(cell.dataset.date);
});
$("closeDayBtn").addEventListener("click", () => dayDialogEl.close());

// form tambah / edit
const openForm = (task = null) => {
  editingId = task?.id ?? null;
  formEl.reset();
  $("dialogTitle").textContent = task ? "Edit tugas" : "Tambah tugas";
  if (task) {
    $("fTitle").value = task.title;
    $("fCourse").value = task.course;
    $("fPriority").value = task.priority;
    $("fDesc").value = task.description;
    $("fDue").value = task.dueDate;
  }
  dialogEl.showModal();
};

$("addBtn").addEventListener("click", () => openForm());
$("cancelBtn").addEventListener("click", () => dialogEl.close());

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const data = {
    title: $("fTitle").value.trim(),
    course: $("fCourse").value.trim(),
    priority: $("fPriority").value,
    description: $("fDesc").value.trim(),
    dueDate: $("fDue").value,
  };
  if (!data.title) return;

  if (editingId === null) app.addTask(data);
  else app.updateTask(editingId, data);

  dialogEl.close();
  render();
});

// konfirmasi hapus
const openConfirm = ({ id, title }) => {
  deletingId = id;
  $("confirmText").textContent = `Tugas "${title}" akan dihapus permanen.`;
  confirmDialogEl.showModal();
};

$("confirmCancelBtn").addEventListener("click", () => confirmDialogEl.close());
$("confirmDeleteBtn").addEventListener("click", () => {
  app.deleteTask(deletingId);
  deletingId = null;
  confirmDialogEl.close();
  render();
});

  // Pencarian dan filter mata kuliah
searchEl.addEventListener("input", renderList);

courseSelectEl.addEventListener("change", () => {
  courseFilter = courseSelectEl.value;
  renderList();
});

// filter status tugas
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    statusFilter = button.dataset.filter;
    document.querySelectorAll("[data-filter]").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-pressed", active);
    });
    renderList();
  });
});

// Aksi pada daftar (toggle, edit, hapus) lewat event delegation
listEl.addEventListener("click", (event) => {
  const { action } = event.target.dataset;
  const item = event.target.closest("li[data-id]");
  if (!action || !item) return;

  const id = Number(item.dataset.id);
  const task = app.tasks.find((entry) => entry.id === id);

  if (action === "edit") return openForm(task);
  if (action === "delete") return openConfirm(task);
  if (action === "toggle") app.toggleTask(id);

  render();
});

// Geser bulan kalender
document.querySelectorAll("[data-nav]").forEach((button) => {
  button.addEventListener("click", () => {
    const next = new Date(viewYear, viewMonth + Number(button.dataset.nav), 1);
    viewYear = next.getFullYear();
    viewMonth = next.getMonth();
    renderCalendar();
  });
});

// Mulai aplikasi: ambil data awal dari API jika localStorage masih kosong
const start = async () => {
  setStatus("Memuat tugas awal dari API...");
  try {
    await app.init();
    setStatus("");
  } catch (error) {
    setStatus(`${error.message}. Kamu tetap bisa menambah tugas sendiri.`);
  }
  render();
};

start();
