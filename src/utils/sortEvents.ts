import type { Event } from "../types"

export type SortOption =
  | "recommended"
  | "tickets_asc"
  | "tickets_desc"
  | "popular"
  | "status_registering"
  | "status_waitlist"
  | "status_full"

// 從 EventListPage 原封不動搬過來，行為完全一致
export function sortEvents(events: Event[], sort: SortOption): Event[] {
  const sorted = [...events]
  switch (sort) {
    case "tickets_asc":
      return sorted
        .filter(e => e.status === "registering")
        .sort((a, b) => (a.remainingTickets ?? 0) - (b.remainingTickets ?? 0))
    case "tickets_desc":
      return sorted
        .filter(e => e.status === "registering")
        .sort((a, b) => (b.remainingTickets ?? 0) - (a.remainingTickets ?? 0))
    case "popular":
      return sorted.sort((a, b) => {
        const aRate = a.ticketLimit ? (a.ticketLimit - a.remainingTickets) / a.ticketLimit : 0
        const bRate = b.ticketLimit ? (b.ticketLimit - b.remainingTickets) / b.ticketLimit : 0
        return bRate - aRate
      })
    case "status_registering":
      return sorted.filter(e => e.status === "registering")
    case "status_waitlist":
      return sorted.filter(e => e.status === "waitlist")
    case "status_full":
      return sorted.filter(e =>
        (e.status === "registering" || e.status === "waitlist") &&
        e.ticketLimit != null &&
        e.remainingTickets === 0
      )
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