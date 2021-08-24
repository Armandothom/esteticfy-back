'use strict'

module.exports = async function (fastify, opts) {
  fastify.post('/', async function (request, reply) {
    let feedbackLogin = await fastify.loginClass.login(request.body);
    return feedbackLogin;
  })
}

