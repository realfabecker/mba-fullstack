import { CheckIn } from "@prisma/client";
import { CheckInsRepository } from "@/repositories/check-ins-repository";

interface FetchMemberCheckInHistoryUseCaseRequest {
  userId: string;
  page?: number;
}

interface FetchMemberCheckInHistoryUseCaseResponse {
  checkIns: CheckIn[];
}

export class FetchMemberCheckInHistoryUseCase {
  constructor(private readonly checkInsRepository: CheckInsRepository) {}

  public async execute({
    userId,
    page,
  }: FetchMemberCheckInHistoryUseCaseRequest): Promise<FetchMemberCheckInHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByUserId(
      userId,
      page,
    );
    return { checkIns };
  }
}
