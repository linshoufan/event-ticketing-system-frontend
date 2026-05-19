import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { getEvents, deleteEvent, updateEvent } from "../../api/events"
import type { Event } from "../../types"

function EventManagePage() {
  const navigate = useNavigate()
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  async function fetchEvents() {
    setLoading(true)
    const res = await getEvents()
    setEvents(res.data)
    setLoading(false)
  }

  async function handleDelete(eventId: string) {
    if (!confirm("確定要刪除這個活動嗎？")) return
    try {
      await deleteEvent(eventId)
      setEvents(prev => prev.filter(e => e.eventId !== eventId))
    } catch {
      alert("刪除失敗，此活動已發布或已開始報名")
    }
  }

  async function handlePublish(eventId: string) {
    try {
      await updateEvent(eventId, { isDraft: false })
      setEvents(prev =>
        prev.map(e => e.eventId === eventId ? { ...e, isDraft: false } : e)
      )
    } catch {
      alert("發布失敗")
    }
  }

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

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>活動管理</h1>
        <button onClick={() => navigate("/admin/users")}>使用者管理</button>
      </div>

      {loading ? (
        <p>載入中...</p>
      ) : events.length === 0 ? (
        <p>沒有活動</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>活動名稱</th>
              <th style={{ textAlign: "left", padding: "8px" }}>狀態</th>
              <th style={{ textAlign: "left", padding: "8px" }}>報名截止</th>
              <th style={{ textAlign: "left", padding: "8px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.eventId} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>
                  {event.name}
                  {event.isDraft && (
                    <span style={{
                      marginLeft: "8px",
                      padding: "2px 8px",
                      background: "#fff3cd",
                      borderRadius: "4px",
                      fontSize: "12px"
                    }}>
                      草稿
                    </span>
                  )}
                </td>
                <td style={{ padding: "8px" }}>{getStatusLabel(event.status)}</td>
                <td style={{ padding: "8px" }}>
                  {event.registrationEnd
                    ? new Date(event.registrationEnd).toLocaleDateString("zh-TW")
                    : "-"}
                </td>
                <td style={{ padding: "8px", display: "flex", gap: "8px" }}>
                  {event.isDraft && (
                    <button onClick={() => handlePublish(event.eventId)}>
                      發布
                    </button>
                  )}
                  <button
                    onClick={() => navigate(`/admin/events/${event.eventId}/registrations`)}
                  >
                    報名詳情
                  </button>
                  <button
                    onClick={() => handleDelete(event.eventId)}
                    style={{ color: "red" }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default EventManagePage