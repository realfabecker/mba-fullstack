import { UsersRepository } from "@/repositories/users-repository";
import boom from "@hapi/boom";
import bcrypt from "bcryptjs";
import { User } from "@prisma/client";

interface AuthenticateUseCaseRequest {
  email: string;
  password: string;
}

interface AuthenticateUseCaseResponse {
  user: User;
}

export class AuthenticateUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password_hash))) {
      throw boom.unauthorized();
    }

    return { user };
  }
}
