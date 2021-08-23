"use strict";

class AgendaClass {
  constructor(db) {
    this.db = db;
  }

  async getAgenda () {
    const { rows } = await this.db.query(
      'SELECT * FROM agenda', [],
    )
    return rows
  }

}

module.exports = AgendaClass;
