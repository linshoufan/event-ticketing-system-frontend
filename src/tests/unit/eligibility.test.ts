import { describe, it, expect } from "vitest"
import {
  canRegister,
  canWaitlist,
  getEligibilityMessage,
  getRemainingTicketsStatus,
  type Eligibility,
} from "../../utils/eligibility"

function makeEligibility(o: Partial<Eligibility> = {}): Eligibility {
  return {
    eligible: true,
    reason: null,
    remainingTickets: 12,
    isWaitlist: false,
    ...o,
  }
}

describe("canRegister", () => {
  it("eligible 且不是候補，可以報名", () => {
    expect(canRegister(makeEligibility())).toBe(true)
  })
  it("eligible 但是候補，不能直接報名", () => {
    expect(canRegister(makeEligibility({ isWaitlist: true, remainingTickets: 0 }))).toBe(false)
  })
  it("不 eligible，不能報名", () => {
    expect(canRegister(makeEligibility({ eligible: false, reason: "LOCKED" }))).toBe(false)
  })
})

describe("canWaitlist", () => {
  it("eligible 且是候補，可以加入候補", () => {
    expect(canWaitlist(makeEligibility({ isWaitlist: true, remainingTickets: 0 }))).toBe(true)
  })
  it("不 eligible，不能加入候補", () => {
    expect(canWaitlist(makeEligibility({ eligible: false, reason: "LOCKED", isWaitlist: false }))).toBe(false)
  })
  it("eligible 但不是候補，不能加入候補", () => {
    expect(canWaitlist(makeEligibility({ isWaitlist: false, remainingTickets: 5 }))).toBe(false)
  })
})

describe("getEligibilityMessage", () => {
  it("eligible 應該回傳空字串", () => {
    expect(getEligibilityMessage(makeEligibility())).toBe("")
  })
  it("LOCKED 應該回傳鎖定訊息", () => {
    expect(getEligibilityMessage(makeEligibility({
      eligible: false, reason: "LOCKED", unlockAt: "2025-06-18T00:00:00Z",
    }))).toBe("帳號已鎖定，解鎖時間：2025-06-18T00:00:00Z")
  })
  it("ALREADY_REGISTERED 應該回傳已報名訊息", () => {
    expect(getEligibilityMessage(makeEligibility({
      eligible: false, reason: "ALREADY_REGISTERED",
    }))).toBe("您已報名此活動")
  })
  it("NO_TICKETS 應該回傳名額已滿訊息", () => {
    expect(getEligibilityMessage(makeEligibility({
      eligible: false, reason: "NO_TICKETS", remainingTickets: 0,
    }))).toBe("名額已滿")
  })
  it("未知 reason 應該回傳預設訊息", () => {
    expect(getEligibilityMessage(makeEligibility({
      eligible: false, reason: "UNKNOWN",
    }))).toBe("無法報名")
  })
})

describe("getRemainingTicketsStatus", () => {
  it("名額為 0 應該回傳 full", () => {
    expect(getRemainingTicketsStatus(0, 50)).toBe("full")
  })
  it("名額不足 20% 應該回傳 limited", () => {
    expect(getRemainingTicketsStatus(5, 50)).toBe("limited")
  })
  it("名額充足應該回傳 plenty", () => {
    expect(getRemainingTicketsStatus(30, 50)).toBe("plenty")
  })
})