import { apiClient } from '../utils/apiClient.js';

export default async function userRoutes(fastify, options) {
  fastify.get('/getUsers', async (request, reply) => {
    const data = await apiClient.get('/getUsers');
    reply.send(data);
  });

  fastify.get('/getEventsByUserId/:id', async (request, reply) => {
    const { id } = request.params;
    const userData = await apiClient.get(`/getUserById/${id}`);
    const userEvents = userData.events;
    const eventArray = [];

    for (let i = 0; i < userEvents.length; i++) {
      const eventData = await apiClient.get(`/getEventById/${userEvents[i]}`);
      eventArray.push(eventData);
    }

    reply.send(eventArray);
  });
}
