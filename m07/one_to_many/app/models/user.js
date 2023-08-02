const { DataTypes: dt } = require('sequelize')
const db = require('../config/sequelize.config')

const User = db.define('User', {
  name: {
    type: dt.STRING,
    allowNull: false
  }
}, {timestamps: true})

// try {
//   User.sync()
// }
// catch(err) {
//   console.error('Something went wrong with the SYNC of the table User', err)
// }


module.exports = User