# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> 登入流程 >> HR 登入成功，跳轉到統計頁面
- Location: e2e\auth.spec.ts:46:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/hr$/
Received string:  "https://event-ticketing-system-frontend-eight.vercel.app/"
Timeout: 5000ms

Call log:
  - Expect "toHaveURL" with timeout 5000ms
    14 × unexpected value "https://event-ticketing-system-frontend-eight.vercel.app/"

```

```yaml
- text: 🎫
- heading "企業活動訂票系統" [level=1]
- paragraph: 請輸入您的員工編號與密碼
- button "←"
- text: 📊 HR 登入 員工編號
- textbox "請輸入員工編號": hr_001
- text: 密碼
- textbox "請輸入密碼": password123
- text: 您的帳號權限不符，請選擇正確的登入方式
- button "登入"
- paragraph: 使用公司員工帳號登入
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
  26  |     await page.goto("/")
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
> 53  |     await expect(page).toHaveURL(/\/admin\/hr$/)
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  54  |     await expect(page.locator("text=統計報表")).toBeVisible()
  55  |   })
  56  | 
  57  |   test("密碼錯誤，顯示錯誤訊息", async ({ page }) => {
  58  |     await page.goto("/")
  59  |     await page.click("text=員工登入")
  60  |     await page.fill('input[autocomplete="username"]', "employee")
  61  |     await page.fill('input[autocomplete="current-password"]', "wrongpassword")
  62  |     await page.click('button[type="submit"]')
  63  |     await expect(page.locator("text=員工編號或密碼錯誤")).toBeVisible()
  64  |     await expect(page).toHaveURL("/")
  65  |   })
  66  | 
  67  |   test("角色不符，顯示錯誤訊息", async ({ page }) => {
  68  |     await page.goto("/")
  69  |     await page.click("text=福委登入")
  70  |     await page.fill('input[autocomplete="username"]', "employee")
  71  |     await page.fill('input[autocomplete="current-password"]', "1234")
  72  |     await page.click('button[type="submit"]')
  73  |     await expect(page.locator("text=您的帳號權限不符")).toBeVisible()
  74  |     await expect(page).toHaveURL("/")
  75  |   })
  76  | 
  77  |   test("未填帳號，不能送出", async ({ page }) => {
  78  |     await page.goto("/")
  79  |     await page.click("text=員工登入")
  80  |     await page.click('button[type="submit"]')
  81  |     await expect(page).toHaveURL("/")
  82  |   })
  83  | 
  84  | })
  85  | 
  86  | test.describe("登出流程", () => {
  87  | 
  88  |   test.beforeEach(async ({ page, baseURL }) => {
  89  |     const { employee } = getAccounts(baseURL!)
  90  |     await page.goto("/")
  91  |     await page.click("text=員工登入")
  92  |     await page.fill('input[autocomplete="username"]', employee.id)
  93  |     await page.fill('input[autocomplete="current-password"]', employee.password)
  94  |     await page.click('button[type="submit"]')
  95  |     await expect(page).toHaveURL(/\/events$/)
  96  |   })
  97  | 
  98  |   test("登出後跳回登入頁面", async ({ page }) => {
  99  |     await page.click("text=登出")
  100 |     await expect(page).toHaveURL("/")
  101 |     await expect(page.locator("text=企業活動訂票系統")).toBeVisible()
  102 |   })
  103 | 
  104 |   test("登出後無法存取受保護頁面", async ({ page, baseURL }) => {
  105 |     const { employee } = getAccounts(baseURL!)
  106 |     await page.goto("/")
  107 |     await page.click("text=員工登入")
  108 |     await page.fill('input[autocomplete="username"]', employee.id)
  109 |     await page.fill('input[autocomplete="current-password"]', employee.password)
  110 |     await page.click('button[type="submit"]')
  111 |     await expect(page).toHaveURL(/\/events$/)
  112 | 
  113 |     await page.click("text=登出")
  114 |     await expect(page).toHaveURL("/")
  115 | 
  116 |     await page.goto("/events")
  117 |     await page.waitForTimeout(1000)  // ← 等路由保護觸發
  118 |     await expect(page).toHaveURL("/")
  119 |   })
  120 | 
  121 | })
```