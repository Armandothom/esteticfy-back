'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);

  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.clienteClass.getClientes(fastify.salao_id);
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.clienteClass.salvarCliente(request.body);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.updateCliente(request.body, request.params.id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.clienteClass.deleteCliente(request.body.id);
    return rowFromID;
  })

}
