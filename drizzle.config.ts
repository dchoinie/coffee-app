import type { Config } from "drizzle-kit";

export default {
  schema: "./lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    host: "aws-0-us-east-1.pooler.supabase.com",
    port: 6543,
    database: "postgres",
    user: "postgres.lyutsjsokzxnvaeeuwlt",
    password: "pgzVoElskP3qXV6y",
    ssl: {
      rejectUnauthorized: false,
    },
  },
} satisfies Config;
