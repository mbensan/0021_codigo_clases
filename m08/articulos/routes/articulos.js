const express = require('express');
const router = express.Router();
const {Op} = require('sequelize')

const {Articulo} = require('../models/articulo.model')

/* GET articulos listing. */
router.get('/', async function(req, res) {
  const articulos = await Articulo.findAll()
  res.json(articulos);
});

router.get('/search', async function(req, res) {

  const {palabra} = req.query

  if (palabra == false) {
    return res.status(400).json({err: 'Debe incluír al menos una palabra'})
  }
  console.log('Palabra buscada\n\n\n', palabra);

  const articulos = await Articulo.findAll(
    {where: {nombre: {[Op.like]: '%'+palabra+'%'}}}
  )

  res.json(articulos);
});

router.get('/:id(\\d+)/', async function(req, res) {
  const id = req.params.id
  const articulo = await Articulo.findByPk(id)

  if (articulo == null) {
    return res.status(404).json({err: 'Artículo no encontrado'})
  }

  res.json(articulo);
});


router.put('/:id', async function(req, res) {
  const id = req.params.id
  const {nombre, precio} = req.body

  // 1. Validación manual
  if (!nombre || !precio || !id) {
    return res.status(400).json({
      err: 'Debe definir un nombre, un precio y un id'
    })
  }

  try {
    await Articulo.update(
      {nombre, precio}, // nnuevos valores
      {where: {id: id}}
    )
  }
  catch(error) {
    return res.json(400, error)
  }
    
  res.json({});
});

router.post('/', async function(req, res) {
  const { nombre, precio } = req.body

  // 1. Validación manual
  if (!nombre || !precio) {
    return res.status(400).json({
      err: 'Debe definir un nombre y un precio'
    })
  }

  // 2. Validación con Sequelize
  try {
    await Articulo.create({nombre,precio})
  }
  catch(error) {
    return res.json(400, error)
  }

  res.json({});
});

router.delete('/:id(\\d+)/', async function (req, res) {
  const id = req.params.id
  const articulo = await Articulo.findByPk(id)

  if (articulo == null) {
    return res.status(404).json({err: 'Artículo no encontrado'})
  }

  await articulo.destroy()

  res.json({})
})

router.post('/foto', async (req, res) => {
  console.log(req.body)
  console.log(req.files.foto)

  const foto = req.files.foto
  await foto.mv('./public/fotos/' + foto.name)

  res.send('Todo ok')
})

module.exports = router;