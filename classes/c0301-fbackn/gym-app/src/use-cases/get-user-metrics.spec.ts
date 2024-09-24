import { describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { GetUserMetricsUseCase } from "@/use-cases/get-user-metrics";

describe("Get User Metrics Use Case", () => {
  it("Should be able to get user metrics", async () => {
    const checkInRepository = new InMemoryCheckInsRepository();
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: `user-id`,
        gym_id: `gym-${i}`,
      });
    }
    const useCase = new GetUserMetricsUseCase(checkInRepository);
    const { checkInsCount } = await useCase.execute({ userId: "user-id" });
    expect(checkInsCount).toEqual(22);
  });
});
