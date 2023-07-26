const pool = require('./db')
const Cursor = require('pg-cursor')


async function crear_estudiante (nombre, rut, curso, nivel) {
  console.log(`Creando el estudiante ${nombre} con rut ${rut} ${curso} ${nivel}`);
  // 1. Solicitar un cliente al pool de conecciones
  const client = await pool.connect()

  // 2. Ejecutar la consulta
  try {
    const {rows} = await client.query({
      text: 'insert into alumnos (rut, nombre, curso, nivel) values ($1, $2, $3, $4) returning *',
      values: [rut, nombre, curso, parseInt(nivel)],
      rowMode: 'array'
    })
    console.log(`Se ha creado el alumno ${nombre}`, rows)

  }
  catch (error) {
    console.log("Error de consulta PG", error)
  }

  // 3. Devolvemos el cliente al pool
  client.release()

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

async function editar_estudiante(nombre, rut, curso, nivel) {
  // 1. Solicitamos un cliente al pool
  const client = await pool.connect() 
  
  // 2. Ejecutamos la consulta
  const {rows} = await client.query(
    'update alumnos set nombre=$1, curso=$2, nivel=$3 where rut=$4',
    [nombre, curso, parseInt(nivel), rut]
  )
  
  // 3. Devolvemos el cliente al pool
  client.release()
  
  // 4. Mostramos el resultado en consola
  console.log(`El registro de ${nombre} ha sido editado con éxito`, rows)
}

async function mostrar_top100() {
  // 1. Solicitamos un cliente al pool
  const client = await pool.connect()

  const cursor = client.query(new Cursor(
    'select * from alumnos where curso=$1',
    ['Indefinido'])
  )
  // pregunto por los primeros 10
  const top10 = await cursor.read(10)
  console.log(top10)

  // 1 seg después, pregunto por los próximos 10
  setTimeout(async () => {
    const sgtes10 = await cursor.read(10)
    console.log(sgtes10);
    cursor.close()
    client.release()
  }, 3000)
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
  else if (accion == 'editar') {
    const nombre = palabras[3]
    const rut = palabras[4]
    const curso = palabras[5]
    const nivel = palabras[6]
    
    editar_estudiante(nombre, rut, curso, nivel)
  }

  else if (accion == 'top') {
    mostrar_top100()
  }

  else {
    console.log("Acción no implementada")
  }
}
init()




