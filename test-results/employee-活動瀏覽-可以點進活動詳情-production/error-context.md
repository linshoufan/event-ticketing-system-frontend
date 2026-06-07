# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: employee.spec.ts >> 活動瀏覽 >> 可以點進活動詳情
- Location: e2e\employee.spec.ts:62:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('[data-testid="event-card"]').first()

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]: 企業活動訂票系統
      - generic [ref=e7]:
        - generic [ref=e8] [cursor=pointer]: 活動
        - generic [ref=e9] [cursor=pointer]: 報名
        - generic [ref=e10] [cursor=pointer]: 票券
        - generic [ref=e11] [cursor=pointer]: 個人
        - button "登出" [ref=e12]
  - generic [ref=e14]:
    - heading "活動列表" [level=1] [ref=e15]
    - generic [ref=e16]:
      - textbox "搜尋活動..." [ref=e17]
      - combobox [ref=e18]:
        - option "所有類別" [selected]
        - option "運動"
        - option "美食"
        - option "旅遊"
        - option "文藝"
        - option "親子"
        - option "競賽"
        - option "音樂"
      - generic [ref=e19]:
        - button "為你推薦" [ref=e20]
        - button "最熱門" [ref=e21]
        - button "報名中" [ref=e22]
        - button "候補中" [ref=e23]
    - generic [ref=e24]:
      - paragraph [ref=e25]: 🔍
      - paragraph [ref=e26]: 沒有符合的活動
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | 
  3   | const MOCK_ACCOUNTS = { id: "employee", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "1000001", password: "password123" }
  5   | 
  6   | function getAccount(baseURL: string) {
  7   |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  8   | }
  9   | 
  10  | async function loginAsEmployee(page: any, baseURL: string) {
  11  |   const account = getAccount(baseURL)
  12  |   await page.goto("/")
  13  |   await page.click("text=員工登入")
  14  |   await page.fill('input[autocomplete="username"]', account.id)
  15  |   await page.fill('input[autocomplete="current-password"]', account.password)
  16  |   await page.click('button[type="submit"]')
  17  |   await expect(page).toHaveURL(/\/events$/, { timeout: 15000 })
  18  | }
  19  | 
  20  | // ✅ 移除 beforeAll/afterAll，資料庫已有活動資料不需要自動建立
  21  | 
  22  | test.describe("活動瀏覽", () => {
  23  |   test.beforeEach(async ({ page, baseURL }) => {
  24  |     await loginAsEmployee(page, baseURL!)
  25  |   })
  26  | 
  27  |   test("可以看到活動列表", async ({ page }) => {
  28  |     await expect(page.locator("text=活動列表")).toBeVisible()
  29  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
  30  |   })
  31  | 
  32  |   test("可以搜尋活動", async ({ page }) => {
  33  |       // 確保列表先載入
  34  |       await expect(
  35  |         page.locator('[data-testid="event-card"]').first()
  36  |       ).toBeVisible({ timeout: 15000 })
  37  | 
  38  |       // 從第一張卡片抓兩個中文字，這樣搜尋必然命中至少一筆
  39  |       const firstCardText = (await page.locator('[data-testid="event-card"]').first().textContent()) ?? ""
  40  |       const match = firstCardText.match(/[\u4e00-\u9fa5]{2}/)
  41  |       const keyword = match ? match[0] : "2026"
  42  | 
  43  |       await page.fill('input[placeholder="搜尋活動..."]', keyword)
  44  |       await page.waitForTimeout(800)  // debounce 是 400ms，這裡保險一點
  45  | 
  46  |       await expect(
  47  |         page.locator('[data-testid="event-card"]').first()
  48  |       ).toBeVisible({ timeout: 10000 })
  49  |   })
  50  | 
  51  |   test("可以依分類篩選", async ({ page }) => {
  52  |     await page.selectOption("select", "sport")
  53  |     await page.waitForTimeout(500)
  54  |     await expect(page.locator("text=活動列表")).toBeVisible()
  55  |   })
  56  | 
  57  |   test("可以切換排序", async ({ page }) => {
  58  |     await page.click("text=最熱門")
  59  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 10000 })
  60  |   })
  61  | 
  62  |   test("可以點進活動詳情", async ({ page }) => {
> 63  |     await page.locator('[data-testid="event-card"]').first().click()
      |                                                              ^ Error: locator.click: Test timeout of 30000ms exceeded.
  64  |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  65  |     await expect(page.locator("text=報名資料")).toBeVisible()
  66  |   })
  67  | 
  68  |   test("活動詳情顯示正確資訊", async ({ page }) => {
  69  |     await page.locator('[data-testid="event-card"]').first().click()
  70  |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  71  |     await expect(page.locator("text=📍").first()).toBeVisible()
  72  |     await expect(page.locator("text=活動開始").first()).toBeVisible()
  73  |     await expect(page.locator("text=報名截止").first()).toBeVisible()
  74  |   })
  75  | })
  76  | 
  77  | test.describe("報名流程", () => {
  78  |   test.beforeEach(async ({ page, baseURL }) => {
  79  |     await loginAsEmployee(page, baseURL!)
  80  |     await page.locator('[data-testid="event-card"]').first().click()
  81  |     await expect(page).toHaveURL(/\/events\/\w+/)
  82  |   })
  83  | 
  84  |   test("可以選擇飲食需求", async ({ page }) => {
  85  |     const select = page.locator("select").first()
  86  |     await select.selectOption("veg")
  87  |     await expect(select).toHaveValue("veg")
  88  |   })
  89  | 
  90  |   test("可以勾選自行開車", async ({ page }) => {
  91  |     const checkbox = page.locator('input[type="checkbox"]')
  92  |     await checkbox.check()
  93  |     await expect(checkbox).toBeChecked()
  94  |   })
  95  | 
  96  |   test("報名按鈕存在且可點擊", async ({ page }) => {
  97  |     const btn = page.locator("text=立即報名")
  98  |       .or(page.locator("text=加入候補"))
  99  |       .or(page.locator("text=您已報名此活動"))
  100 |       .or(page.locator("text=目前無法報名"))
  101 |       .or(page.locator("text=載入中..."))
  102 |     await expect(btn.first()).toBeVisible()
  103 |   })
  104 | 
  105 |   test("點擊報名後按鈕狀態改變", async ({ page }) => {
  106 |     const registerBtn = page.locator("text=立即報名")
  107 |     if (await registerBtn.isVisible()) {
  108 |       await registerBtn.click()
  109 |       await page.waitForTimeout(600)
  110 |       const changedBtn = page.locator("text=報名中...")
  111 |         .or(page.locator("text=您已報名此活動"))
  112 |         .or(page.locator("text=已加入候補名單"))
  113 |       await expect(changedBtn.first()).toBeVisible()
  114 |     }
  115 |   })
  116 | })
  117 | 
  118 | test.describe("報名紀錄", () => {
  119 |   test.beforeEach(async ({ page, baseURL }) => {
  120 |     await loginAsEmployee(page, baseURL!)
  121 |     await page.click("text=報名")
  122 |     await expect(page).toHaveURL(/\/my-transactions$/)
  123 |   })
  124 | 
  125 |   test("可以看到報名紀錄頁面", async ({ page }) => {
  126 |     await expect(page.locator("text=我的報名紀錄")).toBeVisible()
  127 |   })
  128 | 
  129 |   test("可以依狀態篩選", async ({ page }) => {
  130 |     await page.selectOption("select", "confirmed")
  131 |     await expect(page.locator("text=我的報名紀錄")).toBeVisible()
  132 |   })
  133 | })
  134 | 
  135 | test.describe("票券", () => {
  136 |   test.beforeEach(async ({ page, baseURL }) => {
  137 |     await loginAsEmployee(page, baseURL!)
  138 |     await page.click("text=票券")
  139 |     await expect(page).toHaveURL(/\/my-tickets$/)
  140 |   })
  141 | 
  142 |   test("可以看到票券頁面", async ({ page }) => {
  143 |     await expect(page.locator("text=我的票券")).toBeVisible()
  144 |   })
  145 | 
  146 |   test("可以依狀態篩選票券", async ({ page }) => {
  147 |     await page.selectOption("select", "unused")
  148 |     await expect(page.locator("text=我的票券")).toBeVisible()
  149 |   })
  150 | 
  151 |   test("可以點進票券詳情", async ({ page }) => {
  152 |     const ticket = page.locator("text=可報到, text=已報到, text=未開放").first()
  153 |     if (await ticket.count() > 0) {
  154 |       await ticket.locator("..").locator("..").click()
  155 |       await expect(page.url()).toMatch(/\/my-tickets\//)
  156 |       await expect(page.locator("text=票券編號")).toBeVisible()
  157 |     }
  158 |   })
  159 | })
  160 | 
  161 | test.describe("個人資料", () => {
  162 |   test.beforeEach(async ({ page, baseURL }) => {
  163 |     await loginAsEmployee(page, baseURL!)
```