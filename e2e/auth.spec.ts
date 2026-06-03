import { test, expect } from "@playwright/test"

// Mock 環境帳號
const MOCK_ACCOUNTS = {
  employee:      { id: "employee", password: "1234" },
  admin:         { id: "admin",    password: "1234" },
  hr:            { id: "hr",       password: "1234" },
}

// 真實環境帳號（拿到後填在這裡）
const REAL_ACCOUNTS = {
  employee:      { id: "1000001", password: "password123" },
  admin:         { id: "welfare_001",    password: "password123" },
  hr:            { id: "hr_001",       password: "password123" },
}

// 根據環境選帳號
function getAccounts(baseURL: string) {
  return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
}

test.describe("登入流程", () => {

  test("員工登入成功，跳轉到活動列表", async ({ page, baseURL }) => {
    const { employee } = getAccounts(baseURL!)
    await page.goto("/")
    await page.click("text=員工登入")
    await page.fill('input[autocomplete="username"]', employee.id)
    await page.fill('input[autocomplete="current-password"]', employee.password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/events$/)
    await expect(page.locator("text=活動列表")).toBeVisible()
  })

  test("福委登入成功，跳轉到活動管理", async ({ page, baseURL }) => {
    const { admin } = getAccounts(baseURL!)
    await page.goto("/")
    await page.click("text=福委登入")
    await page.fill('input[autocomplete="username"]', admin.id)
    await page.fill('input[autocomplete="current-password"]', admin.password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/admin\/events$/)
    await expect(page.getByRole("heading", { name: "活動管理" })).toBeVisible()
  })

  test("HR 登入成功，跳轉到統計頁面", async ({ page, baseURL }) => {
    const { hr } = getAccounts(baseURL!)
    await page.goto("/")
    await page.click("text=HR 登入")
    await page.fill('input[autocomplete="username"]', hr.id)
    await page.fill('input[autocomplete="current-password"]', hr.password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/admin\/hr$/)
    await expect(page.locator("text=統計報表")).toBeVisible()
  })

  test("密碼錯誤，顯示錯誤訊息", async ({ page }) => {
    await page.goto("/")
    await page.click("text=員工登入")
    await page.fill('input[autocomplete="username"]', "1000001")
    await page.fill('input[autocomplete="current-password"]', "wrongpassword")
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL("/")
  })


  test("角色不符，顯示錯誤訊息", async ({ page }) => {
    await page.goto("/")
    await page.click("text=福委登入")
    await page.fill('input[autocomplete="username"]', "1000001")
    await page.fill('input[autocomplete="current-password"]', "password123")
    await page.click('button[type="submit"]')
    await page.waitForTimeout(2000)
    await expect(page).toHaveURL("/")
  })

  test("未填帳號，不能送出", async ({ page }) => {
    await page.goto("/")
    await page.click("text=員工登入")
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL("/")
  })

})

test.describe("登出流程", () => {

  test.beforeEach(async ({ page, baseURL }) => {
    const { employee } = getAccounts(baseURL!)
    await page.goto("/")
    await page.click("text=員工登入")
    await page.fill('input[autocomplete="username"]', employee.id)
    await page.fill('input[autocomplete="current-password"]', employee.password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/events$/)
  })

  test("登出後跳回登入頁面", async ({ page }) => {
    await page.click("text=登出")
    await expect(page).toHaveURL("/")
    await expect(page.locator("text=企業活動訂票系統")).toBeVisible()
  })

  test("登出後無法存取受保護頁面", async ({ page, baseURL }) => {
    const { employee } = getAccounts(baseURL!)
    await page.goto("/")
    await page.click("text=員工登入")
    await page.fill('input[autocomplete="username"]', employee.id)
    await page.fill('input[autocomplete="current-password"]', employee.password)
    await page.click('button[type="submit"]')
    await expect(page).toHaveURL(/\/events$/)

    await page.click("text=登出")
    await expect(page).toHaveURL("/")

    await page.goto("/events")
    await page.waitForTimeout(1000)  // ← 等路由保護觸發
    await expect(page).toHaveURL("/")
  })

})