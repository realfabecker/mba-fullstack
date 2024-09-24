import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { PrismaUsersRepository } from "@/repositories/prisma/prisma-users-repository";

export function makeGetUserProfileUseCase() {
  return new GetUserProfileUseCase(new PrismaUsersRepository());
}
