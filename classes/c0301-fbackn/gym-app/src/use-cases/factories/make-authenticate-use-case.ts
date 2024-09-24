import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeAuthenticateUseCase() {
  return new AuthenticateUseCase(new PrismaUsersRepository());
}
