"use strict";

class ServicoClass {
  constructor(db) {
    this.db = db;
  }

  async getServico () {
    const { rows } = await this.db.query(
      'SELECT * FROM servico', [],
    )
    return rows
  }

}

module.exports = ServicoClass;
