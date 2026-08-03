const express = require("express");
const cors = require("cors");
const { PORT, APP_NAME } = require("./config/env");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: `${APP_NAME} is running.` });
});

app.use("/api/tasks", taskRoutes);

// 404 handler for unknown routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Generic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(PORT, () => {
  console.log(`${APP_NAME} listening on http://localhost:${PORT}`);
});
