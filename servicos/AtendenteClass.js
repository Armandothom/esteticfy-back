"use strict";

class AtendenteClass {
  constructor(db) {
    this.db = db;
  }

  async getAtendente () {
    const { rows } = await this.db.query(
      'SELECT * FROM atendente', [],
    )
    return rows
  }

}

module.exports = AtendenteClass;
