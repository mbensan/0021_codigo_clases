const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const Usuario = db.define('Usuario', {
  nombre: {
    type: dt.STRING,
    allowNull: false,
    unique: true
  },
  balance: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {timestamps: true})

try {
  Usuario.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Ejercicio', err)
}

const Transferencia = db.define('Transferencia', {
  monto: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {timestamps: true})

Transferencia.belongsTo(Usuario, {as: 'emisor', onDelete: 'cascade'})
Transferencia.belongsTo(Usuario, {as: 'receptor', onDelete: 'cascade'})

try {
  Transferencia.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Transferencia', err)
}

module.exports = {
  Usuario: Usuario,
  Transferencia: Transferencia
}