import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../mock/events"
import type { Event } from "../types"

const CATEGORIES = ["outdoor", "food", "music", "sports", "travel"]

function EventListPage() {
  const navigate = useNavigate()
  const [events] = useState<Event[]>(MOCK_EVENTS)
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("")

  const filtered = events.filter(e => {
    if (keyword && !e.name.includes(keyword) && !e.description.includes(keyword)) return false
    if (category && e.category !== category) return false
    if (status && e.status !== status) return false
    return true
  })

  function getStatusLabel(status: string) {
    const map: Record<string, string> = {
      not_open: "尚未開始報名",
      registering: "報名中",
      waitlist: "候補登記",
      closed: "報名截止",
      ended: "活動結束",
    }
    return map[status] ?? status
  }

  function isActive(status: string) {
    return status === "registering"
  }

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <h1>活動列表</h1>

      <div style={{ display: "flex", gap: "12px", marginBottom: "24px" }}>
        <input
          placeholder="搜尋活動..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          style={{ flex: 1, padding: "8px" }}
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">所有類別</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">所有狀態</option>
          <option value="not_open">尚未開始報名</option>
          <option value="registering">報名中</option>
          <option value="waitlist">候補登記</option>
          <option value="closed">報名截止</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>沒有活動</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {filtered.map(event => (
            <div
              key={event.eventId}
              onClick={() => navigate(`/events/${event.eventId}`)}
              style={{
                padding: "16px",
                border: "1px solid #ccc",
                borderRadius: "8px",
                cursor: "pointer",
                opacity: isActive(event.status) ? 1 : 0.4,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h2 style={{ margin: 0 }}>{event.name}</h2>
                <span>{getStatusLabel(event.status)}</span>
              </div>
              <p style={{ margin: "8px 0 0" }}>{event.location}</p>
              <p style={{ margin: "4px 0 0", color: "#666" }}>
                {new Date(event.eventStartTime).toLocaleString("zh-TW")}
              </p>
              {event.ticketLimit && (
                <p style={{ margin: "4px 0 0", color: "#666" }}>
                  剩餘名額：{event.remainingTickets}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default EventListPage