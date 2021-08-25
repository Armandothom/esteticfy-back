'use strict'

module.exports = async function (fastify, opts) {
  fastify.addHook("preHandler", fastify.verifyJWTandLevelDB);

  fastify.get('/', async function (request, reply) {
    console.log(fastify.salao_id)
    let rowsGet = await fastify.agendaClass.getAgendas(fastify.salao_id);
    return rowsGet;
  })

  fastify.post('/', async function (request, reply) {
    let idFromPost = await fastify.agendaClass.salvarAgenda(request.body, fastify.salao_id);
    return idFromPost;
  })

  fastify.get('/:id', async function (request, reply) {
    let rowFromID = await fastify.agendaClass.getById(request.params.id);
    return rowFromID;
  })

  fastify.post('/:id', async function (request, reply) {
    let rowFromID = await fastify.agendaClass.updateAgenda(request.body, request.params.id);
    return rowFromID;
  })

  fastify.post('/delete', async function (request, reply) {
    console.log("entrou delete")
    let rowFromID = await fastify.agendaClass.deleteAgenda(request.body.id);
    return rowFromID;
  })
}
