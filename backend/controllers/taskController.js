const taskService = require("../services/taskService");

function getTasks(req, res) {
  const { completed, priority } = req.query;
  const tasks = taskService.getAllTasks({ completed, priority });
  res.status(200).json(tasks);
}

function getTask(req, res) {
  const task = taskService.getTaskById(req.params.id);
  if (!task) {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json(task);
}

function createTask(req, res) {
  const result = taskService.createTask(req.body || {});
  if (result.error) {
    return res.status(400).json({ error: result.error });
  }
  res.status(201).json(result.task);
}

function updateTask(req, res) {
  const result = taskService.updateTask(req.params.id, req.body || {});
  if (result.error === "not_found") {
    return res.status(404).json({ error: "Task not found" });
  }
  if (result.error === "invalid") {
    return res.status(400).json({ error: result.message });
  }
  res.status(200).json(result.task);
}

function deleteTask(req, res) {
  const result = taskService.deleteTask(req.params.id);
  if (result.error === "not_found") {
    return res.status(404).json({ error: "Task not found" });
  }
  res.status(200).json({ message: "Task deleted", task: result.task });
}

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
