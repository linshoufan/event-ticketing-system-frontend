import { describe, it, expect } from "vitest"
import type { Role } from "../../types"

function getRoleLabel(role: Role): string {
  const map: Record<Role, string> = {
    welfare_member: "福委會",
    employee: "一般員工",
    hr: "HR",
  }
  return map[role]
}

function canManageEvents(role: Role): boolean {
  return role === "welfare_member"
}

function canViewStats(role: Role): boolean {
  return role === "hr" || role === "welfare_member"
}

function canRegister(role: Role): boolean {
  return role === "employee"
}

function canManageUsers(role: Role): boolean {
  return role === "welfare_member"
}

describe("getRoleLabel", () => {
  it("welfare_member 應該回傳「福委會」", () => {
    expect(getRoleLabel("welfare_member")).toBe("福委會")
  })

  it("employee 應該回傳「一般員工」", () => {
    expect(getRoleLabel("employee")).toBe("一般員工")
  })

  it("hr 應該回傳「HR」", () => {
    expect(getRoleLabel("hr")).toBe("HR")
  })
})

describe("canManageEvents", () => {
  it("welfare_member 可以管理活動", () => {
    expect(canManageEvents("welfare_member")).toBe(true)
  })

  it("employee 不能管理活動", () => {
    expect(canManageEvents("employee")).toBe(false)
  })

  it("hr 不能管理活動", () => {
    expect(canManageEvents("hr")).toBe(false)
  })
})

describe("canViewStats", () => {
  it("hr 可以查看統計", () => {
    expect(canViewStats("hr")).toBe(true)
  })

  it("welfare_member 可以查看統計", () => {
    expect(canViewStats("welfare_member")).toBe(true)
  })

  it("employee 不能查看統計", () => {
    expect(canViewStats("employee")).toBe(false)
  })
})

describe("canRegister", () => {
  it("employee 可以報名", () => {
    expect(canRegister("employee")).toBe(true)
  })

  it("welfare_member 不能報名", () => {
    expect(canRegister("welfare_member")).toBe(false)
  })

  it("hr 不能報名", () => {
    expect(canRegister("hr")).toBe(false)
  })
})

describe("canManageUsers", () => {
  it("welfare_member 可以管理使用者", () => {
    expect(canManageUsers("welfare_member")).toBe(true)
  })

  it("employee 不能管理使用者", () => {
    expect(canManageUsers("employee")).toBe(false)
  })

  it("hr 不能管理使用者", () => {
    expect(canManageUsers("hr")).toBe(false)
  })
})