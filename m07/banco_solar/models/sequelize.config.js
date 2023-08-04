const Sequelize = require('sequelize')

// 1. Creamos la base de datos
const db = new Sequelize('banco_solar', 'postgres', '1005', {
  host: 'localhost',
  dialect: 'postgres'
})

// 2. Sincronozamos con la base de datos
async function syncDB () {
  try {
    await db.authenticate()
    console.log('Connections has been established successfully');
  }
  catch(error) {
    console.error('Unable to connect to database', error)
  }
}
syncDB()

module.exports = db