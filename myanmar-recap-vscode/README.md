# Myanmar Recap — VS Code Starter

This project contains:
- `frontend/`: the dashboard UI, separated into HTML, CSS, and JavaScript.
- `backend/`: a starter Express + TypeScript API with MySQL project CRUD routes.
- `database/schema.sql`: database setup.

## 1. Open in VS Code

1. Extract `myanmar-recap-vscode.zip`.
2. Open the extracted `myanmar-recap-vscode` folder in VS Code.
3. Open a terminal in VS Code.

## 2. Run the frontend first

The frontend currently uses browser `localStorage`, so it works without MySQL or the backend.

Recommended:
1. Install the VS Code extension **Live Server**.
2. Right-click `frontend/index.html`.
3. Select **Open with Live Server**.

Projects are saved in that browser only in this starter version.

## 3. Set up the database

1. Start MySQL.
2. Open `database/schema.sql` in MySQL Workbench or another SQL client.
3. Run the whole script. It creates the `myanmar_recap` database and `projects` table.

## 4. Configure the backend

Open a terminal:

```bash
cd backend
npm install
```

Copy `.env.example` to `.env`, then update your MySQL username and password.

Start the API:

```bash
npm run dev
```

API health check:
`http://localhost:5000/api/health`

Project endpoints:
- `GET /api/projects`
- `POST /api/projects`
- `PATCH /api/projects/:id/status`
- `DELETE /api/projects/:id`

Example POST body:

```json
{
  "name": "My first recap",
  "contentType": "Movie Recap",
  "language": "Myanmar"
}
```

## Important

The dashboard is currently connected to `localStorage`, not the MySQL API. The backend is a separate working starter. The next integration step is updating the frontend project functions to call the API instead of localStorage.

Do not put database passwords or API keys in frontend JavaScript. Keep secrets in `backend/.env`.
