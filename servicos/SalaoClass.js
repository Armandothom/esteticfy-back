"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class SalaoClass {
  constructor(db) {
    this.db = db;
  }

  async getSaloes () {
    const { rows } = await this.db.query(
      'SELECT * FROM salao WHERE isdeleted != true', [],
    )
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT  * FROM salao WHERE id = $1', [id],
    )
    return rows[0]
  }

  async salvarSalao(salao) {
    const formData = [
      salao.nome ? salao.nome : null,
      salao.endereco ? salao.endereco : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO salao(
          nome,
          endereco,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateSalao(salao, id) {
    const { text, values } = update("salao", salao
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteSalao(id) {
    const { text, values } = update("salao", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }


}

module.exports = SalaoClass;
