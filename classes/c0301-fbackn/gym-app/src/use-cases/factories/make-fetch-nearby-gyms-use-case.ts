import { FetchNearbyGymUseCase } from "@/use-cases/fetch-nearby-gyms";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeFetchNearbyGymsUseCase() {
  return new FetchNearbyGymUseCase(new PrismaGymsRepository());
}
