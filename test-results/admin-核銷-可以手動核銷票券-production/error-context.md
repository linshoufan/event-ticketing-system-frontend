# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 核銷 >> 可以手動核銷票券
- Location: e2e\admin.spec.ts:178:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('text=完成').first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('text=完成').first()

```

```yaml
- navigation:
  - button "←"
  - text: 企業活動訂票系統 活動管理 使用者 個人
  - button "登出"
- heading "核銷" [level=1]
- paragraph: 已核銷
- paragraph: "0"
- paragraph: 未核銷
- paragraph: "0"
- paragraph: 無效
- paragraph: "0"
- textbox "搜尋姓名或票券 ID..."
- text: 找不到票券
```

# Test source

```ts
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
  125 |     await expect(page).toHaveURL(/\/admin\/users$/)
  126 |   })
  127 | 
  128 |   test("可以看到使用者管理頁面", async ({ page }) => {
  129 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  130 |   })
  131 | 
  132 |   test("可以依角色篩選", async ({ page }) => {
  133 |     await page.locator("select").nth(0).selectOption("employee")
  134 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  135 |   })
  136 | 
  137 |   test("可以依狀態篩選", async ({ page }) => {
  138 |     await page.locator("select").nth(1).selectOption("active")
  139 |     await expect(page.getByRole("heading", { name: "使用者管理" })).toBeVisible()
  140 |   })
  141 | 
  142 |   test("可以修改使用者角色", async ({ page }) => {
  143 |     const roleSelect = page.locator("select").nth(2)
  144 |     if (await roleSelect.count() > 0) {
  145 |       await roleSelect.selectOption("hr")
  146 |       await expect(roleSelect).toHaveValue("hr")
  147 |     }
  148 |   })
  149 | 
  150 |   test("可以刪除使用者", async ({ page }) => {
  151 |     const deleteBtn = page.locator("text=刪除").first()
  152 |     if (await deleteBtn.count() > 0) {
  153 |       const countBefore = await page.locator("text=刪除").count()
  154 |       page.on("dialog", dialog => dialog.accept())
  155 |       await deleteBtn.click()
  156 |       await page.waitForTimeout(500)
  157 |       const countAfter = await page.locator("text=刪除").count()
  158 |       expect(countAfter).toBeLessThanOrEqual(countBefore)
  159 |     }
  160 |   })
  161 | })
  162 | 
  163 | test.describe("核銷", () => {
  164 |   test.beforeEach(async ({ page, baseURL }) => {
  165 |     await loginAsAdmin(page, baseURL!)
  166 |     // ✅ Fix 3: 等待元素出現再點
  167 |     await page.waitForSelector("text=核銷")
  168 |     await page.locator("text=核銷").first().click()
  169 |     await expect(page).toHaveURL(/\/admin\/events\/.*\/checkin$/)
  170 |   })
  171 | 
  172 |   test("可以搜尋票券", async ({ page }) => {
  173 |     await page.waitForSelector('input[placeholder="搜尋姓名或票券 ID..."]')
  174 |     await page.fill('input[placeholder="搜尋姓名或票券 ID..."]', "john")
  175 |     await expect(page.getByRole("heading", { name: "核銷" })).toBeVisible()
  176 |   })
  177 | 
  178 |   test("可以手動核銷票券", async ({ page }) => {
  179 |     const checkinBtn = page.locator("button:has-text('核銷')").first()
  180 |     if (await checkinBtn.count() > 0) {
  181 |       page.on("dialog", dialog => dialog.accept())
  182 |       await checkinBtn.click()
  183 |       await page.waitForTimeout(500)
> 184 |       await expect(page.locator("text=完成").first()).toBeVisible()
      |                                                     ^ Error: expect(locator).toBeVisible() failed
  185 |     }
  186 |   })
  187 | })
```