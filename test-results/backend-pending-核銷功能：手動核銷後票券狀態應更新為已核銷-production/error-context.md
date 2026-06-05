# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: backend-pending.spec.ts >> 核銷功能：手動核銷後票券狀態應更新為已核銷
- Location: e2e\backend-pending.spec.ts:9:1

# Error details

```
Error: expect(locator).not.toBeVisible() failed

Locator:  locator('button:has-text(\'核銷\')').first()
Expected: not visible
Received: visible
Timeout:  5000ms

Call log:
  - Expect "not toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text(\'核銷\')').first()
    14 × locator resolved to <button class="px-3 py-1.5 rounded-lg bg-white hover:bg-zinc-100 text-zinc-900 text-xs font-semibold transition-colors">核銷</button>
       - unexpected value "visible"

```

```yaml
- button "核銷"
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | const REAL_ACCOUNTS = {
  4  |   employee: { id: "1000001",     password: "password123" },
  5  |   admin:    { id: "welfare_001", password: "password123" },
  6  | }
  7  | 
  8  | // 測試 1：核銷功能 — 手動核銷後票券應更新為已核銷
  9  | test("核銷功能：手動核銷後票券狀態應更新為已核銷", async ({ page }) => {
  10 |   // 福委登入
  11 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
  12 |   await page.click("text=福委登入")
  13 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.admin.id)
  14 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.admin.password)
  15 |   await page.click('button[type="submit"]')
  16 |   await expect(page).toHaveURL(/\/admin\/events$/, { timeout: 15000 })
  17 | 
  18 |   // 進入核銷頁面
  19 |   await page.waitForSelector("text=核銷")
  20 |   await page.locator("text=核銷").first().click()
  21 |   await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  22 | 
  23 |   // 執行手動核銷
  24 |   const checkinBtn = page.locator("button:has-text('核銷')").first()
  25 |   if (await checkinBtn.count() > 0) {
  26 |     page.on("dialog", dialog => dialog.accept())
  27 |     await checkinBtn.click()
  28 |     await page.waitForTimeout(1000)
  29 | 
  30 |     // 重新載入確認狀態已更新
  31 |     await page.reload()
  32 |     await page.waitForTimeout(2000)
  33 | 
  34 |     // 核銷完成後，該按鈕應該消失（變成「完成」或消失）
> 35 |     await expect(page.locator("button:has-text('核銷')").first()).not.toBeVisible()
     |                                                                     ^ Error: expect(locator).not.toBeVisible() failed
  36 |   }
  37 | })
  38 | 
  39 | // 測試 2：registrationStart — 尚未開始報名的活動不應讓使用者報名
  40 | test.skip("registrationStart：尚未開始報名的活動不應顯示報名入口", async ({ page }) => {
  41 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
  42 |   await page.click("text=員工登入")
  43 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.employee.id)
  44 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.employee.password)
  45 |   await page.click('button[type="submit"]')
  46 |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  47 | 
  48 |   // 逐一確認「尚未開始報名」的活動不應顯示報名按鈕
  49 |   const cards = page.locator('[data-testid="event-card"]')
  50 |   const count = await cards.count()
  51 | 
  52 |   for (let i = 0; i < count; i++) {
  53 |     const card = cards.nth(i)
  54 |     const statusText = await card.locator('[data-testid="event-status"]').textContent()
  55 | 
  56 |     if (statusText?.includes("尚未開始報名")) {
  57 |       await card.click()
  58 |       await page.waitForTimeout(500)
  59 | 
  60 |       // 不應該出現「立即報名」按鈕
  61 |       await expect(page.locator("text=立即報名")).not.toBeVisible()
  62 | 
  63 |       await page.goBack()
  64 |       await page.waitForTimeout(300)
  65 |     }
  66 |   }
  67 | })
  68 | 
  69 | // 測試 3：通知功能 — 應能看到最新通知
  70 | test("通知功能：應能看到最新系統通知", async ({ page }) => {
  71 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
  72 |   await page.click("text=員工登入")
  73 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.employee.id)
  74 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.employee.password)
  75 |   await page.click('button[type="submit"]')
  76 |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  77 | 
  78 |   // 前往報名紀錄確認有資料
  79 |   await page.click("text=報名")
  80 |   await page.waitForTimeout(1000)
  81 | 
  82 |   await expect(page).toHaveURL(/\/my-transactions$/)
  83 |   await expect(page.locator("text=我的報名紀錄")).toBeVisible()
  84 | })
```