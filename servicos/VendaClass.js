"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

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
