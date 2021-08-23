'use strict'

module.exports = async function (fastify, opts) {

  fastify.get('/', async function (request, reply) {
    let rowsGet = await fastify.atendenteClass.getAtendentes();
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.atendenteClass.salvarAtendente(request.body);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.atendenteClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.atendenteClass.updateAtendente(request.body, request.params.id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    let rowFromID = await fastify.atendenteClass.deleteAtendente(request.body.id);
    return rowFromID;
  })


}
