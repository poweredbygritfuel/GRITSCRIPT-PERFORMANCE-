import { test, expect } from "@playwright/test";
test("filters catalog and creates a local request preview without submitting data", async ({
  page,
}) => {
  const writes: string[] = [];
  page.on("request", (request) => {
    if (request.method() === "POST") writes.push(request.url());
  });
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Precision has a purpose." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Glassware", exact: true }).click();
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByRole("button", { name: "All supplies", exact: true }).click();
  await page
    .getByRole("textbox", { name: "Search supplies" })
    .fill("not-a-product");
  await expect(page.getByText("No supplies found")).toBeVisible();
  await page.getByRole("button", { name: "Reset filters" }).click();
  await expect(page.locator(".product-card")).toHaveCount(4);
  await expect(
    page.getByRole("button", {
      name: "Laboratory tube rack: not eligible for inquiry",
    }),
  ).toBeDisabled();
  await page
    .getByRole("button", { name: "Add Borosilicate beaker set to inquiry" })
    .click();
  await page
    .getByRole("button", {
      name: "Add one Borosilicate beaker set",
      exact: true,
    })
    .click();
  await expect(page.locator(".estimated")).toContainText("$64.00");
  await page.getByLabel("Full name").fill("Demo Researcher");
  await page.getByLabel("Work email").fill("demo@example.com");
  await page
    .getByLabel("Organization", { exact: true })
    .fill("Example Laboratory");
  await page.getByLabel("Local pickup").check();
  await expect(page.getByLabel("Destination country")).toHaveCount(0);
  await page.getByRole("checkbox").check();
  await page.getByRole("button", { name: "Preview request" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Request preview ready" }),
  ).toBeVisible();
  expect(writes).toEqual([]);
  await page.reload();
  await expect(
    page.getByRole("button", { name: "Preview request" }),
  ).toBeDisabled();
});
test("mobile navigation and layout remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await page
    .getByRole("navigation")
    .getByRole("link", { name: "Product catalog" })
    .click();
  await expect(
    page.getByRole("button", { name: "Open navigation" }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page
    .locator("img")
    .evaluateAll((images) =>
      images.forEach((image) => image.setAttribute("loading", "eager")),
    );
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );
  await page.screenshot({ path: "/tmp/gritscript-mobile.png", fullPage: true });
});

test("desktop product imagery renders", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/");
  await page
    .locator("img")
    .evaluateAll((images) =>
      images.forEach((image) => image.setAttribute("loading", "eager")),
    );
  await page.waitForFunction(() =>
    [...document.images].every(
      (image) => image.complete && image.naturalWidth > 0,
    ),
  );
  await page.screenshot({
    path: "/tmp/gritscript-desktop.png",
    fullPage: true,
  });
});
