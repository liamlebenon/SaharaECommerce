// Set up configuration for the Database
const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'me',
    password: 'lillylab',
    database: 'sahara_database',
    host: 'localhost',
    port: 5432
});

module.exports = {
    query: (text, params) => pool.query(text, params),
    pool
};