import { FastifyInstance } from "fastify";
import { register } from "@/http/controllers/register";
import { authenticate } from "@/http/controllers/authenticate";
import { profile } from "@/http/controllers/profile";
import { verifyJwt } from "@/http/middlewares/verify-jwt";

export const appRoutes = (app: FastifyInstance) => {
  app.post("/users", register);
  app.post("/sessions", authenticate);
  app.get("/me", { onRequest: [verifyJwt] }, profile);
};