import "dotenv/config";

import { env } from "./config/env";
import { app } from "./app";
import { db } from "./shared/database/db";

const startServer = async (): Promise<void> => {
  await db.connect();

  app.listen(env.port, () => {
    console.log(`Server is running on http://localhost:${env.port}`);
    console.log(`Connected to MySQL database ${env.dbName} on ${env.dbHost}:${env.dbPort}`);
  });
};

startServer().catch((error: unknown) => {
  console.error("Failed to start server:", error);
  process.exit(1);
});
