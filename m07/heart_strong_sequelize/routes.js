const {Router} = require('express')
const Ejercicio = require('./models/ejercicio')

const router = Router()

router.get('/ejercicios', async (req, res) => {
  const ejercicios = await Ejercicio.findAll()
  res.json({rows: ejercicios})
})

router.post('/ejercicios', async (req, res) => {
  const nombre = req.body.nombre
  let series = req.body.series
  let repeticiones = req.body.repeticiones
  let descanso = req.body.descanso

  series = parseInt(series)
  repeticiones = parseInt(repeticiones)
  descanso = parseInt(descanso)

  await Ejercicio.create({nombre , series, repeticiones, descanso})

  res.json({rows: []})
})

module.exports = router
