"use strict";

class VendaClass {
  constructor(db) {
    this.db = db;
  }

  async getVenda () {
    const { rows } = await this.db.query(
      'SELECT * FROM venda', [],
    )
    return rows
  }

}

module.exports = VendaClass;
