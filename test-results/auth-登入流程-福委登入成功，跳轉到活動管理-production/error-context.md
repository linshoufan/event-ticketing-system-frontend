# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: auth.spec.ts >> 登入流程 >> 福委登入成功，跳轉到活動管理
- Location: e2e\auth.spec.ts:32:3

# Error details

```
Error: expect(page).toHaveURL(expected) failed

Expected pattern: /\/admin\/events$/
Received string:  "https://event-ticketing-system-frontend-eight.vercel.app/"
Timeout: 15000ms

Call log:
  - Expect "toHaveURL" with timeout 15000ms
    33 × unexpected value "https://event-ticketing-system-frontend-eight.vercel.app/"

```

```yaml
- text: 🎫
- heading "企業活動訂票系統" [level=1]
- paragraph: 請輸入您的員工編號與密碼
- button "←"
- text: ⚙️ 福委登入 員工編號
- textbox "請輸入員工編號": welfare_001
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
  3   | const MOCK_ACCOUNTS = {
  4   |   employee: { id: "employee", password: "1234" },
  5   |   admin:    { id: "admin",    password: "1234" },
  6   |   hr:       { id: "hr",       password: "1234" },
  7   | }
  8   | 
  9   | const REAL_ACCOUNTS = {
  10  |   employee: { id: "1000001",     password: "password123" },
  11  |   admin:    { id: "welfare_001", password: "password123" },
  12  |   hr:       { id: "hr_001",      password: "password123" },
  13  | }
  14  | 
  15  | function getAccounts(baseURL: string) {
  16  |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  17  | }
  18  | 
  19  | test.describe("登入流程", () => {
  20  | 
  21  |   test("員工登入成功，跳轉到活動列表", async ({ page, baseURL }) => {
  22  |     const { employee } = getAccounts(baseURL!)
  23  |     await page.goto("/")
  24  |     await page.click("text=員工登入")
  25  |     await page.fill('input[autocomplete="username"]', employee.id)
  26  |     await page.fill('input[autocomplete="current-password"]', employee.password)
  27  |     await page.click('button[type="submit"]')
  28  |     await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  29  |     await expect(page.locator("text=活動列表")).toBeVisible()
  30  |   })
  31  | 
  32  |   test("福委登入成功，跳轉到活動管理", async ({ page, baseURL }) => {
  33  |     const { admin } = getAccounts(baseURL!)
  34  |     await page.goto("/")
  35  |     await page.click("text=福委登入")
  36  |     await page.fill('input[autocomplete="username"]', admin.id)
  37  |     await page.fill('input[autocomplete="current-password"]', admin.password)
  38  |     await page.click('button[type="submit"]')
> 39  |     await expect(page).toHaveURL(/\/admin\/events$/, { timeout: 15000 })
      |                        ^ Error: expect(page).toHaveURL(expected) failed
  40  |     await expect(page.getByRole("heading", { name: "活動管理" })).toBeVisible()
  41  |   })
  42  | 
  43  |   test("HR 登入成功，跳轉到統計頁面", async ({ page, baseURL }) => {
  44  |     const { hr } = getAccounts(baseURL!)
  45  |     await page.goto("/")
  46  |     await page.click("text=HR 登入")
  47  |     await page.fill('input[autocomplete="username"]', hr.id)
  48  |     await page.fill('input[autocomplete="current-password"]', hr.password)
  49  |     await page.click('button[type="submit"]')
  50  |     await expect(page).toHaveURL(/\/admin\/hr$/, { timeout: 15000 })
  51  |     await expect(page.locator("text=統計報表")).toBeVisible()
  52  |   })
  53  | 
  54  |   test("密碼錯誤，顯示錯誤訊息", async ({ page }) => {
  55  |     await page.goto("/")
  56  |     await page.click("text=員工登入")
  57  |     await page.fill('input[autocomplete="username"]', "1000001")
  58  |     await page.fill('input[autocomplete="current-password"]', "wrongpassword")
  59  |     await page.click('button[type="submit"]')
  60  |     await page.waitForTimeout(2000)
  61  |     await expect(page).toHaveURL("/")
  62  |   })
  63  | 
  64  |   test("角色不符，顯示錯誤訊息", async ({ page }) => {
  65  |     await page.goto("/")
  66  |     await page.click("text=福委登入")
  67  |     await page.fill('input[autocomplete="username"]', "1000001")
  68  |     await page.fill('input[autocomplete="current-password"]', "password123")
  69  |     await page.click('button[type="submit"]')
  70  |     await page.waitForTimeout(2000)
  71  |     await expect(page).toHaveURL("/")
  72  |   })
  73  | 
  74  |   test("未填帳號，不能送出", async ({ page }) => {
  75  |     await page.goto("/")
  76  |     await page.click("text=員工登入")
  77  |     await page.click('button[type="submit"]')
  78  |     await expect(page).toHaveURL("/")
  79  |   })
  80  | 
  81  | })
  82  | 
  83  | test.describe("登出流程", () => {
  84  | 
  85  |   test.beforeEach(async ({ page, baseURL }) => {
  86  |     const { employee } = getAccounts(baseURL!)
  87  |     await page.goto("/")
  88  |     await page.click("text=員工登入")
  89  |     await page.fill('input[autocomplete="username"]', employee.id)
  90  |     await page.fill('input[autocomplete="current-password"]', employee.password)
  91  |     await page.click('button[type="submit"]')
  92  |     await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  93  |   })
  94  | 
  95  |   test("登出後跳回登入頁面", async ({ page }) => {
  96  |     await page.click("text=登出")
  97  |     await expect(page).toHaveURL("/")
  98  |     await expect(page.locator("text=企業活動訂票系統")).toBeVisible()
  99  |   })
  100 | 
  101 |   test("登出後無法存取受保護頁面", async ({ page }) => {
  102 |     await page.click("text=登出")
  103 |     await expect(page).toHaveURL("/")
  104 |     await page.goto("/events")
  105 |     await page.waitForTimeout(1000)
  106 |     await expect(page).toHaveURL("/")
  107 |   })
  108 | 
  109 | })
```