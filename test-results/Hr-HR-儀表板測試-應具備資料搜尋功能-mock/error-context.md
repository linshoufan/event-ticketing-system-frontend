# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Hr.spec.ts >> HR 儀表板測試 >> 應具備資料搜尋功能
- Location: e2e\Hr.spec.ts:36:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="搜尋..."]')

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
        - paragraph [ref=e18]: "10"
      - generic [ref=e19]:
        - paragraph [ref=e20]: 總報名人數
        - paragraph [ref=e21]: "380"
      - generic [ref=e22]:
        - paragraph [ref=e23]: 總出席人數
        - paragraph [ref=e24]: "10"
      - generic [ref=e25]:
        - paragraph [ref=e26]: 平均出席率
        - paragraph [ref=e27]: 3%
    - textbox "搜尋活動..." [ref=e28]
    - generic [ref=e29]:
      - generic [ref=e30]:
        - generic [ref=e31]:
          - heading "夏日烤肉趴" [level=2] [ref=e32]
          - button "詳細名單" [ref=e33]
        - generic [ref=e34]:
          - generic [ref=e35]:
            - paragraph [ref=e36]: 正取
            - paragraph [ref=e37]: "38"
          - generic [ref=e38]:
            - paragraph [ref=e39]: 候補
            - paragraph [ref=e40]: "5"
          - generic [ref=e41]:
            - paragraph [ref=e42]: 取消
            - paragraph [ref=e43]: "4"
          - generic [ref=e44]:
            - paragraph [ref=e45]: 出席
            - paragraph [ref=e46]: "1"
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: 報名率
              - generic [ref=e51]: 38 / 50 人
            - generic [ref=e55]: 76%
          - generic [ref=e56]:
            - generic [ref=e57]:
              - generic [ref=e58]: 出席率
              - generic [ref=e59]: 1 / 38 人
            - generic [ref=e63]: 3%
      - generic [ref=e64]:
        - generic [ref=e65]:
          - heading "古典音樂欣賞之夜" [level=2] [ref=e66]
          - button "詳細名單" [ref=e67]
        - generic [ref=e68]:
          - generic [ref=e69]:
            - paragraph [ref=e70]: 正取
            - paragraph [ref=e71]: "38"
          - generic [ref=e72]:
            - paragraph [ref=e73]: 候補
            - paragraph [ref=e74]: "5"
          - generic [ref=e75]:
            - paragraph [ref=e76]: 取消
            - paragraph [ref=e77]: "4"
          - generic [ref=e78]:
            - paragraph [ref=e79]: 出席
            - paragraph [ref=e80]: "1"
        - generic [ref=e81]:
          - generic [ref=e82]:
            - generic [ref=e83]:
              - generic [ref=e84]: 報名率
              - generic [ref=e85]: 38 / 38 人
            - generic [ref=e89]: 100%
          - generic [ref=e90]:
            - generic [ref=e91]:
              - generic [ref=e92]: 出席率
              - generic [ref=e93]: 1 / 38 人
            - generic [ref=e97]: 3%
      - generic [ref=e98]:
        - generic [ref=e99]:
          - heading "員工家庭日" [level=2] [ref=e100]
          - button "詳細名單" [ref=e101]
        - generic [ref=e102]:
          - generic [ref=e103]:
            - paragraph [ref=e104]: 正取
            - paragraph [ref=e105]: "38"
          - generic [ref=e106]:
            - paragraph [ref=e107]: 候補
            - paragraph [ref=e108]: "5"
          - generic [ref=e109]:
            - paragraph [ref=e110]: 取消
            - paragraph [ref=e111]: "4"
          - generic [ref=e112]:
            - paragraph [ref=e113]: 出席
            - paragraph [ref=e114]: "1"
        - generic [ref=e115]:
          - generic [ref=e116]:
            - generic [ref=e117]:
              - generic [ref=e118]: 報名率
              - generic [ref=e119]: 38 / 100 人
            - generic [ref=e123]: 38%
          - generic [ref=e124]:
            - generic [ref=e125]:
              - generic [ref=e126]: 出席率
              - generic [ref=e127]: 1 / 38 人
            - generic [ref=e131]: 3%
      - generic [ref=e132]:
        - generic [ref=e133]:
          - heading "美食嘉年華" [level=2] [ref=e134]
          - button "詳細名單" [ref=e135]
        - generic [ref=e136]:
          - generic [ref=e137]:
            - paragraph [ref=e138]: 正取
            - paragraph [ref=e139]: "38"
          - generic [ref=e140]:
            - paragraph [ref=e141]: 候補
            - paragraph [ref=e142]: "5"
          - generic [ref=e143]:
            - paragraph [ref=e144]: 取消
            - paragraph [ref=e145]: "4"
          - generic [ref=e146]:
            - paragraph [ref=e147]: 出席
            - paragraph [ref=e148]: "1"
        - generic [ref=e149]:
          - generic [ref=e150]:
            - generic [ref=e151]:
              - generic [ref=e152]: 報名率
              - generic [ref=e153]: 38 / 200 人
            - generic [ref=e157]: 19%
          - generic [ref=e158]:
            - generic [ref=e159]:
              - generic [ref=e160]: 出席率
              - generic [ref=e161]: 1 / 38 人
            - generic [ref=e165]: 3%
      - generic [ref=e166]:
        - generic [ref=e167]:
          - heading "員工路跑活動" [level=2] [ref=e168]
          - button "詳細名單" [ref=e169]
        - generic [ref=e170]:
          - generic [ref=e171]:
            - paragraph [ref=e172]: 正取
            - paragraph [ref=e173]: "38"
          - generic [ref=e174]:
            - paragraph [ref=e175]: 候補
            - paragraph [ref=e176]: "5"
          - generic [ref=e177]:
            - paragraph [ref=e178]: 取消
            - paragraph [ref=e179]: "4"
          - generic [ref=e180]:
            - paragraph [ref=e181]: 出席
            - paragraph [ref=e182]: "1"
        - generic [ref=e183]:
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]: 報名率
              - generic [ref=e187]: 38 / 300 人
            - generic [ref=e191]: 13%
          - generic [ref=e192]:
            - generic [ref=e193]:
              - generic [ref=e194]: 出席率
              - generic [ref=e195]: 1 / 38 人
            - generic [ref=e199]: 3%
      - generic [ref=e200]:
        - generic [ref=e201]:
          - heading "日本東京員工旅遊" [level=2] [ref=e202]
          - button "詳細名單" [ref=e203]
        - generic [ref=e204]:
          - generic [ref=e205]:
            - paragraph [ref=e206]: 正取
            - paragraph [ref=e207]: "38"
          - generic [ref=e208]:
            - paragraph [ref=e209]: 候補
            - paragraph [ref=e210]: "5"
          - generic [ref=e211]:
            - paragraph [ref=e212]: 取消
            - paragraph [ref=e213]: "4"
          - generic [ref=e214]:
            - paragraph [ref=e215]: 出席
            - paragraph [ref=e216]: "1"
        - generic [ref=e217]:
          - generic [ref=e218]:
            - generic [ref=e219]:
              - generic [ref=e220]: 報名率
              - generic [ref=e221]: 38 / 30 人
            - generic [ref=e225]: 100%
          - generic [ref=e226]:
            - generic [ref=e227]:
              - generic [ref=e228]: 出席率
              - generic [ref=e229]: 1 / 38 人
            - generic [ref=e233]: 3%
      - generic [ref=e234]:
        - generic [ref=e235]:
          - heading "藝術展覽參觀" [level=2] [ref=e236]
          - button "詳細名單" [ref=e237]
        - generic [ref=e238]:
          - generic [ref=e239]:
            - paragraph [ref=e240]: 正取
            - paragraph [ref=e241]: "38"
          - generic [ref=e242]:
            - paragraph [ref=e243]: 候補
            - paragraph [ref=e244]: "5"
          - generic [ref=e245]:
            - paragraph [ref=e246]: 取消
            - paragraph [ref=e247]: "4"
          - generic [ref=e248]:
            - paragraph [ref=e249]: 出席
            - paragraph [ref=e250]: "1"
        - generic [ref=e251]:
          - generic [ref=e252]:
            - generic [ref=e253]:
              - generic [ref=e254]: 報名率
              - generic [ref=e255]: 38 / 40 人
            - generic [ref=e259]: 95%
          - generic [ref=e260]:
            - generic [ref=e261]:
              - generic [ref=e262]: 出席率
              - generic [ref=e263]: 1 / 38 人
            - generic [ref=e267]: 3%
      - generic [ref=e268]:
        - generic [ref=e269]:
          - heading "程式設計競賽" [level=2] [ref=e270]
          - button "詳細名單" [ref=e271]
        - generic [ref=e272]:
          - generic [ref=e273]:
            - paragraph [ref=e274]: 正取
            - paragraph [ref=e275]: "38"
          - generic [ref=e276]:
            - paragraph [ref=e277]: 候補
            - paragraph [ref=e278]: "5"
          - generic [ref=e279]:
            - paragraph [ref=e280]: 取消
            - paragraph [ref=e281]: "4"
          - generic [ref=e282]:
            - paragraph [ref=e283]: 出席
            - paragraph [ref=e284]: "1"
        - generic [ref=e285]:
          - generic [ref=e286]:
            - generic [ref=e287]:
              - generic [ref=e288]: 報名率
              - generic [ref=e289]: 38 / 60 人
            - generic [ref=e293]: 63%
          - generic [ref=e294]:
            - generic [ref=e295]:
              - generic [ref=e296]: 出席率
              - generic [ref=e297]: 1 / 38 人
            - generic [ref=e301]: 3%
      - generic [ref=e302]:
        - generic [ref=e303]:
          - heading "爵士樂之夜" [level=2] [ref=e304]
          - button "詳細名單" [ref=e305]
        - generic [ref=e306]:
          - generic [ref=e307]:
            - paragraph [ref=e308]: 正取
            - paragraph [ref=e309]: "38"
          - generic [ref=e310]:
            - paragraph [ref=e311]: 候補
            - paragraph [ref=e312]: "5"
          - generic [ref=e313]:
            - paragraph [ref=e314]: 取消
            - paragraph [ref=e315]: "4"
          - generic [ref=e316]:
            - paragraph [ref=e317]: 出席
            - paragraph [ref=e318]: "1"
        - generic [ref=e319]:
          - generic [ref=e320]:
            - generic [ref=e321]:
              - generic [ref=e322]: 報名率
              - generic [ref=e323]: 38 / 50 人
            - generic [ref=e327]: 76%
          - generic [ref=e328]:
            - generic [ref=e329]:
              - generic [ref=e330]: 出席率
              - generic [ref=e331]: 1 / 38 人
            - generic [ref=e335]: 3%
      - generic [ref=e336]:
        - generic [ref=e337]:
          - heading "親子料理課" [level=2] [ref=e338]
          - button "詳細名單" [ref=e339]
        - generic [ref=e340]:
          - generic [ref=e341]:
            - paragraph [ref=e342]: 正取
            - paragraph [ref=e343]: "38"
          - generic [ref=e344]:
            - paragraph [ref=e345]: 候補
            - paragraph [ref=e346]: "5"
          - generic [ref=e347]:
            - paragraph [ref=e348]: 取消
            - paragraph [ref=e349]: "4"
          - generic [ref=e350]:
            - paragraph [ref=e351]: 出席
            - paragraph [ref=e352]: "1"
        - generic [ref=e353]:
          - generic [ref=e354]:
            - generic [ref=e355]:
              - generic [ref=e356]: 報名率
              - generic [ref=e357]: 38 / 20 人
            - generic [ref=e361]: 100%
          - generic [ref=e362]:
            - generic [ref=e363]:
              - generic [ref=e364]: 出席率
              - generic [ref=e365]: 1 / 38 人
            - generic [ref=e369]: 3%
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
> 38  |     await page.fill('input[placeholder="搜尋..."]', "測試")
      |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
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
  73  |     await page.click("text=設定")
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