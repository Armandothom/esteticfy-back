"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class VendaClass {
  constructor(db) {
    this.db = db;
  }

  async getVendas (salaoID) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome, c.nome as cliente_nome, d.nome as atendente_nome, e.nome as servico_nome FROM venda as A LEFT JOIN salao as B ON a.salao_id = b.id LEFT JOIN cliente as C on a.cliente_id = c.id LEFT JOIN atendente as D on a.atendente_id = d.id LEFT JOIN servico as E on a.servico_id = e.id WHERE a.isdeleted != true AND a.salao_id = $1', [salaoID],
    )
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome, c.nome as cliente_nome, d.nome as atendente_nome, e.nome as servico_nome FROM venda as A LEFT JOIN salao as B ON a.salao_id = b.id LEFT JOIN cliente as C on a.cliente_id = c.id LEFT JOIN atendente as D on a.atendente_id = d.id LEFT JOIN servico as E on a.servico_id = e.id WHERE a.id = $1', [id],
    )
    return rows[0]
  }

  async salvarVenda(venda, salao_id) {
    const formData = [
      salao_id ? salao_id : null,
      venda.cliente_id ? venda.cliente_id : null,
      venda.atendente_id ? venda.atendente_id : null,
      venda.servico_id ? venda.servico_id : false,
      venda.valor ? venda.valor : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO venda(
          salao_id,
          cliente_id,
          atendente_id,
          servico_id,
          valor,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateVenda(venda, id) {
    venda = Utils.deleteProperty(["cliente_input", "atendente_input", "servico_input"], venda);
    const { text, values } = update("venda", venda
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteVenda(id) {
    const { text, values } = update("venda", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

}

module.exports = VendaClass;
