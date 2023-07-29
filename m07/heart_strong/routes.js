const {Router} = require('express')
const {create, fetchAll} = require('./db/ejercicios')

const router = Router()

router.get('/ejercicios', async (req, res) => {
  const ejercicios = await fetchAll()
  console.log(ejercicios)
  res.json({rows: ejercicios})
})

router.post('/ejercicios', async (req, res) => {
  const nombre = req.body.nombre
  const series = req.body.series
  const repeticiones = req.body.repeticiones
  const descanso = req.body.descanso
  await create(nombre, series, repeticiones, descanso)

  res.json({rows: []})
})

module.exports = router

