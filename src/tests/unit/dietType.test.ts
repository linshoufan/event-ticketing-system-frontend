import { describe, it, expect } from "vitest"
import type { DietType } from "../../types"

function getDietLabel(diet: DietType): string {
  if (!diet) return "無需求"
  const map: Record<string, string> = {
    veg: "素食",
    "non-veg": "葷食",
  }
  return map[diet] ?? "無需求"
}

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