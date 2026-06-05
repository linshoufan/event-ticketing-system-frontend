# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: Ticketrace.spec.ts >> 搶最後一張票 (Race Condition) >> 兩人同時報名，應該只有一人正取
- Location: e2e/Ticketrace.spec.ts:95:3

# Error details

```
Error: 應該剛好一個人拿到 confirmed

expect(received).toBe(expected) // Object.is equality

Expected: 1
Received: 0
```

# Test source

```ts
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
  119 |     console.log("分類結果:", results)
  120 | 
  121 |     const confirmed = results.filter(s => s === "confirmed").length
  122 |     const waitlistOrRejected = results.filter(s => s === "waitlist" || s === "rejected").length
  123 | 
  124 |     // 核心斷言：剛好一人正取，另一人候補或被拒
> 125 |     expect(confirmed, "應該剛好一個人拿到 confirmed").toBe(1)
      |                                              ^ Error: 應該剛好一個人拿到 confirmed
  126 |     expect(waitlistOrRejected, "另一個人應該候補或被拒").toBe(1)
  127 |   })
  128 | })
```