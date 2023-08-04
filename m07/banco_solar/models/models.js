const { DataTypes: dt } = require('sequelize')
const db = require('./sequelize.config')

const Usuario = db.define('Usuario', {
  nombre: {
    type: dt.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isAlpha: {
        msg: 'El nombre sólo puede contener letras'
      },
      len: {
        args: [2, 45],
        msg: 'El nombre no puede ser de largo menor a 2'
      }
    }
  },
  balance: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 0
  }
}, {timestamps: true})



const Transferencia = db.define('Transferencia', {
  monto: {
    type: dt.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
}, {timestamps: true})

Transferencia.belongsTo(Usuario, {as: 'emisor', onDelete: 'cascade'})
Transferencia.belongsTo(Usuario, {as: 'receptor', onDelete: 'cascade'})



const Tarjeta = db.define('Tarjeta', {
  nombre: {
    type: dt.STRING,
    allowNull: false,
    defaultValue: 'Vista'
  }
}, {timestamps: true})


const UsuarioTarjeta = db.define('UsuarioTarjeta', {
  num: {
    type: dt.INTEGER,
    allowNull: false
  }
}, {timestamps: true})

Tarjeta.belongsToMany(Usuario, {through: UsuarioTarjeta, as: 'usuarios'})
Usuario.belongsToMany(Tarjeta, {through: UsuarioTarjeta, as: 'tarjetas'})

//Tarjeta.belongsToMany(Usuario, {through: 'UsuarioTarjeta'})
//Usuario.belongsToMany(Tarjeta, {through: 'UsuarioTarjeta'})

try {
  db.sync()
}
catch(err) {
  console.error('Something went wrong with the SYNC of the table Transferencia', err)
}


module.exports = {
  Usuario: Usuario,
  Transferencia: Transferencia
}