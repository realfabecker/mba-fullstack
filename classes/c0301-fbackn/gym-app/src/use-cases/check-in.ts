import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

import boom from "@hapi/boom";
import { GymsRepository } from "@/repositories/gyms-repository";
import { getDistanceBetweenCoordinates } from "@/utils/get-distance-between-coordinates";

interface CheckInUseCaseRequest {
  userId: string;
  gymId: string;
  userLatitude: number;
  userLongitude: number;
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn;
}

const MAX_DISTANCE_IN_KILOMETERS = 0.1;

export class CheckInUseCase {
  constructor(
    private readonly checkInsRepository: CheckInsRepository,
    private readonly gymsRepository: GymsRepository,
  ) {}

  public async execute({
    userId,
    gymId,
    userLongitude,
    userLatitude,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId);
    if (!gym) throw boom.notFound("gym not found");

    const distance = getDistanceBetweenCoordinates(
      {
        longitude: userLongitude,
        latitude: userLatitude,
      },
      {
        latitude: gym.latitude.toNumber(),
        longitude: gym.longitude.toNumber(),
      },
    );
    if (distance > MAX_DISTANCE_IN_KILOMETERS) {
      throw boom.badRequest();
    }
    const checkInOnSameDate = await this.checkInsRepository.findByUserIdOnDate(
      userId,
      new Date(),
    );
    if (checkInOnSameDate) {
      throw boom.conflict();
    }
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    });
    return { checkIn };
  }
}
