import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_TICKETS } from "../mock/tickets"
import type { Ticket, TicketStatus } from "../types"

function MyTicketsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState<TicketStatus | "">("")

  const filtered = MOCK_TICKETS.filter(t => {
    if (filter && t.status !== filter) return false
    return true
  })

  function getStatusLabel(status: TicketStatus) {
    const map: Record<TicketStatus, string> = {
      unused: "可報到",
      used: "已報到",
      invalid: "未開放",
    }
    return map[status]
  }

  function getStatusColor(status: TicketStatus) {
    const map: Record<TicketStatus, string> = {
      unused: "green",
      used: "gray",
      invalid: "gray",
    }
    return map[status]
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>我的票券</h1>

      <div style={{ marginBottom: "24px" }}>
        <select
          value={filter}
          onChange={e => setFilter(e.target.value as TicketStatus | "")}
          style={{ padding: "8px" }}
        >
          <option value="">所有票券</option>
          <option value="unused">可報到</option>
          <option value="used">已報到</option>
          <option value="invalid">未開放</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>沒有票券</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map((ticket: Ticket) => (
            <div
              key={ticket.ticketId}
              onClick={() => navigate(`/my-tickets/${ticket.ticketId}`)}
              style={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                opacity: ticket.status === "unused" ? 1 : 0.4,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>{ticket.eventName}</h2>
                <span style={{ color: getStatusColor(ticket.status) }}>
                  {getStatusLabel(ticket.status)}
                </span>
              </div>
              <p style={{ margin: "8px 0 0" }}>{ticket.eventLocation}</p>
              <p style={{ margin: "4px 0 0", color: "#666" }}>
                {new Date(ticket.eventStartTime).toLocaleString("zh-TW")}
              </p>
              {ticket.checkinAvailable && (
                <p style={{ margin: "8px 0 0", color: "green", fontWeight: "bold" }}>
                  點擊進入報到
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default MyTicketsPage