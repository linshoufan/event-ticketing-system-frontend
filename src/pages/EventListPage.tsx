import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../mock/events"
import type { Event } from "../types"
import EventCard from "../components/EventCard"

const CATEGORIES = ["sport", "food", "travel", "culture", "family", "contest", "music"]

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
            <EventCard
              key={event.eventId}
              event={event}
              onClick={() => navigate(`/events/${event.eventId}`)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default EventListPage