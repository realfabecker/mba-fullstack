import { SearchGymUseCase } from "@/use-cases/search-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeSearchGymsUseCase() {
  return new SearchGymUseCase(new PrismaGymsRepository());
}
