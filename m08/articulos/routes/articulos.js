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

  // 1.5 Validamos el archivo de la foto
  if (req.files && req.files.foto) {
    const foto = req.files.foto

    if (foto.size > (2048*1024)) {
      return res.status(400).json({
        err: 'El tamaño máximo para la foto es de 4Mb'
      })
    }

    const extensiones_permitidas = ['image/png', 'image/jpeg', 'image/gif']
    if (extensiones_permitidas.indexOf(foto.mimetype) < 0){
      return res.status(400).json({
        err: 'Ese formato de imagen no está permitido'
      })
    }
    
  }

  // 2. Validación con Sequelize
  let articulo;
  try {
    articulo = await Articulo.create({nombre, precio})
  }
  catch(error) {
    return res.status(400).json(error)
  }
  //console.log('nuevo_id\n\n', articulo.id)
  
  // 2. Se almacena la imagen (sólo si existe)
  if (req.files && req.files.foto) {
    const foto = req.files.foto

    // 3. Obtenemos la extensión de la foto (por ej. "png")
    const arr = foto.name.split('.')
    const ext = arr[arr.length - 1]

    // 4.  guardamos la foto en la carpeta "./public/fotos"
    await foto.mv(`./public/fotos/${articulo.id}.${ext}`)

    // 5. Guardamos en la base de datos que ese artículo SI tiene fotos
    articulo.foto = `${articulo.id}.${ext}`
    await articulo.save()
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
  console.log(foto)
  await foto.mv('./public/fotos/' + foto.name)

  res.send('Todo ok')
})

module.exports = router;