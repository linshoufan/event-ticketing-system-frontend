export interface Eligibility {
  eligible: boolean
  reason: string | null
  remainingTickets: number
  isWaitlist: boolean
  unlockAt?: string | null
}

export function canRegister(eligibility: Eligibility): boolean {
  return eligibility.eligible && !eligibility.isWaitlist
}

export function canWaitlist(eligibility: Eligibility): boolean {
  return eligibility.eligible && eligibility.isWaitlist
}

export function getEligibilityMessage(eligibility: Eligibility): string {
  if (eligibility.eligible) return ""
  switch (eligibility.reason) {
    case "LOCKED":
      return `帳號已鎖定，解鎖時間：${eligibility.unlockAt}`
    case "ALREADY_REGISTERED":
      return "您已報名此活動"
    case "NO_TICKETS":
      return "名額已滿"
    default:
      return "無法報名"
  }
}

export function getRemainingTicketsStatus(
  remainingTickets: number,
  ticketLimit: number
): "plenty" | "limited" | "full" {
  if (remainingTickets === 0) return "full"
  if (remainingTickets / ticketLimit <= 0.2) return "limited"
  return "plenty"
}