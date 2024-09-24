import { describe, expect, it } from "vitest";
import { CreateGymUseCase } from "@/use-cases/create-gym";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";

describe("Create Gym Use Case", () => {
  it("Should be able to create a gym", async () => {
    const createGymUseCase = new CreateGymUseCase(new InMemoryGymsRepository());
    const { gym } = await createGymUseCase.execute({
      phone: "",
      longitude: 0,
      latitude: 0,
      description: "",
      title: "",
    });
    expect(gym.id).toEqual(expect.any(String));
  });
});
