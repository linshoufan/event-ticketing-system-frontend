# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> 登入流程 >> 員工登入成功，跳轉到活動列表
- Location: e2e\auth.spec.ts:24:3

# Error details

```
Error: page.goto: Test ended.
Call log:
  - navigating to "https://event-ticketing-system-frontend-eight.vercel.app/", waiting until "load"

```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | 
  3   | // Mock 環境帳號
  4   | const MOCK_ACCOUNTS = {
  5   |   employee:      { id: "employee", password: "1234" },
  6   |   admin:         { id: "admin",    password: "1234" },
  7   |   hr:            { id: "hr",       password: "1234" },
  8   | }
  9   | 
  10  | // 真實環境帳號（拿到後填在這裡）
  11  | const REAL_ACCOUNTS = {
  12  |   employee:      { id: "1000001", password: "password123" },
  13  |   admin:         { id: "welfare_001",    password: "password123" },
  14  |   hr:            { id: "hr_001",       password: "password123" },
  15  | }
  16  | 
  17  | // 根據環境選帳號
  18  | function getAccounts(baseURL: string) {
  19  |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  20  | }
  21  | 
  22  | test.describe("登入流程", () => {
  23  | 
  24  |   test("員工登入成功，跳轉到活動列表", async ({ page, baseURL }) => {
  25  |     const { employee } = getAccounts(baseURL!)
> 26  |     await page.goto("/")
      |                ^ Error: page.goto: Test ended.
  27  |     await page.click("text=員工登入")
  28  |     await page.fill('input[autocomplete="username"]', employee.id)
  29  |     await page.fill('input[autocomplete="current-password"]', employee.password)
  30  |     await page.click('button[type="submit"]')
  31  |     await expect(page).toHaveURL(/\/events$/)
  32  |     await expect(page.locator("text=活動列表")).toBeVisible()
  33  |   })
  34  | 
  35  |   test("福委登入成功，跳轉到活動管理", async ({ page, baseURL }) => {
  36  |     const { admin } = getAccounts(baseURL!)
  37  |     await page.goto("/")
  38  |     await page.click("text=福委登入")
  39  |     await page.fill('input[autocomplete="username"]', admin.id)
  40  |     await page.fill('input[autocomplete="current-password"]', admin.password)
  41  |     await page.click('button[type="submit"]')
  42  |     await expect(page).toHaveURL(/\/admin\/events$/)
  43  |     await expect(page.getByRole("heading", { name: "活動管理" })).toBeVisible()
  44  |   })
  45  | 
  46  |   test("HR 登入成功，跳轉到統計頁面", async ({ page, baseURL }) => {
  47  |     const { hr } = getAccounts(baseURL!)
  48  |     await page.goto("/")
  49  |     await page.click("text=HR 登入")
  50  |     await page.fill('input[autocomplete="username"]', hr.id)
  51  |     await page.fill('input[autocomplete="current-password"]', hr.password)
  52  |     await page.click('button[type="submit"]')
  53  |     await expect(page).toHaveURL(/\/admin\/hr$/)
  54  |     await expect(page.locator("text=統計報表")).toBeVisible()
  55  |   })
  56  | 
  57  |   test("密碼錯誤，顯示錯誤訊息", async ({ page }) => {
  58  |     await page.goto("/")
  59  |     await page.click("text=員工登入")
  60  |     await page.fill('input[autocomplete="username"]', "1000001")
  61  |     await page.fill('input[autocomplete="current-password"]', "wrongpassword")
  62  |     await page.click('button[type="submit"]')
  63  |     await page.waitForTimeout(2000)
  64  |     await expect(page).toHaveURL("/")
  65  |   })
  66  | 
  67  | 
  68  |   test("角色不符，顯示錯誤訊息", async ({ page }) => {
  69  |     await page.goto("/")
  70  |     await page.click("text=福委登入")
  71  |     await page.fill('input[autocomplete="username"]', "1000001")
  72  |     await page.fill('input[autocomplete="current-password"]', "password123")
  73  |     await page.click('button[type="submit"]')
  74  |     await page.waitForTimeout(2000)
  75  |     await expect(page).toHaveURL("/")
  76  |   })
  77  | 
  78  |   test("未填帳號，不能送出", async ({ page }) => {
  79  |     await page.goto("/")
  80  |     await page.click("text=員工登入")
  81  |     await page.click('button[type="submit"]')
  82  |     await expect(page).toHaveURL("/")
  83  |   })
  84  | 
  85  | })
  86  | 
  87  | test.describe("登出流程", () => {
  88  | 
  89  |   test.beforeEach(async ({ page, baseURL }) => {
  90  |     const { employee } = getAccounts(baseURL!)
  91  |     await page.goto("/")
  92  |     await page.click("text=員工登入")
  93  |     await page.fill('input[autocomplete="username"]', employee.id)
  94  |     await page.fill('input[autocomplete="current-password"]', employee.password)
  95  |     await page.click('button[type="submit"]')
  96  |     await expect(page).toHaveURL(/\/events$/)
  97  |   })
  98  | 
  99  |   test("登出後跳回登入頁面", async ({ page }) => {
  100 |     await page.click("text=登出")
  101 |     await expect(page).toHaveURL("/")
  102 |     await expect(page.locator("text=企業活動訂票系統")).toBeVisible()
  103 |   })
  104 | 
  105 |   test("登出後無法存取受保護頁面", async ({ page, baseURL }) => {
  106 |     const { employee } = getAccounts(baseURL!)
  107 |     await page.goto("/")
  108 |     await page.click("text=員工登入")
  109 |     await page.fill('input[autocomplete="username"]', employee.id)
  110 |     await page.fill('input[autocomplete="current-password"]', employee.password)
  111 |     await page.click('button[type="submit"]')
  112 |     await expect(page).toHaveURL(/\/events$/)
  113 | 
  114 |     await page.click("text=登出")
  115 |     await expect(page).toHaveURL("/")
  116 | 
  117 |     await page.goto("/events")
  118 |     await page.waitForTimeout(1000)  // ← 等路由保護觸發
  119 |     await expect(page).toHaveURL("/")
  120 |   })
  121 | 
  122 | })
```