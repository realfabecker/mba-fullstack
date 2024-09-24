import { CheckInUseCase } from "@/use-cases/check-in";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";
import { PrismaGymsRepository } from "@/repositories/prisma/prisma-gyms-repository";

export function makeCheckInUseCase() {
  return new CheckInUseCase(
    new PrismaCheckinsRepository(),
    new PrismaGymsRepository(),
  );
}
