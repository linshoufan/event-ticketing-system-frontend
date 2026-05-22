import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../mock/events"
import type { Event } from "../types"
import EventCard from "../components/EventCard"
import PageTransition from "../components/PageTransition"

const CATEGORIES = ["sport", "food", "travel", "culture", "family", "contest", "music"]

const CATEGORY_LABELS: Record<string, string> = {
  sport: "運動",
  food: "美食",
  travel: "旅遊",
  culture: "文藝",
  family: "親子",
  contest: "競賽",
  music: "音樂",
}

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
    <PageTransition>
    <div className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold text-white mb-6">活動列表</h1>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <input
          placeholder="搜尋活動..."
          value={keyword}
          onChange={e => setKeyword(e.target.value)}
          className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
        />
        <select
          value={category}
          onChange={e => setCategory(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600"
        >
          <option value="">所有類別</option>
          {CATEGORIES.map(c => (
            <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
          ))}
        </select>
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600"
        >
          <option value="">所有狀態</option>
          <option value="not_open">尚未開始報名</option>
          <option value="registering">報名中</option>
          <option value="waitlist">候補登記</option>
          <option value="closed">報名截止</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-4xl mb-3">🔍</p>
          <p>沒有符合的活動</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
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
    </PageTransition>
  )
}

export default EventListPage