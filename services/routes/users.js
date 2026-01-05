import { apiClient } from "../utils/apiClient.js";
import logger from "../utils/logger.js";

export default async function userRoutes(fastify, options) {
  /**
   * Get all users
   * This endpoint returns a list of all users.
   */
  fastify.get("/getUsers", async (request, reply) => {
    const data = await apiClient.get("/getUsers");

    reply.send(data);
  });

  /**
   * Get events for a specific user
   * This endpoint returns all events for a given user ID.
   * Will return error if events API fails for any of the events.
   */
  fastify.get("/getEventsByUserId/:id", async (request, reply) => {
    const { id } = request.params;
    const userData = await apiClient.get(`/getUserById/${id}`);
    const userEvents = userData.events;
    const promises = [];
    let results;

    logger.debug(`Found ${userEvents.length} events for user ${id}`);

    for (let i = 0; i < userEvents.length; i++) {
      logger.debug(`Processing event ${i} for user ${id}`);

      const promise = apiClient.get(`/getEventById/${userEvents[i]}`);
      promises.push(promise);
    }

    try {
      results = await Promise.all(promises);
    } catch (error) {
      logger.error(`Error fetching events for user ${id}:`, error);

      return reply
        .status(500)
        .send({ error: "Failed to fetch events. Please try again later." });
    }

    logger.info(`Processed ${results.length} events for user ${id}`);

    reply.send(results);
  });
}
