import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../../mock/events"

interface TicketRecord {
  ticketId: string
  userId: string
  username: string
  status: "used" | "unused" | "invalid"
}

const MOCK_CHECKIN_TICKETS: TicketRecord[] = [
  { ticketId: "tk_001", userId: "u_abc123", username: "john.doe", status: "unused" },
  { ticketId: "tk_002", userId: "u_xyz789", username: "jane.smith", status: "used" },
  { ticketId: "tk_003", userId: "u_locked01", username: "bob.wang", status: "unused" },
]

function CheckinPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const event = MOCK_EVENTS.find(e => e.eventId === eventId)
  const [tickets, setTickets] = useState<TicketRecord[]>(MOCK_CHECKIN_TICKETS)
  const [search, setSearch] = useState("")

  const filtered = tickets.filter(t =>
    t.username.toLowerCase().includes(search.toLowerCase()) ||
    t.ticketId.toLowerCase().includes(search.toLowerCase())
  )

  const summary = {
    used: tickets.filter(t => t.status === "used").length,
    unused: tickets.filter(t => t.status === "unused").length,
    invalid: tickets.filter(t => t.status === "invalid").length,
  }

  function handleCheckin(ticketId: string) {
    if (!confirm("確定要核銷這張票券嗎？")) return
    // 之後換成真的 API
    setTickets(prev =>
      prev.map(t =>
        t.ticketId === ticketId ? { ...t, status: "used" } : t
      )
    )
  }

  function getStatusLabel(status: string) {
    const map: Record<string, string> = {
      used: "已核銷",
      unused: "未核銷",
      invalid: "無效",
    }
    return map[status] ?? status
  }

  function getStatusColor(status: string) {
    const map: Record<string, string> = {
      used: "gray",
      unused: "green",
      invalid: "red",
    }
    return map[status] ?? "black"
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <button onClick={() => navigate("/admin/events")}>← 返回活動管理</button>

      <h1 style={{ marginTop: "16px" }}>
        核銷頁面
        {event && <span style={{ fontSize: "18px", marginLeft: "12px", color: "#666" }}>— {event.name}</span>}
      </h1>

      <div style={{ display: "flex", gap: "16px", margin: "16px 0 24px" }}>
        {[
          { label: "已核銷", value: summary.used, color: "gray" },
          { label: "未核銷", value: summary.unused, color: "green" },
          { label: "無效", value: summary.invalid, color: "red" },
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

      <input
        placeholder="搜尋姓名或票券 ID..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        style={{ width: "100%", padding: "8px", marginBottom: "16px", boxSizing: "border-box" }}
      />

      {filtered.length === 0 ? (
        <p>找不到票券</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>票券 ID</th>
              <th style={{ textAlign: "left", padding: "8px" }}>姓名</th>
              <th style={{ textAlign: "left", padding: "8px" }}>狀態</th>
              <th style={{ textAlign: "left", padding: "8px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(ticket => (
              <tr key={ticket.ticketId} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px", fontFamily: "monospace" }}>{ticket.ticketId}</td>
                <td style={{ padding: "8px" }}>{ticket.username}</td>
                <td style={{ padding: "8px", color: getStatusColor(ticket.status) }}>
                  {getStatusLabel(ticket.status)}
                </td>
                <td style={{ padding: "8px" }}>
                  {ticket.status === "unused" ? (
                    <button
                      onClick={() => handleCheckin(ticket.ticketId)}
                      style={{
                        background: "black",
                        color: "white",
                        border: "none",
                        padding: "6px 12px",
                        borderRadius: "4px",
                        cursor: "pointer",
                      }}
                    >
                      核銷
                    </button>
                  ) : (
                    <span style={{ color: "#999", fontSize: "14px" }}>
                      {ticket.status === "used" ? "已完成" : "不可核銷"}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default CheckinPage