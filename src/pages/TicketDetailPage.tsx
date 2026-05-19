import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getTicketById, checkin } from "../api/tickets"
import type { Ticket } from "../types"

function TicketDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [checkingIn, setCheckingIn] = useState(false)
  const [message, setMessage] = useState("")

  useEffect(() => {
    if (!ticketId) return
    getTicketById(ticketId).then(data => {
      setTicket(data)
      setLoading(false)
    })
  }, [ticketId])

  async function handleCheckin() {
    if (!ticketId) return
    setCheckingIn(true)
    setMessage("")

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await checkin(ticketId, {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          })
          if (res.checkedIn) {
            setMessage("報到成功！")
            const updated = await getTicketById(ticketId)
            setTicket(updated)
          }
        } catch (err: any) {
          if (err.code === "OUT_OF_RANGE") {
            setMessage("您不在活動地點附近，請移動至現場後再試")
          } else if (err.code === "TICKET_INVALID") {
            setMessage("此票券已使用或無效")
          } else if (err.code === "NOT_EVENT_TIME") {
            setMessage("尚未到達活動時間")
          } else {
            setMessage("報到失敗，請稍後再試")
          }
        }
        setCheckingIn(false)
      },
      () => {
        setMessage("無法取得您的位置，請確認已開啟定位權限")
        setCheckingIn(false)
      }
    )
  }

  function getStatusLabel(status: string) {
    const map: Record<string, string> = {
      unused: "可報到",
      used: "已報到",
      invalid: "未開放",
    }
    return map[status] ?? status
  }

  if (loading) return <p>載入中...</p>
  if (!ticket) return <p>找不到票券</p>

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <button onClick={() => navigate("/my-tickets")}>← 返回票券列表</button>

      <div style={{
        marginTop: "24px",
        padding: "24px",
        border: "1px solid #ccc",
        borderRadius: "12px",
        textAlign: "center"
      }}>
        <h1 style={{ margin: "0 0 8px" }}>{ticket.eventName}</h1>
        <p style={{ color: "#666", margin: "0 0 24px" }}>{ticket.eventLocation}</p>

        <div style={{
          display: "inline-block",
          padding: "6px 16px",
          borderRadius: "20px",
          background: ticket.status === "unused" ? "#e6f4ea" : "#f0f0f0",
          color: ticket.status === "unused" ? "green" : "gray",
          marginBottom: "24px"
        }}>
          {getStatusLabel(ticket.status)}
        </div>

        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          textAlign: "left",
          marginBottom: "24px"
        }}>
          <p>活動時間：{new Date(ticket.eventStartTime).toLocaleString("zh-TW")}</p>
          <p>結束時間：{new Date(ticket.eventEndTime).toLocaleString("zh-TW")}</p>
          <p>票券 ID：{ticket.ticketId}</p>
        </div>

        {ticket.checkinAvailable ? (
          <button
            onClick={handleCheckin}
            disabled={checkingIn}
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              background: "black",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: checkingIn ? "not-allowed" : "pointer",
            }}
          >
            {checkingIn ? "定位中..." : "報到"}
          </button>
        ) : (
          <button
            disabled
            style={{
              width: "100%",
              padding: "16px",
              fontSize: "18px",
              background: "#ccc",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "not-allowed",
            }}
          >
            {ticket.status === "used" ? "已報到" : "尚未開放報到"}
          </button>
        )}

        {message && (
          <p style={{
            marginTop: "16px",
            color: message.includes("成功") ? "green" : "red"
          }}>
            {message}
          </p>
        )}
      </div>
    </div>
  )
}

export default TicketDetailPage