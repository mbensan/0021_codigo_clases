/**
 * Usuarios
 * nombre
 * email
 * password
 * tipo
 * saldo
 */

// 1. Nos traemos la librería
const express = require('express')
const app = express()

// 2. Configuramos para poder recibir datos
app.use(express.urlencoded({ extended: true }));

// 3. Crear nuestras rutas
app.get('/usuarios', function (req, res) {
  // 3.1 Leer datos de donde estén los usuarios

  // 3.2 Devolver los usuarios que leímos
  return '**Por implementar**. Devuelve la lista de usuarios'
})

// 4. Correr el servidor
app.listen(3000, () => {
  console.log("Servidor ejecutando en el puerto 3000")
})