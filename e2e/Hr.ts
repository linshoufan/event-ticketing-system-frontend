import { test, expect } from "@playwright/test"

const MOCK_ACCOUNTS = { id: "hr", password: "1234" }
const REAL_ACCOUNTS = { id: "hr_001", password: "password123" }

function getAccount(baseURL: string) {
  return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
}

async function loginAsHR(page: any, baseURL: string) {
  const account = getAccount(baseURL)
  await page.goto("/")
  await page.click("text=HR ??")
  await page.fill('input[autocomplete="username"]', account.id)
  await page.fill('input[autocomplete="current-password"]', account.password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/admin\/hr$/, { timeout: 15000 })
}

test.describe("HR ? ????", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
  })

  test("??????????", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "????" })).toBeVisible()
  })

  test("??????????", async ({ page }) => {
    await expect(page.locator("text=????")).toBeVisible()
    await expect(page.locator("text=?????")).toBeVisible()
    await expect(page.locator("text=?????")).toBeVisible()
    await expect(page.locator("text=?????")).toBeVisible()
  })

  test("??????", async ({ page }) => {
    await page.waitForTimeout(2000)
    await page.fill('input[placeholder="????..."]', "??")
    await expect(page.getByRole("heading", { name: "????" })).toBeVisible()
  })

  test("???????????", async ({ page }) => {
    await page.waitForTimeout(2000)
    const detailBtn = page.locator("text=????").first()
    if (await detailBtn.count() > 0) {
      await detailBtn.click()
      await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
    }
  })
})

test.describe("HR ? ????", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
    await page.click("text=??")
    await expect(page).toHaveURL(/\/events$/)
  })

  test("????????", async ({ page }) => {
    await expect(page.locator("text=????")).toBeVisible()
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
  })

  test("????????", async ({ page }) => {
    await page.locator('[data-testid="event-card"]').first().click()
    await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  })
})

test.describe("HR ? ????", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
    await page.click("text=??")
    await expect(page).toHaveURL(/\/profile$/)
  })

  test("??????????", async ({ page }) => {
    await expect(page.locator("text=????")).toBeVisible()
  })

  test("HR ??????????", async ({ page }) => {
    await expect(page.locator("text=HR").first()).toBeVisible()
  })
})

test.describe("HR ? ????", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
  })

  test("HR ??????????", async ({ page }) => {
    // Navbar ?????????
    await expect(page.locator("nav").locator("text=????")).toHaveCount(0)
  })

  test("HR ???????????", async ({ page }) => {
    await expect(page.locator("nav").locator("text=???")).toHaveCount(0)
  })

  test("HR ??????????", async ({ page }) => {
    await page.goto("/admin/events")
    await page.waitForTimeout(1000)
    await expect(page).not.toHaveURL(/\/admin\/events$/)
  })
})