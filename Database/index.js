const { Pool, Client } = require('pg');

const credentials = {
  host: 'localhost',
  port: 5432,
  user: 'Rhoads',
  password: null,
  database: 'products_database',
  max: 20,
};

const pool = new Pool(credentials);

pool.connect()
.then(() => console.log('connected to database'))
.catch((err) => console.log(err));

module.exports = {
  async query(text, params, callback) {
    const results = await pool.query(text, params, callback);
    return results;
  }
};