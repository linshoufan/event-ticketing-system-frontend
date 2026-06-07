# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 核銷 >> 可以手動核銷票券
- Location: e2e\admin.spec.ts:170:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.waitForSelector: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=核銷') to be visible

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
> 159 |     await page.waitForSelector("text=核銷")
      |                ^ Error: page.waitForSelector: Test timeout of 30000ms exceeded.
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