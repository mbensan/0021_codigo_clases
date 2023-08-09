const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const Articulo = db.define('Articulo', {
  nombre: {
    type: dt.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: {
        args: [2, 45],
        msg: 'El nombre no puede ser de largo menor a 2'
      }
    }
  },
  precio: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {timestamps: true})


try {
  db.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Transferencia', err)
}


module.exports = {
  Articulo
}
