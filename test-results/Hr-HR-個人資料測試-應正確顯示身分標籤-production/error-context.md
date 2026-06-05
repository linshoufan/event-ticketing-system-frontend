# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Hr.spec.ts >> HR 個人資料測試 >> 應正確顯示身分標籤
- Location: e2e\Hr.spec.ts:81:3

# Error details

```
Test timeout of 30000ms exceeded while running "beforeEach" hook.
```

```
Error: page.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('text=設定')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - navigation [ref=e3]:
    - generic [ref=e4]:
      - generic [ref=e6]: 企業活動訂票系統
      - generic [ref=e7]:
        - generic [ref=e8] [cursor=pointer]: 活動
        - generic [ref=e9] [cursor=pointer]: 統計
        - generic [ref=e10] [cursor=pointer]: 個人
        - button "登出" [ref=e11]
  - generic [ref=e13]:
    - heading "統計報表" [level=1] [ref=e14]
    - generic [ref=e15]:
      - generic [ref=e16]:
        - paragraph [ref=e17]: 活動總數
        - paragraph [ref=e18]: "8"
      - generic [ref=e19]:
        - paragraph [ref=e20]: 總報名人數
        - paragraph [ref=e21]: "4"
      - generic [ref=e22]:
        - paragraph [ref=e23]: 總出席人數
        - paragraph [ref=e24]: "0"
      - generic [ref=e25]:
        - paragraph [ref=e26]: 平均出席率
        - paragraph [ref=e27]: 0%
    - textbox "搜尋活動..." [ref=e28]
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - heading "test1" [level=2] [ref=e32]
          - button "詳細名單" [ref=e33]
        - generic [ref=e34]:
          - generic [ref=e35]:
            - paragraph [ref=e36]: 正取
            - paragraph [ref=e37]: "1"
          - generic [ref=e38]:
            - paragraph [ref=e39]: 候補
            - paragraph [ref=e40]: "0"
          - generic [ref=e41]:
            - paragraph [ref=e42]: 取消
            - paragraph [ref=e43]: "1"
          - generic [ref=e44]:
            - paragraph [ref=e45]: 出席
            - paragraph [ref=e46]: "0"
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: 報名率
              - generic [ref=e51]: 1 / 1 人
            - generic [ref=e55]: 100%
          - generic [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]: 出席率
              - generic [ref=e59]: 0 / 1 人
            - generic [ref=e62]: 0%
      - generic [ref=e63]:
        - generic [ref=e64]:
          - heading "1" [level=2] [ref=e65]
          - button "詳細名單" [ref=e66]
        - generic [ref=e67]:
          - generic [ref=e68]:
            - paragraph [ref=e69]: 正取
            - paragraph [ref=e70]: "0"
          - generic [ref=e71]:
            - paragraph [ref=e72]: 候補
            - paragraph [ref=e73]: "0"
          - generic [ref=e74]:
            - paragraph [ref=e75]: 取消
            - paragraph [ref=e76]: "0"
          - generic [ref=e77]:
            - paragraph [ref=e78]: 出席
            - paragraph [ref=e79]: "0"
        - generic [ref=e80]:
          - generic [ref=e81]:
            - generic [ref=e82]:
              - generic [ref=e83]: 報名率
              - generic [ref=e84]: 0 / 0 人
            - generic [ref=e87]: 0%
          - generic [ref=e88]:
            - generic [ref=e89]:
              - generic [ref=e90]: 出席率
              - generic [ref=e91]: 0 / 0 人
            - generic [ref=e94]: 0%
      - generic [ref=e95]:
        - generic [ref=e96]:
          - heading "2026 仲夏星空電影節" [level=2] [ref=e97]
          - button "詳細名單" [ref=e98]
        - generic [ref=e99]:
          - generic [ref=e100]:
            - paragraph [ref=e101]: 正取
            - paragraph [ref=e102]: "0"
          - generic [ref=e103]:
            - paragraph [ref=e104]: 候補
            - paragraph [ref=e105]: "0"
          - generic [ref=e106]:
            - paragraph [ref=e107]: 取消
            - paragraph [ref=e108]: "0"
          - generic [ref=e109]:
            - paragraph [ref=e110]: 出席
            - paragraph [ref=e111]: "0"
        - generic [ref=e112]:
          - generic [ref=e113]:
            - generic [ref=e114]:
              - generic [ref=e115]: 報名率
              - generic [ref=e116]: 0 / 100 人
            - generic [ref=e119]: 0%
          - generic [ref=e120]:
            - generic [ref=e121]:
              - generic [ref=e122]: 出席率
              - generic [ref=e123]: 0 / 0 人
            - generic [ref=e126]: 0%
      - generic [ref=e127]:
        - generic [ref=e128]:
          - heading "Family Day" [level=2] [ref=e129]
          - button "詳細名單" [ref=e130]
        - generic [ref=e131]:
          - generic [ref=e132]:
            - paragraph [ref=e133]: 正取
            - paragraph [ref=e134]: "1"
          - generic [ref=e135]:
            - paragraph [ref=e136]: 候補
            - paragraph [ref=e137]: "0"
          - generic [ref=e138]:
            - paragraph [ref=e139]: 取消
            - paragraph [ref=e140]: "0"
          - generic [ref=e141]:
            - paragraph [ref=e142]: 出席
            - paragraph [ref=e143]: "0"
        - generic [ref=e144]:
          - generic [ref=e145]:
            - generic [ref=e146]:
              - generic [ref=e147]: 報名率
              - generic [ref=e148]: 1 / 100 人
            - generic [ref=e152]: 1%
          - generic [ref=e153]:
            - generic [ref=e154]:
              - generic [ref=e155]: 出席率
              - generic [ref=e156]: 0 / 1 人
            - generic [ref=e159]: 0%
      - generic [ref=e160]:
        - generic [ref=e161]:
          - heading "2026跨年喝酒BBQ同樂會" [level=2] [ref=e162]
          - button "詳細名單" [ref=e163]
        - generic [ref=e164]:
          - generic [ref=e165]:
            - paragraph [ref=e166]: 正取
            - paragraph [ref=e167]: "0"
          - generic [ref=e168]:
            - paragraph [ref=e169]: 候補
            - paragraph [ref=e170]: "0"
          - generic [ref=e171]:
            - paragraph [ref=e172]: 取消
            - paragraph [ref=e173]: "0"
          - generic [ref=e174]:
            - paragraph [ref=e175]: 出席
            - paragraph [ref=e176]: "0"
        - generic [ref=e177]:
          - generic [ref=e178]:
            - generic [ref=e179]:
              - generic [ref=e180]: 報名率
              - generic [ref=e181]: 0 / 0 人
            - generic [ref=e184]: 0%
          - generic [ref=e185]:
            - generic [ref=e186]:
              - generic [ref=e187]: 出席率
              - generic [ref=e188]: 0 / 0 人
            - generic [ref=e191]: 0%
      - generic [ref=e192]:
        - generic [ref=e193]:
          - heading "X" [level=2] [ref=e194]
          - button "詳細名單" [ref=e195]
        - generic [ref=e196]:
          - generic [ref=e197]:
            - paragraph [ref=e198]: 正取
            - paragraph [ref=e199]: "0"
          - generic [ref=e200]:
            - paragraph [ref=e201]: 候補
            - paragraph [ref=e202]: "0"
          - generic [ref=e203]:
            - paragraph [ref=e204]: 取消
            - paragraph [ref=e205]: "1"
          - generic [ref=e206]:
            - paragraph [ref=e207]: 出席
            - paragraph [ref=e208]: "0"
        - generic [ref=e209]:
          - generic [ref=e210]:
            - generic [ref=e211]:
              - generic [ref=e212]: 報名率
              - generic [ref=e213]: 0 / 0 人
            - generic [ref=e216]: 0%
          - generic [ref=e217]:
            - generic [ref=e218]:
              - generic [ref=e219]: 出席率
              - generic [ref=e220]: 0 / 0 人
            - generic [ref=e223]: 0%
      - generic [ref=e224]:
        - generic [ref=e225]:
          - heading "Open Lecture" [level=2] [ref=e226]
          - button "詳細名單" [ref=e227]
        - generic [ref=e228]:
          - generic [ref=e229]:
            - paragraph [ref=e230]: 正取
            - paragraph [ref=e231]: "1"
          - generic [ref=e232]:
            - paragraph [ref=e233]: 候補
            - paragraph [ref=e234]: "0"
          - generic [ref=e235]:
            - paragraph [ref=e236]: 取消
            - paragraph [ref=e237]: "2"
          - generic [ref=e238]:
            - paragraph [ref=e239]: 出席
            - paragraph [ref=e240]: "0"
        - generic [ref=e241]:
          - generic [ref=e242]:
            - generic [ref=e243]:
              - generic [ref=e244]: 報名率
              - generic [ref=e245]: 1 / 1 人
            - generic [ref=e249]: 100%
          - generic [ref=e250]:
            - generic [ref=e251]:
              - generic [ref=e252]: 出席率
              - generic [ref=e253]: 0 / 1 人
            - generic [ref=e256]: 0%
      - generic [ref=e257]:
        - generic [ref=e258]:
          - heading "週五電影之夜" [level=2] [ref=e259]
          - button "詳細名單" [ref=e260]
        - generic [ref=e261]:
          - generic [ref=e262]:
            - paragraph [ref=e263]: 正取
            - paragraph [ref=e264]: "1"
          - generic [ref=e265]:
            - paragraph [ref=e266]: 候補
            - paragraph [ref=e267]: "0"
          - generic [ref=e268]:
            - paragraph [ref=e269]: 取消
            - paragraph [ref=e270]: "0"
          - generic [ref=e271]:
            - paragraph [ref=e272]: 出席
            - paragraph [ref=e273]: "0"
        - generic [ref=e274]:
          - generic [ref=e275]:
            - generic [ref=e276]:
              - generic [ref=e277]: 報名率
              - generic [ref=e278]: 1 / 1 人
            - generic [ref=e282]: 100%
          - generic [ref=e283]:
            - generic [ref=e284]:
              - generic [ref=e285]: 出席率
              - generic [ref=e286]: 0 / 1 人
            - generic [ref=e289]: 0%
```

# Test source

```ts
  1   | ﻿import { test, expect } from "@playwright/test"
  2   | 
  3   | const MOCK_ACCOUNTS = { id: "hr", password: "1234" }
  4   | const REAL_ACCOUNTS = { id: "hr_001", password: "password123" }
  5   | 
  6   | function getAccount(baseURL: string) {
  7   |   return baseURL.includes("localhost") ? MOCK_ACCOUNTS : REAL_ACCOUNTS
  8   | }
  9   | 
  10  | async function loginAsHR(page: any, baseURL: string) {
  11  |   const account = getAccount(baseURL)
  12  |   await page.goto("/")
  13  |   await page.click("text=HR 登入")
  14  |   await page.fill('input[autocomplete="username"]', account.id)
  15  |   await page.fill('input[autocomplete="current-password"]', account.password)
  16  |   await page.click('button[type="submit"]')
  17  |   await expect(page).toHaveURL(/\/admin\/hr$/, { timeout: 15000 })
  18  | }
  19  | 
  20  | test.describe("HR 儀表板測試", () => {
  21  |   test.beforeEach(async ({ page, baseURL }) => {
  22  |     await loginAsHR(page, baseURL!)
  23  |   })
  24  | 
  25  |   test("應正確渲染頁面標題", async ({ page }) => {
  26  |     await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  27  |   })
  28  | 
  29  |   test("應顯示各項數據指標", async ({ page }) => {
  30  |     await expect(page.locator("text=總活動數")).toBeVisible()
  31  |     await expect(page.locator("text=總報名人數")).toBeVisible()
  32  |     await expect(page.locator("text=待審核名單")).toBeVisible()
  33  |     await expect(page.locator("text=已通過名單")).toBeVisible()
  34  |   })
  35  | 
  36  |   test("應具備資料搜尋功能", async ({ page }) => {
  37  |     await page.waitForTimeout(2000)
  38  |     await page.fill('input[placeholder="搜尋..."]', "測試")
  39  |     await expect(page.getByRole("heading", { name: "管理總覽" })).toBeVisible()
  40  |   })
  41  | 
  42  |   test("應能跳轉至報名名單頁面", async ({ page }) => {
  43  |     await page.waitForTimeout(2000)
  44  |     const detailBtn = page.locator("text=查看名單").first()
  45  |     if (await detailBtn.count() > 0) {
  46  |       await detailBtn.click()
  47  |       await expect(page).toHaveURL(/\/admin\/events\/.*\/registrations$/)
  48  |     }
  49  |   })
  50  | })
  51  | 
  52  | test.describe("HR 活動專區測試", () => {
  53  |   test.beforeEach(async ({ page, baseURL }) => {
  54  |     await loginAsHR(page, baseURL!)
  55  |     await page.click("text=活動")
  56  |     await expect(page).toHaveURL(/\/events$/)
  57  |   })
  58  | 
  59  |   test("應成功載入活動列表", async ({ page }) => {
  60  |     await expect(page.locator("text=所有活動")).toBeVisible()
  61  |     await expect(page.locator('[data-testid="event-card"]').first()).toBeVisible({ timeout: 15000 })
  62  |   })
  63  | 
  64  |   test("應能進入單一活動詳情", async ({ page }) => {
  65  |     await page.locator('[data-testid="event-card"]').first().click()
  66  |     await expect(page).toHaveURL(/\/events\/\w+/, { timeout: 10000 })
  67  |   })
  68  | })
  69  | 
  70  | test.describe("HR 個人資料測試", () => {
  71  |   test.beforeEach(async ({ page, baseURL }) => {
  72  |     await loginAsHR(page, baseURL!)
> 73  |     await page.click("text=設定")
      |                ^ Error: page.click: Test timeout of 30000ms exceeded.
  74  |     await expect(page).toHaveURL(/\/profile$/)
  75  |   })
  76  | 
  77  |   test("應正確顯示設定頁面", async ({ page }) => {
  78  |     await expect(page.locator("text=個人資料")).toBeVisible()
  79  |   })
  80  | 
  81  |   test("應正確顯示身分標籤", async ({ page }) => {
  82  |     await expect(page.locator("text=HR").first()).toBeVisible()
  83  |   })
  84  | })
  85  | 
  86  | test.describe("HR 權限控管測試", () => {
  87  |   test.beforeEach(async ({ page, baseURL }) => {
  88  |     await loginAsHR(page, baseURL!)
  89  |   })
  90  | 
  91  |   test("導覽列不應顯示越權功能", async ({ page }) => {
  92  |     // Navbar 權限檢查
  93  |     await expect(page.locator("nav").locator("text=系統設定")).toHaveCount(0)
  94  |   })
  95  | 
  96  |   test("不應具備使用者管理權限", async ({ page }) => {
  97  |     await expect(page.locator("nav").locator("text=使用者")).toHaveCount(0)
  98  |   })
  99  | 
  100 |   test("應阻擋非授權路由之直接訪問", async ({ page }) => {
  101 |     await page.goto("/admin/events")
  102 |     await page.waitForTimeout(1000)
  103 |     await expect(page).not.toHaveURL(/\/admin\/events$/)
  104 |   })
  105 | })
```