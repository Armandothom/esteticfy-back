'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.servicoClass.getServico();
    return rowsGet;
  })
}
