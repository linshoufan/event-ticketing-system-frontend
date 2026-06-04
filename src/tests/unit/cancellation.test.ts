import { describe, it, expect } from "vitest"
import { canCancel } from "../../utils/cancellation"
import type { Transaction } from "../../types"

function makeTx(
  o: Partial<Transaction> & { cancellationDeadline?: string | null } = {}
): Transaction {
  return {
    transactionId: "tx",
    eventId: "ev",
    eventName: "活動",
    eventStartTime: "2025-12-31T10:00:00Z",
    status: "confirmed",
    waitlistNumber: null,
    guestCount: 0,
    dietType: null,
    selfDriving: false,
    registeredAt: "2025-01-01T00:00:00Z",
    ticketId: "tk",
    ...o,
  } as Transaction
}

const NOW = new Date("2025-06-01T00:00:00Z")

describe("canCancel", () => {
  it("非 confirmed 一律不可取消", () => {
    expect(canCancel(makeTx({ status: "waitlist" }), NOW)).toBe(false)
    expect(canCancel(makeTx({ status: "cancelled" }), NOW)).toBe(false)
  })

  it("有取消截止且尚未到期 → 可取消", () => {
    expect(canCancel(makeTx({ cancellationDeadline: "2025-07-01T00:00:00Z" }), NOW)).toBe(true)
  })

  it("有取消截止但已過期 → 不可取消（按鈕該變暗）", () => {
    expect(canCancel(makeTx({ cancellationDeadline: "2025-05-01T00:00:00Z" }), NOW)).toBe(false)
  })

  it("沒有取消截止時，改用活動開始時間判斷", () => {
    expect(canCancel(makeTx({ cancellationDeadline: null, eventStartTime: "2025-12-31T00:00:00Z" }), NOW)).toBe(true)
    expect(canCancel(makeTx({ cancellationDeadline: null, eventStartTime: "2025-03-01T00:00:00Z" }), NOW)).toBe(false)
  })
})