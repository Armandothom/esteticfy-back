"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class ServicoClass {
  constructor(db) {
    this.db = db;
  }

  async getServicos (salaoID) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome FROM servico as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.isdeleted != true AND a.salao_id = $1', [salaoID],
    )
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT  a.*, b.nome as salao_nome FROM servico as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.id = $1', [id],
    )
    return rows[0]
  }

  async salvarServico(servico, salao_id) {
    const formData = [
      servico.nome ? servico.nome : null,
      salao_id ? salao_id : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO servico(
          nome,
          salao_id,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateServico(servico, id) {
    const { text, values } = update("servico", servico
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteServico(id) {
    const { text, values } = update("servico", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

}

module.exports = ServicoClass;
