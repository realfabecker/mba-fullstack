import { CreateGymUseCase } from "@/use-cases/create-gym";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCreateGymUseCase() {
  return new CreateGymUseCase(new PrismaGymsRepository());
}
