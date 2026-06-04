# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: backend-pending.spec.ts >> ????????????????????
- Location: e2e\backend-pending.spec.ts:72:1

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=????')

```

# Page snapshot

```yaml
- generic [ref=e6]:
  - generic [ref=e7]:
    - generic [ref=e9]: 🎫
    - heading "企業活動訂票系統" [level=1] [ref=e10]
    - paragraph [ref=e11]: 請選擇登入方式
  - generic [ref=e14]:
    - button "👤 員工登入 瀏覽活動、報名、查看票券" [ref=e15]:
      - generic [ref=e16]: 👤
      - generic [ref=e17]:
        - paragraph [ref=e18]: 員工登入
        - paragraph [ref=e19]: 瀏覽活動、報名、查看票券
    - button "⚙️ 福委登入 管理活動、使用者、核銷票券" [ref=e20]:
      - generic [ref=e21]: ⚙️
      - generic [ref=e22]:
        - paragraph [ref=e23]: 福委登入
        - paragraph [ref=e24]: 管理活動、使用者、核銷票券
    - button "📊 HR 登入 查看活動統計與報名數據" [ref=e25]:
      - generic [ref=e26]: 📊
      - generic [ref=e27]:
        - paragraph [ref=e28]: HR 登入
        - paragraph [ref=e29]: 查看活動統計與報名數據
    - button "✨ 第一次登入 使用員工編號建立帳號" [ref=e30]:
      - generic [ref=e31]: ✨
      - generic [ref=e32]:
        - paragraph [ref=e33]: 第一次登入
        - paragraph [ref=e34]: 使用員工編號建立帳號
  - paragraph [ref=e35]: 使用公司員工帳號登入
```

# Test source

```ts
  1  | import { test, expect } from "@playwright/test"
  2  | 
  3  | // ?? ????????????????
  4  | // test.fail() ???????????????? test.fail() ??
  5  | 
  6  | const REAL_ACCOUNTS = {
  7  |   employee: { id: "1000001",     password: "password123" },
  8  |   admin:    { id: "welfare_001", password: "password123" },
  9  | }
  10 | 
  11 | // ?? ?? 1??????????? ????????????????????????????????
  12 | test("??????????????????????", async ({ page }) => {
  13 |   test.fail() // ? ??? manual: true ????????
  14 | 
  15 |   // ????
  16 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
  17 |   await page.click("text=????")
  18 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.admin.id)
  19 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.admin.password)
  20 |   await page.click('button[type="submit"]')
  21 |   await expect(page).toHaveURL(/\/admin\/events$/, { timeout: 15000 })
  22 | 
  23 |   // ?????
  24 |   await page.waitForSelector("text=??")
  25 |   await page.locator("text=??").first().click()
  26 |   await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  27 | 
  28 |   // ??????????
  29 |   const checkinBtn = page.locator("button:has-text('??')").first()
  30 |   if (await checkinBtn.count() > 0) {
  31 |     page.on("dialog", dialog => dialog.accept())
  32 |     await checkinBtn.click()
  33 |     await page.waitForTimeout(1000)
  34 | 
  35 |     // ????
  36 |     await page.reload()
  37 |     await page.waitForTimeout(2000)
  38 | 
  39 |     // ??????????????????????
  40 |     await expect(page.locator("button:has-text('??')").first()).not.toBeVisible()
  41 |   }
  42 | })
  43 | 
  44 | // ?? ?? 2????? scheduler ?????? ?????????????????????
  45 | test("??????registrationStart ??????????????????", async ({ page }) => {
  46 |   test.fail() // ? ?? scheduler ????????
  47 | 
  48 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
  49 |   await page.click("text=????")
  50 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.employee.id)
  51 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.employee.password)
  52 |   await page.click('button[type="submit"]')
  53 |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  54 | 
  55 |   // ?????????????? registrationStart ?????
  56 |   const cards = page.locator('[data-testid="event-card"]')
  57 |   const count = await cards.count()
  58 | 
  59 |   for (let i = 0; i < count; i++) {
  60 |     const card = cards.nth(i)
  61 |     const statusText = await card.locator('[data-testid="event-status"]').textContent()
  62 |     const registrationInfo = await card.textContent()
  63 | 
  64 |     // ??????????????????????????
  65 |     if (statusText?.includes("??????")) {
  66 |       expect(registrationInfo).not.toContain("???") // ????
  67 |     }
  68 |   }
  69 | })
  70 | 
  71 | // ?? ?? 3?Notification API ?????? ???????????????????????
  72 | test("????????????????????", async ({ page }) => {
  73 |   test.fail() // ? ???? GET /notifications ??????
  74 | 
  75 |   await page.goto("https://event-ticketing-system-frontend-eight.vercel.app/")
> 76 |   await page.click("text=????")
     |              ^ Error: page.click: Test timeout of 30000ms exceeded.
  77 |   await page.fill('input[autocomplete="username"]', REAL_ACCOUNTS.employee.id)
  78 |   await page.fill('input[autocomplete="current-password"]', REAL_ACCOUNTS.employee.password)
  79 |   await page.click('button[type="submit"]')
  80 |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  81 | 
  82 |   // ???????
  83 |   await page.click("text=??")
  84 |   await page.waitForTimeout(1000)
  85 | 
  86 |   // ?????????????? mock ???
  87 |   const notifications = page.locator('[class*="notificationId"]')
  88 |   await expect(notifications.first()).toBeVisible()
  89 | })
```