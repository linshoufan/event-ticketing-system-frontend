import { test, expect } from "@playwright/test"

const ACCOUNT_API = "https://account-api-75541019693.asia-east1.run.app/v1"
const EVENT_API   = "https://event-api-75541019693.asia-east1.run.app/v1"
const TX_API      = "https://transaction-api-75541019693.asia-east1.run.app/v1"

const WELFARE = { employeeId: "welfare_001", password: "password123", role: "welfare_member" }
const USER1   = { employeeId: "1000001",    password: "password123", role: "employee" }
const USER2   = { employeeId: "1000002",    password: "password123", role: "employee" }

async function login(account: { employeeId: string; password: string; role: string }): Promise<string> {
  const res = await fetch(`${ACCOUNT_API}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(account),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`登入失敗 ${account.employeeId}: ${JSON.stringify(json)}`)
  return json.data.token
}

async function register(token: string, eventId: string) {
  const res = await fetch(`${TX_API}/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      eventId,
      guestCount: 0,
      dietType: "none",
      selfDriving: false,
      saveAutofill: false,
    }),
  })
  const json = await res.json()
  return { httpStatus: res.status, body: json }
}

test.describe("搶最後一張票 (Race Condition)", () => {
  let eventId: string
  let welfareToken: string
  const createdTx: { id: string; token: string }[] = []

  test.beforeAll(async () => {
    welfareToken = await login(WELFARE)

    const now = Date.now()
    const res = await fetch(`${EVENT_API}/events`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${welfareToken}`,
      },
      body: JSON.stringify({
        name: `[自動測試] 搶票競態 ${new Date().toISOString().slice(0, 16)}`,
        description: "race condition 自動測試用，請勿手動操作",
        category: "sport",
        location: "測試地點",
        latitude: 24.8066,
        longitude: 120.9686,
        checkinRadiusMeters: 200,
        eventStartTime: new Date(now + 7 * 86400000).toISOString(),
        eventEndTime: new Date(now + 7 * 86400000 + 3600000).toISOString(),
        registrationStart: new Date(now - 60000).toISOString(),    // 報名已開放
        registrationEnd: new Date(now + 6 * 86400000).toISOString(),
        ticketLimit: 1,                                            // 只有一張票
        isDraft: false,
      }),
    })
    const json = await res.json()
    eventId = json.data?.eventId
    expect(eventId, `活動建立失敗: ${JSON.stringify(json)}`).toBeTruthy()
    console.log("✅ 建立測試活動:", eventId)
  })

  test.afterAll(async () => {
    // 用各自的 token 取消報名（DELETE /transactions 限本人）
    for (const { id, token } of createdTx) {
      await fetch(`${TX_API}/transactions/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => {})
    }
    // 嘗試刪除測試活動（報名已開始可能回 409，忽略）
    if (eventId) {
      await fetch(`${EVENT_API}/events/${eventId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${welfareToken}` },
      }).catch(() => {})
    }
  })

  test("兩人同時報名，應該只有一人正取", async () => {
    const [token1, token2] = await Promise.all([login(USER1), login(USER2)])

    // 同時送出兩筆報名請求
    const [r1, r2] = await Promise.all([
      register(token1, eventId),
      register(token2, eventId),
    ])

    console.log("User1:", r1.httpStatus, JSON.stringify(r1.body))
    console.log("User2:", r2.httpStatus, JSON.stringify(r2.body))

    // 記錄 transaction 供清理
    if (r1.body.data?.transactionId) createdTx.push({ id: r1.body.data.transactionId, token: token1 })
    if (r2.body.data?.transactionId) createdTx.push({ id: r2.body.data.transactionId, token: token2 })

    // 分類每個結果
    function classify(r: { httpStatus: number; body: any }): string {
      if (r.httpStatus === 201) return r.body.data?.status   // "confirmed" | "waitlist"
      if (r.httpStatus === 409) return "rejected"            // NO_TICKETS / ALREADY_REGISTERED
      return `error_${r.httpStatus}`
    }

    const results = [classify(r1), classify(r2)]
    console.log("分類結果:", results)

    const confirmed = results.filter(s => s === "confirmed").length
    const waitlistOrRejected = results.filter(s => s === "waitlist" || s === "rejected").length

    // 核心斷言：剛好一人正取，另一人候補或被拒
    expect(confirmed, "應該剛好一個人拿到 confirmed").toBe(1)
    expect(waitlistOrRejected, "另一個人應該候補或被拒").toBe(1)
  })
})