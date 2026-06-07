# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Hr.spec.ts >> HR 活動專區測試 >> 應能進入單一活動詳情
- Location: e2e\Hr.spec.ts:67:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="event-card"]').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]: 企業活動訂票系統
      - generic [ref=e7]:
        - generic [ref=e8] [cursor=pointer]: 活動
        - generic [ref=e9] [cursor=pointer]: 報名
        - generic [ref=e10] [cursor=pointer]: 票券
        - generic [ref=e11] [cursor=pointer]: 統計
        - generic [ref=e12] [cursor=pointer]: 個人
        - button "登出" [ref=e13]
  - generic [ref=e15]:
    - heading "活動列表" [level=1] [ref=e16]
    - generic [ref=e17]:
      - textbox "搜尋活動..." [ref=e18]
      - combobox [ref=e19]:
        - option "所有類別" [selected]
        - option "運動"
        - option "美食"
        - option "旅遊"
        - option "文藝"
        - option "親子"
        - option "競賽"
        - option "音樂"
      - generic [ref=e20]:
        - button "為你推薦" [ref=e21]
        - button "最熱門" [ref=e22]
        - button "報名中" [ref=e23]
        - button "候補中" [ref=e24]
    - generic [ref=e25]:
      - paragraph [ref=e26]: 🔍
      - paragraph [ref=e27]: 沒有符合的活動
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
  26  |     await expect(page.getByRole("heading", { name: "統計報表" })).toBeVisible()
  27  |   })
  28  | 
  29  |   test("應顯示各項數據指標", async ({ page }) => {
  30  |     await expect(page.locator("text=活動總數")).toBeVisible()
  31  |     await expect(page.locator("text=總報名人數")).toBeVisible()
  32  |     await expect(page.locator("text=總出席人數")).toBeVisible()
  33  |     await expect(page.locator("text=平均出席率")).toBeVisible()
  34  |   })
  35  | 
  36  |   test("應具備資料搜尋功能", async ({ page }) => {
  37  |     await page.waitForTimeout(2000)
  38  |     await page.fill('input[placeholder="搜尋活動..."]', "測試")
  39  |     await expect(page.getByRole("heading", { name: "統計報表" })).toBeVisible()
  40  |   })
  41  | 
  42  |   test("應能跳轉至報名名單頁面", async ({ page }) => {
  43  |     await page.waitForTimeout(2000)
  44  |     const detailBtn = page.locator("text=詳細名單").first()
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
  55  |     // 鎖定 nav 內的「活動」連結，避免 substring match 誤點到「活動總數」
  56  |     await page.locator("nav").getByText("活動", { exact: true }).click()
  57  |     await expect(page).toHaveURL(/\/events$/)
  58  |   })
  59  | 
  60  |   test("應成功載入活動列表", async ({ page }) => {
  61  |     await expect(page.locator("text=活動列表")).toBeVisible()
  62  |     await expect(
  63  |       page.locator('[data-testid="event-card"]').first()
  64  |     ).toBeVisible({ timeout: 15000 })
  65  |   })
  66  | 
  67  |   test("應能進入單一活動詳情", async ({ page }) => {
> 68  |     await page.locator('[data-testid="event-card"]').first().click()
      |                                                              ^ Error: locator.click: Test timeout of 30000ms exceeded.
  69  |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  70  |   })
  71  | })
  72  | 
  73  | test.describe("HR 個人資料測試", () => {
  74  |   test.beforeEach(async ({ page, baseURL }) => {
  75  |     await loginAsHR(page, baseURL!)
  76  |     // Navbar 是「個人」不是「設定」
  77  |     await page.locator("nav").getByText("個人", { exact: true }).click()
  78  |     await expect(page).toHaveURL(/\/profile$/)
  79  |   })
  80  | 
  81  |   test("應正確顯示設定頁面", async ({ page }) => {
  82  |     await expect(page.locator("text=個人資料")).toBeVisible()
  83  |   })
  84  | 
  85  |   test("應正確顯示身分標籤", async ({ page }) => {
  86  |     await expect(page.locator("text=HR").first()).toBeVisible()
  87  |   })
  88  | })
  89  | 
  90  | test.describe("HR 權限控管測試", () => {
  91  |   test.beforeEach(async ({ page, baseURL }) => {
  92  |     await loginAsHR(page, baseURL!)
  93  |   })
  94  | 
  95  |   test("導覽列不應顯示越權功能", async ({ page }) => {
  96  |     // HR 不應該看到「活動管理」「使用者」
  97  |     await expect(page.locator("nav").getByText("活動管理")).toHaveCount(0)
  98  |     await expect(page.locator("nav").getByText("使用者")).toHaveCount(0)
  99  |   })
  100 | 
  101 |   test("不應具備使用者管理權限", async ({ page }) => {
  102 |     await expect(page.locator("nav").locator("text=使用者")).toHaveCount(0)
  103 |   })
  104 | 
  105 |   // ⚠️ 目前 PrivateRoute 沒有 role-based guard,HR 帶 token 直接打 /admin/events 是進得去的。
  106 |   // 要讓這個測試通過,需要修 src/App.tsx 的 PrivateRoute (見下方建議)。
  107 |   // 在補上 role guard 之前先 skip,避免 false negative。
  108 |   test.skip("應阻擋非授權路由之直接訪問", async ({ page }) => {
  109 |     await page.goto("/admin/events")
  110 |     await page.waitForTimeout(1000)
  111 |     await expect(page).not.toHaveURL(/\/admin\/events$/)
  112 |   })
  113 | })
```