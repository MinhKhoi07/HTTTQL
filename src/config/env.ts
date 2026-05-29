const parseNumber = (value: string | undefined, fallback: number): number => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

export const env = {
  nodeEnv: process.env.NODE_ENV ?? "development",
  port: parseNumber(process.env.PORT, 3000),
  dbHost: process.env.DB_HOST ?? "localhost",
  dbPort: parseNumber(process.env.DB_PORT, 3306),
  dbUser: process.env.DB_USER ?? "root",
  dbPassword: process.env.DB_PASSWORD ?? "",
  dbName: process.env.DB_NAME ?? "htttql",
  dbConnectionLimit: parseNumber(process.env.DB_CONNECTION_LIMIT, 10)
  ,
  jwtSecret: process.env.JWT_SECRET ?? "change_me_in_production",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? "8h"
};

