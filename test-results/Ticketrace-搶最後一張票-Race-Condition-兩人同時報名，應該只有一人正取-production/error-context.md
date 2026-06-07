# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Ticketrace.spec.ts >> 搶最後一張票 (Race Condition) >> 兩人同時報名，應該只有一人正取
- Location: e2e\Ticketrace.spec.ts:95:3

# Error details

```
Error: 登入失敗 welfare_001: {"error":{"code":"INVALID_ROLE","message":"Role does not match"}}
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | 
  3   | const ACCOUNT_API = "https://account-api-75541019693.asia-east1.run.app/v1"
  4   | const EVENT_API   = "https://event-api-75541019693.asia-east1.run.app/v1"
  5   | const TX_API      = "https://transaction-api-75541019693.asia-east1.run.app/v1"
  6   | 
  7   | const WELFARE = { employeeId: "welfare_001", password: "password123", role: "welfare_member" }
  8   | const USER1   = { employeeId: "1000001",    password: "password123", role: "employee" }
  9   | const USER2   = { employeeId: "1000002",    password: "password123", role: "employee" }
  10  | 
  11  | async function login(account: { employeeId: string; password: string; role: string }): Promise<string> {
  12  |   const res = await fetch(`${ACCOUNT_API}/auth/login`, {
  13  |     method: "POST",
  14  |     headers: { "Content-Type": "application/json" },
  15  |     body: JSON.stringify(account),
  16  |   })
  17  |   const json = await res.json()
> 18  |   if (!res.ok) throw new Error(`登入失敗 ${account.employeeId}: ${JSON.stringify(json)}`)
      |                      ^ Error: 登入失敗 welfare_001: {"error":{"code":"INVALID_ROLE","message":"Role does not match"}}
  19  |   return json.data.token
  20  | }
  21  | 
  22  | async function register(token: string, eventId: string) {
  23  |   const res = await fetch(`${TX_API}/transactions`, {
  24  |     method: "POST",
  25  |     headers: {
  26  |       "Content-Type": "application/json",
  27  |       "Authorization": `Bearer ${token}`,
  28  |     },
  29  |     body: JSON.stringify({
  30  |       eventId,
  31  |       guestCount: 0,
  32  |       dietType: "none",
  33  |       selfDriving: false,
  34  |       saveAutofill: false,
  35  |     }),
  36  |   })
  37  |   const json = await res.json()
  38  |   return { httpStatus: res.status, body: json }
  39  | }
  40  | 
  41  | test.describe("搶最後一張票 (Race Condition)", () => {
  42  |   let eventId: string
  43  |   let welfareToken: string
  44  |   const createdTx: { id: string; token: string }[] = []
  45  | 
  46  |   test.beforeAll(async () => {
  47  |     welfareToken = await login(WELFARE)
  48  | 
  49  |     const now = Date.now()
  50  |     const res = await fetch(`${EVENT_API}/events`, {
  51  |       method: "POST",
  52  |       headers: {
  53  |         "Content-Type": "application/json",
  54  |         "Authorization": `Bearer ${welfareToken}`,
  55  |       },
  56  |       body: JSON.stringify({
  57  |         name: `[自動測試] 搶票競態 ${new Date().toISOString().slice(0, 16)}`,
  58  |         description: "race condition 自動測試用，請勿手動操作",
  59  |         category: "sport",
  60  |         location: "測試地點",
  61  |         latitude: 24.8066,
  62  |         longitude: 120.9686,
  63  |         checkinRadiusMeters: 200,
  64  |         eventStartTime: new Date(now + 7 * 86400000).toISOString(),
  65  |         eventEndTime: new Date(now + 7 * 86400000 + 3600000).toISOString(),
  66  |         registrationStart: new Date(now - 60000).toISOString(),    // 報名已開放
  67  |         registrationEnd: new Date(now + 6 * 86400000).toISOString(),
  68  |         ticketLimit: 1,                                            // 只有一張票
  69  |         isDraft: false,
  70  |       }),
  71  |     })
  72  |     const json = await res.json()
  73  |     eventId = json.data?.eventId
  74  |     expect(eventId, `活動建立失敗: ${JSON.stringify(json)}`).toBeTruthy()
  75  |     console.log("✅ 建立測試活動:", eventId)
  76  |   })
  77  | 
  78  |   test.afterAll(async () => {
  79  |     // 用各自的 token 取消報名（DELETE /transactions 限本人）
  80  |     for (const { id, token } of createdTx) {
  81  |       await fetch(`${TX_API}/transactions/${id}`, {
  82  |         method: "DELETE",
  83  |         headers: { Authorization: `Bearer ${token}` },
  84  |       }).catch(() => {})
  85  |     }
  86  |     // 嘗試刪除測試活動（報名已開始可能回 409，忽略）
  87  |     if (eventId) {
  88  |       await fetch(`${EVENT_API}/events/${eventId}`, {
  89  |         method: "DELETE",
  90  |         headers: { Authorization: `Bearer ${welfareToken}` },
  91  |       }).catch(() => {})
  92  |     }
  93  |   })
  94  | 
  95  |   test("兩人同時報名，應該只有一人正取", async () => {
  96  |     const [token1, token2] = await Promise.all([login(USER1), login(USER2)])
  97  | 
  98  |     // 同時送出兩筆報名請求
  99  |     const [r1, r2] = await Promise.all([
  100 |       register(token1, eventId),
  101 |       register(token2, eventId),
  102 |     ])
  103 | 
  104 |     console.log("User1:", r1.httpStatus, JSON.stringify(r1.body))
  105 |     console.log("User2:", r2.httpStatus, JSON.stringify(r2.body))
  106 | 
  107 |     // 記錄 transaction 供清理
  108 |     if (r1.body.data?.transactionId) createdTx.push({ id: r1.body.data.transactionId, token: token1 })
  109 |     if (r2.body.data?.transactionId) createdTx.push({ id: r2.body.data.transactionId, token: token2 })
  110 | 
  111 |     // 分類每個結果
  112 |     function classify(r: { httpStatus: number; body: any }): string {
  113 |       if (r.httpStatus === 201) return r.body.data?.status   // "confirmed" | "waitlist"
  114 |       if (r.httpStatus === 409) return "rejected"            // NO_TICKETS / ALREADY_REGISTERED
  115 |       return `error_${r.httpStatus}`
  116 |     }
  117 | 
  118 |     const results = [classify(r1), classify(r2)]
```