'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.vendaClass.getVenda();
    return rowsGet;
  })
}

