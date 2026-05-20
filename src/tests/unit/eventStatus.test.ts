import { describe, it, expect } from "vitest"

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

function isActive(status: string) {
  return status === "registering"
}

describe("getStatusLabel", () => {
  it("應該回傳「報名中」", () => {
    expect(getStatusLabel("registering")).toBe("報名中")
  })

  it("應該回傳「尚未開始報名」", () => {
    expect(getStatusLabel("not_open")).toBe("尚未開始報名")
  })

  it("應該回傳「候補登記」", () => {
    expect(getStatusLabel("waitlist")).toBe("候補登記")
  })

  it("應該回傳「報名截止」", () => {
    expect(getStatusLabel("closed")).toBe("報名截止")
  })

  it("應該回傳「活動結束」", () => {
    expect(getStatusLabel("ended")).toBe("活動結束")
  })

  it("未知狀態應該直接回傳原始值", () => {
    expect(getStatusLabel("unknown")).toBe("unknown")
  })
})

describe("isActive", () => {
  it("registering 應該是 active", () => {
    expect(isActive("registering")).toBe(true)
  })

  it("ended 不應該是 active", () => {
    expect(isActive("ended")).toBe(false)
  })

  it("not_open 不應該是 active", () => {
    expect(isActive("not_open")).toBe(false)
  })
})