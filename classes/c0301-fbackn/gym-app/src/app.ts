import fastify from "fastify";

import { appRoutes } from "@/http/controllers/routes";
import { ZodError } from "zod";
import fastifyJwt from "@fastify/jwt";
import { env } from "@/env";

export const app = fastify();

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
});

appRoutes(app);

app.setErrorHandler((error, request, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation Error", issues: error.format() });
  }
  return reply.status(500);
});
