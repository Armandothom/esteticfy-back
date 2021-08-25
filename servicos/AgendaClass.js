"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class AgendaClass {
  constructor(db) {
    this.db = db;
  }

  async getAgendas (salaoID) {
    console.log(salaoID)
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome, c.nome as cliente_nome, d.nome as servico_nome FROM agenda as A LEFT JOIN salao as B ON a.salao_id = b.id LEFT JOIN cliente as C on a.cliente_id = c.id LEFT JOIN servico as D on a.servico_id = d.id WHERE a.isdeleted != true AND a.salao_id = $1', [salaoID],
    )
    console.log(rows)
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome, c.nome as cliente_nome, d.nome as servico_nome FROM agenda as A LEFT JOIN salao as B ON a.salao_id = b.id LEFT JOIN cliente as C on a.cliente_id = c.id LEFT JOIN servico as D on a.servico_id = d.id WHERE a.id = $1', [id],
    )
    return rows[0]
  }

  async salvarAgenda(agenda, salao_id) {
    const formData = [
      salao_id ? salao_id : null,
      agenda.cliente_id ? agenda.cliente_id : null,
      agenda.servico_id ? agenda.servico_id : false,
      agenda.horario ? agenda.horario : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO agenda(
          salao_id,
          cliente_id,
          servico_id,
          horario,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateAgenda(agenda, id) {
    agenda = Utils.deleteProperty(["cliente_input", "atendente_input", "servico_input"], agenda);
    const { text, values } = update("agenda", agenda
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteAgenda(id) {
    const { text, values } = update("agenda", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

}

module.exports = AgendaClass;
