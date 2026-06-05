import { describe, it, expect } from "vitest"
import { getDietLabel, getDietEmoji, normalizeDiet } from "../../utils/diet"

describe("getDietLabel", () => {
  it("null 應該回傳「無需求」", () => {
    expect(getDietLabel(null)).toBe("無需求")
  })
  it("veg 應該回傳「素食」", () => {
    expect(getDietLabel("veg")).toBe("素食")
  })
  it("non-veg 應該回傳「葷食」", () => {
    expect(getDietLabel("non-veg")).toBe("葷食")
  })
})

describe("getDietEmoji", () => {
  it("null 應該回傳預設 emoji", () => {
    expect(getDietEmoji(null)).toBe("🍽️")
  })
  it("veg 應該回傳沙拉 emoji", () => {
    expect(getDietEmoji("veg")).toBe("🥗")
  })
  it("non-veg 應該回傳肉類 emoji", () => {
    expect(getDietEmoji("non-veg")).toBe("🍖")
  })
})

describe("normalizeDiet", () => {
  it("veg 應該回傳 veg", () => {
    expect(normalizeDiet("veg")).toBe("veg")
  })
  it("non-veg 應該回傳 non-veg", () => {
    expect(normalizeDiet("non-veg")).toBe("non-veg")
  })
  it("空字串應該回傳 null", () => {
    expect(normalizeDiet("")).toBe(null)
  })
  it("未知值應該回傳 null", () => {
    expect(normalizeDiet("unknown")).toBe(null)
  })
})