import type { Transaction, PaginatedResponse } from "../types"
import { getAuthHeaders } from "./auth"

const BASE_URL = "https://api.your-domain.com/v1"

export async function getTransactions(params?: {
  page?: number
  limit?: number
  status?: "confirmed" | "waitlist" | "cancelled"
}): Promise<PaginatedResponse<Transaction>> {
  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(`${BASE_URL}/transactions?${query}`, {
    headers: getAuthHeaders(),
  })
  return res.json()
}

export async function createTransaction(body: {
  eventId: string
  guestCount: number
  dietType: "veg" | "non-veg" | "none"
  selfDriving: boolean
  saveAutofill: boolean
}): Promise<{
  transactionId: string
  status: "confirmed" | "waitlist"
  ticketId: string | null
  waitlistNumber: number | null
  registeredAt: string
}> {
  const res = await fetch(`${BASE_URL}/transactions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
}

export async function updateTransaction(
  transactionId: string,
  body: {
    guestCount?: number
    dietType?: "veg" | "non-veg" | "none"
    selfDriving?: boolean
  }
): Promise<{ updated: boolean; updatedAt: string }> {
  const res = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
}

export async function cancelTransaction(
  transactionId: string
): Promise<{ cancelled: boolean }> {
  const res = await fetch(`${BASE_URL}/transactions/${transactionId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
}