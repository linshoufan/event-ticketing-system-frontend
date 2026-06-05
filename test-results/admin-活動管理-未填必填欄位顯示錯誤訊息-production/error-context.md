# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 活動管理 >> 未填必填欄位顯示錯誤訊息
- Location: e2e\admin.spec.ts:41:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=儲存草稿')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e5]:
        - button "←" [ref=e6]
        - generic [ref=e7]: 企業活動訂票系統
      - generic [ref=e8]:
        - generic [ref=e9] [cursor=pointer]: 活動管理
        - generic [ref=e10] [cursor=pointer]: 使用者
        - generic [ref=e11] [cursor=pointer]: 個人
        - button "登出" [ref=e12]
  - generic [ref=e14]:
    - heading "????" [level=1] [ref=e15]
    - generic [ref=e16]:
      - generic [ref=e17]:
        - heading "????" [level=3] [ref=e18]
        - generic [ref=e19]:
          - generic [ref=e20]:
            - generic [ref=e21]: "???? *"
            - textbox "????" [ref=e22]
          - generic [ref=e23]:
            - generic [ref=e24]: "????"
            - textbox "????" [ref=e25]
          - generic [ref=e26]:
            - generic [ref=e27]: "???? *"
            - combobox [ref=e28]:
              - option "?????" [selected]
              - option "??"
              - option "??"
              - option "??"
              - option "??"
              - option "??"
              - option "??"
              - option "??"
          - generic [ref=e29]:
            - generic [ref=e30]: "???? *"
            - textbox "????" [ref=e31]
      - generic [ref=e32]:
        - heading "?????????" [level=3] [ref=e33]
        - generic [ref=e34]:
          - generic [ref=e36]:
            - generic:
              - generic [ref=e37]:
                - button "Zoom in" [ref=e38] [cursor=pointer]: +
                - button "Zoom out" [ref=e39] [cursor=pointer]: −
              - generic [ref=e40]:
                - link "Leaflet" [ref=e41] [cursor=pointer]:
                  - /url: https://leafletjs.com
                  - img [ref=e42]
                  - text: Leaflet
                - text: "| ©"
                - link "OpenStreetMap" [ref=e46] [cursor=pointer]:
                  - /url: https://openstreetmap.org/copyright
          - paragraph [ref=e47]: "??????????"
        - generic [ref=e48]:
          - generic [ref=e49]: "????????"
          - textbox "200" [ref=e50]
      - generic [ref=e51]:
        - heading "????" [level=3] [ref=e52]
        - generic [ref=e53]:
          - generic [ref=e54]:
            - generic [ref=e55]: "?????? *"
            - textbox [ref=e56]
          - generic [ref=e57]:
            - generic [ref=e58]: "??????"
            - textbox [ref=e59]
          - generic [ref=e60]:
            - generic [ref=e61]: "??????"
            - textbox [ref=e62]
          - generic [ref=e63]:
            - generic [ref=e64]: "??????"
            - textbox [ref=e65]
      - generic [ref=e66]:
        - heading "????" [level=3] [ref=e67]
        - generic [ref=e68]:
          - generic [ref=e69]:
            - generic [ref=e70]: "?????????????"
            - spinbutton [ref=e71]
          - generic [ref=e72]:
            - generic [ref=e73]: "????????????????"
            - textbox [ref=e74]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - heading "????" [level=3] [ref=e77]
          - button "+ ????" [ref=e78]
        - paragraph [ref=e79]: "????????"
      - generic [ref=e80]:
        - button "????" [ref=e81]
        - button "????" [ref=e82]
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
> 43  |     await page.click("text=儲存草稿")
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
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
```