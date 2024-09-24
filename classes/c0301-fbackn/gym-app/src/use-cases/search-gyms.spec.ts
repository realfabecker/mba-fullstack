import { describe, expect, it } from "vitest";
import { InMemoryGymsRepository } from "@/repositories/in-memory/in-memory-gyms-repository";
import { SearchGymUseCase } from "@/use-cases/search-gyms";

describe("Search Gyms Use Case", () => {
  it("should be able to search gyms", async () => {
    const gymRepository = new InMemoryGymsRepository();
    for (let i = 1; i <= 2; i++) {
      await gymRepository.create({
        title: `My Gym`,
        phone: "",
        latitude: 0,
        longitude: 0,
      });
    }
    const useCase = new SearchGymUseCase(gymRepository);
    const { gyms } = await useCase.execute({ query: "My Gym", page: 1 });
    expect(gyms).toHaveLength(2);
    expect(gyms).toEqual([
      expect.objectContaining({ title: "My Gym" }),
      expect.objectContaining({ title: "My Gym" }),
    ]);
  });
});
