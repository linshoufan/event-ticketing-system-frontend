import { test, expect } from "@playwright/test"

// ═══════════════════════════════════════════════════════════════
//  API 端點
// ═══════════════════════════════════════════════════════════════
const ACCOUNT_API = "cnticketsystem.xyz/account/v1"
const EVENT_API   = "cnticketsystem.xyz/event/v1"
const TX_API      = "cnticketsystem.xyz/transaction/v1"
const TICKET_API  = "cnticketsystem.xyz/ticket/v1"

// ═══════════════════════════════════════════════════════════════
//  測試帳號
// ═══════════════════════════════════════════════════════════════
const ADMIN = { employeeId: "welfare_001", password: "password123", role: "welfare_member" }
const RACE_USERS = [
  { employeeId: "1000001", password: "password123", role: "employee" },
  { employeeId: "1000002", password: "password123", role: "employee" },
  { employeeId: "user_005", password: "password123", role: "employee" },
]

interface ApiResult {
  httpStatus: number
  body: Record<string, unknown>
}

// ═══════════════════════════════════════════════════════════════
//  工具函式
// ═══════════════════════════════════════════════════════════════

/**
 * 安全的 JSON 解析。
 * 後端偶爾回傳 "Internal Server Error" 純文字，直接 .json() 會 throw SyntaxError。
 * 這裡改用 .text() 先讀取，再嘗試 JSON.parse，失敗時回傳 { _raw: text }。
 */
async function safeJson(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text()
  try {
    return JSON.parse(text) as Record<string, unknown>
  } catch {
    return { _raw: text, _parseError: true }
  }
}

/** 登入，回傳 JWT token */
async function login(credentials: {
  employeeId: string
  password:   string
  role:       string
}): Promise<string> {
  const res  = await fetch(`${ACCOUNT_API}/auth/login`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(credentials),
  })
  const json = await safeJson(res)
  const token = (json.data as Record<string, unknown> | undefined)?.token as string | undefined
  if (!token) {
    throw new Error(`[login] 帳號 ${credentials.employeeId} 失敗：${JSON.stringify(json)}`)
  }
  return token
}

/**
 * 建立測試活動，回傳 eventId。
 *
 * ⚠️ 關鍵修正：registrationEnd「必須」早於 eventStartTime，否則後端回 500。
 *   設計：eventStart = now + 2hr，registrationEnd = now + 1.5hr（合法，留 90 分鐘報名窗口）
 */
async function createEvent(adminToken: string, ticketLimit: number): Promise<string> {
  const now        = Date.now()
  const eventStart = now + 2 * 60 * 60 * 1000          // 2 小時後
  const eventEnd   = eventStart + 2 * 60 * 60 * 1000   // 4 小時後

  const res = await fetch(`${EVENT_API}/events`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${adminToken}` },
    body: JSON.stringify({
      name:                `[自動測試] 競態條件測試 ${Date.now()}`,
      description:         "race condition 自動測試用，請勿手動操作",
      category:            "sport",
      location:            "測試地點",
      latitude:            24.8066,
      longitude:           120.9686,
      checkinRadiusMeters: 200,
      eventStartTime:      new Date(eventStart).toISOString(),
      eventEndTime:        new Date(eventEnd).toISOString(),
      registrationStart:   new Date(now - 60_000).toISOString(),           // 1 分鐘前，已開放
      registrationEnd:     new Date(now + 90 * 60 * 1000).toISOString(),   // 90 分後（< eventStart）
      ticketLimit,
      isDraft: false,
    }),
  })
  const json    = await safeJson(res)
  const eventId = (json.data as Record<string, unknown> | undefined)?.eventId as string | undefined
  if (!eventId) {
    throw new Error(`[createEvent] 失敗 (HTTP ${res.status})：${JSON.stringify(json)}`)
  }
  console.log(`[Setup] 活動建立成功 → eventId: ${eventId}`)
  return eventId
}

/** 刪除活動（Teardown） */
async function deleteEvent(adminToken: string, eventId: string): Promise<void> {
  const res = await fetch(`${EVENT_API}/events/${eventId}`, {
    method:  "DELETE",
    headers: { Authorization: `Bearer ${adminToken}` },
  }).catch(() => null)
  console.log(`[Teardown] 刪除活動 ${eventId} → HTTP ${res?.status ?? "error"}`)
}

/** 取消報名（Teardown） */
async function cancelTransaction(token: string, transactionId: string): Promise<void> {
  await fetch(`${TX_API}/transactions/${transactionId}`, {
    method:  "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  }).catch(() => {})
}

/** 報名活動 */
async function register(token: string, eventId: string): Promise<ApiResult> {
  const res  = await fetch(`${TX_API}/transactions`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      eventId,
      guestCount:   0,
      dietType:     "none",
      selfDriving:  false,
      saveAutofill: false,
    }),
  })
  const body = await safeJson(res)
  return { httpStatus: res.status, body }
}

/** 核銷票券 */
async function checkin(token: string, ticketId: string): Promise<ApiResult> {
  const res  = await fetch(`${TICKET_API}/tickets/${ticketId}/checkin`, {
    method:  "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify({ latitude: 24.8066, longitude: 120.9686 }),
  })
  const body = await safeJson(res)
  return { httpStatus: res.status, body }
}

/** 查詢單一票券詳情 */
async function getTicket(token: string, ticketId: string): Promise<Record<string, unknown>> {
  const res  = await fetch(`${TICKET_API}/tickets/${ticketId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  const json = await safeJson(res)
  return (json.data as Record<string, unknown> | undefined) ?? {}
}

/** 讀取 API 統一格式 { error: { code } } 的 error code */
function getErrorCode(r: ApiResult): string | undefined {
  return (r.body.error as Record<string, unknown> | undefined)?.code as string | undefined
}

// ═══════════════════════════════════════════════════════════════
//  測試主體
// ═══════════════════════════════════════════════════════════════

test.describe("高流量 / 競態條件 E2E 測試", () => {

  // ───────────────────────────────────────────────────────────
  //  情境一：多人同時搶票（Concurrent Registration）
  // ───────────────────────────────────────────────────────────
  test.describe("情境一：多人同時搶票", () => {

    let adminToken: string
    let eventId:    string
    const createdTx: { id: string; token: string }[] = []

    test.beforeAll(async () => {
      adminToken = await login(ADMIN)
      eventId    = await createEvent(adminToken, 1)   // ticketLimit = 1 張
    })

    test.afterAll(async () => {
      for (const { id, token } of createdTx) {
        await cancelTransaction(token, id)
      }
      if (eventId) await deleteEvent(adminToken, eventId)
    })

    test("3 人同時報名 ticketLimit=1，只有 1 人能 confirmed，其餘必須 waitlist 或 409", async () => {

      // Step 1：3 人同時登入
      console.log("\n[Step 1] 3 位使用者同時登入...")
      const [t1, t2, t3] = await Promise.all(RACE_USERS.map(u => login(u)))
      console.log("  ↳ 全部登入成功")

      // Step 2：Promise.all 同時送出 3 筆報名（模擬高併發）
      console.log("[Step 2] Promise.all 同時送出 3 筆報名請求...")
      const [r1, r2, r3] = await Promise.all([
        register(t1, eventId),
        register(t2, eventId),
        register(t3, eventId),
      ])

      // Step 3：分類並 log 結果
      console.log("[Step 3] 結果分類：")
      const pairs: [ApiResult, string][] = [[r1, t1], [r2, t2], [r3, t3]]
      const statuses: (string | null)[] = pairs.map(([r, token], i) => {
        const data   = r.body.data as Record<string, unknown> | undefined
        const status = data?.status as string | undefined
        const label  =
          status === "confirmed" ? "✅ confirmed" :
          status === "waitlist"  ? "⏳ waitlist"  :
          r.httpStatus === 409   ? `❌ 409 (${getErrorCode(r) ?? "?"})` :
                                   `❓ HTTP ${r.httpStatus}` +
                                   (r.body._raw ? ` raw="${String(r.body._raw).slice(0, 40)}"` : "")
        console.log(`  User[${i}] (${RACE_USERS[i].employeeId}) → ${label}`)
        // 收集 transactionId 供 afterAll 取消
        const txId = data?.transactionId as string | undefined
        if (txId) createdTx.push({ id: txId, token })
        return status ?? null
      })

      // ── 斷言 ──────────────────────────────────────────────

      const confirmedCount  = statuses.filter(s => s === "confirmed").length
      const waitlistCount   = statuses.filter(s => s === "waitlist").length
      const rejectedCount   = [r1, r2, r3].filter(r => r.httpStatus === 409).length

      // 斷言 1：正取精確為 1
      expect(
        confirmedCount,
        `confirmed 應為 1，實際為 ${confirmedCount}。\n` +
        `  > 2 → 後端 Race Condition Bug（Transaction Service 缺乏原子性）\n` +
        `  = 0 → 活動建立失敗或報名時段設定有誤\n` +
        `詳細：\n` +
        `  r1: HTTP ${r1.httpStatus} → ${JSON.stringify(r1.body.data)}\n` +
        `  r2: HTTP ${r2.httpStatus} → ${JSON.stringify(r2.body.data)}\n` +
        `  r3: HTTP ${r3.httpStatus} → ${JSON.stringify(r3.body.data)}`
      ).toBe(1)

      // 斷言 2：非正取精確為 2
      expect(statuses.filter(s => s !== "confirmed").length, "非 confirmed 應為 2 筆").toBe(2)

      // 斷言 3：每筆非正取必須是合法拒絕（waitlist 或 4xx）
      pairs
        .filter((_, i) => statuses[i] !== "confirmed")
        .forEach(([r], i) => {
          const isWaitlist = statuses[i] === "waitlist"
          expect(
            isWaitlist || r.httpStatus >= 400,
            `非正取結果必須是 waitlist 或 HTTP 4xx，實際 HTTP ${r.httpStatus}`
          ).toBe(true)
        })

      console.log(
        `\n[結論] confirmed=${confirmedCount} / waitlist=${waitlistCount} / rejected(409)=${rejectedCount}`
      )
    })
  })

  // ───────────────────────────────────────────────────────────
  //  情境二：多裝置同時核銷（Concurrent Check-in）
  //
  //  【設計說明】
  //  Employee checkin 需要 event in-progress（eventStartTime <= now <= eventEndTime），
  //  但若 eventStartTime 在過去，則 registrationEnd 也必須在過去（registrationEnd < eventStartTime），
  //  導致無法在 beforeAll 完成報名。
  //
  //  解決方案：使用 welfare_member（adminToken）執行並發核銷。
  //    - welfare_member 不受活動時間、地理位置限制（API spec 明定）。
  //    - welfare_member 重複核銷同張票時回傳 200 + 原始 checkedInAt（spec 行為）。
  //    - 透過比對三次回應的 checkedInAt 值，可驗證 DB 只寫入 1 次（atomic write）。
  //    - 最後查詢 GET /tickets/{id} 確認最終狀態為 "used"。
  // ───────────────────────────────────────────────────────────
  test.describe("情境二：多裝置同時核銷", () => {

    let adminToken:         string
    let eventId:            string
    let targetTicketId:     string
    let confirmedUserToken: string
    let confirmedTxId:      string

    test.beforeAll(async () => {
      adminToken         = await login(ADMIN)
      eventId            = await createEvent(adminToken, 3)   // ticketLimit = 3
      confirmedUserToken = await login(RACE_USERS[0])

      // 循序報名，確保取得 confirmed 票券
      const txResult = await register(confirmedUserToken, eventId)
      const txData   = txResult.body.data as Record<string, unknown> | undefined
      console.log(`[Setup] user1 報名 → HTTP ${txResult.httpStatus} / status=${txData?.status ?? "?"}`)

      if (txResult.httpStatus !== 201 || txData?.status !== "confirmed") {
        throw new Error(
          `[Setup] 報名未取得 confirmed，無法執行核銷測試。\n` +
          `HTTP ${txResult.httpStatus} → ${JSON.stringify(txResult.body)}`
        )
      }

      // POST /transactions confirmed 回應含有 ticketId（API spec 定義）
      const rawTicketId = txData.ticketId as string | undefined
      if (!rawTicketId) {
        throw new Error(
          `[Setup] Transaction 回應未含 ticketId。\n` +
          `請確認後端 POST /transactions 的 confirmed 回應是否帶有 ticketId 欄位。\n` +
          `回應：${JSON.stringify(txResult.body)}`
        )
      }
      targetTicketId = rawTicketId
      confirmedTxId  = (txData.transactionId as string | undefined) ?? ""
      console.log(`[Setup] 取得 ticketId: ${targetTicketId}`)
    })

    test.afterAll(async () => {
      if (confirmedTxId) await cancelTransaction(confirmedUserToken, confirmedTxId)
      if (eventId) await deleteEvent(adminToken, eventId)
    })

    test("同一張票同時被 3 個裝置核銷，一票只能核銷一次（DB atomic write 驗證）", async () => {

      // Step 1：3 個裝置同時觸發核銷（welfare_member）
      console.log(`\n[Step 1] 3 台裝置同時核銷 ticketId: ${targetTicketId} ...`)
      const [c1, c2, c3] = await Promise.all([
        checkin(adminToken, targetTicketId),  // 裝置 A
        checkin(adminToken, targetTicketId),  // 裝置 B
        checkin(adminToken, targetTicketId),  // 裝置 C
      ])
      const results = [c1, c2, c3]

      // Step 2：印出每筆結果
      console.log("[Step 2] 核銷結果：")
      results.forEach((r, i) => {
        const data = r.body.data as Record<string, unknown> | undefined
        console.log(
          `  裝置[${i}] → HTTP ${r.httpStatus} / ` +
          `checkedIn=${data?.checkedIn} / checkedInAt=${data?.checkedInAt ?? "N/A"}`
        )
      })

      // ── 斷言 ──────────────────────────────────────────────

      // 斷言 1：welfare_member 核銷必須全部回 200（per API spec）
      results.forEach((r, i) => {
        expect(
          r.httpStatus,
          `裝置[${i}] welfare_member 核銷應回傳 200，實際 ${r.httpStatus}。\n` +
          `body=${JSON.stringify(r.body)}`
        ).toBe(200)
      })

      // 斷言 2：三次回應的 checkedInAt 必須完全相同
      // 原理：第 1 次寫入後 DB status 變為 "used"，
      //       第 2、3 次看到 "used" 應回傳「原始」checkedInAt（不重複寫入）。
      // 若 checkedInAt 有多個不同值 → 後端發生重複寫入（Race Condition Bug）。
      const checkedInAts = results
        .map(r => (r.body.data as Record<string, unknown> | undefined)?.checkedInAt as string | undefined)
        .filter((v): v is string => !!v)

      const uniqueTimes = [...new Set(checkedInAts)]
      console.log(`  checkedInAt 唯一值數：${uniqueTimes.length}（期望 1）`)
      console.log(`  所有 checkedInAt：${checkedInAts.join(" | ")}`)

      expect(
        uniqueTimes.length,
        `三次並發核銷的 checkedInAt 應完全相同（代表 DB 只寫入 1 次）。\n` +
        `若有多個不同時間戳 → 後端 Ticket Service 缺乏 atomic write 保護。\n` +
        `實際時間戳：\n  ${uniqueTimes.join("\n  ")}`
      ).toBe(1)

      // 斷言 3：查詢票券確認最終狀態為 "used"（正面驗證 DB 寫入正確）
      const ticket = await getTicket(adminToken, targetTicketId)
      const ticketStatus = ticket.status as string | undefined
      console.log(`  票券最終狀態（GET /tickets/${targetTicketId}）：${ticketStatus}`)
      expect(
        ticketStatus,
        `票券最終狀態應為 "used"，實際為 "${ticketStatus}"`
      ).toBe("used")

      console.log("\n[結論] 一票一核銷機制運作正常（DB atomic write 驗證通過）")
    })
  })
})