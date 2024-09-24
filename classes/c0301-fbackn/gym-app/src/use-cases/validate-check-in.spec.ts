import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "@/use-cases/check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";
import { ValidateCheckInUseCase } from "@/use-cases/validate-check-in";

describe("Check-In Use Case", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Should be able to check-in", async () => {
    vi.setSystemTime(new Date(2000, 0, 1));
    const gymsRepository = new InMemoryGymsRepository();
    const gym = await gymsRepository.create({
      title: "My First Gym",
      description: "My First Gym",
      phone: "47123456789",
      latitude: new Decimal(-27.28),
      longitude: new Decimal(-49.0),
    });
    const checkInsRepository = new InMemoryCheckInsRepository();
    const checkInUseCase = new CheckInUseCase(
      checkInsRepository,
      gymsRepository,
    );
    const { checkIn: createdCheckIn } = await checkInUseCase.execute({
      userId: Math.random().toString(32),
      gymId: gym.id,
      userLatitude: -27.28,
      userLongitude: -49.0,
    });

    const useCase = new ValidateCheckInUseCase(checkInsRepository);
    const { checkIn: validatedCheckIn } = await useCase.execute({
      checkInId: createdCheckIn.id,
    });
    expect(validatedCheckIn.validated_at).toEqual(new Date(2000, 0, 1));
  });
});
