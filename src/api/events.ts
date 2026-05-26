import type { Event, PaginatedResponse } from "../types"
import { getAuthHeaders } from "./auth"
import { APP_CONFIG } from "../config/app.config"

const BASE_URL = APP_CONFIG.api.baseUrl

export async function getEvents(params?: {
  page?: number
  limit?: number
  keyword?: string
  category?: string
  status?: string
  startDate?: string
  endDate?: string
}): Promise<PaginatedResponse<Event>> {
  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(`${BASE_URL}/events?${query}`, {
    headers: getAuthHeaders(),
  })
  return res.json()
}

export async function getEventById(eventId: string): Promise<Event> {
  const res = await fetch(`${BASE_URL}/events/${eventId}`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return json.data
}

export async function createEvent(body: Partial<Event>): Promise<{
  eventId: string
  isDraft: boolean
  createdAt: string
}> {
  const res = await fetch(`${BASE_URL}/events`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  return json.data
}

export async function updateEvent(
  eventId: string,
  body: Partial<Event>
): Promise<{ updated: boolean; updatedAt: string }> {
  const res = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify(body),
  })
  const json = await res.json()
  return json.data
}

export async function deleteEvent(
  eventId: string
): Promise<{ deleted: boolean }> {
  const res = await fetch(`${BASE_URL}/events/${eventId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return json.data
}

export async function getEventRegistrations(
  eventId: string,
  params?: { page?: number; limit?: number; status?: string }
) {
  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(
    `${BASE_URL}/events/${eventId}/registrations?${query}`,
    { headers: getAuthHeaders() }
  )
  return res.json()
}

export async function checkEligibility(eventId: string) {
  const res = await fetch(`${BASE_URL}/events/${eventId}/eligibility`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return json.data
}