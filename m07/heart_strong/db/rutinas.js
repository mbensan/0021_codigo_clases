const pool = require('./pool')

(async function () {
  const client = await pool.connect()

  await client.query(`
    create table rutinas (
      id serial primary key,
      nombre varchar(255) not null,
      intensidad int not null default 1
    )
  `)
  
  await client.query(`
    create table pertenece (
      id serial primary key,
      ejercicio_id int not null,
      rutina_id int not null,
      foreign key (ejercicio_id) references ejercicios(id),
      foreign key (rutina_id) references rutinas(id)
    )
  `)

  client.release()

})()


async function create (nombre, intensidad=1) {
  const client = await pool.connect()

  client.query({
    text: "insert into rutinas (nombre, intensidad) values ($1, $2)",
    values: [nombre, intensidad]
  })

  client.release()
}

async function fetchAll () {
  const client = await pool.connect()

  const {rows} = await client.query('select * from rutinas')
  client.release()

  return rows
}

async function getById (id) {
  const client = await pool.connect()

  const {rows} = await client.query({
    text: 'select * from rutinas where id=$1',
    values: [id]
  })

  client.release()

  return rows[0]
}