const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'always_music',
  password: '1005',
  min: 3,
  max: 6
})

module.exports = pool