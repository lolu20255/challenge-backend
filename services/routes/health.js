import { config } from '../config/env.js';

export default async function healthRoutes(fastify, options) {
  fastify.get('/health', async (request, reply) => {
    reply.send({
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: config.nodeEnv
    });
  });
}
