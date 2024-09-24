import { RegisterUseCase } from "@/use-cases/register";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeRegisterUseCase() {
  return new RegisterUseCase(new PrismaUsersRepository());
}
