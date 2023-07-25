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

  const query = `insert into alumnos (rut, nombre, curso, nivel) values ('${rut}', '${nombre}', '${curso}', ${parseInt(nivel)})`
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

  else {
    console.log("Acción no implementada")
  }
}
init()




