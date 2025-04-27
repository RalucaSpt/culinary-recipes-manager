const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://postgres:HdSPPQpRHWjasmwVUaRfTunmfroqRhOe@shortline.proxy.rlwy.net:56402/railway',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = pool;
    