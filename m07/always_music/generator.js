const axios = require('axios')
const pool = require('./db')


async function init () {
  const url = 'https://randomuser.me/api/?results=100'

  const {data} = await axios.get(url)
  
  const new_users = data.results.map(
    user => {
      return {
        nombre: user.name.first + ' ' + user.name.last,
        rut: user.cell,
        curso: 'Indefinido',
        nivel: 1
      }
    }
  )

  const client = await pool.connect()

  for (let user of new_users) {
    client.query({
      text: 'insert into alumnos (rut, nombre, curso, nivel) values ($1, $2, $3, $4)',
      values: [user.rut, user.nombre, user.curso, user.nivel]
    })
  }

  client.release()

  console.log(new_users);
}

init()