const express = require('express');
const jwt = require('jsonwebtoken')
const router = express.Router();

const llave_secreta = 'topsecret'

const users = [
  {id: 1, nombre: 'Carlos Salvo', email: 'csalvo@gmail.com', pass: 'abc123'},
  {id: 1, nombre: 'Paola Brito', email: 'pbrito@gmail.com', pass: '1234'},
  {id: 1, nombre: 'Diego Pinto', email: 'dpinto@gmail.com', pass: '1111'}
]

/* Para crear un JWT. */
router.post('/login', function(req, res, next) {

  // 1. Recibo los parámetros del formulario
  const {email, password} = req.body

  // 2. Calculo 1 hora más
  const una_hora = Math.floor(new Date()/1000) + 3600

  // 3. Creo el token
  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: 5,
      email: email
    }
  }, llave_secreta)

  // 4. Le retorno el token al cliente
  res.json(token);
});

/* Para leer un JWT */
router.post('/read', function (req, res) {
  const {token} = req.body

  let decoded;
  try {
    decoded = jwt.verify(token, llave_secreta)
  }
  catch(error) {
    return res.status(400).json(error)
  }
  res.json(decoded)
})

module.exports = router;