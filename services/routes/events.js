import { apiClient } from '../utils/apiClient.js';

export default async function eventRoutes(fastify, options) {
  fastify.post('/addEvent', async (request, reply) => {
    try {
      const data = await apiClient.post('/addEvent', {
        id: new Date().getTime(),
        ...request.body
      });
      reply.send(data);
    } catch (err) {
      reply.error(err);
    }
  });

  fastify.get('/getEvents', async (request, reply) => {
    const data = await apiClient.get('/getEvents');
    reply.send(data);
  });
}
