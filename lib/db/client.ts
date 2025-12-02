/**
 * Database client for Netlify DB (Neon Postgres)
 * Provides connection pooling and query helpers
 */

import { neon, neonConfig } from "@neondatabase/serverless";

// Configure Neon for optimal performance
neonConfig.fetchConnectionCache = true;

/**
 * Get database connection string from environment
 * Netlify DB sets NETLIFY_DATABASE_URL (pooled) or NETLIFY_DATABASE_URL_UNPOOLED
 */
function getDatabaseUrl(): string {
  // Prefer pooled connection for serverless functions (better performance)
  const url =
    process.env.NETLIFY_DATABASE_URL ||
    process.env.NETLIFY_DATABASE_URL_UNPOOLED;

  if (!url) {
    throw new Error(
      "Database URL environment variable is not set. " +
        "Expected NETLIFY_DATABASE_URL, or NETLIFY_DATABASE_URL_UNPOOLED. " +
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
