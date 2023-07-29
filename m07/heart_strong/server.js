const express = require('express')
const router = require('./routes')

const app = express()

// se configuran estáticos
app.use('/static', express.static("static"))

// Se configura manejo de formularios
app.use( express.json() )
app.use( express.urlencoded({ extended: true }) )

app.use(router)


app.listen(3000, () => console.log("Servidor ejecutando en puerto 3000"))