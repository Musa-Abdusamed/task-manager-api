const API_BASE = "http://localhost:5000/api/tasks";

const form = document.getElementById("task-form");
const titleInput = document.getElementById("title");
const priorityInput = document.getElementById("priority");
const priorityFilter = document.getElementById("priority-filter");
const taskList = document.getElementById("task-list");
const errorMessage = document.getElementById("error-message");

function showError(message) {
  errorMessage.textContent = message;
}

function clearError() {
  errorMessage.textContent = "";
}

async function fetchTasks() {
  clearError();
  try {
    const priority = priorityFilter.value;
    const url = priority ? `${API_BASE}?priority=${priority}` : API_BASE;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to load tasks.");
    const tasks = await res.json();
    renderTasks(tasks);
  } catch (err) {
    showError(err.message);
  }
}

function renderTasks(tasks) {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    const li = document.createElement("li");
    li.textContent = "No tasks found.";
    taskList.appendChild(li);
    return;
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");

    const info = document.createElement("div");
    info.className = "task-info";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleCompleted(task.id, checkbox.checked));

    const titleSpan = document.createElement("span");
    titleSpan.className = "title" + (task.completed ? " completed" : "");
    titleSpan.textContent = task.title;

    const badge = document.createElement("span");
    badge.className = `priority-badge priority-${task.priority}`;
    badge.textContent = task.priority;

    info.appendChild(checkbox);
    info.appendChild(titleSpan);
    info.appendChild(badge);

    const actions = document.createElement("div");
    actions.className = "task-actions";

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => deleteTask(task.id));

    actions.appendChild(deleteBtn);

    li.appendChild(info);
    li.appendChild(actions);
    taskList.appendChild(li);
  });
}

async function createTask(title, priority) {
  clearError();
  try {
    const res = await fetch(API_BASE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, priority }),
    });
    const data = await res.json();
    if (!res.ok) {
      throw new Error(data.error || "Failed to create task.");
    }
    fetchTasks();
  } catch (err) {
    showError(err.message);
  }
}

async function toggleCompleted(id, completed) {
  clearError();
  try {
    const res = await fetch(`${API_BASE}/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed }),
    });
    if (!res.ok) throw new Error("Failed to update task.");
    fetchTasks();
  } catch (err) {
    showError(err.message);
  }
}

async function deleteTask(id) {
  clearError();
  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete task.");
    fetchTasks();
  } catch (err) {
    showError(err.message);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = titleInput.value.trim();
  const priority = priorityInput.value;

  if (!title || !priority) {
    showError("Please enter a title and select a priority.");
    return;
  }

  createTask(title, priority);
  titleInput.value = "";
  priorityInput.value = "";
});

priorityFilter.addEventListener("change", fetchTasks);

fetchTasks();
