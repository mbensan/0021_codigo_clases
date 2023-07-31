const pool = require('./pool')


class Model {

  constructor(table) {
    this.table = table
  }

  async fetchAll () {
    const client = await pool.connect()
  
    const {rows} = await client.query(`select * from ` + this.table)
    client.release()
  
    return rows
  }
  
  async getById (id) {
    const client = await pool.connect()
  
    const {rows} = await client.query({
      text: `select * from ${this.table} where id=$1`,
      values: [id]
    })

    client.release()

    return rows[0]
  }
}

module.exports = Model