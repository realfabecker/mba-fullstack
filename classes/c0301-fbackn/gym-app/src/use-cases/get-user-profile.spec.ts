import { describe, expect, it } from "vitest";

import { hash } from "bcryptjs";
import { GetUserProfileUseCase } from "@/use-cases/get-user-profile";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Get User Profile", () => {
  it("Should be able to get user profile", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    const createdUser = await usersRepository.create({
      name: "teste-1",
      password_hash: await hash("teste-1", 6),
      email: "teste-1@mail.com",
    });
    const { user } = await getUserProfileUseCase.execute({
      userId: createdUser.id,
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to get user profile with wrong id", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const getUserProfileUseCase = new GetUserProfileUseCase(usersRepository);
    await expect(() => {
      return getUserProfileUseCase.execute({
        userId: Math.random().toString(32),
      });
    }).rejects.toBeInstanceOf(Error);
  });
});
