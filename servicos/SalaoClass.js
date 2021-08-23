"use strict";

class SalaoClass {
  constructor(db) {
    this.db = db;
  }

  async getSalao () {
    const { rows } = await this.db.query(
      'SELECT * FROM salao', [],
    )
    return rows
  }

}

module.exports = SalaoClass;
