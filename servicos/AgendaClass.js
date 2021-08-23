"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

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
