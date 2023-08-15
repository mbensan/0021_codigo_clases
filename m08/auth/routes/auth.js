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

  // 2. Verificamos que el usuario exista en la BBDD
  const user = users.find(obj => obj.email == email)
  if (!user) {
    return res.status(404).json({err: 'Usuario inexistente'})
  }

  // 3. Verificamos que la contraseña sea la correcta
  if (user.pass != password) {
    return res.status(400).json({err: 'Contraseña incorrecta'})
  }

  // 3. Calculo 1 hora más
  const una_hora = Math.floor(new Date()/1000) + 3600

  // 4. Creo el token
  const token = jwt.sign({
    exp: una_hora,
    data: {
      id: user.id,
      email: user.email,
      nombre: user.nombre
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

router.get('/my', (req, res) => {
  // quiero que esta ruta sólo sea para usuarios logueados
  // Si puedo abrir el token, entonces asumimos que el usuario SI está logueado
  // 1. Verificamos que tenga un token válido
  const {authorization} = req.headers

  let decoded;
  try {
    decoded = jwt.verify(authorization, llave_secreta)
  }
  catch(error) {
    return res.status(400).json(error)
  }
  // 2. Verificamos que el token aún no ah expirado
  const now = (new Date() / 1000)
  if (now > decoded.exp) {
    return res.status(401).json({
      err: 'Tu token expiró'
    })
  }
  // 3. Si todo está ok, devolvemos el dinero
  res.json({
    nombre: decoded.data.nombre,
    dinero: '$230060'
  })
})


module.exports = router;