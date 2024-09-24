import { describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

import { FetchNearbyGymUseCase } from "@/use-cases/fetch-nearby-gyms";
import { Decimal } from "@prisma/client/runtime/library";

describe("Fetch Nearby Gyms Use Case", () => {
  it("should be able to fetch for nearby gyms", async () => {
    const gymRepository = new InMemoryGymsRepository();
    await gymRepository.create({
      title: `My Gym 1`,
      phone: "",
      latitude: new Decimal(-27.1676967),
      longitude: new Decimal(-49.5483706),
    });
    await gymRepository.create({
      title: `My Gym 2`,
      phone: "",
      latitude: new Decimal(-26.858372),
      longitude: new Decimal(-49.135798),
    });
    const useCase = new FetchNearbyGymUseCase(gymRepository);
    const { gyms } = await useCase.execute({
      userLongitude: -49.135798,
      userLatitude: -26.858071,
    });
    expect(gyms).toHaveLength(1);
    expect(gyms).toEqual([expect.objectContaining({ title: "My Gym 2" })]);
  });
});
