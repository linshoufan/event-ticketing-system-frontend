# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: raceCondition.spec.ts >> 高流量 / 競態條件 E2E 測試 >> 情境一：多人同時搶票 >> 3 人同時報名 ticketLimit=1，只有 1 人能 confirmed，其餘必須 waitlist 或 409
- Location: e2e\raceCondition.spec.ts:188:5

# Error details

```
Error: [login] 帳號 welfare_001 失敗：{"error":{"code":"INVALID_ROLE","message":"Role does not match"}}
```

# Test source

```ts
  1   | import { test, expect } from "@playwright/test"
  2   | 
  3   | // ═══════════════════════════════════════════════════════════════
  4   | //  API 端點
  5   | // ═══════════════════════════════════════════════════════════════
  6   | const ACCOUNT_API = "https://account-api-75541019693.asia-east1.run.app/v1"
  7   | const EVENT_API   = "https://event-api-75541019693.asia-east1.run.app/v1"
  8   | const TX_API      = "https://transaction-api-75541019693.asia-east1.run.app/v1"
  9   | const TICKET_API  = "https://ticket-api-75541019693.asia-east1.run.app/v1"
  10  | 
  11  | // ═══════════════════════════════════════════════════════════════
  12  | //  測試帳號
  13  | // ═══════════════════════════════════════════════════════════════
  14  | const ADMIN = { employeeId: "welfare_001", password: "password123", role: "welfare_member" }
  15  | const RACE_USERS = [
  16  |   { employeeId: "1000001", password: "password123", role: "employee" },
  17  |   { employeeId: "1000002", password: "password123", role: "employee" },
  18  |   { employeeId: "user_005", password: "password123", role: "employee" },
  19  | ]
  20  | 
  21  | interface ApiResult {
  22  |   httpStatus: number
  23  |   body: Record<string, unknown>
  24  | }
  25  | 
  26  | // ═══════════════════════════════════════════════════════════════
  27  | //  工具函式
  28  | // ═══════════════════════════════════════════════════════════════
  29  | 
  30  | /**
  31  |  * 安全的 JSON 解析。
  32  |  * 後端偶爾回傳 "Internal Server Error" 純文字，直接 .json() 會 throw SyntaxError。
  33  |  * 這裡改用 .text() 先讀取，再嘗試 JSON.parse，失敗時回傳 { _raw: text }。
  34  |  */
  35  | async function safeJson(res: Response): Promise<Record<string, unknown>> {
  36  |   const text = await res.text()
  37  |   try {
  38  |     return JSON.parse(text) as Record<string, unknown>
  39  |   } catch {
  40  |     return { _raw: text, _parseError: true }
  41  |   }
  42  | }
  43  | 
  44  | /** 登入，回傳 JWT token */
  45  | async function login(credentials: {
  46  |   employeeId: string
  47  |   password:   string
  48  |   role:       string
  49  | }): Promise<string> {
  50  |   const res  = await fetch(`${ACCOUNT_API}/auth/login`, {
  51  |     method:  "POST",
  52  |     headers: { "Content-Type": "application/json" },
  53  |     body:    JSON.stringify(credentials),
  54  |   })
  55  |   const json = await safeJson(res)
  56  |   const token = (json.data as Record<string, unknown> | undefined)?.token as string | undefined
  57  |   if (!token) {
> 58  |     throw new Error(`[login] 帳號 ${credentials.employeeId} 失敗：${JSON.stringify(json)}`)
      |           ^ Error: [login] 帳號 welfare_001 失敗：{"error":{"code":"INVALID_ROLE","message":"Role does not match"}}
  59  |   }
  60  |   return token
  61  | }
  62  | 
  63  | /**
  64  |  * 建立測試活動，回傳 eventId。
  65  |  *
  66  |  * ⚠️ 關鍵修正：registrationEnd「必須」早於 eventStartTime，否則後端回 500。
  67  |  *   設計：eventStart = now + 2hr，registrationEnd = now + 1.5hr（合法，留 90 分鐘報名窗口）
  68  |  */
  69  | async function createEvent(adminToken: string, ticketLimit: number): Promise<string> {
  70  |   const now        = Date.now()
  71  |   const eventStart = now + 2 * 60 * 60 * 1000          // 2 小時後
  72  |   const eventEnd   = eventStart + 2 * 60 * 60 * 1000   // 4 小時後
  73  | 
  74  |   const res = await fetch(`${EVENT_API}/events`, {
  75  |     method:  "POST",
  76  |     headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
  77  |     body: JSON.stringify({
  78  |       name:                `[自動測試] 競態條件測試 ${Date.now()}`,
  79  |       description:         "race condition 自動測試用，請勿手動操作",
  80  |       category:            "sport",
  81  |       location:            "測試地點",
  82  |       latitude:            24.8066,
  83  |       longitude:           120.9686,
  84  |       checkinRadiusMeters: 200,
  85  |       eventStartTime:      new Date(eventStart).toISOString(),
  86  |       eventEndTime:        new Date(eventEnd).toISOString(),
  87  |       registrationStart:   new Date(now - 60_000).toISOString(),           // 1 分鐘前，已開放
  88  |       registrationEnd:     new Date(now + 90 * 60 * 1000).toISOString(),   // 90 分後（< eventStart）
  89  |       ticketLimit,
  90  |       isDraft: false,
  91  |     }),
  92  |   })
  93  |   const json    = await safeJson(res)
  94  |   const eventId = (json.data as Record<string, unknown> | undefined)?.eventId as string | undefined
  95  |   if (!eventId) {
  96  |     throw new Error(`[createEvent] 失敗 (HTTP ${res.status})：${JSON.stringify(json)}`)
  97  |   }
  98  |   console.log(`[Setup] 活動建立成功 → eventId: ${eventId}`)
  99  |   return eventId
  100 | }
  101 | 
  102 | /** 刪除活動（Teardown） */
  103 | async function deleteEvent(adminToken: string, eventId: string): Promise<void> {
  104 |   const res = await fetch(`${EVENT_API}/events/${eventId}`, {
  105 |     method:  "DELETE",
  106 |     headers: { Authorization: `Bearer ${adminToken}` },
  107 |   }).catch(() => null)
  108 |   console.log(`[Teardown] 刪除活動 ${eventId} → HTTP ${res?.status ?? "error"}`)
  109 | }
  110 | 
  111 | /** 取消報名（Teardown） */
  112 | async function cancelTransaction(token: string, transactionId: string): Promise<void> {
  113 |   await fetch(`${TX_API}/transactions/${transactionId}`, {
  114 |     method:  "DELETE",
  115 |     headers: { Authorization: `Bearer ${token}` },
  116 |   }).catch(() => {})
  117 | }
  118 | 
  119 | /** 報名活動 */
  120 | async function register(token: string, eventId: string): Promise<ApiResult> {
  121 |   const res  = await fetch(`${TX_API}/transactions`, {
  122 |     method:  "POST",
  123 |     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  124 |     body: JSON.stringify({
  125 |       eventId,
  126 |       guestCount:   0,
  127 |       dietType:     "none",
  128 |       selfDriving:  false,
  129 |       saveAutofill: false,
  130 |     }),
  131 |   })
  132 |   const body = await safeJson(res)
  133 |   return { httpStatus: res.status, body }
  134 | }
  135 | 
  136 | /** 核銷票券 */
  137 | async function checkin(token: string, ticketId: string): Promise<ApiResult> {
  138 |   const res  = await fetch(`${TICKET_API}/tickets/${ticketId}/checkin`, {
  139 |     method:  "POST",
  140 |     headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
  141 |     body: JSON.stringify({ latitude: 24.8066, longitude: 120.9686 }),
  142 |   })
  143 |   const body = await safeJson(res)
  144 |   return { httpStatus: res.status, body }
  145 | }
  146 | 
  147 | /** 查詢單一票券詳情 */
  148 | async function getTicket(token: string, ticketId: string): Promise<Record<string, unknown>> {
  149 |   const res  = await fetch(`${TICKET_API}/tickets/${ticketId}`, {
  150 |     headers: { Authorization: `Bearer ${token}` },
  151 |   })
  152 |   const json = await safeJson(res)
  153 |   return (json.data as Record<string, unknown> | undefined) ?? {}
  154 | }
  155 | 
  156 | /** 讀取 API 統一格式 { error: { code } } 的 error code */
  157 | function getErrorCode(r: ApiResult): string | undefined {
  158 |   return (r.body.error as Record<string, unknown> | undefined)?.code as string | undefined
```