/**
 * Database client for Netlify DB (Neon Postgres)
 * Provides connection pooling and query helpers
 */

import { neon, neonConfig } from "@neondatabase/serverless";

// Configure Neon for optimal performance
neonConfig.fetchConnectionCache = true;

/**
 * Get database connection string from environment
 * Netlify DB sets DATABASE_URL automatically
 */
function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;

  if (!url) {
    throw new Error(
      "DATABASE_URL environment variable is not set. " +
        "Make sure Netlify DB is enabled in your Netlify project.",
    );
  }

  return url;
}

/**
 * Create a new SQL query client
 * Uses connection pooling for better performance
 */
export function getDbClient() {
  const sql = neon(getDatabaseUrl());
  return sql;
}

/**
 * Initialize database schema
 * Run the schema.sql file manually via your database client
 * or use a migration tool like Drizzle or Prisma
 *
 * Note: Neon client doesn't support executing raw multi-statement SQL strings
 * You should run the schema.sql file separately through:
 * - Neon console
 * - Netlify DB console
 * - psql command line tool
 */
// export async function initializeSchema(): Promise<void> {
//   // This function is commented out because Neon's tagged template syntax
//   // doesn't support executing raw SQL strings with multiple statements
//   // See lib/db/schema.sql for the schema definition
// }

/**
 * Health check: verify database connection
 */
export async function checkConnection(): Promise<boolean> {
  try {
    const client = getDbClient();
    await client`SELECT 1 as health`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  }
}
