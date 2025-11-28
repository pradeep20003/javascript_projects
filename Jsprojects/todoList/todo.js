document.addEventListener("DOMContentLoaded", loadTasks);

const addButton = document.getElementById("add-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

addButton.addEventListener("click", addTask);

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    alert("Please enter a task.");
    return;
  }

  const task = {
    text: taskText,
    completed: false,
  };

  saveTaskToLocalStorage(task);
  taskInput.value = ""; // Clear input field
  displayTasks(); // Refresh task list
}

function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function getTasksFromLocalStorage() {
  const tasks = localStorage.getItem("tasks");
  return tasks ? JSON.parse(tasks) : [];
}

function loadTasks() {
  displayTasks();
}

function displayTasks() {
  const tasks = getTasksFromLocalStorage();
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    // Only add class if task is completed
    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTaskCompletion(index));

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function toggleTaskCompletion(index) {
  let tasks = getTasksFromLocalStorage();
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(); // Refresh task list
}

function deleteTask(index) {
  let tasks = getTasksFromLocalStorage();
  tasks.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(tasks));
  displayTasks(); // Refresh task list
}
