import { apiClient } from "../utils/apiClient.js";
import logger from "../utils/logger.js";

export default async function eventRoutes(fastify, options) {
  let numberOfErrors = 0;
  let lastErrorTime = Date.now();
  let retryAfter = Date.now();

  /**
   * Add a new event
   * This endpoint forwards the request to the external events service.
   * If the external service is unavailable, it will return an error.
   * When the service is busy due to repeated errors, it will return a 429
   * and temporarily block requests for a short period to allow recovery.
   *
   * The retry mechanism uses an exponential backoff strategy:
   * - First 3 errors within 30 seconds: 5 second delay
   * - Each subsequent error: adds 5 more seconds to the delay
   * - Maximum delay: 30 seconds
   * - Errors are reset after 30 seconds of no failures
   */
  fastify.post("/addEvent", async (request, reply) => {
    try {
      const result = await apiClient.post("/addEvent", {
        id: new Date().getTime(),
        ...request.body,
      });

      logger.debug("Event request: ", { result });

      if (Date.now() < retryAfter) {
        return reply.status(429).send({
          error: "Service is currently busy. Please try again later.",
          retryAfter: retryAfter,
          currentTime: Date.now(),
        });
      }

      if (result.success === false) {
        numberOfErrors++;
        lastErrorTime = Date.now();
        retryAfter = Date.now();

        logger.error("Event service error", { numberOfErrors, lastErrorTime });

        // Check if we had 3+ errors within last 30 seconds to prevent overwhelming the service
        if (numberOfErrors >= 3 && Date.now() - lastErrorTime <= 30000) {
          retryAfter += 5000;

          return reply.status(429).send({
            error: `Service is currently overloaded. Please try again later. `,
            retryAfter: retryAfter,
          });
        }

        return reply.status(429).send({
          error: "Service is currently unavailable. Please try again later.",
        });
      }

      numberOfErrors = 0; // Reset error count on successful request

      logger.info("Event added successfully", { result });

      reply.send(result);
    } catch (error) {
      logger.error("Error adding event", { error: error });

      return reply.status(500).send({
        error: "An unexpected error occurred. Please try again later.",
      });
    }
  });

  /**
   * Get all events
   * This endpoint forwards the request to the external events service.
   */
  fastify.get("/getEvents", async (request, reply) => {
    const data = await apiClient.get("/getEvents");

    reply.send(data);
  });
}
