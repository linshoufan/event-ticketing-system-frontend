import type { Notification } from "../types"
import { getAuthHeaders } from "./auth"
import { APP_CONFIG } from "../config/app.config"

const BASE_URL = APP_CONFIG.api.accountUrl
const { useMock, mockDelayMs } = APP_CONFIG.development

function delay<T>(data: T, ms: number = mockDelayMs, signal?: AbortSignal): Promise<T> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) { reject(new DOMException("Aborted", "AbortError")); return }
    const timer = setTimeout(() => resolve(data), ms)
    signal?.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")) })
  })
}

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    notificationId: "nf_001",
    type: "REGISTRATION_SUCCESS",
    title: "報名成功",
    message: "您已成功報名「夏日烤肉趴」",
    eventId: "ev_001",
    read: false,
    createdAt: new Date(Date.now() - 5 * 60000).toISOString(),
  },
  {
    notificationId: "nf_002",
    type: "WAITLIST_PROMOTED",
    title: "候補升為正取",
    message: "您在「員工家庭日」的候補已升為正取，請確認票券",
    eventId: "ev_003",
    read: false,
    createdAt: new Date(Date.now() - 2 * 3600000).toISOString(),
  },
  {
    notificationId: "nf_003",
    type: "ACCOUNT_LOCKED",
    title: "帳號已被鎖定",
    message: "因未出席活動，帳號已被鎖定至 2026-07-01",
    eventId: "ev_001",
    read: true,
    createdAt: new Date(Date.now() - 24 * 3600000).toISOString(),
  },
]

export async function getNotifications(
  params?: { read?: boolean; page?: number; limit?: number },
  signal?: AbortSignal
): Promise<{ data: Notification[]; pagination: { page: number; limit: number; total: number } }> {
  if (useMock) {
    return delay(
      { data: MOCK_NOTIFICATIONS, pagination: { page: 1, limit: 20, total: MOCK_NOTIFICATIONS.length } },
      mockDelayMs,
      signal
    )
  }

  const query = new URLSearchParams(
    Object.entries(params ?? {})
      .filter(([, v]) => v !== undefined)
      .map(([k, v]) => [k, String(v)])
  )
  const res = await fetch(`${BASE_URL}/notifications?${query}`, {
    headers: getAuthHeaders(),
    signal,
  })
  const json = await res.json()
  return json
}

export async function markNotificationRead(notificationId: string): Promise<void> {
  if (useMock) return
  await fetch(`${BASE_URL}/notifications/${notificationId}`, {
    method: "PATCH",
    headers: getAuthHeaders(),
    body: JSON.stringify({ read: true }),
  })
}

export async function markAllNotificationsRead(): Promise<void> {
  if (useMock) return
  await fetch(`${BASE_URL}/notifications/read-all`, {
    method: "PATCH",
    headers: getAuthHeaders(),
  })
}