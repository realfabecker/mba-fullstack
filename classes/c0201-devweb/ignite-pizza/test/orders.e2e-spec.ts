import { expect, test } from "@playwright/test";

test("list orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await expect(
    page.getByRole("cell", { name: "Customer 1", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Customer 10", exact: true }),
  ).toBeVisible();
});

test("paginate orders", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByRole("button", { name: "Próxima página" }).click();
  await expect(
    page.getByRole("cell", { name: "Customer 11", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "Customer 20", exact: true }),
  ).toBeVisible();
});

test("filter by order id", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Id do pedido").fill("orderId-11");
  await page.getByRole("button", { name: "Filtra resultados" }).click();
  await expect(page.getByRole("cell", { name: "orderId-11" })).toBeVisible();
});

test("filter by customer name", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });
  await page.getByPlaceholder("Nome do cliente").fill("Customer 6");
  await page.getByRole("button", { name: "Filtra resultados" }).click();
  await expect(page.getByRole("cell", { name: "Customer 6" })).toBeVisible();
});

test("filter by order status", async ({ page }) => {
  await page.goto("/orders", { waitUntil: "networkidle" });

  await page.getByRole("combobox").click();
  await page.getByLabel("Pendente").click();
  await page.getByRole("button", { name: "Filtra resultados" }).click();

  await page.waitForTimeout(250);

  const tableRows = await page.getByRole("cell", { name: "Pendente" }).all();
  await expect(tableRows).toHaveLength(10);

  await page.waitForTimeout(500);
});
