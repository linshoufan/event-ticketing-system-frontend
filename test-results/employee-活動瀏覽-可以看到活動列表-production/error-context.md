# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employee.spec.ts >> 活動瀏覽 >> 可以看到活動列表
- Location: e2e\employee.spec.ts:80:3

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: locator('[data-testid="event-card"]').first()
Expected: visible
Timeout: 15000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 15000ms
  - waiting for locator('[data-testid="event-card"]').first()

```

```yaml
- navigation:
  - text: 企業活動訂票系統 活動 報名 票券 個人
  - button "登出"
- heading "活動列表" [level=1]
- textbox "搜尋活動..."
- combobox:
  - option "所有類別" [selected]
  - option "運動"
  - option "美食"
  - option "旅遊"
  - option "文藝"
  - option "親子"
  - option "競賽"
  - option "音樂"
- button "為你推薦"
- button "報名中"
- button "候補中"
- button "報名截止"
- button "最熱門"
- button "名額最少"
- button "名額最多"
- paragraph: 🔍
- paragraph: 沒有符合的活動
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | 
  3   | const MOCK_ACCOUNTS = { id: "employee", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "1000001", password: "password123" }
  5   | 
  6   | const ACCOUNT_API = "https://account-api-75541019693.asia-east1.run.app/v1"
  7   | const EVENT_API   = "https://event-service-75541019693.asia-east1.run.app/v1"
  8   | 
  9   | function getAccount(baseURL: string) {
  10  |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  11  | }
  12  | 
  13  | async function loginAsEmployee(page: any, baseURL: string) {
  14  |   const account = getAccount(baseURL)
  15  |   await page.goto("/")
  16  |   await page.click("text=員工登入")
  17  |   await page.fill('input[autocomplete="username"]', account.id)
  18  |   await page.fill('input[autocomplete="current-password"]', account.password)
  19  |   await page.click('button[type="submit"]')
  20  |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  21  | }
  22  | 
  23  | // ── 測試資料管理（只在 production 跑） ──────────────────────────
  24  | let createdEventId: string | null = null
  25  | let adminToken: string | null = null
  26  | 
  27  | test.beforeAll(async ({ request, baseURL }) => {
  28  |   if (!baseURL?.includes("localhost")) {
  29  |     const loginRes = await request.post(`${ACCOUNT_API}/auth/login`, {
  30  |       data: {
  31  |         employeeId: "welfare_001",
  32  |         password:   "password123",
  33  |         role:       "welfare_member",
  34  |       },
  35  |     })
  36  |     const loginData = await loginRes.json()
  37  |     adminToken = loginData.data?.token  // ← 直接取 data.token
  38  | 
  39  |     console.log("Token:", adminToken)  // ← 確認 token 有值
  40  | 
  41  |     const eventRes = await request.post(`${EVENT_API}/events`, {
  42  |       headers: {
  43  |         Authorization: `Bearer ${adminToken}`,
  44  |         "Content-Type": "application/json",  // ← 加這行
  45  |       },
  46  |       data: {
  47  |         name:              "E2E 測試活動（自動刪除）",
  48  |         description:       "Playwright 自動建立，測試完會自動刪除",
  49  |         category:          "sport",
  50  |         location:          "台北辦公室",
  51  |         eventStartTime:    "2025-12-01T10:00:00Z",
  52  |         eventEndTime:      "2025-12-01T18:00:00Z",
  53  |         registrationStart: "2025-06-01T00:00:00Z",
  54  |         registrationEnd:   "2025-11-30T23:59:59Z",
  55  |         ticketLimit:       50,
  56  |         guestAllowed:      false,
  57  |         isDraft:           false,
  58  |       },
  59  |     })
  60  |     const eventData = await eventRes.json()
  61  |     console.log("建立活動回應：", JSON.stringify(eventData))
  62  |     createdEventId = eventData.eventId ?? eventData.data?.eventId
  63  |   }
  64  | })
  65  | 
  66  | test.afterAll(async ({ request, baseURL }) => {
  67  |   if (!baseURL?.includes("localhost") && createdEventId && adminToken) {
  68  |     await request.delete(`${EVENT_API}/events/${createdEventId}`, {
  69  |       headers: { Authorization: `Bearer ${adminToken}` },
  70  |     })
  71  |   }
  72  | })
  73  | // ── 測試資料管理結束 ──────────────────────────────────────────────
  74  | 
  75  | test.describe("活動瀏覽", () => {
  76  |   test.beforeEach(async ({ page, baseURL }) => {
  77  |     await loginAsEmployee(page, baseURL!)
  78  |   })
  79  | 
  80  |   test("可以看到活動列表", async ({ page }) => {
  81  |     await expect(page.locator("text=活動列表")).toBeVisible()
> 82  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
      |                                                                      ^ Error: expect(locator).toBeVisible() failed
  83  |   })
  84  | 
  85  |   test("可以搜尋活動", async ({ page }) => {
  86  |     await page.fill('input[placeholder="搜尋活動..."]', "E2E")
  87  |     await page.waitForTimeout(500)
  88  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 10000 })
  89  |   })
  90  | 
  91  |   test("可以依分類篩選", async ({ page }) => {
  92  |     await page.selectOption("select", "sport")
  93  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 10000 })
  94  |   })
  95  | 
  96  |   test("可以切換排序", async ({ page }) => {
  97  |     await page.click("text=最熱門")
  98  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 10000 })
  99  |   })
  100 | 
  101 |   test("可以點進活動詳情", async ({ page }) => {
  102 |     await page.locator('[data-testid="event-card"]').first().click()
  103 |     await expect(page.url()).toMatch(/\/events\//)
  104 |     await expect(page.locator("text=報名資料")).toBeVisible()
  105 |   })
  106 | 
  107 |   test("活動詳情顯示正確資訊", async ({ page }) => {
  108 |     await page.locator('[data-testid="event-card"]').first().click()
  109 |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  110 |     await expect(page.locator("text=📍").first()).toBeVisible()
  111 |     await expect(page.locator("text=🕐").first()).toBeVisible()
  112 |     await expect(page.locator("text=報名截止").first()).toBeVisible()
  113 |   })
  114 | })
  115 | 
  116 | test.describe("報名流程", () => {
  117 |   test.beforeEach(async ({ page, baseURL }) => {
  118 |     await loginAsEmployee(page, baseURL!)
  119 |     await page.locator('[data-testid="event-card"]').first().click()
  120 |     await expect(page.url()).toMatch(/\/events\//)
  121 |   })
  122 | 
  123 |   test("可以選擇飲食需求", async ({ page }) => {
  124 |     const select = page.locator("select").first()
  125 |     await select.selectOption("veg")
  126 |     await expect(select).toHaveValue("veg")
  127 |   })
  128 | 
  129 |   test("可以勾選自行開車", async ({ page }) => {
  130 |     const checkbox = page.locator('input[type="checkbox"]')
  131 |     await checkbox.check()
  132 |     await expect(checkbox).toBeChecked()
  133 |   })
  134 | 
  135 |   test("報名按鈕存在且可點擊", async ({ page }) => {
  136 |     const btn = page.locator("text=立即報名")
  137 |       .or(page.locator("text=加入候補"))
  138 |       .or(page.locator("text=您已報名此活動"))
  139 |       .or(page.locator("text=目前無法報名"))
  140 |     await expect(btn.first()).toBeVisible()
  141 |   })
  142 | 
  143 |   test("點擊報名後按鈕狀態改變", async ({ page }) => {
  144 |     const registerBtn = page.locator("text=立即報名")
  145 |     if (await registerBtn.isVisible()) {
  146 |       await registerBtn.click()
  147 |       await page.waitForTimeout(600)
  148 |       const changedBtn = page.locator("text=報名中...")
  149 |         .or(page.locator("text=您已報名此活動"))
  150 |         .or(page.locator("text=已加入候補名單"))
  151 |       await expect(changedBtn.first()).toBeVisible()
  152 |     }
  153 |   })
  154 | })
  155 | 
  156 | test.describe("報名紀錄", () => {
  157 |   test.beforeEach(async ({ page, baseURL }) => {
  158 |     await loginAsEmployee(page, baseURL!)
  159 |     await page.click("text=報名")
  160 |     await expect(page).toHaveURL(/\/my-transactions$/)
  161 |   })
  162 | 
  163 |   test("可以看到報名紀錄頁面", async ({ page }) => {
  164 |     await expect(page.locator("text=我的報名紀錄")).toBeVisible()
  165 |   })
  166 | 
  167 |   test("可以依狀態篩選", async ({ page }) => {
  168 |     await page.selectOption("select", "confirmed")
  169 |     await expect(page.locator("text=我的報名紀錄")).toBeVisible()
  170 |   })
  171 | })
  172 | 
  173 | test.describe("票券", () => {
  174 |   test.beforeEach(async ({ page, baseURL }) => {
  175 |     await loginAsEmployee(page, baseURL!)
  176 |     await page.click("text=票券")
  177 |     await expect(page).toHaveURL(/\/my-tickets$/)
  178 |   })
  179 | 
  180 |   test("可以看到票券頁面", async ({ page }) => {
  181 |     await expect(page.locator("text=我的票券")).toBeVisible()
  182 |   })
```