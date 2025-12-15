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
    // In development, provide helpful error message but don't throw
    if (process.env.NODE_ENV === "development") {
      console.warn(
        "⚠️  Database URL not configured. Survey features will not work.\n" +
          "To enable surveys, add NETLIFY_DATABASE_URL to your .env.local file.\n" +
          "Get a free database at: https://neon.tech",
      );
      return ""; // Return empty string to prevent crashes during build
    }

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
  const url = getDatabaseUrl();

  // In development without a database URL, return a mock client
  if (!url) {
    // Return a proxy that throws helpful errors when methods are called
    return new Proxy(
      () => Promise.reject(new Error("Database not configured")),
      {
        get: () => () => Promise.reject(new Error("Database not configured")),
      },
    ) as any;
  }

  const sql = neon(url);
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
