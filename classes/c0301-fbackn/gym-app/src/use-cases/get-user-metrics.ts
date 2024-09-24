import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface GetUserMetricsUseCaseRequest {
  userId: string;
}

interface GetUserMetricsUseCaseResponse {
  checkInsCount: number;
}

export class GetUserMetricsUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute({
    userId,
  }: GetUserMetricsUseCaseRequest): Promise<GetUserMetricsUseCaseResponse> {
    const checkInsCount = await this.checkInsRepository.countByUerId(userId);
    return { checkInsCount };
  }
}
