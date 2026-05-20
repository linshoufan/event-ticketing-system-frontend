import { describe, it, expect } from "vitest"

interface Eligibility {
  eligible: boolean
  reason: string | null
  remainingTickets: number
  isWaitlist: boolean
  unlockAt?: string | null
}

function canRegister(eligibility: Eligibility) {
  return eligibility.eligible && !eligibility.isWaitlist
}

function canWaitlist(eligibility: Eligibility) {
  return eligibility.eligible && eligibility.isWaitlist
}

function getEligibilityMessage(eligibility: Eligibility): string {
  if (eligibility.eligible) return ""
  switch (eligibility.reason) {
    case "LOCKED":
      return `帳號已鎖定，解鎖時間：${eligibility.unlockAt}`
    case "ALREADY_REGISTERED":
      return "您已報名此活動"
    case "NO_TICKETS":
      return "名額已滿"
    default:
      return "無法報名"
  }
}

describe("canRegister", () => {
  it("eligible 且不是候補，可以報名", () => {
    expect(canRegister({
      eligible: true,
      reason: null,
      remainingTickets: 12,
      isWaitlist: false,
    })).toBe(true)
  })

  it("eligible 但是候補，不能直接報名", () => {
    expect(canRegister({
      eligible: true,
      reason: null,
      remainingTickets: 0,
      isWaitlist: true,
    })).toBe(false)
  })

  it("不 eligible，不能報名", () => {
    expect(canRegister({
      eligible: false,
      reason: "LOCKED",
      remainingTickets: 12,
      isWaitlist: false,
    })).toBe(false)
  })
})

describe("canWaitlist", () => {
  it("eligible 且是候補，可以加入候補", () => {
    expect(canWaitlist({
      eligible: true,
      reason: null,
      remainingTickets: 0,
      isWaitlist: true,
    })).toBe(true)
  })

  it("不 eligible，不能加入候補", () => {
    expect(canWaitlist({
      eligible: false,
      reason: "LOCKED",
      remainingTickets: 0,
      isWaitlist: false,
    })).toBe(false)
  })
})

describe("getEligibilityMessage", () => {
  it("eligible 應該回傳空字串", () => {
    expect(getEligibilityMessage({
      eligible: true,
      reason: null,
      remainingTickets: 12,
      isWaitlist: false,
    })).toBe("")
  })

  it("LOCKED 應該回傳鎖定訊息", () => {
    expect(getEligibilityMessage({
      eligible: false,
      reason: "LOCKED",
      remainingTickets: 12,
      isWaitlist: false,
      unlockAt: "2025-06-18T00:00:00Z",
    })).toBe("帳號已鎖定，解鎖時間：2025-06-18T00:00:00Z")
  })

  it("ALREADY_REGISTERED 應該回傳已報名訊息", () => {
    expect(getEligibilityMessage({
      eligible: false,
      reason: "ALREADY_REGISTERED",
      remainingTickets: 12,
      isWaitlist: false,
    })).toBe("您已報名此活動")
  })

  it("NO_TICKETS 應該回傳名額已滿訊息", () => {
    expect(getEligibilityMessage({
      eligible: false,
      reason: "NO_TICKETS",
      remainingTickets: 0,
      isWaitlist: false,
    })).toBe("名額已滿")
  })
})