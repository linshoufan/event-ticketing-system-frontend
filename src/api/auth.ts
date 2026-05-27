import type { User } from "../types"
import { APP_CONFIG } from "../config/app.config"

const BASE_URL = APP_CONFIG.api.baseUrl
const { useMock, mockDelayMs } = APP_CONFIG.development

const MOCK_ACCOUNTS = [
  { employeeId: "W001",    password: "1234", role: "welfare_member" },
  { employeeId: "E001", password: "1234", role: "employee" },
  { employeeId: "H001",       password: "1234", role: "hr" },
]

function getToken(): string | null {
  return localStorage.getItem("token")
}

export function saveToken(token: string): void {
  localStorage.setItem("token", token)
}

export function removeToken(): void {
  localStorage.removeItem("token")
}

export function getAuthHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

export async function login(body: {
  employeeId: string
  password: string
  role: string | null
}): Promise<{ token: string; role: string }> {
  if (useMock) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const account = MOCK_ACCOUNTS.find(
          a => a.employeeId === body.employeeId && a.password === body.password
        )
        if (account) {
          resolve({ token: "mock-jwt-token-123456789", role: body.role ?? account.role })
        } else {
          reject({ code: "INVALID_CREDENTIALS" })
        }
      }, mockDelayMs)
    })
  }

  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
}

export async function logout(): Promise<void> {
  if (useMock) {
    removeToken()
    return
  }

  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: getAuthHeaders(),
  })
  removeToken()
}

export async function getMe(): Promise<User> {
  if (useMock) {
    const { MOCK_USERS } = await import("../mock/users")
    return new Promise(resolve =>
      setTimeout(() => resolve(MOCK_USERS[0] as User), mockDelayMs)
    )
  }

  const res = await fetch(`${BASE_URL}/me`, {
    headers: getAuthHeaders(),
  })
  const json = await res.json()
  return {
    userId: json.data.userId,
    username: json.data.username,
    email: json.data.email,
    role: json.data.role,
    registrationStatus: json.data.registrationStatus,
    unlockAt: json.data.unlockAt,
    dietType: json.data.dietType,
    selfDriving: json.data.selfDriving,
    tags: json.data.tags ?? [],
    preferences: json.data.preferences ?? [],
  }
}

export async function getLoginUrl(): Promise<string> {
  const res = await fetch(`${BASE_URL}/auth/login`)
  const json = await res.json()
  return json.data.loginUrl
}

export async function handleCallback(code: string): Promise<{
  token: string
  role: string
}> {
  const res = await fetch(`${BASE_URL}/auth/callback?code=${code}`)
  const json = await res.json()
  return json.data
}