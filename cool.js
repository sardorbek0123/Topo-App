const root = document.documentElement;
const bodyBg = document.body;
const header = document.getElementById("header");
const themeChanger = document.getElementById("themechanger");
const createTaskInput = document.getElementById("createTask");
let tasks = [];
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

    // LOCAL STORAGE

    localStorage.setItem("tasks", JSON.stringify(tasks));
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
}

// DELETE TASK FUNCTIONALITY

function deleteTask(e) {
  const id = e.parentElement.parentElement.id;
  e.parentElement.parentElement.remove();
  tasks = tasks.filter((task) => task.id != id);
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
  todoActive.classList.add("active");
  todoAll.classList.remove("active");
  todoCompleted.classList.remove("active");
}

// SHOW COMPLETED FUNCTIONALITY

function showCompleted() {
  tasksList.innerHTML = ""; // clear previous tasks
  tasks
    .filter((task) => task.isCompleted)
    .forEach((task) => {
      const newLi = document.createElement("li");
      newLi.setAttribute("id", task.id);
      newLi.classList.add("new__task");
      newLi.innerHTML = `
          <div class="check__icon">
              <div>
                  <input type="checkbox" id="checkbox-${task.id}" class="hidden__checkbox" checked/>
                  <label for="checkbox-${task.id}" class="my-label" onclick="check(${task.id})"></label>
                  <span class = "checked">${task.name}</span>
              </div>
              <img src="images/Delete__img.svg" class="delete__btn" onclick="deleteTask(this)"/>
          </div>
          `;
      tasksList.appendChild(newLi);
    });
  todoCompleted.classList.add("active");
  todoActive.classList.remove("active");
  todoAll.classList.remove("active");
}

// SHOW ALL FUNCTIONALITY

function showAll() {
  const tasksHtml = tasks.map((task) => {
    if(task.isCompleted) {
      return `
      <li id="${task.id}" class="new__task">
        <div class="check__icon">
            <div>
                <input type="checkbox" id="checkbox-${task.id}" class="hidden__checkbox" checked/>
                <label for="checkbox-${task.id}" class="my-label" onclick="check(${task.id})"></label>
                <span class = "checked">${task.name}</span>
            </div>
            <img src="images/Delete__img.svg" class="delete__btn" onclick="deleteTask(this)"/>
        </div>
      </li>
      `;
    } else {
      return `
      <li id="${task.id}" class="new__task">
        <div class="check__icon">
            <div>
                <input type="checkbox" id="checkbox-${task.id}" class="hidden__checkbox"/>
                <label for="checkbox-${task.id}" class="my-label" onclick="check(${task.id})"></label>
                <span>${task.name}</span>
            </div>
            <img src="images/Delete__img.svg" class="delete__btn" onclick="deleteTask(this)"/>
        </div>
      </li>
      `;
    }
  });

  tasksList.innerHTML = tasksHtml.join("");
  todoAll.classList.add("active");
  todoActive.classList.remove("active");
  todoCompleted.classList.remove("active");
}

// CLEAR COMPLETED FUNCTIONALITY

function clearCompleted() {
  tasks = tasks.filter((task) => task.isCompleted == false);
  tasksList.innerHTML = "";
  tasks.forEach((task) => {
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

// UPDATE COUNTER FUNCTIONALITY

function updateCounter() {
  counter.innerHTML = `<span>${tasks.length} items left</span>`;
}
// THEME CHANGER FUNCTIONALITY

function changeTheme(alt) {
  if (alt === "moon") {
    bodyBg.style.backgroundImage = "url(images/Dark.svg)";

    bodyBg.style.backgroundColor = "#171823";
    themeChanger.src = "images/Sun.svg";
    themeChanger.alt = "sun";
    root.style.setProperty(
      "--boxShadow",
      "0px 35px 50px -15px rgba(0, 0, 0, 0.5)"
    );

    root.style.setProperty("--themeColor", "#25273D");
    root.style.setProperty("--textColor", "#C8CBE7");
    root.style.setProperty("--borderColor", "#393A4B");
    root.style.setProperty("--todoBtnsColor", "#5B5E7E");
    localStorage.setItem("theme", "dark");
  } else {
    bodyBg.style.backgroundImage = "url(images/Light.svg)";
    bodyBg.style.backgroundColor = "#f2f2f2";
    themeChanger.src = "images/Moon.svg";
    themeChanger.alt = "moon";

    root.style.setProperty(
      "--boxShadow",
      "0px 35px 50px -15px rgba(194, 195, 214, 0.5)"
    );
    root.style.setProperty("--themeColor", "#FFFFFF");
    root.style.setProperty("--textColor", "#494C6B");
    root.style.setProperty("--borderColor", "#E3E4F1");
    root.style.setProperty("--todoBtnsColor", "#9495A5");
    localStorage.setItem("theme", "light");
  }
}

function applySavedTheme() {
  const theme = localStorage.getItem("theme");
  if (theme === "dark") {
    changeTheme("moon");
  } else {
    changeTheme("sun");
  }
  document.body.removeAttribute("hidden");
}

window.onload = applySavedTheme;

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}