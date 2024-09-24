import { Gym } from "@prisma/client";
import { GymsRepository } from "@/repositories/gyms-repository";

interface CreateGymUserCaseRequest {
  title: string;
  description: string | null;
  phone: string | null;
  latitude: number;
  longitude: number;
}

interface CreateGymUseCaseResponse {
  gym: Gym;
}

export class CreateGymUseCase {
  constructor(private readonly gymsRepository: GymsRepository) {}
  public async execute({
    description,
    latitude,
    longitude,
    phone,
    title,
  }: CreateGymUserCaseRequest): Promise<CreateGymUseCaseResponse> {
    const gym = await this.gymsRepository.create({
      description,
      latitude,
      longitude,
      phone,
      title,
    });
    return { gym };
  }
}
