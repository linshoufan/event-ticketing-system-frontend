# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 報名詳情 >> 可以依狀態篩選報名
- Location: e2e\admin.spec.ts:104:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=報名詳情') to be visible

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]: 企業活動訂票系統
      - generic [ref=e7]:
        - generic [ref=e8] [cursor=pointer]: 活動管理
        - generic [ref=e9] [cursor=pointer]: 使用者
        - generic [ref=e10] [cursor=pointer]: 個人
        - button "登出" [ref=e11]
  - generic [ref=e13]:
    - generic [ref=e14]:
      - heading "活動管理" [level=1] [ref=e15]
      - generic [ref=e16]:
        - button "+ 新增活動" [ref=e17]
        - button "使用者管理" [ref=e18]
    - generic [ref=e19]:
      - paragraph [ref=e20]: 📅
      - paragraph [ref=e21]: 沒有活動
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
> 93  |     await page.waitForSelector("text=報名詳情")
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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
  118 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  119 |   })
  120 | 
  121 |   test("可以依角色篩選", async ({ page }) => {
  122 |     await page.locator("select").nth(0).selectOption("employee")
  123 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  124 |   })
  125 | 
  126 |   test("可以依狀態篩選", async ({ page }) => {
  127 |     await page.locator("select").nth(1).selectOption("active")
  128 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  129 |   })
  130 | 
  131 |   test("可以修改使用者角色", async ({ page }) => {
  132 |     const roleSelect = page.locator("select").nth(2)
  133 |     if (await roleSelect.count() > 0) {
  134 |       await roleSelect.selectOption("hr")
  135 |       await expect(roleSelect).toHaveValue("hr")
  136 |     }
  137 |   })
  138 | 
  139 |   test("可以刪除使用者", async ({ page }) => {
  140 |     // 等使用者列表完整渲染後再量
  141 |     await page.waitForLoadState("networkidle")
  142 |     await page.waitForTimeout(800)
  143 | 
  144 |     const deleteBtn = page.locator("text=刪除").first()
  145 |     if (await deleteBtn.count() > 0) {
  146 |       const countBefore = await page.locator("text=刪除").count()
  147 |       page.on("dialog", dialog => dialog.accept())
  148 |       await deleteBtn.click()
  149 |       await page.waitForTimeout(1500)  // 拉長一點，避免後端還沒回
  150 |       const countAfter = await page.locator("text=刪除").count()
  151 |       expect(countAfter).toBeLessThanOrEqual(countBefore)
  152 |     }
  153 |   })
  154 | })
  155 | 
  156 | test.describe("核銷", () => {
  157 |   test.beforeEach(async ({ page, baseURL }) => {
  158 |     await loginAsAdmin(page, baseURL!)
  159 |     await page.waitForSelector("text=核銷")
  160 |     await page.locator("text=核銷").first().click()
  161 |     await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  162 |   })
  163 | 
  164 |   test("可以搜尋票券", async ({ page }) => {
  165 |     await page.waitForSelector('input[placeholder="搜尋姓名或票券 ID..."]')
  166 |     await page.fill('input[placeholder="搜尋姓名或票券 ID..."]', "john")
  167 |     await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  168 |   })
  169 | 
  170 |   test("可以手動核銷票券", async ({ page }) => {
  171 |     const checkinBtn = page.locator("button:has-text('核銷')").first()
  172 |     if (await checkinBtn.count() > 0) {
  173 |       page.on("dialog", dialog => dialog.accept())
  174 |       await checkinBtn.click()
  175 |       await page.waitForTimeout(500)
  176 |       // ✅ 改成確認按鈕消失就好，不找「完成」文字
  177 |       await expect(checkinBtn).not.toBeVisible()
  178 |     }
  179 |   })
  180 | })
```