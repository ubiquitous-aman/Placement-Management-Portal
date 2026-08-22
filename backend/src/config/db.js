'use strict';

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '..', '.env') });

const { Pool } = require('pg');

// In test environment, use a separate database to avoid polluting dev data
const connectionString =
  process.env.NODE_ENV === 'test'
    ? (process.env.TEST_DATABASE_URL || process.env.DATABASE_URL)
    : process.env.DATABASE_URL;

const pool = new Pool({
  connectionString,
  // Maximum simultaneous connections in the pool
  max: 10,
  // How long (ms) to wait for a connection before throwing an error
  connectionTimeoutMillis: 5000,
  // How long (ms) an idle connection stays in the pool before being closed
  idleTimeoutMillis: 30000,
});

// Log connection errors so they are visible in server logs
pool.on('error', (err) => {
  console.error('[db] Unexpected pool error:', err.message);
});

/**
 * query — wrapper around pool.query for consistent interface.
 *
 * Usage:
 *   const { rows } = await db.query('SELECT * FROM users WHERE id = $1', [id]);
 *
 * $1, $2 are parameterized placeholders — they prevent SQL injection.
 * The pg library escapes values before passing them to PostgreSQL.
 */
const query = (text, params) => pool.query(text, params);

/**
 * getClient — get a raw client for transactions.
 *
 * Usage:
 *   const client = await db.getClient();
 *   try {
 *     await client.query('BEGIN');
 *     await client.query(...);
 *     await client.query('COMMIT');
 *   } catch (e) {
 *     await client.query('ROLLBACK');
 *   } finally {
 *     client.release(); // ALWAYS release back to pool
 *   }
 */
const getClient = () => pool.connect();

module.exports = { query, getClient, pool };
