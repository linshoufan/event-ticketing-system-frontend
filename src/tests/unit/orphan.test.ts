import { describe, it, expect } from "vitest"
import { isOrphanRecord } from "../../utils/orphan"

describe("isOrphanRecord", () => {
  it("正常活動名稱 → false", () => {
    expect(isOrphanRecord("夏日烤肉趴")).toBe(false)
    expect(isOrphanRecord("2026 員工運動會")).toBe(false)
  })

  it("Unknown Event → true", () => {
    expect(isOrphanRecord("Unknown Event")).toBe(true)
    expect(isOrphanRecord("unknown event")).toBe(true)
    expect(isOrphanRecord("UNKNOWN EVENT")).toBe(true)
  })

  it("包含 unknown 的變體 → true", () => {
    expect(isOrphanRecord("Unknown")).toBe(true)
    expect(isOrphanRecord("[Unknown] xxx")).toBe(true)
  })

  it("null / undefined / 空字串 → true", () => {
    expect(isOrphanRecord(null)).toBe(true)
    expect(isOrphanRecord(undefined)).toBe(true)
    expect(isOrphanRecord("")).toBe(true)
    expect(isOrphanRecord("   ")).toBe(true)
  })

  it("含 'unknown' 字樣但是正當名稱 → 也會被誤判（已知限制）", () => {
    expect(isOrphanRecord("Unknown Pleasures 樂團演唱會")).toBe(true)
  })
})