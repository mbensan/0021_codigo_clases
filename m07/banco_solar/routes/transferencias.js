const {Router} = require('express')
const db = require('../models/sequelize.config')
const {Usuario, Transferencia} = require('../models/models')

const router = Router()

router.get('/transferencias', async (req, res) => {
  // COnsulta JOIN por las tablas Transferencia y Usuario
  const transferencias = await Transferencia.findAll({
    include: [
      {model: Usuario, as: 'emisor'},
      {model: Usuario, as: 'receptor'}
    ]
  })


  const transferencias_arr = []
  for (let transf of transferencias) {
    transferencias_arr.push(
      [transf.id, transf.emisor.nombre, transf.receptor.nombre, transf.monto, transf.createdAt]
    )
  }

  res.json(transferencias_arr)
})

async function add_transaction (nombre_emisor, nombre_receptor, monto_string) {

  await db.transaction(async (t) => {
    // 1. Traemos el emisor desde la DDBB
    const emisor = await Usuario.findOne({where: {nombre: nombre_emisor}})
      
    // 2. Traemos el receptor
    const receptor = await Usuario.findOne({where: {nombre: nombre_receptor}})
  
    // 3. Le restamos del balance al emisor
    const monto = parseInt(monto_string)
    emisor.balance -= monto
    await emisor.save()
  
    // 4. Se sumamos al balance del receptor
    receptor.balance += monto
    await receptor.save()
  
    // 5. Agregamos la transferencia
    await Transferencia.create({
      emisorId: emisor.id,
      receptorId: receptor.id,
      monto: monto
    })
  })

}

router.post('/transferencia', async (req, res) => {
  let body = ''

  req.on('data', data => body += data)

  req.on('end', async () => {
    body = JSON.parse(body)
    // Recién acá, podemos acceder a los datos del nombre y el balance
    console.log(body);
    try {
      await add_transaction(body.emisor, body.receptor, body.monto)
    }
    catch(error) {
      return res.send({error}, 400)
    }
    res.json({})
  })
})

module.exports = router