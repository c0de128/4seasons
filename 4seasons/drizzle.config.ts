import { defineConfig } from "drizzle-kit";

// For development, allow running without database
const databaseUrl = process.env.DATABASE_URL || "file:./dev.db";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not provided, using default SQLite for development");
}

const isPostgres = databaseUrl.startsWith("postgresql://") || databaseUrl.startsWith("postgres://");

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: isPostgres ? "postgresql" : "sqlite",
  dbCredentials: isPostgres ? {
    url: databaseUrl,
  } : {
    url: databaseUrl,
  },
});
