const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'heartstrong',
  password: '1005',
  min: 3,
  max: 6
})

async function init () {
  const client = await pool.connect()

  await client.query(`
    create table if not exists ejercicios (
      id serial primary key,
      nombre varchar(255) not null unique,
      series int not null default 1,
      repeticiones int not null default 1,
      descanso int not null default 1
    )
  `)

  client.release()
}
init()

module.exports = pool