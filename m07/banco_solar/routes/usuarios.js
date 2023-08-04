const {Router} = require('express')
const {Usuario} = require('../models/models')

const router = Router()

router.get('/usuarios', async (req, res) => {
  const usuarios = await Usuario.findAll()
  res.json(usuarios)
})

// esta ruta es para crear un nuevo usuario.
// Debería recibir el "nombre" y el "balance"
router.post('/usuario', async (req, res) => {
  let body = ''

  req.on('data', data => body += data)

  req.on('end', async () => {
    body = JSON.parse(body)
    // Recién acá, podemos acceder a los datos del nombre y el balance
    console.log(body);
    await Usuario.create({
      nombre: body.nombre,
      balance: body.balance
    })
    res.json({})
  })
})

router.delete('/usuario', async (req, res) => {
  // 1. Obtengo el ID del usuario por eliminar
  const id = req.query.id

  // 2. Elimino el usuario con esa ID
  await Usuario.destroy({where: {id: id}})

  // 3. Mando una respuesta
  res.json({todo: 'ok'})
})

router.put('/usuario', async (req, res) => {
  // 1. Recuperamos el ID del usuario
  const id = parseInt(req.query.id)
  // 2. Recuperamos el nuevo nombre y el nuevo balance
  const nombre = req.body.name
  const balance = parseInt(req.body.balance)

  console.log({id, nombre, balance});
  // 3. Actualizamos la base de datos
  await Usuario.update(
    {nombre: nombre, balance: balance},
    {where: {id: id}}
  )


  // 4. Devolvemos algo
  res.json({todo: 'ok'})
})

module.exports = router