import { z } from "zod";
import { FastifyReply, FastifyRequest } from "fastify";
import { makeAuthenticateUseCase } from "@/use-cases/factories/make-authenticate-use-case";

export const authenticate = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  const { email, password } = authenticateBodySchema.parse(request.body);

  try {
    const useCase = makeAuthenticateUseCase();
    const { user } = await useCase.execute({ email, password });

    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    );
    return reply.status(200).send({ token });
  } catch (e) {
    console.log(e);
    return reply.status(401).send();
  }
};
