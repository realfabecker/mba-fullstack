import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeRegisterUseCase } from "@/use-cases/factories/make-register-use-case";

export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { name, email, password } = registerBodySchema.parse(request.body);

  try {
    const useCase = makeRegisterUseCase();
    await useCase.execute({ name, email, password });
  } catch (e) {
    return reply.status(409).send();
  }

  return reply.status(201).send();
};
