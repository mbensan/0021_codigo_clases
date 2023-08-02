const { DataTypes: dt } = require('sequelize')
const db = require('../config/sequelize.config')

const Project = db.define('Project', {
  name: {
    type: dt.STRING,
    allowNull: false
  }
}, {timestamps: true})

// try {
//   Project.sync()
// }
// catch(err) {
//   console.error('Something went wrong with the SYNC of the table Project', err)
// }


module.exports = Project