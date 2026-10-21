# Promanage

Monorepo with two separate projects:

- [`frontend/`](frontend/) — Next.js app (UI)
- [`backend/`](backend/) — Express + TypeScript REST API, connected to MySQL

## Setup

### 1. Backend

```bash
cd backend
npm install
cp .env.example .env   # edit DB_USER / DB_PASSWORD / DB_NAME to match your MySQL setup
```

Create the database and table (run once in MySQL):

```bash
mysql -u root -p < sql/schema.sql
```

Run the API:

```bash
npm run dev
```

It starts on `http://localhost:5000`. Check `http://localhost:5000/api/health`.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

It starts on `http://localhost:3000`. Call the backend from the frontend using `http://localhost:5000/api/...`.

See [`backend/README.md`](backend/README.md) for API details and [`frontend/README.md`](frontend/README.md) for the Next.js app.
