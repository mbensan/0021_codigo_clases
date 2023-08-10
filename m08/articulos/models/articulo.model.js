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
        msg: 'El largo del nombre debe medir entre 2 y 45 caracteres'
      }
    }
  },
  precio: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: {
      min: {
        args: [1],
        msg: 'El valor del precio no puede ser menor a 1'
      },
      max: {
        args: [1000000],
        msg: 'El valor del precio no puede ser mayor a 1 millón'
      }
      
    }
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
