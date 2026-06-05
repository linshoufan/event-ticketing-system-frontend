import type { Event } from "../types"

export type SortOption =
  | "recommended"
  | "popular"
  | "status_registering"
  | "status_waitlist"

// 注意：列表頁不依賴 event.remainingTickets（不是 atomic 的即時資料），
// 因此移除「依剩餘名額排序」與「已額滿」過濾。即時資料只在 detail 頁透過 eligibility 取得。
export function sortEvents(events: Event[], sort: SortOption): Event[] {
  const sorted = [...events]
  switch (sort) {
    case "popular":
      // 依「報名率」排序只用於相對順序，數字稍微 stale 不會誤導使用者下決策
      return sorted.sort((a, b) => {
        const aRate = a.ticketLimit ? (a.ticketLimit - a.remainingTickets) / a.ticketLimit : 0
        const bRate = b.ticketLimit ? (b.ticketLimit - b.remainingTickets) / b.ticketLimit : 0
        return bRate - aRate
      })
    case "status_registering":
      return sorted.filter(e => e.status === "registering")
    case "status_waitlist":
      return sorted.filter(e => e.status === "waitlist")
    case "recommended":
    default: {
      const userTags: string[] = JSON.parse(localStorage.getItem("userTags") ?? "[]")
      return sorted.sort((a, b) => {
        const aMatch = userTags.includes(a.category) ? 1 : 0
        const bMatch = userTags.includes(b.category) ? 1 : 0
        return bMatch - aMatch
      })
    }
  }
}