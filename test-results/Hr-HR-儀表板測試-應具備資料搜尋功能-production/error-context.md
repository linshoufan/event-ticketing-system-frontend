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
        - paragraph [ref=e18]: "12"
      - generic [ref=e19]:
        - paragraph [ref=e20]: 總報名人數
        - paragraph [ref=e21]: "6"
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
            - paragraph [ref=e37]: "0"
          - generic [ref=e38]:
            - paragraph [ref=e39]: 候補
            - paragraph [ref=e40]: "0"
          - generic [ref=e41]:
            - paragraph [ref=e42]: 取消
            - paragraph [ref=e43]: "0"
          - generic [ref=e44]:
            - paragraph [ref=e45]: 出席
            - paragraph [ref=e46]: "0"
        - generic [ref=e47]:
          - generic [ref=e48]:
            - generic [ref=e49]:
              - generic [ref=e50]: 報名率
              - generic [ref=e51]: 0 / 0 人
            - generic [ref=e54]: 0%
          - generic [ref=e55]:
            - generic [ref=e56]:
              - generic [ref=e57]: 出席率
              - generic [ref=e58]: 0 / 0 人
            - generic [ref=e61]: 0%
      - generic [ref=e62]:
        - generic [ref=e63]:
          - heading "1" [level=2] [ref=e64]
          - button "詳細名單" [ref=e65]
        - generic [ref=e66]:
          - generic [ref=e67]:
            - paragraph [ref=e68]: 正取
            - paragraph [ref=e69]: "0"
          - generic [ref=e70]:
            - paragraph [ref=e71]: 候補
            - paragraph [ref=e72]: "0"
          - generic [ref=e73]:
            - paragraph [ref=e74]: 取消
            - paragraph [ref=e75]: "0"
          - generic [ref=e76]:
            - paragraph [ref=e77]: 出席
            - paragraph [ref=e78]: "0"
        - generic [ref=e79]:
          - generic [ref=e80]:
            - generic [ref=e81]:
              - generic [ref=e82]: 報名率
              - generic [ref=e83]: 0 / 0 人
            - generic [ref=e86]: 0%
          - generic [ref=e87]:
            - generic [ref=e88]:
              - generic [ref=e89]: 出席率
              - generic [ref=e90]: 0 / 0 人
            - generic [ref=e93]: 0%
      - generic [ref=e94]:
        - generic [ref=e95]:
          - heading "2026 仲夏星空電影節" [level=2] [ref=e96]
          - button "詳細名單" [ref=e97]
        - generic [ref=e98]:
          - generic [ref=e99]:
            - paragraph [ref=e100]: 正取
            - paragraph [ref=e101]: "0"
          - generic [ref=e102]:
            - paragraph [ref=e103]: 候補
            - paragraph [ref=e104]: "0"
          - generic [ref=e105]:
            - paragraph [ref=e106]: 取消
            - paragraph [ref=e107]: "0"
          - generic [ref=e108]:
            - paragraph [ref=e109]: 出席
            - paragraph [ref=e110]: "0"
        - generic [ref=e111]:
          - generic [ref=e112]:
            - generic [ref=e113]:
              - generic [ref=e114]: 報名率
              - generic [ref=e115]: 0 / 100 人
            - generic [ref=e118]: 0%
          - generic [ref=e119]:
            - generic [ref=e120]:
              - generic [ref=e121]: 出席率
              - generic [ref=e122]: 0 / 0 人
            - generic [ref=e125]: 0%
      - generic [ref=e126]:
        - generic [ref=e127]:
          - heading "員工家庭日" [level=2] [ref=e128]
          - button "詳細名單" [ref=e129]
        - generic [ref=e130]:
          - generic [ref=e131]:
            - paragraph [ref=e132]: 正取
            - paragraph [ref=e133]: "1"
          - generic [ref=e134]:
            - paragraph [ref=e135]: 候補
            - paragraph [ref=e136]: "0"
          - generic [ref=e137]:
            - paragraph [ref=e138]: 取消
            - paragraph [ref=e139]: "0"
          - generic [ref=e140]:
            - paragraph [ref=e141]: 出席
            - paragraph [ref=e142]: "0"
        - generic [ref=e143]:
          - generic [ref=e144]:
            - generic [ref=e145]:
              - generic [ref=e146]: 報名率
              - generic [ref=e147]: 1 / 300 人
            - generic [ref=e150]: 0%
          - generic [ref=e151]:
            - generic [ref=e152]:
              - generic [ref=e153]: 出席率
              - generic [ref=e154]: 0 / 1 人
            - generic [ref=e157]: 0%
      - generic [ref=e158]:
        - generic [ref=e159]:
          - heading "Event event_005" [level=2] [ref=e160]
          - button "詳細名單" [ref=e161]
        - generic [ref=e162]:
          - generic [ref=e163]:
            - paragraph [ref=e164]: 正取
            - paragraph [ref=e165]: "2"
          - generic [ref=e166]:
            - paragraph [ref=e167]: 候補
            - paragraph [ref=e168]: "1"
          - generic [ref=e169]:
            - paragraph [ref=e170]: 取消
            - paragraph [ref=e171]: "0"
          - generic [ref=e172]:
            - paragraph [ref=e173]: 出席
            - paragraph [ref=e174]: "0"
        - generic [ref=e175]:
          - generic [ref=e176]:
            - generic [ref=e177]:
              - generic [ref=e178]: 報名率
              - generic [ref=e179]: 2 / 5 人
            - generic [ref=e183]: 40%
          - generic [ref=e184]:
            - generic [ref=e185]:
              - generic [ref=e186]: 出席率
              - generic [ref=e187]: 0 / 2 人
            - generic [ref=e190]: 0%
      - generic [ref=e191]:
        - generic [ref=e192]:
          - heading "Event event_006" [level=2] [ref=e193]
          - button "詳細名單" [ref=e194]
        - generic [ref=e195]:
          - generic [ref=e196]:
            - paragraph [ref=e197]: 正取
            - paragraph [ref=e198]: "0"
          - generic [ref=e199]:
            - paragraph [ref=e200]: 候補
            - paragraph [ref=e201]: "0"
          - generic [ref=e202]:
            - paragraph [ref=e203]: 取消
            - paragraph [ref=e204]: "0"
          - generic [ref=e205]:
            - paragraph [ref=e206]: 出席
            - paragraph [ref=e207]: "0"
        - generic [ref=e208]:
          - generic [ref=e209]:
            - generic [ref=e210]:
              - generic [ref=e211]: 報名率
              - generic [ref=e212]: 0 / 1 人
            - generic [ref=e215]: 0%
          - generic [ref=e216]:
            - generic [ref=e217]:
              - generic [ref=e218]: 出席率
              - generic [ref=e219]: 0 / 0 人
            - generic [ref=e222]: 0%
      - generic [ref=e223]:
        - generic [ref=e224]:
          - heading "Event event_007" [level=2] [ref=e225]
          - button "詳細名單" [ref=e226]
        - generic [ref=e227]:
          - generic [ref=e228]:
            - paragraph [ref=e229]: 正取
            - paragraph [ref=e230]: "0"
          - generic [ref=e231]:
            - paragraph [ref=e232]: 候補
            - paragraph [ref=e233]: "0"
          - generic [ref=e234]:
            - paragraph [ref=e235]: 取消
            - paragraph [ref=e236]: "0"
          - generic [ref=e237]:
            - paragraph [ref=e238]: 出席
            - paragraph [ref=e239]: "0"
        - generic [ref=e240]:
          - generic [ref=e241]:
            - generic [ref=e242]:
              - generic [ref=e243]: 報名率
              - generic [ref=e244]: 0 / 3 人
            - generic [ref=e247]: 0%
          - generic [ref=e248]:
            - generic [ref=e249]:
              - generic [ref=e250]: 出席率
              - generic [ref=e251]: 0 / 0 人
            - generic [ref=e254]: 0%
      - generic [ref=e255]:
        - generic [ref=e256]:
          - heading "2026跨年喝酒BBQ同樂會" [level=2] [ref=e257]
          - button "詳細名單" [ref=e258]
        - generic [ref=e259]:
          - generic [ref=e260]:
            - paragraph [ref=e261]: 正取
            - paragraph [ref=e262]: "0"
          - generic [ref=e263]:
            - paragraph [ref=e264]: 候補
            - paragraph [ref=e265]: "0"
          - generic [ref=e266]:
            - paragraph [ref=e267]: 取消
            - paragraph [ref=e268]: "0"
          - generic [ref=e269]:
            - paragraph [ref=e270]: 出席
            - paragraph [ref=e271]: "0"
        - generic [ref=e272]:
          - generic [ref=e273]:
            - generic [ref=e274]:
              - generic [ref=e275]: 報名率
              - generic [ref=e276]: 0 / 0 人
            - generic [ref=e279]: 0%
          - generic [ref=e280]:
            - generic [ref=e281]:
              - generic [ref=e282]: 出席率
              - generic [ref=e283]: 0 / 0 人
            - generic [ref=e286]: 0%
      - generic [ref=e287]:
        - generic [ref=e288]:
          - heading "Family Day" [level=2] [ref=e289]
          - button "詳細名單" [ref=e290]
        - generic [ref=e291]:
          - generic [ref=e292]:
            - paragraph [ref=e293]: 正取
            - paragraph [ref=e294]: "1"
          - generic [ref=e295]:
            - paragraph [ref=e296]: 候補
            - paragraph [ref=e297]: "0"
          - generic [ref=e298]:
            - paragraph [ref=e299]: 取消
            - paragraph [ref=e300]: "0"
          - generic [ref=e301]:
            - paragraph [ref=e302]: 出席
            - paragraph [ref=e303]: "0"
        - generic [ref=e304]:
          - generic [ref=e305]:
            - generic [ref=e306]:
              - generic [ref=e307]: 報名率
              - generic [ref=e308]: 1 / 100 人
            - generic [ref=e312]: 1%
          - generic [ref=e313]:
            - generic [ref=e314]:
              - generic [ref=e315]: 出席率
              - generic [ref=e316]: 0 / 1 人
            - generic [ref=e319]: 0%
      - generic [ref=e320]:
        - generic [ref=e321]:
          - heading "週五電影之夜" [level=2] [ref=e322]
          - button "詳細名單" [ref=e323]
        - generic [ref=e324]:
          - generic [ref=e325]:
            - paragraph [ref=e326]: 正取
            - paragraph [ref=e327]: "1"
          - generic [ref=e328]:
            - paragraph [ref=e329]: 候補
            - paragraph [ref=e330]: "0"
          - generic [ref=e331]:
            - paragraph [ref=e332]: 取消
            - paragraph [ref=e333]: "0"
          - generic [ref=e334]:
            - paragraph [ref=e335]: 出席
            - paragraph [ref=e336]: "0"
        - generic [ref=e337]:
          - generic [ref=e338]:
            - generic [ref=e339]:
              - generic [ref=e340]: 報名率
              - generic [ref=e341]: 1 / 1 人
            - generic [ref=e345]: 100%
          - generic [ref=e346]:
            - generic [ref=e347]:
              - generic [ref=e348]: 出席率
              - generic [ref=e349]: 0 / 1 人
            - generic [ref=e352]: 0%
      - generic [ref=e353]:
        - generic [ref=e354]:
          - heading "Open Lecture" [level=2] [ref=e355]
          - button "詳細名單" [ref=e356]
        - generic [ref=e357]:
          - generic [ref=e358]:
            - paragraph [ref=e359]: 正取
            - paragraph [ref=e360]: "1"
          - generic [ref=e361]:
            - paragraph [ref=e362]: 候補
            - paragraph [ref=e363]: "0"
          - generic [ref=e364]:
            - paragraph [ref=e365]: 取消
            - paragraph [ref=e366]: "2"
          - generic [ref=e367]:
            - paragraph [ref=e368]: 出席
            - paragraph [ref=e369]: "0"
        - generic [ref=e370]:
          - generic [ref=e371]:
            - generic [ref=e372]:
              - generic [ref=e373]: 報名率
              - generic [ref=e374]: 1 / 1 人
            - generic [ref=e378]: 100%
          - generic [ref=e379]:
            - generic [ref=e380]:
              - generic [ref=e381]: 出席率
              - generic [ref=e382]: 0 / 1 人
            - generic [ref=e385]: 0%
      - generic [ref=e386]:
        - generic [ref=e387]:
          - heading "X" [level=2] [ref=e388]
          - button "詳細名單" [ref=e389]
        - generic [ref=e390]:
          - generic [ref=e391]:
            - paragraph [ref=e392]: 正取
            - paragraph [ref=e393]: "0"
          - generic [ref=e394]:
            - paragraph [ref=e395]: 候補
            - paragraph [ref=e396]: "0"
          - generic [ref=e397]:
            - paragraph [ref=e398]: 取消
            - paragraph [ref=e399]: "0"
          - generic [ref=e400]:
            - paragraph [ref=e401]: 出席
            - paragraph [ref=e402]: "0"
        - generic [ref=e403]:
          - generic [ref=e404]:
            - generic [ref=e405]:
              - generic [ref=e406]: 報名率
              - generic [ref=e407]: 0 / 0 人
            - generic [ref=e410]: 0%
          - generic [ref=e411]:
            - generic [ref=e412]:
              - generic [ref=e413]: 出席率
              - generic [ref=e414]: 0 / 0 人
            - generic [ref=e417]: 0%
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