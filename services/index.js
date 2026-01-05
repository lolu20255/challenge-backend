import Fastify from 'fastify';
import listenMock from '../mock-server/index.js';
import { config } from './config/env.js';
import healthRoutes from './routes/health.js';
import userRoutes from './routes/users.js';
import eventRoutes from './routes/events.js';

const fastify = Fastify({ logger: true });

fastify.register(healthRoutes);
fastify.register(userRoutes);
fastify.register(eventRoutes);

fastify.listen({ port: config.port }, (err) => {
  if (config.mockServerEnabled) {
    listenMock();
  }

  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server running on port ${config.port} in ${config.nodeEnv} mode`);
});
