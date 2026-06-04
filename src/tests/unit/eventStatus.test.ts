import { describe, it, expect } from "vitest"
import {
  getStatusConfig,
  getCategoryEmoji,
  isLowTicket,
  isFull,
} from "../../utils/eventStatus"
import type { Event } from "../../types"

function makeEvent(overrides: Partial<Event> = {}): Event {
  return {
    eventId: "ev_test",
    name: "測試活動",
    description: "",
    category: "sport",
    location: "台北",
    latitude: 25,
    longitude: 121,
    checkinRadiusMeters: 200,
    eventStartTime: "2025-07-15T18:00:00Z",
    eventEndTime: "2025-07-15T22:00:00Z",
    registrationStart: "2025-06-01T00:00:00Z",
    registrationEnd: "2025-07-01T23:59:59Z",
    status: "registering",
    ticketLimit: 50,
    remainingTickets: 12,
    cancellationDeadline: null,
    guestAllowed: false,
    guestCount: 0,
    updatedAt: "2025-05-18T10:00:00Z",
    isDraft: false,
    ...overrides,
  }
}

describe("getStatusConfig", () => {
  it("registering 顯示報名中且為綠色", () => {
    const c = getStatusConfig("registering")
    expect(c.label).toBe("報名中")
    expect(c.color).toBe("text-emerald-400")
  })

  it("not_open 顯示尚未開始報名", () => {
    expect(getStatusConfig("not_open").label).toBe("尚未開始報名")
  })

  it("ended 顯示活動結束", () => {
    expect(getStatusConfig("ended").label).toBe("活動結束")
  })

  it("未知狀態回傳原字串當 label，不會 crash", () => {
    const c = getStatusConfig("weird_status")
    expect(c.label).toBe("weird_status")
    expect(c.color).toBeTruthy()
    expect(c.bg).toBeTruthy()
  })
})

describe("getCategoryEmoji", () => {
  it("已知類別回傳對應 emoji", () => {
    expect(getCategoryEmoji("music")).toBe("🎵")
    expect(getCategoryEmoji("sport")).toBe("🏃")
  })

  it("未知類別回傳預設 emoji", () => {
    expect(getCategoryEmoji("nope")).toBe("📅")
  })
})

describe("isLowTicket", () => {
  it("剩餘不足 10% 為 true", () => {
    expect(isLowTicket(makeEvent({ ticketLimit: 50, remainingTickets: 4 }))).toBe(true)
  })

  it("剛好 10% 邊界不算低（< 不是 <=）", () => {
    expect(isLowTicket(makeEvent({ ticketLimit: 50, remainingTickets: 5 }))).toBe(false)
  })

  it("剩餘充足為 false", () => {
    expect(isLowTicket(makeEvent({ ticketLimit: 50, remainingTickets: 30 }))).toBe(false)
  })

  it("無票數限制為 false", () => {
    expect(isLowTicket(makeEvent({ ticketLimit: null, remainingTickets: 0 }))).toBe(false)
  })
})

describe("isFull", () => {
  it("剩餘 0 且有上限為 true", () => {
    expect(isFull(makeEvent({ ticketLimit: 50, remainingTickets: 0 }))).toBe(true)
  })

  it("還有剩餘為 false", () => {
    expect(isFull(makeEvent({ ticketLimit: 50, remainingTickets: 1 }))).toBe(false)
  })

  it("無上限即使剩 0 也為 false", () => {
    expect(isFull(makeEvent({ ticketLimit: null, remainingTickets: 0 }))).toBe(false)
  })
})