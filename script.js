const root = document.documentElement;
const bodyBg = document.body;
const header = document.getElementById("header");
const themeChanger = document.getElementById("themechanger");
const createTaskInput = document.getElementById("createTask");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
const tasksList = document.getElementById("task__list");
const counter = document.getElementById("counter");
const checkboxes = document.querySelectorAll(".checkbox");
const todoActive = document.getElementById("todoActive");
const todoCompleted = document.getElementById("todoCompleted");
const todoAll = document.getElementById("todoAll");

updateCounter();

// CREATE TASK FUNCTIONALITY

function createTask(taskName) {
  taskName = taskName.trim();
  if (taskName !== "") {
    const task = {
      name: taskName,
      id: Math.random(),
      isCompleted: false,
    };
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    console.log(task);
    createTaskInput.value = "";
    const newLi = document.createElement("li");
    newLi.setAttribute("id", task.id);
    newLi.classList.add("new__task");
    newLi.innerHTML = `
    <div class="check__icon">
        <div>
            <input type="checkbox" id="checkbox-${task.id}" class="hidden__checkbox"/>
            <label for="checkbox-${task.id}" class="my-label" onclick="check(${task.id})"></label>
            <span>${task.name}</span>
        </div>
        <img src="images/Delete__img.svg" class="delete__btn" onclick="deleteTask(this)"/>
    </div>
    `;
    tasksList.appendChild(newLi);
    updateCounter();
  }
}

// CHECKBOX FUNCTIONALITY

function check(id) {
  const task = tasks.find((task) => task.id == id);
  task.isCompleted = !task.isCompleted;
  const checkbox = document.getElementById(`#checkbox-${id}`);
  const taskElement = document.getElementById(`${id}`);
  if (task.isCompleted) {
    taskElement.classList.add("checked");
  } else {
    taskElement.classList.remove("checked");
  }
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// DELETE TASK FUNCTIONALITY

function deleteTask(e) {
  const id = e.parentElement.parentElement.id;
  e.parentElement.parentElement.remove();
  tasks = tasks.filter((task) => task.id != id);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  updateCounter();
}

// SHOW ACTIVE FUNCTIONALITY

function showActive() {
  tasksList.innerHTML = ""; // clear previous tasks
  tasks
    .filter((task) => !task.isCompleted)
    .forEach((task) => {
      const newLi = document.createElement("li");
      newLi.setAttribute("id", task.id);
      newLi.classList.add("new__task");
      newLi.innerHTML = `
          <div class="check__icon">
              <div>
                  <input type="checkbox" id="checkbox-${task.id}" class="hidden__checkbox"/>
                  <label for="checkbox-${task.id}" class="my-label" onclick="check(${task.id})"></label>
                  <span>${task.name}</span>
              </div>
              <img src="images/Delete__img.svg" class="delete__btn" onclick="deleteTask(this)"/>
          </div>
          `;
      tasksList.appendChild(newLi);
    });
  updateCounter();
}

// THEME CHANGER FUNCTIONALITY

themeChanger.addEventListener("click", () => {
  if (root.classList.contains("light")) {
    root.classList.remove("light");
    root.classList.add("dark");
    bodyBg.classList.remove("light");
    bodyBg.classList.add("dark");
    header.classList.remove("light");
    header.classList.add("dark");
  } else {
    root.classList.remove("dark");
    root.classList.add("light");
    bodyBg.classList.remove("dark");
    bodyBg.classList.add("light");
    header.classList.remove("dark");
    header.classList.add("light");
  }
});

// SHOW COMPLETED FUNCTIONALITY

function showCompleted() {
  tasksList.innerHTML = ""; // clear previous tasks
  tasks
    .filter((task) => task.isCompleted)
    .forEach((task) => {
      const newLi = document.createElement("li");
      newLi.setAttribute("id", task.id);
      newLi.classList.add("new__task", "checked");
      newLi.innerHTML = (
        <div class="check__icon">
          {" "}
          <div>
            {" "}
            <input
              type="checkbox"
              id="checkbox-${task.id}"
              class="hidden__checkbox"
              checked
            />{" "}
            <label
              for="checkbox-${task.id}"
              class="my-label"
              onclick="check(${task.id})"
            ></label>{" "}
            <span>${task.name}</span>{" "}
          </div>{" "}
          <img
            src="images/Delete__img.svg"
            class="delete__btn"
            onclick="deleteTask(this)"
          />{" "}
        </div>
      );
      tasksList.appendChild(newLi);
    });
  updateCounter();
}

// SHOW ALL FUNCTIONALITY

function showAll() {
  tasksList.innerHTML = ""; // clear previous tasks
  tasks.forEach((task) => {
    const newLi = document.createElement("li");
    newLi.setAttribute("id", task.id);
    newLi.classList.add("new__task");
    if (task.isCompleted) {
      newLi.classList.add("checked");
      newLi.innerHTML = (
        <div class="check__icon">
          {" "}
          <div>
            {" "}
            <input
              type="checkbox"
              id="checkbox-${task.id}"
              class="hidden__checkbox"
              checked
            />{" "}
            <label
              for="checkbox-${task.id}"
              class="my-label"
              onclick="check(${task.id})"
            ></label>{" "}
            <span>${task.name}</span>{" "}
          </div>{" "}
          <img
            src="images/Delete__img.svg"
            class="delete__btn"
            onclick="deleteTask(this)"
          />{" "}
        </div>
      );
    } else {
      newLi.innerHTML = (
        <div class="check__icon">
          {" "}
          <div>
            {" "}
            <input
              type="checkbox"
              id="checkbox-${task.id}"
              class="hidden__checkbox"
            />{" "}
            <label
              for="checkbox-${task.id}"
              class="my-label"
              onclick="check(${task.id})"
            ></label>{" "}
            <span>${task.name}</span>{" "}
          </div>{" "}
          <img
            src="images/Delete__img.svg"
            class="delete__btn"
            onclick="deleteTask(this)"
          />{" "}
        </div>
      );
    }
    tasksList.appendChild(newLi);
  });
  updateCounter();
}

// UPDATE COUNTER FUNCTIONALITY

function updateCounter() {
  const count = tasks.filter((task) => !task.isCompleted).length;
  counter.textContent = `${count} item${count !== 1 ? "s" : ""} left`;
}

// EVENT LISTENERS

createTaskInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    createTask(e.target.value);
  }
});

todoActive.addEventListener("click", () => {
  showActive();
});

todoCompleted.addEventListener("click", () => {
  showCompleted();
});

todoAll.addEventListener("click", () => {
  showAll();
});

// LOCAL STORAGE

tasks = JSON.parse(localStorage.getItem("tasks")) || [];
tasks.forEach((task) => {
  createTask(task.name, task.isCompleted);
});

// DRAG AND DROP FUNCTIONALITY

let dragSrcEl = null;

function handleDragStart(e) {
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text/html", this.innerHTML);
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";
  return false;
}

function handleDragEnter(e) {
  this.classList.add("over");
}

function handleDragLeave(e) {
  this.classList.remove("over");
}

function handleDrop(e) {
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  if (dragSrcEl != this) {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData("text/html");
  }
  return false;
}

function handleDragEnd(e) {
  const lis = document.querySelectorAll("#tasks li");
  [].forEach.call(lis, (li) => {
    li.classList.remove("over");
  });
}

const lis = document.querySelectorAll("#tasks li");
[].forEach.call(lis, (li) => {
  li.addEventListener("dragstart", handleDragStart, false);
  li.addEventListener("dragenter", handleDragEnter, false);

  li.addEventListener("dragover", handleDragOver, false);
  li.addEventListener("dragleave", handleDragLeave, false);
  li.addEventListener("drop", handleDrop, false);
  li.addEventListener("dragend", handleDragEnd, false);
});

// CHECK FUNCTIONALITY

function check(id) {
  tasks.forEach((task) => {
    if (task.id === id) {
      task.isCompleted = !task.isCompleted;
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  showAll();
}

// DELETE FUNCTIONALITY
