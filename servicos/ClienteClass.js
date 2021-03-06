"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class ClienteClass {
  constructor(db) {
    this.db = db;
  }

  async getClientes (salaoID) {
    const { rows } = await this.db.query(
      'SELECT a.*, b.nome as salao_nome FROM cliente as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.isdeleted != true AND a.salao_id = $1', [salaoID],
    )
    return rows
  }

  async getById (id) {
    const { rows } = await this.db.query(
      'SELECT  a.*, b.nome as salao_nome FROM cliente as A LEFT JOIN salao as B ON a.salao_id = b.id WHERE a.id = $1', [id],
    )
    return rows[0]
  }

  async salvarCliente(cli) {
    await this.checkCPF(cli.cpf);
    const formData = [
      cli.nome ? cli.nome : null,
      cli.cpf ? cli.cpf : null,
      cli.endereco ? cli.endereco : null,
      cli.data_nascimento ? cli.data_nascimento : false,
      cli.senha ? cli.senha : null,
      cli.salao_id ? cli.salao_id : null,
      false
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO cliente(
          nome,
          cpf,
          endereco,
          data_nascimento,
          senha,
          salao_id,
          isdeleted
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }

  async updateCliente(cli, id) {
    await this.checkCPF(cli.cpf, id);
    cli = Utils.deleteProperty(["salao_input"], cli);
    const { text, values } = update("cliente", cli
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }

  async deleteCliente(id) {
    const { text, values } = update("cliente", {isdeleted : true}
    , { id: id });
    const { rows } = await this.db.query(text, values);
    return id;
  }
  async checkCPF(cpf, id = null) {
    let rowCount = await this.checkCPFCliente(cpf, id);
    if(rowCount.length > 0) {
      throw new Error("CPF existente");
    }
    rowCount = await this.checkCPFAtendente(cpf, id);
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

module.exports = ClienteClass;
