import { FetchMemberCheckInHistoryUseCase } from "@/use-cases/fetch-member-check-ins-history";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeUserCheckInsHistoryUseCase() {
  return new FetchMemberCheckInHistoryUseCase(new PrismaCheckinsRepository());
}
