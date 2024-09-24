import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

import boom from "@hapi/boom";

interface ValidateCheckInUseCaseRequest {
  checkInId: string;
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn;
}

export class ValidateCheckInUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId);
    if (!checkIn) {
      throw boom.notFound();
    }
    checkIn.validated_at = new Date();
    await this.checkInsRepository.save(checkIn);
    return { checkIn };
  }
}
