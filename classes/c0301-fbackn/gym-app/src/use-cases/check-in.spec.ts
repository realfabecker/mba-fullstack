import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { InMemoryCheckInsRepository } from "@/repositories/in-memory/in-memory-check-ins-repository";
import { CheckInUseCase } from "@/use-cases/check-in";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { Decimal } from "@prisma/client/runtime/library";

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
    const checkInUseCase = new CheckInUseCase(
      new InMemoryCheckInsRepository(),
      gymsRepository,
    );
    const { checkIn } = await checkInUseCase.execute({
      userId: Math.random().toString(32),
      gymId: gym.id,
      userLatitude: -27.28,
      userLongitude: -49.0,
    });
    expect(checkIn.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in twice in the same day", async () => {
    vi.setSystemTime(new Date(2000, 0, 1));
    const gymsRepository = new InMemoryGymsRepository();
    const gym = await gymsRepository.create({
      title: "My First Gym",
      description: "My First Gym",
      phone: "47123456789",
      latitude: new Decimal(-27.28),
      longitude: new Decimal(-49.0),
    });
    const checkInUseCase = new CheckInUseCase(
      new InMemoryCheckInsRepository(),
      gymsRepository,
    );
    const { checkIn } = await checkInUseCase.execute({
      userId: Math.random().toString(32),
      gymId: gym.id,
      userLatitude: -27.28,
      userLongitude: -49.0,
    });

    await expect(() => {
      return checkInUseCase.execute({
        userId: checkIn.user_id,
        gymId: checkIn.gym_id,
        userLatitude: -27.28,
        userLongitude: -49.0,
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to check in but in different days", async () => {
    vi.setSystemTime(new Date(2000, 0, 1));
    const gymsRepository = new InMemoryGymsRepository();
    const gym = await gymsRepository.create({
      title: "My First Gym",
      description: "My First Gym",
      phone: "47123456789",
      latitude: new Decimal(-27.28),
      longitude: new Decimal(-49.0),
    });

    const checkInUseCase = new CheckInUseCase(
      new InMemoryCheckInsRepository(),
      gymsRepository,
    );
    const { checkIn: checkIn1 } = await checkInUseCase.execute({
      gymId: gym.id,
      userId: Math.random().toString(32),
      userLatitude: -27.28,
      userLongitude: -49.0,
    });
    expect(checkIn1.id).toEqual(expect.any(String));

    vi.setSystemTime(new Date(2000, 2, 1));
    const { checkIn: checkIn2 } = await checkInUseCase.execute({
      gymId: gym.id,
      userId: Math.random().toString(32),
      userLatitude: -27.28,
      userLongitude: -49.0,
    });
    expect(checkIn2.id).toEqual(expect.any(String));
  });

  it("Should not be able to check in on a distant gym", async () => {
    vi.setSystemTime(new Date(2000, 0, 1));
    const gymsRepository = new InMemoryGymsRepository();
    const gym = await gymsRepository.create({
      title: "My First Gym",
      description: "My First Gym",
      phone: "47123456789",
      latitude: new Decimal(-27.28),
      longitude: new Decimal(-49.0),
    });

    const checkInUseCase = new CheckInUseCase(
      new InMemoryCheckInsRepository(),
      gymsRepository,
    );
    await expect(() => {
      return checkInUseCase.execute({
        gymId: gym.id,
        userId: Math.random().toString(32),
        userLatitude: -27.2,
        userLongitude: -49.64,
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
