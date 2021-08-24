'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);
  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.servicoClass.getServico();
    return rowsGet;
  })
}
