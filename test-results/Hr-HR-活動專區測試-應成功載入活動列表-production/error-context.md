# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Hr.spec.ts >> HR 活動專區測試 >> 應成功載入活動列表
- Location: e2e\Hr.spec.ts:59:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/events$/
Received string:  "https://event-ticketing-system-frontend-eight.vercel.app/admin/hr"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "https://event-ticketing-system-frontend-eight.vercel.app/admin/hr"

```

```yaml
- navigation:
  - text: 企業活動訂票系統 活動 統計 個人
  - button "登出"
- heading "統計報表" [level=1]
- paragraph: 活動總數
- paragraph: "12"
- paragraph: 總報名人數
- paragraph: "6"
- paragraph: 總出席人數
- paragraph: "0"
- paragraph: 平均出席率
- paragraph: 0%
- textbox "搜尋活動..."
- heading "test1" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 0 人 0% 出席率 0 / 0 人 0%
- heading "1" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 0 人 0% 出席率 0 / 0 人 0%
- heading "2026 仲夏星空電影節" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 100 人 0% 出席率 0 / 0 人 0%
- heading "員工家庭日" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "1"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 1 / 300 人 0% 出席率 0 / 1 人 0%
- heading "Event event_005" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "2"
- paragraph: 候補
- paragraph: "1"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 2 / 5 人 40% 出席率 0 / 2 人 0%
- heading "Event event_006" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 1 人 0% 出席率 0 / 0 人 0%
- heading "Event event_007" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 3 人 0% 出席率 0 / 0 人 0%
- heading "2026跨年喝酒BBQ同樂會" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 0 人 0% 出席率 0 / 0 人 0%
- heading "Family Day" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "1"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 1 / 100 人 1% 出席率 0 / 1 人 0%
- heading "週五電影之夜" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "1"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 1 / 1 人 100% 出席率 0 / 1 人 0%
- heading "Open Lecture" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "1"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "2"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 1 / 1 人 100% 出席率 0 / 1 人 0%
- heading "X" [level=2]
- button "詳細名單"
- paragraph: 正取
- paragraph: "0"
- paragraph: 候補
- paragraph: "0"
- paragraph: 取消
- paragraph: "0"
- paragraph: 出席
- paragraph: "0"
- text: 報名率 0 / 0 人 0% 出席率 0 / 0 人 0%
```

# Test source

```ts
  1   | ﻿import { test, expect } from "@playwright/test"
  2   | 
  3   | const MOCK_ACCOUNTS = { id: "hr", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "hr_001", password: "password123" }
  5   | 
  6   | function getAccount(baseURL: string) {
  7   |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  8   | }
  9   | 
  10  | async function loginAsHR(page: any, baseURL: string) {
  11  |   const account = getAccount(baseURL)
  12  |   await page.goto("/")
  13  |   await page.click("text=HR 登入")
  14  |   await page.fill('input[autocomplete="username"]', account.id)
  15  |   await page.fill('input[autocomplete="current-password"]', account.password)
  16  |   await page.click('button[type="submit"]')
  17  |   await expect(page).toHaveURL(/\/admin\/hr$/, { timeout: 15000 })
  18  | }
  19  | 
  20  | test.describe("HR 儀表板測試", () => {
  21  |   test.beforeEach(async ({ page, baseURL }) => {
  22  |     await loginAsHR(page, baseURL!)
  23  |   })
  24  | 
  25  |   test("應正確渲染頁面標題", async ({ page }) => {
  26  |     await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  27  |   })
  28  | 
  29  |   test("應顯示各項數據指標", async ({ page }) => {
  30  |     await expect(page.locator("text=總活動數")).toBeVisible()
  31  |     await expect(page.locator("text=總報名人數")).toBeVisible()
  32  |     await expect(page.locator("text=待審核名單")).toBeVisible()
  33  |     await expect(page.locator("text=已通過名單")).toBeVisible()
  34  |   })
  35  | 
  36  |   test("應具備資料搜尋功能", async ({ page }) => {
  37  |     await page.waitForTimeout(2000)
  38  |     await page.fill('input[placeholder="搜尋..."]', "測試")
  39  |     await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  40  |   })
  41  | 
  42  |   test("應能跳轉至報名名單頁面", async ({ page }) => {
  43  |     await page.waitForTimeout(2000)
  44  |     const detailBtn = page.locator("text=查看名單").first()
  45  |     if (await detailBtn.count() > 0) {
  46  |       await detailBtn.click()
  47  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  48  |     }
  49  |   })
  50  | })
  51  | 
  52  | test.describe("HR 活動專區測試", () => {
  53  |   test.beforeEach(async ({ page, baseURL }) => {
  54  |     await loginAsHR(page, baseURL!)
  55  |     await page.click("text=活動")
> 56  |     await expect(page).toHaveURL(/\/events$/)
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  57  |   })
  58  | 
  59  |   test("應成功載入活動列表", async ({ page }) => {
  60  |     await expect(page.locator("text=所有活動")).toBeVisible()
  61  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
  62  |   })
  63  | 
  64  |   test("應能進入單一活動詳情", async ({ page }) => {
  65  |     await page.locator('[data-testid="event-card"]').first().click()
  66  |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  67  |   })
  68  | })
  69  | 
  70  | test.describe("HR 個人資料測試", () => {
  71  |   test.beforeEach(async ({ page, baseURL }) => {
  72  |     await loginAsHR(page, baseURL!)
  73  |     await page.click("text=設定")
  74  |     await expect(page).toHaveURL(/\/profile$/)
  75  |   })
  76  | 
  77  |   test("應正確顯示設定頁面", async ({ page }) => {
  78  |     await expect(page.locator("text=個人資料")).toBeVisible()
  79  |   })
  80  | 
  81  |   test("應正確顯示身分標籤", async ({ page }) => {
  82  |     await expect(page.locator("text=HR").first()).toBeVisible()
  83  |   })
  84  | })
  85  | 
  86  | test.describe("HR 權限控管測試", () => {
  87  |   test.beforeEach(async ({ page, baseURL }) => {
  88  |     await loginAsHR(page, baseURL!)
  89  |   })
  90  | 
  91  |   test("導覽列不應顯示越權功能", async ({ page }) => {
  92  |     // Navbar 權限檢查
  93  |     await expect(page.locator("nav").locator("text=系統設定")).toHaveCount(0)
  94  |   })
  95  | 
  96  |   test("不應具備使用者管理權限", async ({ page }) => {
  97  |     await expect(page.locator("nav").locator("text=使用者")).toHaveCount(0)
  98  |   })
  99  | 
  100 |   test("應阻擋非授權路由之直接訪問", async ({ page }) => {
  101 |     await page.goto("/admin/events")
  102 |     await page.waitForTimeout(1000)
  103 |     await expect(page).not.toHaveURL(/\/admin\/events$/)
  104 |   })
  105 | })
```