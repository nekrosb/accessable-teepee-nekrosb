# Project (accessable-teepee-nekrosb)

Main repository of the project, consisting of a database (PostgreSQL), backend (Elysia + Bun), and frontend (React + Vite + TanStack Router).

## How to run the project

### 1. Database (PostgreSQL)
Docker is required to run the database.

In your terminal, go to the `database` folder and start the container:
```bash
cd database
docker compose up -d
```
- **Port:** `5432`
- **User:** `postgres`
- **Password:** `password`
- **Database:** `app_database`

### 2. Backend (Elysia)
The backend uses the [Bun](https://bun.sh/) runtime.

In a new terminal, navigate to the `backend` folder, install dependencies, and start the server:
```bash
cd backend
bun install
bun run dev
```
- **Local Address / Port:** `http://localhost:3000`

### 3. Frontend (React + Vite)
The frontend also uses Bun for dependency management.

In a new terminal, navigate to the `frontend` folder, install dependencies, and start the server:
```bash
cd frontend
bun install
bun --bun run dev
```
- **Local Address / Port:** `http://localhost:5173`

---

After starting all three services, you can open the frontend in your browser at [http://localhost:5173](http://localhost:5173), and the backend will accept requests at [http://localhost:3000](http://localhost:3000).
