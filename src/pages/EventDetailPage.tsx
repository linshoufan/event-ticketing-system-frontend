import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MOCK_EVENTS, MOCK_ELIGIBILITY } from "../mock/events"
import { MOCK_TRANSACTIONS } from "../mock/transactions"

const STATUS_CONFIG: Record<string, { label: string; color: string; bg: string }> = {
  not_open:    { label: "尚未開始報名", color: "text-zinc-400", bg: "bg-zinc-800" },
  registering: { label: "報名中",       color: "text-emerald-400", bg: "bg-emerald-900/30" },
  waitlist:    { label: "候補登記",     color: "text-amber-400", bg: "bg-amber-900/30" },
  closed:      { label: "報名截止",     color: "text-red-400", bg: "bg-red-900/30" },
  ended:       { label: "活動結束",     color: "text-zinc-500", bg: "bg-zinc-800" },
}

function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const event = MOCK_EVENTS.find(e => e.eventId === eventId) ?? null
  const eligibility = MOCK_ELIGIBILITY
  const alreadyRegistered = MOCK_TRANSACTIONS.some(t => t.eventId === eventId)

  const [dietType, setDietType] = useState<"veg" | "non-veg" | null>(null)
  const [selfDriving, setSelfDriving] = useState(false)
  const [guestCount, setGuestCount] = useState(0)
  const [message, setMessage] = useState("")
  const [registering, setRegistering] = useState(false)

  async function handleRegister() {
    setRegistering(true)
    setTimeout(() => {
      setMessage("報名成功！（假資料）")
      setRegistering(false)
    }, 500)
  }

  function getActionButton() {
    if (!eligibility || !event) return null

    if (alreadyRegistered) {
      return (
        <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-400 text-sm text-center">
          您已報名此活動
        </div>
      )
    }

    if (event.status === "registering") {
      return (
        <button
          onClick={handleRegister}
          disabled={registering}
          className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {registering ? "報名中..." : "立即報名"}
        </button>
      )
    }

    if (event.status === "waitlist") {
      return (
        <button
          onClick={handleRegister}
          disabled={registering}
          className="w-full py-3 rounded-xl bg-amber-600 hover:bg-amber-500 disabled:opacity-50 text-white font-semibold transition-colors"
        >
          {registering ? "處理中..." : "加入候補"}
        </button>
      )
    }

    return (
      <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-3 text-zinc-500 text-sm text-center">
        目前無法報名
      </div>
    )
  }

  if (!event) return (
    <div className="text-center py-16 text-zinc-500">找不到活動</div>
  )

  const config = STATUS_CONFIG[event.status] ?? { label: event.status, color: "text-zinc-400", bg: "bg-zinc-800" }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4">
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="text-2xl font-bold text-white">{event.name}</h1>
          <span className={`text-xs font-medium px-3 py-1 rounded-full flex-shrink-0 ${config.bg} ${config.color}`}>
            {config.label}
          </span>
        </div>
        <p className="text-zinc-400 text-sm mb-4">{event.description}</p>

        <div className="flex flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 text-zinc-400">
            <span>📍</span>
            <span>{event.location}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>🕐</span>
            <span>{new Date(event.eventStartTime).toLocaleString("zh-TW")}</span>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <span>📅</span>
            <span>報名截止：{new Date(event.registrationEnd).toLocaleString("zh-TW")}</span>
          </div>
          {event.ticketLimit && (
            <div className="flex items-center gap-2 text-zinc-400">
              <span>🎫</span>
              <span>剩餘名額：<span className="text-white font-medium">{event.remainingTickets}</span> / {event.ticketLimit}</span>
            </div>
          )}
          {event.cancellationDeadline && (
            <div className="flex items-center gap-2 text-zinc-400">
              <span>⚠️</span>
              <span>取消截止：{new Date(event.cancellationDeadline).toLocaleString("zh-TW")}</span>
            </div>
          )}
        </div>
      </div>

      {event.faqs && event.faqs.length > 0 && (
        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4">
          <h3 className="text-white font-semibold mb-4">常見問題</h3>
          <div className="flex flex-col gap-3">
            {event.faqs.map((faq, i) => (
              <div key={i} className="bg-zinc-800 rounded-xl p-4">
                <p className="text-white text-sm font-medium mb-1">Q: {faq.question}</p>
                <p className="text-zinc-400 text-sm">A: {faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-4">
        <h3 className="text-white font-semibold mb-4">報名資料</h3>
        <div className="flex flex-col gap-4">
          <div>
            <label className="text-zinc-400 text-sm block mb-2">飲食需求</label>
            <select
              value={dietType ?? ""}
              onChange={e => setDietType(e.target.value as "veg" | "non-veg" | null || null)}
              className="w-full bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-500"
            >
              <option value="">無需求</option>
              <option value="veg">素食</option>
              <option value="non-veg">葷食</option>
            </select>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={selfDriving}
              onChange={e => setSelfDriving(e.target.checked)}
              className="w-4 h-4 rounded"
            />
            <span className="text-zinc-300 text-sm">自行開車</span>
          </label>

          {!event.ticketLimit && (
            <div>
              <label className="text-zinc-400 text-sm block mb-2">攜帶家屬人數</label>
              <input
                type="number"
                min={0}
                value={guestCount}
                onChange={e => setGuestCount(Number(e.target.value))}
                className="w-24 bg-zinc-800 border border-zinc-700 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-zinc-500"
              />
            </div>
          )}
        </div>
      </div>

      {getActionButton()}

      {message && (
        <div className="mt-4 bg-emerald-900/30 border border-emerald-800 rounded-xl px-4 py-3 text-emerald-400 text-sm text-center">
          {message}
        </div>
      )}
    </div>
  )
}

export default EventDetailPage