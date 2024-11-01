import { afterAll, beforeAll, describe, expect, it } from "vitest";
import request from "supertest";
import { app } from "@/app";

describe("Authenticate (e2e)", () => {
  beforeAll(async () => {
    await app.ready();
  });
  afterAll(async () => {
    await app.close();
  });
  it("should be able to authenticate", async () => {
    // await request(app.server).post("/users").send({
    //   name: "John",
    //   email: "john@mail.com",
    //   password: "123456",
    // });

    const response = await request(app.server).post("/sessions").send({
      email: "john@mail.com",
      password: "123456",
    });
    expect(response.statusCode).toEqual(200);
  });
});
