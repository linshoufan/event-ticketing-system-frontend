import { describe, it, expect } from "vitest"
import {
  getRoleLabel,
  canManageEvents,
  canViewStats,
  canRegister,
  canManageUsers,
  canCheckin,
  getDefaultRoute,
} from "../../utils/roles"

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
  it("null 應該回傳「一般員工」", () => {
    expect(getRoleLabel(null)).toBe("一般員工")
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

describe("canCheckin", () => {
  it("welfare_member 可以核銷票券", () => {
    expect(canCheckin("welfare_member")).toBe(true)
  })
  it("employee 不能核銷票券", () => {
    expect(canCheckin("employee")).toBe(false)
  })
  it("hr 不能核銷票券", () => {
    expect(canCheckin("hr")).toBe(false)
  })
})

describe("getDefaultRoute", () => {
  it("welfare_member 預設頁面應該是活動管理", () => {
    expect(getDefaultRoute("welfare_member")).toBe("/admin/events")
  })
  it("employee 預設頁面應該是活動列表", () => {
    expect(getDefaultRoute("employee")).toBe("/events")
  })
  it("hr 預設頁面應該是統計報表", () => {
    expect(getDefaultRoute("hr")).toBe("/admin/hr")
  })
})