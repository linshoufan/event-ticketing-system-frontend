import { describe, it, expect } from "vitest"
import {
  getStatusLabel,
  getStatusColor,
  canCheckin,
  isExpired,
} from "../../utils/ticketStatus"

describe("getStatusLabel", () => {
  it("unused 應該回傳「可報到」", () => {
    expect(getStatusLabel("unused")).toBe("可報到")
  })
  it("used 應該回傳「已報到」", () => {
    expect(getStatusLabel("used")).toBe("已報到")
  })
  it("invalid 應該回傳「未開放」", () => {
    expect(getStatusLabel("invalid")).toBe("未開放")
  })
})

describe("getStatusColor", () => {
  it("unused 應該是綠色", () => {
    expect(getStatusColor("unused")).toBe("text-emerald-400")
  })
  it("used 應該是灰色", () => {
    expect(getStatusColor("used")).toBe("text-zinc-500")
  })
  it("invalid 應該是灰色", () => {
    expect(getStatusColor("invalid")).toBe("text-zinc-500")
  })
})

describe("canCheckin", () => {
  it("unused 且 checkinAvailable 為 true 才能報到", () => {
    expect(canCheckin("unused", true)).toBe(true)
  })
  it("unused 但 checkinAvailable 為 false 不能報到", () => {
    expect(canCheckin("unused", false)).toBe(false)
  })
  it("used 不能報到", () => {
    expect(canCheckin("used", true)).toBe(false)
  })
  it("invalid 不能報到", () => {
    expect(canCheckin("invalid", true)).toBe(false)
  })
})

describe("isExpired", () => {
  it("used 應該是已過期", () => {
    expect(isExpired("used")).toBe(true)
  })
  it("invalid 應該是已過期", () => {
    expect(isExpired("invalid")).toBe(true)
  })
  it("unused 不應該是已過期", () => {
    expect(isExpired("unused")).toBe(false)
  })
})