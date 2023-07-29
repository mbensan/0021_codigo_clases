const pool = require('./pool')

async function create (nombre, series, repeticiones, descanso) {
  const client = await pool.connect()

  client.query({
    text: "insert into ejercicios (nombre, series, repeticiones, descanso) values ($1, $2, $3, $4)",
    values: [nombre, series, repeticiones, descanso]
  })

  client.release()
}

async function fetchAll () {
  const client = await pool.connect()

  const {rows} = await client.query('select * from ejercicios')
  client.release()

  return rows
}

// Structured Query

module.exports = { create, fetchAll }