import type { Ticket } from "../types"
import { getAuthHeaders } from "./auth"
import { APP_CONFIG } from "../config/app.config"

const BASE_URL = APP_CONFIG.api.baseUrl

export async function getTickets(params?: {
  status?: "used" | "unused" | "invalid"
}): Promise<Ticket[]> {
  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(`${BASE_URL}/tickets?${query}`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return json.data
}

export async function getTicketById(ticketId: string): Promise<Ticket> {
  const res = await fetch(`${BASE_URL}/tickets/${ticketId}`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return json.data
}

export async function checkin(
  ticketId: string,
  coords: { latitude: number; longitude: number }
): Promise<{ checkedIn: boolean; checkedInAt: string }> {
  const res = await fetch(`${BASE_URL}/tickets/${ticketId}/checkin`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(coords),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
}

export async function getEventTickets(
  eventId: string,
  params?: {
    status?: "used" | "unused" | "invalid"
    page?: number
    limit?: number
  }
): Promise<{
  data: {
    summary: { used: number; unused: number; invalid: number }
    tickets: {
      ticketId: string
      userId: string
      username: string
      status: string
    }[]
  }
  pagination: { page: number; limit: number; total: number }
}> {
  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/tickets?${query}`,
    { headers: getAuthHeaders() }
  )
  return res.json()
}