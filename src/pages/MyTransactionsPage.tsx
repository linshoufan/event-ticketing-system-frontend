import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_TRANSACTIONS } from "../mock/transactions"

type TransactionStatus = "confirmed" | "waitlist" | "cancelled"

function MyTransactionsPage() {
  const navigate = useNavigate()
  const [statusFilter, setStatusFilter] = useState<TransactionStatus | "">("")

  const filtered = MOCK_TRANSACTIONS.filter(t => {
    if (statusFilter && t.status !== statusFilter) return false
    return true
  })

  function getStatusLabel(status: TransactionStatus) {
    const map: Record<TransactionStatus, string> = {
      confirmed: "正取",
      waitlist: "候補",
      cancelled: "已取消",
    }
    return map[status]
  }

  function getStatusColor(status: TransactionStatus) {
    const map: Record<TransactionStatus, string> = {
      confirmed: "green",
      waitlist: "orange",
      cancelled: "gray",
    }
    return map[status]
  }

  function getDietLabel(diet: string | null) {
    if (!diet) return "無需求"
    const map: Record<string, string> = {
      veg: "素食",
      "non-veg": "葷食",
    }
    return map[diet] ?? diet
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>我的報名紀錄</h1>

      <div style={{ marginBottom: "24px" }}>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value as TransactionStatus | "")}
          style={{ padding: "8px" }}
        >
          <option value="">所有狀態</option>
          <option value="confirmed">正取</option>
          <option value="waitlist">候補</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>沒有報名紀錄</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(t => (
            <div
              key={t.transactionId}
              style={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                opacity: t.status === "cancelled" ? 0.4 : 1,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <h2 style={{ margin: 0 }}>{t.eventName}</h2>
                <span style={{ color: getStatusColor(t.status as TransactionStatus) }}>
                  {getStatusLabel(t.status as TransactionStatus)}
                  {t.status === "waitlist" && t.waitlistNumber && (
                    <span style={{ fontSize: "14px", marginLeft: "4px" }}>
                      （第 {t.waitlistNumber} 號）
                    </span>
                  )}
                </span>
              </div>

              <p style={{ margin: "8px 0 0", color: "#666" }}>
                {new Date(t.eventStartTime).toLocaleString("zh-TW")}
              </p>

              <div style={{ display: "flex", gap: "16px", margin: "8px 0 0", fontSize: "14px", color: "#666" }}>
                <span>飲食：{getDietLabel(t.dietType)}</span>
                <span>自行開車：{t.selfDriving ? "是" : "否"}</span>
                {t.guestCount > 0 && <span>家屬人數：{t.guestCount}</span>}
              </div>

              <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
                {t.ticketId && (
                  <button onClick={() => navigate(`/my-tickets/${t.ticketId}`)}>
                    查看票券
                  </button>
                )}
                {t.status === "confirmed" && (
                  <button
                    style={{ color: "red" }}
                    onClick={() => alert("取消報名（之後換成真的 API）")}
                  >
                    取消報名
                  </button>
                )}
              </div>

              <p style={{ margin: "8px 0 0", fontSize: "12px", color: "#999" }}>
                報名時間：{new Date(t.registeredAt).toLocaleString("zh-TW")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTransactionsPage