import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface SearchGymUserCaseRequest {
  query: string;
  page: number;
}

interface SearchGymUseCaseResponse {
  gyms: Gym[];
}

export class SearchGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  public async execute({
    query,
    page,
  }: SearchGymUserCaseRequest): Promise<SearchGymUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page);
    return { gyms };
  }
}
