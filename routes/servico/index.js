'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);

  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.servicoClass.getServicos(fastify.salao_id);
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.servicoClass.salvarServico(request.body, fastify.salao_id);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.servicoClass.getById(request.params.id);
    console.log(rowFromID)
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.servicoClass.updateServico(request.body, request.params.id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.servicoClass.deleteServico(request.body.id);
    return rowFromID;
  })
}
