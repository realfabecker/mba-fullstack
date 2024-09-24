import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface FetchNearbyGymUserCaseRequest {
  userLatitude: number;
  userLongitude: number;
}

interface FetchNearbyGymUseCaseResponse {
  gyms: Gym[];
}

export class FetchNearbyGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  public async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymUserCaseRequest): Promise<FetchNearbyGymUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    });
    return { gyms };
  }
}
