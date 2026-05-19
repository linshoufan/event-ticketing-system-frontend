import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MOCK_EVENTS, MOCK_ELIGIBILITY } from "../mock/events"
import { MOCK_TRANSACTIONS } from "../mock/transactions"

function EventDetailPage() {
  const { eventId } = useParams<{ eventId: string }>()
  const navigate = useNavigate()
  const event = MOCK_EVENTS.find(e => e.eventId === eventId) ?? null
  const eligibility = MOCK_ELIGIBILITY
  const alreadyRegistered = MOCK_TRANSACTIONS.some(t => t.eventId === eventId)

  const [dietType, setDietType] = useState<"veg" | "non-veg" | "none">("none")
  const [selfDriving, setSelfDriving] = useState(false)
  const [guestCount, setGuestCount] = useState(0)
  const [message, setMessage] = useState("")
  const [registering, setRegistering] = useState(false)

  async function handleRegister() {
    setRegistering(true)
    // 之後換成真的 API
    // await createTransaction({ eventId, guestCount, dietType, selfDriving, saveAutofill: true })
    setTimeout(() => {
      setMessage("報名成功！（假資料）")
      setRegistering(false)
    }, 500)
  }

  function getActionButton() {
    if (!eligibility || !event) return null

    if (alreadyRegistered) {
      return <p style={{ color: "gray" }}>您已報名此活動</p>
    }

    if (event.status === "registering") {
      return (
        <button onClick={handleRegister} disabled={registering}>
          {registering ? "報名中..." : "立即報名"}
        </button>
      )
    }

    if (event.status === "waitlist") {
      return (
        <button onClick={handleRegister} disabled={registering}>
          {registering ? "處理中..." : "加入候補"}
        </button>
      )
    }

    return <p style={{ color: "gray" }}>目前無法報名</p>
  }

  if (!event) return <p>找不到活動</p>

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto", padding: "24px" }}>
      <button onClick={() => navigate("/events")}>← 返回列表</button>

      <h1>{event.name}</h1>
      <p>{event.description}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "8px", margin: "16px 0" }}>
        <p>地點：{event.location}</p>
        <p>活動時間：{new Date(event.eventStartTime).toLocaleString("zh-TW")}</p>
        <p>報名截止：{new Date(event.registrationEnd).toLocaleString("zh-TW")}</p>
        {event.ticketLimit && (
          <p>剩餘名額：{event.remainingTickets} / {event.ticketLimit}</p>
        )}
        {event.cancellationDeadline && (
          <p>取消截止：{new Date(event.cancellationDeadline).toLocaleString("zh-TW")}</p>
        )}
      </div>

      {event.faqs && event.faqs.length > 0 && (
        <div style={{ margin: "16px 0" }}>
          <h3>常見問題</h3>
          {event.faqs.map((faq, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <p style={{ fontWeight: "bold" }}>Q: {faq.question}</p>
              <p>A: {faq.answer}</p>
            </div>
          ))}
        </div>
      )}

      <div style={{ margin: "24px 0", display: "flex", flexDirection: "column", gap: "12px" }}>
        <h3>報名資料</h3>
        <div>
          <label>飲食需求：</label>
          <select value={dietType} onChange={e => setDietType(e.target.value as any)}>
            <option value="none">無需求</option>
            <option value="veg">素食</option>
            <option value="non-veg">葷食</option>
          </select>
        </div>
        <div>
          <label>
            <input
              type="checkbox"
              checked={selfDriving}
              onChange={e => setSelfDriving(e.target.checked)}
            />
            自行開車
          </label>
        </div>
        {!event.ticketLimit && (
          <div>
            <label>攜帶家屬人數：</label>
            <input
              type="number"
              min={0}
              value={guestCount}
              onChange={e => setGuestCount(Number(e.target.value))}
              style={{ width: "60px", marginLeft: "8px" }}
            />
          </div>
        )}
      </div>

      {getActionButton()}
      {message && <p style={{ marginTop: "12px" }}>{message}</p>}
    </div>
  )
}

export default EventDetailPage