import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../../mock/events"

const MOCK_HR_STATS = [
  {
    eventId: "ev_001",
    eventName: "夏日烤肉趴",
    ticketLimit: 50,
    totalConfirmed: 38,
    totalWaitlist: 5,
    totalCancelled: 4,
    totalCheckedIn: 20,
  },
  {
    eventId: "ev_002",
    eventName: "音樂欣賞之夜",
    ticketLimit: null,
    totalConfirmed: 120,
    totalWaitlist: 0,
    totalCancelled: 10,
    totalCheckedIn: 98,
  },
  {
    eventId: "ev_003",
    eventName: "家庭日活動",
    ticketLimit: 100,
    totalConfirmed: 100,
    totalWaitlist: 15,
    totalCancelled: 8,
    totalCheckedIn: 0,
  },
]

function StatBar({
  value,
  total,
  color,
}: {
  value: number
  total: number
  color: string
}) {
  const pct = total > 0 ? Math.round((value / total) * 100) : 0
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <div style={{
        flex: 1,
        height: "8px",
        background: "#eee",
        borderRadius: "4px",
        overflow: "hidden",
      }}>
        <div style={{
          width: `${pct}%`,
          height: "100%",
          background: color,
          borderRadius: "4px",
          transition: "width 0.3s",
        }} />
      </div>
      <span style={{ fontSize: "13px", minWidth: "40px", color: "#666" }}>{pct}%</span>
    </div>
  )
}

function HRDashboardPage() {
  const navigate = useNavigate()
  const [search, setSearch] = useState("")

  const totalEvents = MOCK_HR_STATS.length
  const totalConfirmed = MOCK_HR_STATS.reduce((sum, s) => sum + s.totalConfirmed, 0)
  const totalCheckedIn = MOCK_HR_STATS.reduce((sum, s) => sum + s.totalCheckedIn, 0)
  const avgRegistrationRate = Math.round(
    MOCK_HR_STATS.reduce((sum, s) => {
      const cap = s.ticketLimit ?? s.totalConfirmed
      return sum + (cap > 0 ? s.totalConfirmed / cap : 0)
    }, 0) / totalEvents * 100
  )
  const avgCheckinRate = Math.round(
    totalConfirmed > 0 ? (totalCheckedIn / totalConfirmed) * 100 : 0
  )

  const filtered = MOCK_HR_STATS.filter(s =>
    s.eventName.includes(search)
  )

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <h1>統計報表</h1>

      <div style={{ display: "flex", gap: "16px", margin: "16px 0 32px" }}>
        {[
          { label: "活動總數", value: totalEvents, color: "#333" },
          { label: "總報名人數", value: totalConfirmed, color: "green" },
          { label: "總出席人數", value: totalCheckedIn, color: "blue" },
          { label: "平均報名率", value: `${avgRegistrationRate}%`, color: "orange" },
          { label: "平均出席率", value: `${avgCheckinRate}%`, color: "purple" },
        ].map(item => (
          <div key={item.label} style={{
            flex: 1,
            padding: "16px",
            border: "1px solid #eee",
            borderRadius: "8px",
            textAlign: "center",
          }}>
            <p style={{ margin: 0, color: "#666", fontSize: "13px" }}>{item.label}</p>
            <p style={{ margin: "4px 0 0", fontSize: "24px", fontWeight: "bold", color: item.color }}>
              {item.value}
            </p>
          </div>
        ))}
      </div>

      <input
        placeholder="搜尋活動..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "16px", boxSizing: "border-box" as const }}
      />

      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {filtered.map(stat => {
          const cap = stat.ticketLimit ?? stat.totalConfirmed
          const registrationRate = cap > 0 ? Math.round(stat.totalConfirmed / cap * 100) : 100
          const checkinRate = stat.totalConfirmed > 0
            ? Math.round(stat.totalCheckedIn / stat.totalConfirmed * 100)
            : 0

          return (
            <div
              key={stat.eventId}
              style={{
                padding: "20px",
                border: "1px solid #ccc",
                borderRadius: "8px",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
                <h2 style={{ margin: 0 }}>{stat.eventName}</h2>
                <button
                  onClick={() => navigate(`/admin/events/${stat.eventId}/registrations`)}
                  style={{ padding: "6px 12px", cursor: "pointer" }}
                >
                  詳細名單
                </button>
              </div>

              <div style={{ display: "flex", gap: "24px", marginBottom: "16px" }}>
                {[
                  { label: "正取", value: stat.totalConfirmed, color: "green" },
                  { label: "候補", value: stat.totalWaitlist, color: "orange" },
                  { label: "取消", value: stat.totalCancelled, color: "gray" },
                  { label: "出席", value: stat.totalCheckedIn, color: "blue" },
                ].map(item => (
                  <div key={item.label} style={{ textAlign: "center" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>{item.label}</p>
                    <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "bold", color: item.color }}>
                      {item.value}
                    </p>
                  </div>
                ))}
                {stat.ticketLimit && (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>名額</p>
                    <p style={{ margin: "2px 0 0", fontSize: "20px", fontWeight: "bold" }}>
                      {stat.ticketLimit}
                    </p>
                  </div>
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span>報名率</span>
                    <span>{stat.totalConfirmed} / {cap} 人</span>
                  </div>
                  <StatBar value={stat.totalConfirmed} total={cap} color="green" />
                </div>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", marginBottom: "4px" }}>
                    <span>出席率</span>
                    <span>{stat.totalCheckedIn} / {stat.totalConfirmed} 人</span>
                  </div>
                  <StatBar value={stat.totalCheckedIn} total={stat.totalConfirmed} color="blue" />
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default HRDashboardPage