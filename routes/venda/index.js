'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);

  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.vendaClass.getVendas(fastify.salao_id);
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.vendaClass.salvarVenda(request.body, fastify.salao_id);
    await fastify.historicoClass.inserirLog(7, 2, fastify.salao_id, fastify.user_id, fastify.user_id);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.vendaClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.vendaClass.updateVenda(request.body, request.params.id);
    await fastify.historicoClass.inserirLog(7, 1, fastify.salao_id, fastify.user_id, fastify.user_id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.vendaClass.deleteVenda(request.body.id);
    await fastify.historicoClass.inserirLog(7, 3, fastify.salao_id, fastify.user_id, fastify.user_id);
    return rowFromID;
  })

}

