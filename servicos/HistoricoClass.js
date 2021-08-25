"use strict";

const format = require("pg-format");
const { update } = require("../shared/query");
const Utils = require("../shared/utils");

class HistoricoClass {
  constructor(db) {
    this.db = db;
  }

  async inserirLog(tipoHist, tipoOp, salao_id, cliente_id, atendente_id) {
    const formData = [
      cliente_id ? cliente_id : null,
      atendente_id ? atendente_id : null,
      tipoHist ? tipoHist : null,
      tipoOp ? tipoOp : null,
      new Date().toISOString()
    ];

    const id = await this.db.query(
      format(
        `INSERT INTO historico(
          cliente_id,
          atendente_id,
          tipo_historico_id,
          tipo_operacao_id,
          data_historico
            )  VALUES %L RETURNING id`,
        [formData]
      )
    );
    return id;
  }


}

module.exports = HistoricoClass;
