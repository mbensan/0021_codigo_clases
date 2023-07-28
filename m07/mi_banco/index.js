const pool = require('./db.js')


async function transferir(emisor, receptor, monto) {
  const client = await pool.connect()
  // Con transacciones
  await client.query('BEGIN')
  const {rows} = await client.query({
    text: 'select * from cuentas where id=$1',
    values: [parseInt(emisor)]
  })

  console.log(rows)
  if (rows[0].saldo <= monto) {
    await client.query('ROLLBACK')
    console.log(`La cuenta ${emisor} no tiene dinero suficiente`)
    return
  }
  await client.query({
    text: 'insert into transacciones (emisor, receptor, monto) values ($1, $2, $3)',
    values: [emisor, receptor, monto]
  })
  await client.query({
    text: 'update cuentas set saldo=saldo-$1 where id=$2',
    values: [monto, emisor]
  })
  await client.query({
    text: 'update cuentas set saldo=saldo+$1 where id=$2',
    values: [monto, receptor]
  })
  await client.query('COMMIT')

  client.release()
  pool.end()
}

async function init () {
  const palabras = process.argv
  const accion = palabras[2]

  if (accion == 'transfer') {
    const origen = palabras[3]
    const destino = palabras[4]
    const monto = palabras[5]

    await transferir(origen, destino, monto)
  }


  else {
    console.log("Acción no implementada")
  }
}
init()