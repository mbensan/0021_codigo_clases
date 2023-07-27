const pool = require('./db.js')


async function transferir(emisor, receptor, monto) {
  const client = pool.connect()
  // En BRUTO
  client.query({
    text: 'insert into transacciones (emisor, receptor, monto) values ($1, $2, $3)',
    values: [emisor, receptor, monto]
  })
  client.query({
    text: 'update cuentas set saldo=saldo-$1 where id=$2',
    values: [monto, emisor]
  })
  client.query({
    text: 'update cuentas set saldo=saldo+$1 where id=$2',
    values: [monto, receptor]
  })
}

function init () {
  const palabras = process.argv
  const accion = palabras[2]

  if (accion == 'transfer') {
    const origen = palabras[3]
    const destino = palabras[4]
    const monto = palabras[5]

    transferir(origen, destino, monto)
  }


  else {
    console.log("Acción no implementada")
  }
}
init()