const express = require('express')
const routerUsuarios = require('./routes/usuarios')
const routerTransferencias = require('./routes/transferencias')

const app = express()

// se configuran estáticos
app.use('/static', express.static("static"))

// Se configura manejo de formularios
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

// acá nos traemos las rutas
app.use(routerUsuarios)
app.use(routerTransferencias)

app.listen(
  3000,
  () => console.log("Servidor ejecutando en el puerto 3000")
)