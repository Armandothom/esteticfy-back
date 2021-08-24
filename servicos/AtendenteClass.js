"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class AtendenteClass {
  constructor(db) {
    this.db = db;
  }


  async getAtendentes (salaoID) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome FROM atendente as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.isdeleted != true AND a.salao_id = $1', [salaoID],
    )
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT  a.*, b.nome as salao_nome FROM atendente as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.id = $1', [id],
    )
    return rows[0]
  }

  async salvarAtendente(atendente) {
    await this.checkCPF(atendente.cpf);
    const formData = [
      atendente.nome ? atendente.nome : null,
      atendente.cpf ? atendente.cpf : null,
      atendente.endereco ? atendente.endereco : null,
      atendente.data_nascimento ? atendente.data_nascimento : false,
      atendente.senha ? atendente.senha : null,
      atendente.salao_id ? atendente.salao_id : null,
      atendente.cargo ? atendente.cargo : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO atendente(
          nome,
          cpf,
          endereco,
          data_nascimento,
          senha,
          salao_id,
          cargo,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateAtendente(atendente, id) {
    await this.checkCPF(atendente.cpf, id)
    atendente = Utils.deleteProperty(["salao_input"], atendente);
    const { text, values } = update("atendente", atendente
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteAtendente(id) {
    const { text, values } = update("atendente", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async checkCPF(cpf, id = null) {
    let rowCount = await this.checkCPFCliente(cpf, id);
    console.log(rowCount)
    if(rowCount.length > 0) {
      throw new Error("CPF existente");
    }
    rowCount = await this.checkCPFAtendente(cpf, id);
    console.log(rowCount)
    if(rowCount.length > 0) {
      throw new Error("CPF existente");
    }
    return;
  }

  async checkCPFAtendente (cpf, id) {
    const { rows } = await this.db.query(
      id ? 'SELECT * FROM atendente WHERE cpf = $1 AND id != $2 AND isdeleted = false' : 'SELECT * FROM atendente WHERE cpf = $1 AND isdeleted = false', id ? [cpf, id] : [cpf],
    )
    return rows;
  }

  async checkCPFCliente (cpf, id) {
    const { rows } = await this.db.query(
      id ? 'SELECT * FROM cliente WHERE cpf = $1 AND id != $2 AND isdeleted = false' : 'SELECT * FROM cliente WHERE cpf = $1 AND isdeleted = false', id ? [cpf, id] : [cpf],
    )
    return rows;
  }

}

module.exports = AtendenteClass;
