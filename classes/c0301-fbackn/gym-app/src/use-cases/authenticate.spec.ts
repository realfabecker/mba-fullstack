import { describe, expect, it } from "vitest";
import { AuthenticateUseCase } from "@/use-cases/authenticate";
import { hash } from "bcryptjs";
import { InMemoryUsersRepository } from "@/repositories/in-memory/in-memory-users-repository";

describe("Authenticate Use Case", () => {
  it("Should be able to authenticate", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);
    await usersRepository.create({
      name: "teste-1",
      password_hash: await hash("teste-1", 6),
      email: "teste-1@mail.com",
    });
    const { user } = await authenticateUseCase.execute({
      email: "teste-1@mail.com",
      password: "teste-1",
    });
    expect(user.id).toEqual(expect.any(String));
  });

  it("Should not be able to authenticate with wrong e-mail", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    expect(() => {
      return authenticateUseCase.execute({
        email: "teste-1@mail.com",
        password: "teste-1",
      });
    }).rejects.toBeInstanceOf(Error);
  });

  it("Should not be able to authenticate with wrong password", async () => {
    const usersRepository = new InMemoryUsersRepository();
    const authenticateUseCase = new AuthenticateUseCase(usersRepository);

    await usersRepository.create({
      name: "teste-1",
      password_hash: await hash("teste-1", 6),
      email: "teste-1@mail.com",
    });

    expect(() =>
      authenticateUseCase.execute({
        email: "teste@mail.com",
        password: "123",
      }),
    ).rejects.toBeInstanceOf(Error);
  });
});
