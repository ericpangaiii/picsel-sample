import pg from "pg";
const { Pool } = pg;

// plugin for database and server connection
const pool = new Pool({
    user: 'postgres',
    password: 'useruser',   // credentials may differ depending on how you configured your PostgreSQL installation
    host: 'localhost',
    port: 5432,
    database: 'picsel'
});

export { pool };