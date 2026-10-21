# Promanage Backend

Express + TypeScript REST API backed by MySQL.

## Connecting to MySQL

The connection lives in [`src/config/db.ts`](src/config/db.ts) — it reads credentials from environment variables and opens a connection pool with `mysql2/promise`:

```ts
export const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
});
```

Set the real values in `.env` (copy from `.env.example`):

```
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=promanage
```

Then create the database/table once:

```bash
mysql -u root -p < sql/schema.sql
```

`src/server.ts` calls `testConnection()` on startup and fails fast with a clear error if the credentials or host are wrong.

## API

| Method | Route            | Description       |
|--------|------------------|--------------------|
| GET    | `/api/health`    | health check       |
| GET    | `/api/tasks`     | list tasks         |
| POST   | `/api/tasks`     | create a task      |
| PUT    | `/api/tasks/:id` | update a task      |
| DELETE | `/api/tasks/:id` | delete a task      |

Add new resources the same way: a table in `sql/schema.sql`, a controller in `src/controllers/`, a router in `src/routes/`, mounted in `src/server.ts`.

## Scripts

- `npm run dev` — start with auto-reload (nodemon + ts-node)
- `npm run build` — compile to `dist/`
- `npm start` — run the compiled build
