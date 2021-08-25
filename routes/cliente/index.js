'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);

  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.clienteClass.getClientes(fastify.salao_id);
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.clienteClass.salvarCliente(request.body);
    await fastify.historicoClass.inserirLog(3, 2, fastify.salao_id, fastify.user_id, fastify.user_id);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.updateCliente(request.body, request.params.id);
    await fastify.historicoClass.inserirLog(3, 1, fastify.salao_id, fastify.user_id, fastify.user_id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.deleteCliente(request.body.id);
    await fastify.historicoClass.inserirLog(3, 3, fastify.salao_id, fastify.user_id, fastify.user_id);
    return rowFromID;
  })

}
