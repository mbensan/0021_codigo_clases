const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const Ejercicio = db.define('Ejercicio', {
  nombre: {
    type: dt.STRING,
    allowNull: false,
    unique: true
  },
  series: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
  repeticiones: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 10
  },
  descanso: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 30
  }
}, {timestamps: true})

try {
  Ejercicio.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Ejercicio', err)
}

module.exports = Ejercicio
