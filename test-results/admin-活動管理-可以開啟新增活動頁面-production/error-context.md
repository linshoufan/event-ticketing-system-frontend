# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 活動管理 >> 可以開啟新增活動頁面
- Location: e2e\admin.spec.ts:30:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('heading', { name: '新增活動' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('heading', { name: '新增活動' })

```

```yaml
- navigation:
  - button "←"
  - text: 企業活動訂票系統 活動管理 使用者 個人
  - button "登出"
- heading "????" [level=1]
- heading "????" [level=3]
- text: "???? *"
- textbox "????"
- text: "????"
- textbox "????"
- text: "???? *"
- combobox:
  - option "?????" [selected]
  - option "??"
  - option "??"
  - option "??"
  - option "??"
  - option "??"
  - option "??"
  - option "??"
- text: "???? *"
- textbox "????"
- heading "?????????" [level=3]
- button "Zoom in"
- button "Zoom out"
- link "Leaflet":
  - /url: https://leafletjs.com
- text: ©
- link "OpenStreetMap":
  - /url: https://openstreetmap.org/copyright
- paragraph: "??????????"
- text: "????????"
- textbox "200"
- heading "????" [level=3]
- text: "?????? *"
- textbox
- text: "??????"
- textbox
- text: "??????"
- textbox
- text: "??????"
- textbox
- heading "????" [level=3]
- text: "?????????????"
- spinbutton
- text: "????????????????"
- textbox
- heading "????" [level=3]
- button "+ ????"
- paragraph: "????????"
- button "????"
- button "????"
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
  17  |   await expect(page).toHaveURL(/\/admin\/events$/, { timeout: 15000 })
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
> 33  |     await expect(page.getByRole("heading", { name: "新增活動" })).toBeVisible()
      |                                                               ^ Error: expect(locator).toBeVisible() failed
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
  57  |     const deleteBtn = page.locator("text=刪除").first()
  58  |     if (await deleteBtn.count() > 0) {
  59  |       const countBefore = await page.locator("text=刪除").count()
  60  |       page.on("dialog", dialog => dialog.accept())
  61  |       await deleteBtn.click()
  62  |       await page.waitForTimeout(500)
  63  |       const countAfter = await page.locator("text=刪除").count()
  64  |       // ✅ 改成 LessThanOrEqual，因為部分活動後端不允許刪除（scheduler 問題）
  65  |       expect(countAfter).toBeLessThanOrEqual(countBefore)
  66  |     }
  67  |   })
  68  | 
  69  |   test("可以看報名詳情", async ({ page }) => {
  70  |     const detailBtn = page.locator("text=報名詳情").first()
  71  |     if (await detailBtn.count() > 0) {
  72  |       await detailBtn.click()
  73  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  74  |       await expect(page.getByRole("heading", { name: "報名詳情" })).toBeVisible()
  75  |     }
  76  |   })
  77  | 
  78  |   test("可以進入核銷頁面", async ({ page }) => {
  79  |     const checkinBtn = page.locator("text=核銷").first()
  80  |     if (await checkinBtn.count() > 0) {
  81  |       await checkinBtn.click()
  82  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  83  |       await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  84  |     }
  85  |   })
  86  | })
  87  | 
  88  | test.describe("報名詳情", () => {
  89  |   test.beforeEach(async ({ page, baseURL }) => {
  90  |     await loginAsAdmin(page, baseURL!)
  91  |     await page.waitForSelector("text=報名詳情")
  92  |     await page.locator("text=報名詳情").first().click()
  93  |     await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  94  |   })
  95  | 
  96  |   test("可以看到報名統計", async ({ page }) => {
  97  |     await expect(page.locator("text=正取").first()).toBeVisible()
  98  |     await expect(page.locator("text=候補").first()).toBeVisible()
  99  |     await expect(page.locator("text=已取消").first()).toBeVisible()
  100 |   })
  101 | 
  102 |   test("可以依狀態篩選報名", async ({ page }) => {
  103 |     await page.locator("select").selectOption("confirmed")
  104 |     await expect(page.locator("text=正取").first()).toBeVisible()
  105 |   })
  106 | })
  107 | 
  108 | test.describe("使用者管理", () => {
  109 |   test.beforeEach(async ({ page, baseURL }) => {
  110 |     await loginAsAdmin(page, baseURL!)
  111 |     await page.click("text=使用者")
  112 |     await expect(page).toHaveURL(/\/admin\/users$/)
  113 |   })
  114 | 
  115 |   test("可以看到使用者管理頁面", async ({ page }) => {
  116 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  117 |   })
  118 | 
  119 |   test("可以依角色篩選", async ({ page }) => {
  120 |     await page.locator("select").nth(0).selectOption("employee")
  121 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  122 |   })
  123 | 
  124 |   test("可以依狀態篩選", async ({ page }) => {
  125 |     await page.locator("select").nth(1).selectOption("active")
  126 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  127 |   })
  128 | 
  129 |   test("可以修改使用者角色", async ({ page }) => {
  130 |     const roleSelect = page.locator("select").nth(2)
  131 |     if (await roleSelect.count() > 0) {
  132 |       await roleSelect.selectOption("hr")
  133 |       await expect(roleSelect).toHaveValue("hr")
```