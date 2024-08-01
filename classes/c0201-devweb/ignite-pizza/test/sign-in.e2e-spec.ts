import { test, expect } from "@playwright/test";

test("sign in successfully", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });

  await page.getByLabel("Seu e-mail").fill("johndoe@sample.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();

  const toast = page.getByText(
    "Enviamos um link de autenticação para seu e-mail",
  );
  await expect(toast).toBeVisible();
  await page.waitForTimeout(2000);
});

test("sign with wrong credentials", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.getByLabel("Seu e-mail").fill("wrong@sample.com");
  await page.getByRole("button", { name: "Acessar painel" }).click();
  const toast = page.getByText("Credenciais inválidas");
  await expect(toast).toBeVisible();
  await page.waitForTimeout(2000);
});

test("navigate to new restaurants page", async ({ page }) => {
  await page.goto("/sign-in", { waitUntil: "networkidle" });
  await page.getByRole("link", { name: "Novo estabelecimento" }).click();
  expect(page.url()).toContain("/sign-up");
  await page.waitForTimeout(2000);
});
