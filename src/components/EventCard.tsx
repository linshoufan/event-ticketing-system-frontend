import type { Event } from "../types"

interface Props {
  event: Event
  onClick: () => void
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

function EventCard({ event, onClick }: Props) {
  const isActive = event.status === "registering"

  return (
    <div
      onClick={onClick}
      data-testid="event-card"
      style={{
        padding: "16px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        cursor: "pointer",
        opacity: isActive ? 1 : 0.4,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h2 style={{ margin: 0 }}>{event.name}</h2>
        <span data-testid="event-status">{getStatusLabel(event.status)}</span>
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
  )
}

export default EventCard