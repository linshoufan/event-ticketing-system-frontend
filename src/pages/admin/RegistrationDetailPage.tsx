import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getEventRegistrations } from "../../api/events"

interface Registration {
  transactionId: string
  userId: string
  username: string
  status: "confirmed" | "waitlist" | "cancelled"
  guestCount: number
  dietType: string
  selfDriving: boolean
  registeredAt: string
}

interface Summary {
  totalConfirmed: number
  totalWaitlist: number
  totalCancelled: number
}

function RegistrationDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const [registrations, setRegistrations] = useState<Registration[]>([])
  const [summary, setSummary] = useState<Summary | null>(null)
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    if (!eventId) return
    fetchRegistrations()
  }, [eventId, statusFilter])

  async function fetchRegistrations() {
    setLoading(true)
    const res = await getEventRegistrations(eventId!, {
      status: statusFilter || undefined,
    })
    setSummary(res.data.summary)
    setRegistrations(res.data.registrations)
    setLoading(false)
  }

  function getStatusLabel(status: string) {
    const map: Record<string, string> = {
      confirmed: "正取",
      waitlist: "候補",
      cancelled: "已取消",
    }
    return map[status] ?? status
  }

  function getStatusColor(status: string) {
    const map: Record<string, string> = {
      confirmed: "green",
      waitlist: "orange",
      cancelled: "gray",
    }
    return map[status] ?? "black"
  }

  function getDietLabel(diet: string) {
    const map: Record<string, string> = {
      veg: "素食",
      "non-veg": "葷食",
      none: "無需求",
    }
    return map[diet] ?? diet
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <button onClick={() => navigate("/admin/events")}>← 返回活動管理</button>
      <h1 style={{ marginTop: "16px" }}>報名詳情</h1>

      {summary && (
        <div style={{
          display: "flex",
          gap: "16px",
          margin: "16px 0 24px",
        }}>
          {[
            { label: "正取", value: summary.totalConfirmed, color: "green" },
            { label: "候補", value: summary.totalWaitlist, color: "orange" },
            { label: "已取消", value: summary.totalCancelled, color: "gray" },
          ].map(item => (
            <div key={item.label} style={{
              flex: 1,
              padding: "16px",
              border: "1px solid #eee",
              borderRadius: "8px",
              textAlign: "center",
            }}>
              <p style={{ margin: 0, color: "#666", fontSize: "14px" }}>{item.label}</p>
              <p style={{ margin: "4px 0 0", fontSize: "28px", fontWeight: "bold", color: item.color }}>
                {item.value}
              </p>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginBottom: "16px" }}>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">所有狀態</option>
          <option value="confirmed">正取</option>
          <option value="waitlist">候補</option>
          <option value="cancelled">已取消</option>
        </select>
      </div>

      {loading ? (
        <p>載入中...</p>
      ) : registrations.length === 0 ? (
        <p>沒有報名紀錄</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>姓名</th>
              <th style={{ textAlign: "left", padding: "8px" }}>狀態</th>
              <th style={{ textAlign: "left", padding: "8px" }}>家屬人數</th>
              <th style={{ textAlign: "left", padding: "8px" }}>飲食需求</th>
              <th style={{ textAlign: "left", padding: "8px" }}>自行開車</th>
              <th style={{ textAlign: "left", padding: "8px" }}>報名時間</th>
            </tr>
          </thead>
          <tbody>
            {registrations.map(reg => (
              <tr key={reg.transactionId} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{reg.username}</td>
                <td style={{ padding: "8px", color: getStatusColor(reg.status) }}>
                  {getStatusLabel(reg.status)}
                </td>
                <td style={{ padding: "8px" }}>{reg.guestCount}</td>
                <td style={{ padding: "8px" }}>{getDietLabel(reg.dietType)}</td>
                <td style={{ padding: "8px" }}>{reg.selfDriving ? "是" : "否"}</td>
                <td style={{ padding: "8px" }}>
                  {new Date(reg.registeredAt).toLocaleString("zh-TW")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default RegistrationDetailPage