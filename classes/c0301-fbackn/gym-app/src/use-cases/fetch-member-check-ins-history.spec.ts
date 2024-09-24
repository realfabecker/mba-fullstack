import { describe, expect, it } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "@/use-cases/check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { FetchMemberCheckInHistoryUseCase } from "@/use-cases/fetch-member-check-ins-history";

describe("Fetch Member Check-Ins History Use Case", () => {
  it("Should be able to fetch check-ins history", async () => {
    const gymsRepository = new InMemoryGymsRepository();
    const gym = await gymsRepository.create({
      title: "My First Gym",
      description: "My First Gym",
      phone: "47123456789",
      latitude: new Decimal(-27.28),
      longitude: new Decimal(-49.0),
    });

    const checkInRepository = new InMemoryCheckInsRepository();
    const checkInUseCase = new CheckInUseCase(
      checkInRepository,
      gymsRepository,
    );
    await checkInUseCase.execute({
      gymId: gym.id,
      userId: "user-id",
      userLatitude: -27.28,
      userLongitude: -49.0,
    });

    const useCase = new FetchMemberCheckInHistoryUseCase(checkInRepository);
    const { checkIns } = await useCase.execute({ userId: "user-id" });
    expect(checkIns).toEqual(expect.any(Array));
    expect(checkIns).toEqual([expect.objectContaining({ gym_id: gym.id })]);
  });

  it("Should be able to fetch paginated check-ins history", async () => {
    const checkInRepository = new InMemoryCheckInsRepository();
    for (let i = 1; i <= 22; i++) {
      await checkInRepository.create({
        user_id: `user-id`,
        gym_id: `gym-${i}`,
      });
    }
    const useCase = new FetchMemberCheckInHistoryUseCase(checkInRepository);
    const { checkIns } = await useCase.execute({ userId: "user-id", page: 2 });
    expect(checkIns).toHaveLength(2);
    expect(checkIns).toEqual([
      expect.objectContaining({ gym_id: "gym-21" }),
      expect.objectContaining({ gym_id: "gym-22" }),
    ]);
  });
});
