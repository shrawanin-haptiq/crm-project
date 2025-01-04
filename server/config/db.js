import pg from "pg";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const { Pool } = pg;

// Configure the connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

// Export the pool for reuse
export default pool;

// Function to check the database connection
export const checkDbConnection = async () => {
  try {
    // Get a client from the pool
    const client = await pool.connect();

    // Run a test query
    const result = await client.query("SELECT NOW() AS current_time");
    console.log("Database Connection Successful!");
    console.log("Current Time from DB:", result.rows[0].current_time);

    // Release the client back to the pool
    client.release();
  } catch (error) {
    console.error("Database Connection Failed:", error.message);
  }
};

// Call this function only during setup/debugging, not during runtime
// checkDbConnection();
