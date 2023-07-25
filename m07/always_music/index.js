const { Pool } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'always_music',
  password: '1005',
  min: 3,
  max: 6
})

async function crear_estudiante (nombre, rut, curso, nivel) {
  console.log(`Creando el estudiante ${nombre} con rut ${rut} ${curso} ${nivel}`);
  // 1. Solicitar un cliente al pool de conecciones
  const client = await pool.connect()

  // 2. Ejecutar la consulta
  try {
    await client.query(
      'insert into alumnos (rut, nombre, curso, nivel) values ($1, $2, $3, $4)',
      [rut, nombre, curso, parseInt(nivel)]
    )
  }
  catch (error) {
    console.log("Error de consulta PG", error)
  }

  // 3. Devolvemos el cliente al pool
  client.release()

  console.log(`Se ha creado el alumno ${nombre}`)
}

async function consultar_estudiantes () {
  // 1. Solicitamos un cliente al pool
  const client = await pool.connect() 

  // 2. Ejecutamos la consulta
  const {rows} = await client.query('select * from alumnos')
  
  // 3. Devolvemos el cliente al pool
  client.release()
  
  // 4. Mostramos el resultado en consola
  console.log(rows)
}

function init () {
  const palabras = process.argv
  const accion = palabras[2]

  if (accion == 'nuevo') {
    const nombre = palabras[3]
    const rut = palabras[4]
    const curso = palabras[5]
    const nivel = palabras[6]

    crear_estudiante(nombre, rut, curso, nivel)
  }
  else if (accion == 'consulta') {
    consultar_estudiantes()
  }

  else {
    console.log("Acción no implementada")
  }
}
init()




