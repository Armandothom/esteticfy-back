"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

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
