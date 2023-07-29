/** 
 * 
Vehiculo:
- Marca
- Modelo
- Motor
- Rendimiento
*/

class Vehiculo {

  constructor(marca, modelo, motor, rendimiento) {
    this._marca = marca
    this.modelo = modelo
    this.motor = motor
    this.rend = rendimiento
  }
  gasto (kms) {
    return kms / this.rend
  }

  get marca () {
    return this._marca.toUpperCase()
  }

  set marca (palabra) {
    this._marca = palabra.trim()
  }
}

class Auto extends Vehiculo {

  constructor(marca, modelo, motor, rendimiento, num_asientos) {
    // 1. llamamos al constructor de la clase padre
    super(marca, modelo, motor, rendimiento)
    // 2. iniciamos el resto de las variables de instancia
    this.num_asientos = num_asientos
  }

  gastoPorPasajero (kms) {
    return this.gasto(kms) / this.num_asientos
  }
}
class Moto extends Vehiculo {
  constructor(marca, modelo, motor, rendimiento, tiempos) {
    // 1. llamamos al constructor de la clase padre
    super(marca, modelo, motor, rendimiento)
    // 2. iniciamos el resto de las variables de instancia
    this.tiempos = tiempos
  }
}

class Bici extends Vehiculo {
  
  gasto (kms) {
    const gasto_original = super.gasto(kms)
    return gasto_original / 2
  }
}


const motoCarlos = new Moto('Yamaha', 'Entiser', 250, 14, 4)
const nisan = new Auto('Nissan', 'Xtrail', 2500, 10, 5)
const toyota = new Auto('Toyota', 'Terios', 1300, 18, 4)

async function init() {
  let vehiculo;
}
init()

