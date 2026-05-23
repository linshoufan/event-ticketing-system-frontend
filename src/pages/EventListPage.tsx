import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_EVENTS } from "../mock/events"
import type { Event } from "../types"
import EventCard from "../components/EventCard"
import PageTransition from "../components/PageTransition"
import { EventCardSkeleton } from "../components/Skeleton"

const CATEGORIES = ["sport", "food", "travel", "culture", "family", "contest", "music"]

const CATEGORY_LABELS: Record<string, string> = {
  sport: "運動", food: "美食", travel: "旅遊",
  culture: "文藝", family: "親子", contest: "競賽", music: "音樂",
}

type SortOption =
  | "deadline_asc"
  | "deadline_desc"
  | "tickets_asc"
  | "tickets_desc"
  | "popular"
  | "default"

const SORT_LABELS: Record<SortOption, string> = {
  default:       "預設",
  deadline_asc:  "截止最近",
  deadline_desc: "截止最遠",
  tickets_asc:   "名額最少",
  tickets_desc:  "名額最多",
  popular:       "最熱門",
}

function sortEvents(events: Event[], sort: SortOption): Event[] {
  const sorted = [...events]
  switch (sort) {
    case "deadline_asc":
      return sorted.sort((a, b) => {
        if (!a.registrationEnd) return 1
        if (!b.registrationEnd) return -1
        return new Date(a.registrationEnd).getTime() - new Date(b.registrationEnd).getTime()
      })
    case "deadline_desc":
      return sorted.sort((a, b) => {
        if (!a.registrationEnd) return 1
        if (!b.registrationEnd) return -1
        return new Date(b.registrationEnd).getTime() - new Date(a.registrationEnd).getTime()
      })
    case "tickets_asc":
      return sorted.sort((a, b) => (a.remainingTickets ?? 0) - (b.remainingTickets ?? 0))
    case "tickets_desc":
      return sorted.sort((a, b) => (b.remainingTickets ?? 0) - (a.remainingTickets ?? 0))
    case "popular":
      return sorted.sort((a, b) => {
        const aRate = a.ticketLimit ? (a.ticketLimit - a.remainingTickets) / a.ticketLimit : 0
        const bRate = b.ticketLimit ? (b.ticketLimit - b.remainingTickets) / b.ticketLimit : 0
        return bRate - aRate
      })
    default:
      return sorted
  }
}

function EventListPage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [keyword, setKeyword] = useState("")
  const [category, setCategory] = useState("")
  const [status, setStatus] = useState("")
  const [sort, setSort] = useState<SortOption>("default")

  useEffect(() => {
    setTimeout(() => {
      setEvents(MOCK_EVENTS)
      setLoading(false)
    }, 800)
  }, [])

  const filtered = sortEvents(
    events.filter(e => {
      if (keyword && !e.name.includes(keyword) && !e.description.includes(keyword)) return false
      if (category && e.category !== category) return false
      if (status && e.status !== status) return false
      return true
    }),
    sort
  )

  return (
    <PageTransition>
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-white mb-6">活動列表</h1>

        <div className="flex flex-col gap-3 mb-6">
          <input
            placeholder="搜尋活動..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-white text-sm placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
          />
          <div className="flex gap-3">
            <select
              value={category}
              onChange={e => setCategory(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600"
            >
              <option value="">所有類別</option>
              {CATEGORIES.map(c => (
                <option key={c} value={c}>{CATEGORY_LABELS[c]}</option>
              ))}
            </select>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-zinc-600"
            >
              <option value="">所有狀態</option>
              <option value="not_open">尚未開始報名</option>
              <option value="registering">報名中</option>
              <option value="waitlist">候補登記</option>
              <option value="closed">報名截止</option>
            </select>
          </div>
          <div className="flex gap-2 flex-wrap">
            {(Object.keys(SORT_LABELS) as SortOption[]).map(option => (
              <button
                key={option}
                onClick={() => setSort(option)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  sort === option
                    ? "bg-white text-zinc-900"
                    : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-600"
                }`}
              >
                {SORT_LABELS[option]}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col gap-3">
            {[1, 2, 3].map(i => <EventCardSkeleton key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
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