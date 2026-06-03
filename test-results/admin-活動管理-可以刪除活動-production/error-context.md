# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: admin.spec.ts >> 活動管理 >> 可以刪除活動
- Location: e2e\admin.spec.ts:69:3

# Error details

```
Error: expect(received).toBeLessThan(expected)

Expected: < 13
Received:   13
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
      - generic [ref=e20]:
        - generic [ref=e21]:
          - heading "test1" [level=2] [ref=e23]
          - generic [ref=e24]:
            - generic [ref=e25]: 尚未開始報名
            - generic [ref=e26]: 截止：2026/6/4
        - generic [ref=e27]:
          - button "報名詳情" [ref=e28]
          - button "核銷" [ref=e29]
          - button "刪除" [active] [ref=e30]
      - generic [ref=e31]:
        - generic [ref=e32]:
          - heading "1" [level=2] [ref=e34]
          - generic [ref=e35]:
            - generic [ref=e36]: 尚未開始報名
            - generic [ref=e37]: 截止：2026/6/2
        - generic [ref=e38]:
          - button "報名詳情" [ref=e39]
          - button "核銷" [ref=e40]
          - button "刪除" [ref=e41]
      - generic [ref=e42]:
        - generic [ref=e43]:
          - heading "2026 仲夏星空電影節" [level=2] [ref=e45]
          - generic [ref=e46]:
            - generic [ref=e47]: 報名中
            - generic [ref=e48]: 截止：2026/7/2
        - generic [ref=e49]:
          - button "報名詳情" [ref=e50]
          - button "核銷" [ref=e51]
          - button "刪除" [ref=e52]
      - generic [ref=e53]:
        - generic [ref=e54]:
          - heading "Event event_006" [level=2] [ref=e56]
          - generic [ref=e57]:
            - generic [ref=e58]: 報名中
            - generic [ref=e59]: 截止：2026/6/12
        - generic [ref=e60]:
          - button "報名詳情" [ref=e61]
          - button "核銷" [ref=e62]
          - button "刪除" [ref=e63]
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "Event event_007" [level=2] [ref=e67]
          - generic [ref=e68]:
            - generic [ref=e69]: 報名中
            - generic [ref=e70]: 截止：2026/6/12
        - generic [ref=e71]:
          - button "報名詳情" [ref=e72]
          - button "核銷" [ref=e73]
          - button "刪除" [ref=e74]
      - generic [ref=e75]:
        - generic [ref=e76]:
          - heading "Family Day" [level=2] [ref=e78]
          - generic [ref=e79]:
            - generic [ref=e80]: 報名中
            - generic [ref=e81]: 截止：2026/6/20
        - generic [ref=e82]:
          - button "報名詳情" [ref=e83]
          - button "核銷" [ref=e84]
          - button "刪除" [ref=e85]
      - generic [ref=e86]:
        - generic [ref=e87]:
          - heading "週五電影之夜" [level=2] [ref=e89]
          - generic [ref=e90]:
            - generic [ref=e91]: 報名中
            - generic [ref=e92]: 截止：2026/6/4
        - generic [ref=e93]:
          - button "報名詳情" [ref=e94]
          - button "核銷" [ref=e95]
          - button "刪除" [ref=e96]
      - generic [ref=e97]:
        - generic [ref=e98]:
          - heading "X" [level=2] [ref=e100]
          - generic [ref=e101]:
            - generic [ref=e102]: 報名中
            - generic [ref=e103]: 截止：2026/6/20
        - generic [ref=e104]:
          - button "報名詳情" [ref=e105]
          - button "核銷" [ref=e106]
          - button "刪除" [ref=e107]
      - generic [ref=e108]:
        - generic [ref=e109]:
          - heading "2026跨年喝酒BBQ同樂會" [level=2] [ref=e111]
          - generic [ref=e112]:
            - generic [ref=e113]: 報名中
            - generic [ref=e114]: 截止：2026/11/6
        - generic [ref=e115]:
          - button "報名詳情" [ref=e116]
          - button "核銷" [ref=e117]
          - button "刪除" [ref=e118]
      - generic [ref=e119]:
        - generic [ref=e120]:
          - heading "夏日烤肉趴" [level=2] [ref=e122]
          - generic [ref=e123]:
            - generic [ref=e124]: 報名截止
            - generic [ref=e125]: 截止：2026/6/2
        - generic [ref=e126]:
          - button "報名詳情" [ref=e127]
          - button "核銷" [ref=e128]
          - button "刪除" [ref=e129]
      - generic [ref=e130]:
        - generic [ref=e131]:
          - heading "Open Lecture" [level=2] [ref=e133]
          - generic [ref=e134]:
            - generic [ref=e135]: 報名中
            - generic [ref=e136]: 截止：2026/6/20
        - generic [ref=e137]:
          - button "報名詳情" [ref=e138]
          - button "核銷" [ref=e139]
          - button "刪除" [ref=e140]
      - generic [ref=e141]:
        - generic [ref=e142]:
          - heading "員工家庭日" [level=2] [ref=e144]
          - generic [ref=e145]:
            - generic [ref=e146]: 報名中
            - generic [ref=e147]: 截止：2026/6/9
        - generic [ref=e148]:
          - button "報名詳情" [ref=e149]
          - button "核銷" [ref=e150]
          - button "刪除" [ref=e151]
      - generic [ref=e152]:
        - generic [ref=e153]:
          - heading "Event event_005" [level=2] [ref=e155]
          - generic [ref=e156]:
            - generic [ref=e157]: 報名中
            - generic [ref=e158]: 截止：2026/6/12
        - generic [ref=e159]:
          - button "報名詳情" [ref=e160]
          - button "核銷" [ref=e161]
          - button "刪除" [ref=e162]
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
  24  |   await page.goto("/")
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
> 77  |       expect(countAfter).toBeLessThan(countBefore)
      |                          ^ Error: expect(received).toBeLessThan(expected)
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
```