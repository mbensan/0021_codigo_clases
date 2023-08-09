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
  console.log('Palabra buscada\n\n\n', palabra);

  const articulos = await Articulo.findAll(
    {where: {nombre: {[Op.like]: '%'+palabra+'%'}}}
  )
  res.json(articulos);
});

router.get('/:id', async function(req, res) {
  const id = req.params.id
  const articulo = await Articulo.findByPk(id)
  res.json(articulo);
});


router.put('/:id', async function(req, res) {
  const id = req.params.id
  const {nombre, precio} = req.body

  await Articulo.update(
    {nombre, precio}, // nnuevos valores
    {where: {id: id}}
  )

  res.json({});
});

router.post('/', async function(req, res) {
  const { nombre, precio } = req.body

  await Articulo.create({nombre,precio})

  res.json({});
});

module.exports = router;