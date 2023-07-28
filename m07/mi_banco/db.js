const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'banco',
  password: '1005',
  min: 3,
  max: 6
})

async function init () {
  const client = await pool.connect()

  await client.query(`
    create table if not exists cuentas (
      id serial primary key,
      saldo integer not null default 0 check > 0
    )
  `)
  
  await client.query(`
    create table if not exists transacciones (
      id serial primary key,
      fecha timestamp not null default now(),
      descr varchar(255) not null default 'Sin descripcion',
      emisor int not null,
      receptor int not null,
      monto integer not null,
      foreign key (emisor) references cuentas(id),
      foreign key (receptor) references cuentas(id)
    )
  `)

  client.release()
}
init()

module.exports = pool