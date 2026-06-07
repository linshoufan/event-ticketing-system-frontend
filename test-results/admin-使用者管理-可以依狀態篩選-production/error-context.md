# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 使用者管理 >> 可以依狀態篩選
- Location: e2e\admin.spec.ts:126:3

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
  3   | const MOCK_ACCOUNTS = { id: "admin", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "welfare_001", password: "password123" }
  5   | 
  6   | function getAccount(baseURL: string) {
  7   |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  8   | }
  9   | 
  10  | async function loginAsAdmin(page: any, baseURL: string) {
  11  |   const account = getAccount(baseURL)
  12  |   await page.goto("/")
  13  |   await page.click("text=福委登入")
  14  |   await page.fill('input[autocomplete="username"]', account.id)
  15  |   await page.fill('input[autocomplete="current-password"]', account.password)
  16  |   await page.click('button[type="submit"]')
> 17  |   await expect(page).toHaveURL(/\/admin\/events$/, { timeout: 15000 })
      |                      ^ Error: expect(page).toHaveURL(expected) failed
  18  | }
  19  | 
  20  | test.describe("活動管理", () => {
  21  |   test.beforeEach(async ({ page, baseURL }) => {
  22  |     await loginAsAdmin(page, baseURL!)
  23  |   })
  24  | 
  25  |   test("可以看到活動管理頁面", async ({ page }) => {
  26  |     await expect(page.getByRole("heading", { name: "活動管理" })).toBeVisible()
  27  |     await expect(page.locator("text=+ 新增活動")).toBeVisible()
  28  |   })
  29  | 
  30  |   test("可以開啟新增活動頁面", async ({ page }) => {
  31  |     await page.click("text=+ 新增活動")
  32  |     await expect(page).toHaveURL(/\/admin\/events\/new$/)
  33  |     await expect(page.getByRole("heading", { name: "新增活動" })).toBeVisible()
  34  |     await expect(page.locator('input[name="name"]')).toBeVisible()
  35  |     await expect(page.locator('select[name="category"]')).toBeVisible()
  36  |     await expect(page.locator('input[name="location"]')).toBeVisible()
  37  |     await expect(page.locator("text=儲存草稿")).toBeVisible()
  38  |     await expect(page.locator("text=直接發布")).toBeVisible()
  39  |   })
  40  | 
  41  |   test("未填必填欄位顯示錯誤訊息", async ({ page }) => {
  42  |     await page.click("text=+ 新增活動")
  43  |     await page.click("text=儲存草稿")
  44  |     await expect(page.locator("text=請填寫所有必填欄位")).toBeVisible()
  45  |     await expect(page).toHaveURL(/\/admin\/events\/new$/)
  46  |   })
  47  | 
  48  |   test("草稿活動可以發布", async ({ page }) => {
  49  |     const publishBtn = page.locator("text=發布").first()
  50  |     if (await publishBtn.count() > 0) {
  51  |       await publishBtn.click()
  52  |       await expect(publishBtn).not.toBeVisible()
  53  |     }
  54  |   })
  55  | 
  56  |   test("可以刪除活動", async ({ page }) => {
  57  |     await page.waitForLoadState("networkidle")
  58  |     await page.waitForTimeout(800)
  59  | 
  60  |     const deleteBtn = page.locator("text=刪除").first()
  61  |     if (await deleteBtn.count() > 0) {
  62  |       const countBefore = await page.locator("text=刪除").count()
  63  |       page.on("dialog", dialog => dialog.accept())
  64  |       await deleteBtn.click()
  65  |       await page.waitForTimeout(1500)
  66  |       const countAfter = await page.locator("text=刪除").count()
  67  |       expect(countAfter).toBeLessThanOrEqual(countBefore)
  68  |     }
  69  |   })
  70  | 
  71  |   test("可以看報名詳情", async ({ page }) => {
  72  |     const detailBtn = page.locator("text=報名詳情").first()
  73  |     if (await detailBtn.count() > 0) {
  74  |       await detailBtn.click()
  75  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  76  |       await expect(page.getByRole("heading", { name: "報名詳情" })).toBeVisible()
  77  |     }
  78  |   })
  79  | 
  80  |   test("可以進入核銷頁面", async ({ page }) => {
  81  |     const checkinBtn = page.locator("text=核銷").first()
  82  |     if (await checkinBtn.count() > 0) {
  83  |       await checkinBtn.click()
  84  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  85  |       await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  86  |     }
  87  |   })
  88  | })
  89  | 
  90  | test.describe("報名詳情", () => {
  91  |   test.beforeEach(async ({ page, baseURL }) => {
  92  |     await loginAsAdmin(page, baseURL!)
  93  |     await page.waitForSelector("text=報名詳情")
  94  |     await page.locator("text=報名詳情").first().click()
  95  |     await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  96  |   })
  97  | 
  98  |   test("可以看到報名統計", async ({ page }) => {
  99  |     await expect(page.locator("text=正取").first()).toBeVisible()
  100 |     await expect(page.locator("text=候補").first()).toBeVisible()
  101 |     await expect(page.locator("text=已取消").first()).toBeVisible()
  102 |   })
  103 | 
  104 |   test("可以依狀態篩選報名", async ({ page }) => {
  105 |     await page.locator("select").selectOption("confirmed")
  106 |     await expect(page.locator("text=正取").first()).toBeVisible()
  107 |   })
  108 | })
  109 | 
  110 | test.describe("使用者管理", () => {
  111 |   test.beforeEach(async ({ page, baseURL }) => {
  112 |     await loginAsAdmin(page, baseURL!)
  113 |     await page.click("text=使用者")
  114 |     await expect(page).toHaveURL(/\/admin\/users$/)
  115 |   })
  116 | 
  117 |   test("可以看到使用者管理頁面", async ({ page }) => {
```