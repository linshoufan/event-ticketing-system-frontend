import type { DietType } from "../types"

export function getDietLabel(diet: DietType): string {
  if (!diet) return "無需求"
  const map: Record<string, string> = {
    veg: "素食",
    "non-veg": "葷食",
  }
  return map[diet] ?? "無需求"
}

export function getDietEmoji(diet: DietType): string {
  if (!diet) return "🍽️"
  const map: Record<string, string> = {
    veg: "🥗",
    "non-veg": "🍖",
  }
  return map[diet] ?? "🍽️"
}

export function normalizeDiet(value: string): DietType {
  if (value === "veg" || value === "non-veg") return value
  return null
}