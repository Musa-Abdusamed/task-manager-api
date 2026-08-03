# Task Manager REST API

A full-stack Task Manager built with **Express** (MVC structure) on the backend and vanilla **HTML/CSS/JS** on the frontend.

## Project Structure

```
task-manager-api/
├── backend/
│   ├── .env
│   ├── index.js
│   ├── config/env.js
│   ├── data/taskData.js
│   ├── services/taskService.js
│   ├── controllers/taskController.js
│   └── routes/taskRoutes.js
└── frontend/
    ├── index.html
    ├── style.css
    └── app.js
```

## Task Model

```json
{
  "id": 1,
  "title": "Finish lecture 2 homework",
  "completed": false,
  "priority": "high"
}
```

- `id`: auto-generated
- `title`: required, non-empty string
- `completed`: boolean, defaults to `false`
- `priority`: required, one of `low` | `medium` | `high`

## Getting Started

### 1. Backend

```bash
cd backend
npm install
npm run dev
```

The server starts on `http://localhost:5000` (configurable via `.env`).

`.env` contains:
```
PORT=5000
APP_NAME=Task Manager API
```

### 2. Frontend

Open `frontend/index.html` directly in your browser (or serve it with any static server). It talks to the API at `http://localhost:5000/api/tasks`.

## API Endpoints

| Method | Route             | Description                     |
|--------|-------------------|----------------------------------|
| GET    | `/api/tasks`      | Get all tasks (supports filters)|
| GET    | `/api/tasks/:id`  | Get a single task by id         |
| POST   | `/api/tasks`      | Create a new task               |
| PATCH  | `/api/tasks/:id`  | Update a task (partial)         |
| DELETE | `/api/tasks/:id`  | Delete a task                   |

### Query Filters (Bonus)

`GET /api/tasks?priority=high`
`GET /api/tasks?completed=true`

### Example Requests

**Create a task**
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Buy groceries","priority":"medium"}'
```

**Toggle completed (Bonus)**
```bash
curl -X PATCH http://localhost:5000/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"completed":true}'
```

**Delete a task**
```bash
curl -X DELETE http://localhost:5000/api/tasks/1
```

## Error Handling

- `404` — Task not found (GET/PATCH/DELETE with invalid id), or unknown route
- `400` — Invalid POST/PATCH body (missing title, missing/invalid priority, wrong types)
- `500` — Unexpected server error

## Middleware

- `cors()` — enables cross-origin requests from the frontend
- `express.json()` — parses JSON request bodies
- Custom 404 handler for unmatched routes
- Custom error-handling middleware for uncaught errors

## Features Implemented

- ✅ Full CRUD (GET all, GET one, POST, PATCH, DELETE)
- ✅ MVC structure (routes → controllers → services → data)
- ✅ `.env` config for `PORT` and `APP_NAME`
- ✅ CORS enabled
- ✅ Proper HTTP status codes and error handling
- ✅ Frontend with GET (list) and POST (create) support
- ✅ Bonus: toggle completed via checkbox
- ✅ Bonus: filtering with query params (`priority`, `completed`)
- ✅ Bonus: delete from UI

## Notes

If deploying online, update `API_BASE` in `frontend/app.js` to point to your deployed backend URL instead of `http://localhost:5000`.
