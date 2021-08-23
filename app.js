'use strict'

const path = require('path')
const AutoLoad = require('fastify-autoload')
const fp = require('fastify-plugin')
const AgendaClass = require('./servicos/AgendaClass')
const AtendenteClass = require('./servicos/atendenteClass')
const ClienteClass = require('./servicos/ClienteClass')
const SalaoClass = require('./servicos/SalaoClass')
const ServicoClass = require('./servicos/ServicoClass')
const VendaClass = require('./servicos/VendaClass')

module.exports = async function (fastify, opts) {
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })

  fastify.register(require('fastify-cors'), { 
  })

  fastify.register(require('fastify-postgres'), {
    connectionString: 'postgres://postgres:armando98@localhost:5432/postgres'
  })

  async function decorateFastifyInstance(fastify) {
    const db = await fastify.pg.connect()

    const agendaClass = new AgendaClass(db)
    fastify.decorate('agendaClass', agendaClass) 

    const atendenteClass = new AtendenteClass(db)
    fastify.decorate('atendenteClass', atendenteClass) 

    const clienteClass = new ClienteClass(db)
    fastify.decorate('clienteClass', clienteClass) 

    const salaoClass = new SalaoClass(db)
    fastify.decorate('salaoClass', salaoClass) 

    const servicoClass = new ServicoClass(db)
    fastify.decorate('servicoClass', servicoClass) 

    const vendaClass = new VendaClass(db)
    fastify.decorate('vendaClass', vendaClass) 
  }

  fastify.register(fp(decorateFastifyInstance))

}
