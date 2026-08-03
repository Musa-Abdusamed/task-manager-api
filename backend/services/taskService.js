const tasks = require("../data/taskData");

const VALID_PRIORITIES = ["low", "medium", "high"];

let nextId = tasks.length ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

function getAllTasks(filters = {}) {
  let result = [...tasks];

  if (typeof filters.completed !== "undefined") {
    const completedBool = filters.completed === "true";
    result = result.filter((t) => t.completed === completedBool);
  }

  if (filters.priority) {
    result = result.filter((t) => t.priority === filters.priority);
  }

  return result;
}

function getTaskById(id) {
  return tasks.find((t) => t.id === Number(id));
}

function createTask(data) {
  const { title, priority } = data;

  if (!title || typeof title !== "string" || !title.trim()) {
    return { error: "Title is required and must be a non-empty string." };
  }

  if (!priority || !VALID_PRIORITIES.includes(priority)) {
    return { error: `Priority is required and must be one of: ${VALID_PRIORITIES.join(", ")}.` };
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    completed: Boolean(data.completed) || false,
    priority,
  };

  tasks.push(newTask);
  return { task: newTask };
}

function updateTask(id, updates) {
  const task = getTaskById(id);
  if (!task) return { error: "not_found" };

  if (typeof updates.title !== "undefined") {
    if (typeof updates.title !== "string" || !updates.title.trim()) {
      return { error: "invalid", message: "Title must be a non-empty string." };
    }
    task.title = updates.title.trim();
  }

  if (typeof updates.completed !== "undefined") {
    if (typeof updates.completed !== "boolean") {
      return { error: "invalid", message: "Completed must be a boolean." };
    }
    task.completed = updates.completed;
  }

  if (typeof updates.priority !== "undefined") {
    if (!VALID_PRIORITIES.includes(updates.priority)) {
      return { error: "invalid", message: `Priority must be one of: ${VALID_PRIORITIES.join(", ")}.` };
    }
    task.priority = updates.priority;
  }

  return { task };
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === Number(id));
  if (index === -1) return { error: "not_found" };

  const [deleted] = tasks.splice(index, 1);
  return { task: deleted };
}

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
