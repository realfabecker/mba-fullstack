import { UsersRepository } from "@/repositories/users-repository";
import { Prisma, User } from "@prisma/client";

export class InMemoryUsersRepository implements UsersRepository {
  private items: User[] = [];

  async findById(userId: string): Promise<User | null> {
    const user = this.items.find((i) => i.id === userId);
    return user || null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = this.items.find((i) => i.email === email);
    return user || null;
  }

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: "user-1",
      name: "user-1",
      created_at: new Date(),
      email: data.email,
      password_hash: data.password_hash,
    };
    this.items.push(user);
    return user;
  }
}
