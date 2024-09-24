import { describe, expect, it } from "vitest";
import { RegisterUseCase } from "@/use-cases/register";
import { compare } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("register user case", () => {
  it("should hash user password upon registration", async () => {
    const registerUserCase = new RegisterUseCase(new InMemoryUsersRepository());

    const user = await registerUserCase.execute({
      email: "teste@mail.com",
      name: "teste",
      password: "123456",
    });

    const isPasswordHashed = await compare("123456", user.password_hash);
    expect(isPasswordHashed).toBe(true);
  });

  it("should not be able to register with same email twice", async () => {
    const registerUserCase = new RegisterUseCase(new InMemoryUsersRepository());

    await registerUserCase.execute({
      email: "teste@mail.com",
      name: "teste",
      password: "123456",
    });

    expect(() =>
      registerUserCase.execute({
        email: "teste@mail.com",
        name: "teste",
        password: "123456",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
