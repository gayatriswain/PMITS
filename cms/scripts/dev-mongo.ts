/**
 * Local development MongoDB (no system install needed).
 *
 * Starts a real `mongod` binary (downloaded once by mongodb-memory-server) on 127.0.0.1:27017
 * with persistent storage in ./.mongo-data, so data survives restarts.
 *
 *   npm run db:dev
 *
 * Production must NOT use this - point MONGODB_URI at MongoDB Atlas or a managed server instead.
 */
import { MongoMemoryServer } from "mongodb-memory-server";
import { mkdirSync } from "node:fs";
import path from "node:path";

const port = Number(process.env.DEV_MONGO_PORT || 27017);
const dbPath = path.resolve(process.cwd(), ".mongo-data");

async function main() {
  mkdirSync(dbPath, { recursive: true });
  const server = await MongoMemoryServer.create({
    instance: { port, ip: "127.0.0.1", dbPath, storageEngine: "wiredTiger" },
  });
  console.log(`Dev MongoDB running at ${server.getUri()} (data: ${dbPath})`);
  console.log("Set MONGODB_URI=mongodb://127.0.0.1:%d/promanage in .env.local. Ctrl+C to stop.", port);

  const stop = async () => {
    await server.stop({ doCleanup: false, force: false });
    process.exit(0);
  };
  process.on("SIGINT", stop);
  process.on("SIGTERM", stop);
}

main().catch((err) => {
  console.error("Could not start dev MongoDB:", err);
  process.exit(1);
});
