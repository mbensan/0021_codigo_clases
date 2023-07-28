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
    this.marca = marca
    this.modelo = modelo
    this.motor = motor
    this.rend = rendimiento
    this.num_asientos // sólo aplica a los autos
    this.tiempos // sólo aplica a las motos
  }
  gasto (kms) {
    return kms / this.rend
  }
}

class Auto extends Vehiculo {
  constructor(marca, modelo, motor, rendimiento, num_asientos) {
    // 1. llamamos al constructor de la clase padre
    super(marca, modelo, motor, rendimiento)
    // 2. iniciamos el resto de las cosas
    this.num_asientos = num_asientos
  }
}

const motoCarlos = new Vehiculo('Yamaha', 'Entiser', 250, 14)
const nisan = new Vehiculo('Nissan', 'Xtrail', 2500, 10)
const toyota = new Vehiculo('Toyota', 'Terios', 1300, 18)