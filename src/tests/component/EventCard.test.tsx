import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import EventCard from "../../components/EventCard"
import type { Event } from "../../types"

const mockEvent: Event = {
  eventId: "ev_001",
  name: "夏日烤肉趴",
  description: "部門聯誼活動",
  category: "sport",
  location: "台北辦公室頂樓",
  latitude: 25.0478,
  longitude: 121.5319,
  checkinRadiusMeters: 200,
  eventStartTime: "2025-07-15T18:00:00Z",
  eventEndTime: "2025-07-15T22:00:00Z",
  registrationStart: "2025-06-01T00:00:00Z",
  registrationEnd: "2025-07-01T23:59:59Z",
  status: "registering",
  ticketLimit: 50,
  remainingTickets: 12,
  cancellationDeadline: "2025-07-10T00:00:00Z",
  guestAllowed: false,
  guestCount: 0,
  updatedAt: "2025-05-18T10:00:00Z",
  isDraft: false,
}

describe("EventCard", () => {
  it("應該顯示活動名稱", () => {
    render(<EventCard event={mockEvent} onClick={() => {}} />)
    expect(screen.getByText("夏日烤肉趴")).toBeInTheDocument()
  })

  it("應該顯示活動地點", () => {
    render(<EventCard event={mockEvent} onClick={() => {}} />)
    expect(screen.getByText("台北辦公室頂樓")).toBeInTheDocument()
  })

  it("registering 狀態應該顯示「報名中」", () => {
    render(<EventCard event={mockEvent} onClick={() => {}} />)
    expect(screen.getByTestId("event-status")).toHaveTextContent("報名中")
  })

  it("registering 狀態卡片 opacity 應該是 1", () => {
    render(<EventCard event={mockEvent} onClick={() => {}} />)
    const card = screen.getByTestId("event-card")
    expect(card).toHaveStyle({ opacity: 1 })
  })

  it("ended 狀態卡片 opacity 應該是 0.4", () => {
    const endedEvent = { ...mockEvent, status: "ended" as const }
    render(<EventCard event={endedEvent} onClick={() => {}} />)
    const card = screen.getByTestId("event-card")
    expect(card).toHaveStyle({ opacity: 0.4 })
  })

  it("not_open 狀態應該顯示「尚未開始報名」", () => {
    const notOpenEvent = { ...mockEvent, status: "not_open" as const }
    render(<EventCard event={notOpenEvent} onClick={() => {}} />)
    expect(screen.getByTestId("event-status")).toHaveTextContent("尚未開始報名")
  })

  it("有票數限制時應該顯示剩餘名額", () => {
    render(<EventCard event={mockEvent} onClick={() => {}} />)
    expect(screen.getByText("剩餘名額：12")).toBeInTheDocument()
  })

  it("沒有票數限制時不應該顯示剩餘名額", () => {
    const noLimitEvent = { ...mockEvent, ticketLimit: null }
    render(<EventCard event={noLimitEvent} onClick={() => {}} />)
    expect(screen.queryByText(/剩餘名額/)).not.toBeInTheDocument()
  })

  it("點擊卡片應該觸發 onClick", async () => {
    const handleClick = vi.fn()
    render(<EventCard event={mockEvent} onClick={handleClick} />)
    await userEvent.click(screen.getByTestId("event-card"))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})