import "dotenv/config";
import Fastify from "fastify";
import listenMock from "../mock-server/index.js";

const fastify = Fastify({ logger: true });

fastify.get("/health", async (request, reply) => {
  reply.send({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || "development",
  });
});

fastify.get("/getUsers", async (request, reply) => {
  const resp = await fetch("http://event.com/getUsers");
  const data = await resp.json();

  reply.send(data);
});

fastify.post("/addEvent", async (request, reply) => {
  try {
    const resp = await fetch("http://event.com/addEvent", {
      method: "POST",
      body: JSON.stringify({
        id: new Date().getTime(),
        ...request.body,
      }),
    });
    const data = await resp.json();

    reply.send(data);
  } catch (err) {
    reply.error(err);
  }
});

fastify.get("/getEvents", async (request, reply) => {
  const resp = await fetch("http://event.com/getEvents");
  const data = await resp.json();

  reply.send(data);
});

fastify.get("/getEventsByUserId/:id", async (request, reply) => {
  const { id } = request.params;
  const user = await fetch("http://event.com/getUserById/" + id);
  const userData = await user.json();
  const userEvents = userData.events;
  const eventArray = [];

  for (let i = 0; i < userEvents.length; i++) {
    const event = await fetch("http://event.com/getEventById/" + userEvents[i]);
    const eventData = await event.json();

    eventArray.push(eventData);
  }

  reply.send(eventArray);
});

const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || "development";

fastify.listen({ port: PORT }, (err) => {
  if (process.env.MOCK_SERVER_ENABLED !== "false") {
    listenMock();
  }

  if (err) {
    fastify.log.error(err);
    process.exit(1);
  }

  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`);
});
