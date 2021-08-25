"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class LoginClass {
  constructor(db) {
    this.db = db;
  }

  async login (body) {
    console.log("ENVIANDO LOGIN")
    let atendente = await this.getFromAtendente(body.cpf, body.password);
    let cliente = await this.getFromCliente(body.cpf, body.password);
    console.log(atendente);
    console.log(cliente)
    if(atendente.length > 0) {
      atendente[0].isCliente = false;
      return atendente[0];
    } else if(cliente.length > 0) {
      cliente[0].isCliente = true;
      return cliente[0];
    } else {
      throw new Error("Login inválido");
    }
  }

  async getFromAtendente(cpf, senha) {
    const { rows } = await this.db.query(
      'SELECT  * FROM atendente WHERE cpf = $1 AND senha = $2 AND isdeleted != true', [cpf, senha],
    )
    return rows;
  }

  async getFromCliente(cpf, senha) {
    const { rows } = await this.db.query(
      'SELECT  * FROM cliente WHERE cpf = $1 AND senha = $2 AND isdeleted != true', [cpf, senha],
    )
    return rows;
  }

}

module.exports = LoginClass;
