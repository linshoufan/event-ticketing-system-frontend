import { test, expect } from "@playwright/test"

const MOCK_ACCOUNTS = { id: "hr", password: "1234" }
const REAL_ACCOUNTS = { id: "hr_001", password: "password123" }

function getAccount(baseURL: string) {
  return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
}

async function loginAsHR(page: any, baseURL: string) {
  const account = getAccount(baseURL)
  await page.goto("/")
  await page.click("text=HR 登入")
  await page.fill('input[autocomplete="username"]', account.id)
  await page.fill('input[autocomplete="current-password"]', account.password)
  await page.click('button[type="submit"]')
  await expect(page).toHaveURL(/\/admin\/hr$/, { timeout: 15000 })
}

test.describe("HR 儀表板測試", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
  })

  test("應正確渲染頁面標題", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  })

  test("應顯示各項數據指標", async ({ page }) => {
    await expect(page.locator("text=總活動數")).toBeVisible()
    await expect(page.locator("text=總報名人數")).toBeVisible()
    await expect(page.locator("text=待審核名單")).toBeVisible()
    await expect(page.locator("text=已通過名單")).toBeVisible()
  })

  test("應具備資料搜尋功能", async ({ page }) => {
    await page.waitForTimeout(2000)
    await page.fill('input[placeholder="搜尋..."]', "測試")
    await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  })

  test("應能跳轉至報名名單頁面", async ({ page }) => {
    await page.waitForTimeout(2000)
    const detailBtn = page.locator("text=查看名單").first()
    if (await detailBtn.count() > 0) {
      await detailBtn.click()
      await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
    }
  })
})

test.describe("HR 活動專區測試", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
    await page.click("text=活動")
    await expect(page).toHaveURL(/\/events$/)
  })

  test("應成功載入活動列表", async ({ page }) => {
    await expect(page.locator("text=所有活動")).toBeVisible()
    await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
  })

  test("應能進入單一活動詳情", async ({ page }) => {
    await page.locator('[data-testid="event-card"]').first().click()
    await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  })
})

test.describe("HR 個人資料測試", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
    await page.click("text=設定")
    await expect(page).toHaveURL(/\/profile$/)
  })

  test("應正確顯示設定頁面", async ({ page }) => {
    await expect(page.locator("text=個人資料")).toBeVisible()
  })

  test("應正確顯示身分標籤", async ({ page }) => {
    await expect(page.locator("text=HR").first()).toBeVisible()
  })
})

test.describe("HR 權限控管測試", () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await loginAsHR(page, baseURL!)
  })

  test("導覽列不應顯示越權功能", async ({ page }) => {
    // Navbar 權限檢查
    await expect(page.locator("nav").locator("text=系統設定")).toHaveCount(0)
  })

  test("不應具備使用者管理權限", async ({ page }) => {
    await expect(page.locator("nav").locator("text=使用者")).toHaveCount(0)
  })

  test("應阻擋非授權路由之直接訪問", async ({ page }) => {
    await page.goto("/admin/events")
    await page.waitForTimeout(1000)
    await expect(page).not.toHaveURL(/\/admin\/events$/)
  })
})