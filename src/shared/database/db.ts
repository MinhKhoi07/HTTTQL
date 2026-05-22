import mysql, { Pool } from "mysql2/promise";

import { env } from "../../config/env";

let pool: Pool | null = null;
let connected = false;

const createPool = (): Pool =>
  mysql.createPool({
    host: env.dbHost,
    port: env.dbPort,
    user: env.dbUser,
    password: env.dbPassword,
    database: env.dbName,
    waitForConnections: true,
    connectionLimit: env.dbConnectionLimit
  });

export const db = {
  get connected(): boolean {
    return connected;
  },
  getPool(): Pool {
    if (!pool) {
      throw new Error("Database has not been connected yet.");
    }

    return pool;
  },
  async connect(): Promise<Pool> {
    if (pool) {
      return pool;
    }

    pool = createPool();
    const connection = await pool.getConnection();
    connection.release();
    connected = true;

    return pool;
  },
  async close(): Promise<void> {
    if (!pool) {
      return;
    }

    await pool.end();
    pool = null;
    connected = false;
  }
};
