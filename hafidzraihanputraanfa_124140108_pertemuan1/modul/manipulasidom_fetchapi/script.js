// Aplikasi Todo List dengan DOM manipulation dan localStorage
const inputTodo = document.getElementById("input-todo");
const listTodo = document.getElementById("list-todo");
const infoTodo = document.getElementById("info-todo");
const pesan = document.getElementById("pesan");

function muatTodo() {
  try {
    return JSON.parse(localStorage.getItem("todos")) || [];
  } catch (error) {
    return [];
  }
}


function simpanTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

let todos = muatTodo();

function perbaruiInfo() {
  const jumlahSelesai = todos.filter((t) => t.selesai).length;
  if (todos.length === 0) {
    infoTodo.innerText = "Belum ada tugas.";
  } else {
    infoTodo.innerText = `Total: ${todos.length} tugas, selesai: ${jumlahSelesai}`;
  }
}


function buatItem(todo) {
  const item = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.selesai;

  const teks = document.createElement("span");
  teks.innerText = ` ${todo.teks} `;
  if (todo.selesai) {
    teks.style.textDecoration = "line-through";
  }

  const tombolHapus = document.createElement("button");
  tombolHapus.innerText = "Hapus";

  checkbox.addEventListener("change", function() {
    todo.selesai = checkbox.checked;
    teks.style.textDecoration = todo.selesai ? "line-through" : "none";
    simpanTodo();
    perbaruiInfo();
  });


  tombolHapus.addEventListener("click", function() {
    listTodo.removeChild(item);
    todos = todos.filter((t) => t.id !== todo.id);
    simpanTodo();
    perbaruiInfo();
  });

  item.appendChild(checkbox);
  item.appendChild(teks);
  item.appendChild(tombolHapus);
  listTodo.appendChild(item);
}


function tambahTodo() {
  const teks = inputTodo.value.trim();

  if (teks === "") {
    pesan.innerText = "Tugas tidak boleh kosong!";
    return;
  }

  const todoBaru = { id: Date.now(), teks: teks, selesai: false };
  todos.push(todoBaru);
  simpanTodo();
  buatItem(todoBaru);
  perbaruiInfo();

  pesan.innerText = "";
  inputTodo.value = "";
  inputTodo.focus();
}


document.getElementById("btn-tambah").addEventListener("click", function() {
  tambahTodo();
});


inputTodo.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    tambahTodo();
  }
});


todos.forEach((todo) => buatItem(todo));
perbaruiInfo();