import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeUserMetricsUseCase() {
  return new GetUserMetricsUseCase(new PrismaCheckinsRepository());
}
