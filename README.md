# 🌱 TaskNest — Task Manager

A simple full-stack task management application that helps users organize, prioritize, and track their daily tasks.

---

 📌 About The Project

TaskNest is a full-stack Task Manager application built with Node.js and Express. The project focuses on building a clean REST API, following MVC architecture, and connecting a frontend with a backend.
---

Architecture

```text
Frontend
   ↓
REST API
   ↓
Routes
   ↓
Controllers
   ↓
Services
   ↓
Data
```
---
✨ Features

✅ Create tasks

📋 View all tasks

🔍 Get task by ID

✏️ Update tasks

🗑️ Delete tasks

☑️ Mark tasks as completed

🎯 Manage task priorities

📊 Track completion progress
---

##🛠️ Tech Stack
Frontend
HTML

CSS

JavaScript (ES6)

Backend
Node.js

Express.js

Tools
Git & GitHub

Postman

dotenv

CORS
---
##🏗️ Project Structure
```
task-manager/
│
├── backend/
│   ├── index.js
│   ├── .env
│   ├── routes/
│   │   └── taskRoutes.js
│   ├── controllers/
│   │   └── taskController.js
│   ├── services/
│   │   └── taskService.js
│   └── data/
│       └── taskData.js
│
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js
```
---

API EndpointsMethodEndpointDescriptionGET/api/tasksGet all tasksGET/api/tasks/:idGet task by IDPOST/api/tasksCreate a taskPATCH/api/tasks/:idUpdate a taskDELETE/api/tasks/:idDelete a task
---

