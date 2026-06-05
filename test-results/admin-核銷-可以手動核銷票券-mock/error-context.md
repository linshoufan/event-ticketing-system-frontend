# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 核銷 >> 可以手動核銷票券
- Location: e2e\admin.spec.ts:164:3

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
  134 |     }
  135 |   })
  136 | 
  137 |   test("可以刪除使用者", async ({ page }) => {
  138 |     const deleteBtn = page.locator("text=刪除").first()
  139 |     if (await deleteBtn.count() > 0) {
  140 |       const countBefore = await page.locator("text=刪除").count()
  141 |       page.on("dialog", dialog => dialog.accept())
  142 |       await deleteBtn.click()
  143 |       await page.waitForTimeout(500)
  144 |       const countAfter = await page.locator("text=刪除").count()
  145 |       expect(countAfter).toBeLessThanOrEqual(countBefore)
  146 |     }
  147 |   })
  148 | })
  149 | 
  150 | test.describe("核銷", () => {
  151 |   test.beforeEach(async ({ page, baseURL }) => {
  152 |     await loginAsAdmin(page, baseURL!)
  153 |     await page.waitForSelector("text=核銷")
  154 |     await page.locator("text=核銷").first().click()
  155 |     await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  156 |   })
  157 | 
  158 |   test("可以搜尋票券", async ({ page }) => {
  159 |     await page.waitForSelector('input[placeholder="搜尋姓名或票券 ID..."]')
  160 |     await page.fill('input[placeholder="搜尋姓名或票券 ID..."]', "john")
  161 |     await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  162 |   })
  163 | 
  164 |   test("可以手動核銷票券", async ({ page }) => {
  165 |     const checkinBtn = page.locator("button:has-text('核銷')").first()
  166 |     if (await checkinBtn.count() > 0) {
  167 |       page.on("dialog", dialog => dialog.accept())
  168 |       await checkinBtn.click()
  169 |       await page.waitForTimeout(500)
  170 |       // ✅ 改成確認按鈕消失就好，不找「完成」文字
> 171 |       await expect(checkinBtn).not.toBeVisible()
      |                                    ^ Error: expect(locator).not.toBeVisible() failed
  172 |     }
  173 |   })
  174 | })
```