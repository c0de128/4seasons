import { defineConfig } from "drizzle-kit";

// For development, allow running without database
const databaseUrl = process.env.DATABASE_URL || "postgresql://localhost:5432/4seasons_dev";

if (!process.env.DATABASE_URL) {
  console.warn("DATABASE_URL not provided, using default for development");
}

export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
