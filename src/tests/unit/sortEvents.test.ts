import { describe, it, expect, beforeEach } from "vitest"
import { sortEvents } from "../../utils/sortEvents"
import type { Event } from "../../types"

function makeEvent(o: Partial<Event>): Event {
  return {
    eventId: "ev",
    name: "活動",
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
    remainingTickets: 10,
    cancellationDeadline: null,
    guestAllowed: false,
    guestCount: 0,
    updatedAt: "2025-05-18T10:00:00Z",
    isDraft: false,
    ...o,
  }
}

const registering1 = makeEvent({ eventId: "a", status: "registering", remainingTickets: 5,  ticketLimit: 50,  category: "sport" })
const registering2 = makeEvent({ eventId: "b", status: "registering", remainingTickets: 40, ticketLimit: 50,  category: "music" })
const waitlistEv   = makeEvent({ eventId: "c", status: "waitlist",    remainingTickets: 0,  ticketLimit: 100, category: "food" })
const endedEv      = makeEvent({ eventId: "d", status: "ended",       remainingTickets: 0,  ticketLimit: 30,  category: "travel" })

const all = [registering1, registering2, waitlistEv, endedEv]

describe("sortEvents", () => {
  beforeEach(() => localStorage.clear())

  it("status_registering：只留報名中", () => {
    const r = sortEvents(all, "status_registering")
    expect(r.map(e => e.eventId).sort()).toEqual(["a", "b"])
  })

  it("status_waitlist：只留候補", () => {
    const r = sortEvents(all, "status_waitlist")
    expect(r.map(e => e.eventId)).toEqual(["c"])
  })

  it("popular：依報名比例由高到低，且不過濾任何活動", () => {
    const r = sortEvents(all, "popular")
    expect(r.length).toBe(4)
    // c 報名比例 (100-0)/100 = 100% 最高
    expect(r[0].eventId).toBe("c")
  })

  it("recommended：符合 userTags 的類別排前面", () => {
    localStorage.setItem("userTags", JSON.stringify(["music"]))
    const r = sortEvents(all, "recommended")
    expect(r[0].category).toBe("music")
  })

  it("recommended：localStorage 沒設定時不報錯", () => {
    const r = sortEvents(all, "recommended")
    expect(r.length).toBe(4)
  })

  it("不會改動原始陣列（純函式）", () => {
    const snapshot = all.map(e => e.eventId)
    sortEvents(all, "status_registering")
    expect(all.map(e => e.eventId)).toEqual(snapshot)
  })
})