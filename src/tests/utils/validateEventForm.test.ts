import { describe, it, expect } from "vitest"
import { validateEventForm, type EventFormInput } from "../../utils/validateEventForm"

function makeForm(o: Partial<EventFormInput> = {}): EventFormInput {
  return {
    name: "活動",
    category: "sport",
    location: "台北",
    eventStartTime: "2026-07-20T18:00",
    eventEndTime: "2026-07-20T22:00",
    registrationStart: "2026-06-01T00:00",
    registrationEnd: "2026-07-15T23:59",
    cancellationDeadline: "2026-07-10T00:00",
    ...o,
  }
}

describe("validateEventForm", () => {
  it("全部合法回傳 null", () => {
    expect(validateEventForm(makeForm())).toBeNull()
  })

  it("缺活動名稱 → 必填欄位錯誤", () => {
    expect(validateEventForm(makeForm({ name: "" }))).toBe("請填寫所有必填欄位")
  })

  it("缺類別 → 必填欄位錯誤", () => {
    expect(validateEventForm(makeForm({ category: "" }))).toBe("請填寫所有必填欄位")
  })

  it("缺地點 → 必填欄位錯誤", () => {
    expect(validateEventForm(makeForm({ location: "" }))).toBe("請填寫所有必填欄位")
  })

  it("缺活動開始時間 → 必填欄位錯誤", () => {
    expect(validateEventForm(makeForm({ eventStartTime: "" }))).toBe("請填寫所有必填欄位")
  })

  it("結束時間早於開始 → 錯誤", () => {
    expect(validateEventForm(makeForm({ eventEndTime: "2026-07-20T17:00" })))
      .toBe("活動結束時間必須晚於開始時間")
  })

  it("結束時間等於開始 → 錯誤（必須晚於，不能相等）", () => {
    expect(validateEventForm(makeForm({ eventEndTime: "2026-07-20T18:00" })))
      .toBe("活動結束時間必須晚於開始時間")
  })

  it("報名截止早於報名開始 → 錯誤", () => {
    expect(validateEventForm(makeForm({
      registrationStart: "2026-07-01T00:00",
      registrationEnd: "2026-06-01T00:00",
    }))).toBe("報名截止時間必須晚於報名開始時間")
  })

  it("報名截止晚於活動結束 → 錯誤", () => {
    expect(validateEventForm(makeForm({
      registrationEnd: "2026-07-25T00:00",
    }))).toBe("報名截止時間不能晚於活動結束時間")
  })

  it("取消截止晚於活動開始 → 錯誤", () => {
    expect(validateEventForm(makeForm({
      cancellationDeadline: "2026-07-25T00:00",
    }))).toBe("取消截止時間不能晚於活動開始時間")
  })

  it("選填的時間全部留空時不檢查（只要必填齊全就通過）", () => {
    expect(validateEventForm(makeForm({
      eventEndTime: "",
      registrationStart: "",
      registrationEnd: "",
      cancellationDeadline: "",
    }))).toBeNull()
  })

  it("必填檢查優先於時間順序檢查", () => {
    // 名稱缺 + 結束早於開始：應先回必填錯誤
    expect(validateEventForm(makeForm({
      name: "",
      eventEndTime: "2026-07-20T17:00",
    }))).toBe("請填寫所有必填欄位")
  })
})