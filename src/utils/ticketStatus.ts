import type { TicketStatus } from "../types"

export interface TicketStatusConfig {
  label: string
  color: string
  bg: string
  dot: string
}

export const TICKET_STATUS_CONFIG: Record<TicketStatus, TicketStatusConfig> = {
  unused:  { label: "可報到", color: "text-emerald-400", bg: "bg-emerald-900/30", dot: "bg-emerald-400" },
  used:    { label: "已報到", color: "text-zinc-500",    bg: "bg-zinc-800",       dot: "bg-zinc-500" },
  invalid: { label: "未開放", color: "text-zinc-500",    bg: "bg-zinc-800",       dot: "bg-zinc-600" },
}

export function getStatusLabel(status: TicketStatus): string {
  return TICKET_STATUS_CONFIG[status].label
}

export function getStatusColor(status: TicketStatus): string {
  return TICKET_STATUS_CONFIG[status].color
}

export function canCheckin(status: TicketStatus, checkinAvailable: boolean): boolean {
  return status === "unused" && checkinAvailable
}

export function isExpired(status: TicketStatus): boolean {
  return status === "used" || status === "invalid"
}