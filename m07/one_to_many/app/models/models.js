// 1. Importamos todo lo que necesitamos
const db = require('../config/sequelize.config')
const User = require('./user')
const Project = require('./project')

// 2. Establecemos las relaciones entre los modelos
//User.hasMany(Project, {as: 'projects'})
Project.belongsTo(User, {as: 'user'})

// 3. Sincronizamos la base de datos
db.sync()

module.exports = {Project, User}