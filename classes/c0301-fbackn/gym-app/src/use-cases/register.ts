import bcrypt from "bcryptjs";
import { UsersRepository } from "@/repositories/users-repository";
import { User } from "@prisma/client";

interface RegisterUserCaseRequest {
  name: string;
  email: string;
  password: string;
}

export class RegisterUseCase {
  constructor(private readonly usersRepository: UsersRepository) {}
  public async execute({
    name,
    email,
    password,
  }: RegisterUserCaseRequest): Promise<User> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email);
    if (userWithSameEmail) {
      throw new Error("Conflict");
    }
    return await this.usersRepository.create({
      name,
      email,
      password_hash: bcrypt.hashSync(password, 6),
    });
  }
}
