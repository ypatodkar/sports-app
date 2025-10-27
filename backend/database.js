import pkg from 'pg';
const { Pool } = pkg;

// PostgreSQL connection pool
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

// Initialize database tables
const initializeDatabase = async () => {
  try {
    // Create users table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        uid VARCHAR(255) UNIQUE NOT NULL,
        email VARCHAR(255) NOT NULL,
        display_name VARCHAR(255),
        photo_url TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        last_login TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        login_count INTEGER DEFAULT 1
      )
    `);

    // Create index on uid for faster lookups
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_uid ON users(uid)`);

    // Create search_queries table to track all user searches
    await pool.query(`
      CREATE TABLE IF NOT EXISTS search_queries (
        id SERIAL PRIMARY KEY,
        user_uid VARCHAR(255) NOT NULL,
        sport VARCHAR(50) NOT NULL,
        query_text TEXT NOT NULL,
        has_error BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_uid) REFERENCES users(uid) ON DELETE CASCADE
      )
    `);

    // Create indexes for faster analytics queries
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_queries_user ON search_queries(user_uid)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_queries_sport ON search_queries(sport)`);
    await pool.query(`CREATE INDEX IF NOT EXISTS idx_queries_created ON search_queries(created_at)`);

    console.log('✅ PostgreSQL database initialized successfully');
  } catch (error) {
    console.error('❌ Error initializing database:', error);
    throw error;
  }
};

// Initialize on module load
initializeDatabase();

export default pool;

