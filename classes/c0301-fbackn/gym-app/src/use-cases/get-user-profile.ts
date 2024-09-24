import { UsersRepository } from "@/repositories/users-repository";
import boom from "@hapi/boom";
import { User } from "@prisma/client";

interface GetUserProfileUseCaseRequest {
  userId: string;
}

interface GetUserProfileUseCaseResponse {
  user: User;
}

export class GetUserProfileUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    userId,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId);
    if (!user) throw boom.notFound();
    return { user };
  }
}
