import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { MOCK_TICKETS } from "../mock/tickets"

function TicketDetailPage() {
  const { ticketId } = useParams<{ ticketId: string }>()
  const navigate = useNavigate()
  const [ticket, setTicket] = useState(
    MOCK_TICKETS.find(t => t.ticketId === ticketId) ?? null
  )
  const [checkingIn, setCheckingIn] = useState(false)
  const [message, setMessage] = useState("")

  async function handleCheckin() {
    setCheckingIn(true)
    setMessage("")

    navigator.geolocation.getCurrentPosition(
      () => {
        // 之後換成真的 API
        // await checkin(ticketId, { latitude, longitude })
        setTimeout(() => {
          setMessage("報到成功！（假資料）")
          if (ticket) setTicket({ ...ticket, status: "used", checkinAvailable: false })
          setCheckingIn(false)
        }, 500)
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