import { FastifyReply, FastifyRequest } from "fastify";
import { makeGetUserProfileUseCase } from "@/use-cases/factories/make-get-user-profile-use-case";

export const profile = async (request: FastifyRequest, reply: FastifyReply) => {
  const useCase = makeGetUserProfileUseCase();
  const { user } = await useCase.execute({
    userId: request.user.sub,
  });
  return reply.status(200).send({ user });
};
