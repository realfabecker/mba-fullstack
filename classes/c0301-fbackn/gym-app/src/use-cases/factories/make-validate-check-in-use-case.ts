import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in";
import { PrismaCheckinsRepository } from "@/repositories/prisma/prisma-checkins-repository";

export function makeValidateCheckInUseCase() {
  return new ValidateCheckInUseCase(new PrismaCheckinsRepository());
}
