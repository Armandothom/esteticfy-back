"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

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
