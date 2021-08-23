'use strict'

module.exports = async function (fastify, opts) {
  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.salaoClass.getSaloes();
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.salaoClass.salvarSalao(request.body);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.salaoClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.salaoClass.updateSalao(request.body, request.params.id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.salaoClass.deleteSalao(request.body.id);
    return rowFromID;
  })
}
