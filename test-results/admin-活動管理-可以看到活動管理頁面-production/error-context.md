# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 活動管理 >> 可以看到活動管理頁面
- Location: e2e\admin.spec.ts:37:3

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
  3   | const MOCK_ACCOUNTS   = { id: "admin", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "welfare_001", password: "password123" }
  5   | 
  6   | function getAccount(baseURL: string) {
  7   |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  8   | }
  9   | 
  10  | async function fillDateTimeLocal(page: any, name: string, value: string) {
  11  |   await page.evaluate(({ name, value }: { name: string; value: string }) => {
  12  |     const input = document.querySelector(`input[name="${name}"]`) as HTMLInputElement
  13  |     const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
  14  |       window.HTMLInputElement.prototype, "value"
  15  |     )?.set
  16  |     nativeInputValueSetter?.call(input, value)
  17  |     input.dispatchEvent(new Event("input", { bubbles: true }))
  18  |     input.dispatchEvent(new Event("change", { bubbles: true }))
  19  |   }, { name, value })
  20  | }
  21  | 
  22  | async function loginAsAdmin(page: any, baseURL: string) {
  23  |   const account = getAccount(baseURL)
> 24  |   await page.goto("/")
      |              ^ Error: page.goto: Test ended.
  25  |   await page.click("text=福委登入")
  26  |   await page.fill('input[autocomplete="username"]', account.id)
  27  |   await page.fill('input[autocomplete="current-password"]', account.password)
  28  |   await page.click('button[type="submit"]')
  29  |   await expect(page).toHaveURL(/\/admin\/events$/)
  30  | }
  31  | 
  32  | test.describe("活動管理", () => {
  33  |   test.beforeEach(async ({ page, baseURL }) => {
  34  |     await loginAsAdmin(page, baseURL!)
  35  |   })
  36  | 
  37  |   test("可以看到活動管理頁面", async ({ page }) => {
  38  |     // ✅ Fix 1: 用 heading role 避免和 Navbar 衝突
  39  |     await expect(page.getByRole("heading", { name: "活動管理" })).toBeVisible()
  40  |     await expect(page.locator("text=+ 新增活動")).toBeVisible()
  41  |   })
  42  | 
  43  |     test("可以開啟新增活動頁面", async ({ page }) => {
  44  |     await page.click("text=+ 新增活動")
  45  |     await expect(page).toHaveURL(/\/admin\/events\/new$/)
  46  |     await expect(page.getByRole("heading", { name: "新增活動" })).toBeVisible()
  47  |     await expect(page.locator('input[name="name"]')).toBeVisible()
  48  |     await expect(page.locator('select[name="category"]')).toBeVisible()
  49  |     await expect(page.locator('input[name="location"]')).toBeVisible()
  50  |     await expect(page.locator("text=儲存草稿")).toBeVisible()
  51  |     await expect(page.locator("text=直接發布")).toBeVisible()
  52  |     })
  53  | 
  54  |     test("未填必填欄位顯示錯誤訊息", async ({ page }) => {
  55  |     await page.click("text=+ 新增活動")
  56  |     await page.click("text=儲存草稿")
  57  |     await expect(page.locator("text=請填寫所有必填欄位")).toBeVisible()
  58  |     await expect(page).toHaveURL(/\/admin\/events\/new$/)
  59  |     })
  60  | 
  61  |   test("草稿活動可以發布", async ({ page }) => {
  62  |     const publishBtn = page.locator("text=發布").first()
  63  |     if (await publishBtn.count() > 0) {
  64  |       await publishBtn.click()
  65  |       await expect(publishBtn).not.toBeVisible()
  66  |     }
  67  |   })
  68  | 
  69  |   test("可以刪除活動", async ({ page }) => {
  70  |     const deleteBtn = page.locator("text=刪除").first()
  71  |     if (await deleteBtn.count() > 0) {
  72  |       const countBefore = await page.locator("text=刪除").count()
  73  |       page.on("dialog", dialog => dialog.accept())
  74  |       await deleteBtn.click()
  75  |       await page.waitForTimeout(500)
  76  |       const countAfter = await page.locator("text=刪除").count()
  77  |       expect(countAfter).toBeLessThan(countBefore)
  78  |     }
  79  |   })
  80  | 
  81  |   test("可以看報名詳情", async ({ page }) => {
  82  |     const detailBtn = page.locator("text=報名詳情").first()
  83  |     if (await detailBtn.count() > 0) {
  84  |       await detailBtn.click()
  85  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  86  |       await expect(page.getByRole("heading", { name: "報名詳情" })).toBeVisible()
  87  |     }
  88  |   })
  89  | 
  90  |   test("可以進入核銷頁面", async ({ page }) => {
  91  |     const checkinBtn = page.locator("text=核銷").first()
  92  |     if (await checkinBtn.count() > 0) {
  93  |       await checkinBtn.click()
  94  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  95  |       await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  96  |     }
  97  |   })
  98  | })
  99  | 
  100 | test.describe("報名詳情", () => {
  101 |   test.beforeEach(async ({ page, baseURL }) => {
  102 |     await loginAsAdmin(page, baseURL!)
  103 |     // ✅ Fix 3: 等待元素出現再點，不用 if 判斷
  104 |     await page.waitForSelector("text=報名詳情")
  105 |     await page.locator("text=報名詳情").first().click()
  106 |     await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  107 |   })
  108 | 
  109 |   test("可以看到報名統計", async ({ page }) => {
  110 |     await expect(page.locator("text=正取").first()).toBeVisible()
  111 |     await expect(page.locator("text=候補").first()).toBeVisible()
  112 |     await expect(page.locator("text=已取消").first()).toBeVisible()
  113 |   })
  114 | 
  115 |   test("可以依狀態篩選報名", async ({ page }) => {
  116 |     await page.locator("select").selectOption("confirmed")
  117 |     await expect(page.locator("text=正取").first()).toBeVisible()
  118 |   })
  119 | })
  120 | 
  121 | test.describe("使用者管理", () => {
  122 |   test.beforeEach(async ({ page, baseURL }) => {
  123 |     await loginAsAdmin(page, baseURL!)
  124 |     await page.click("text=使用者")
```