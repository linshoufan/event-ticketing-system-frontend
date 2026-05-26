import type { User } from "../types"

const BASE_URL = "https://api.your-domain.com/v1"
const IS_DEV = import.meta.env.DEV

// dev mock 帳號，正式環境不會跑到這段
const DEV_ACCOUNTS: Record<string, { password: string; role: string }> = {
  "E001": { password: "1234", role: "employee" },
  "W001": { password: "1234", role: "welfare_member" },
  "H001": { password: "1234", role: "hr" },
}

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
  // dev mock：不打真實 API
  if (IS_DEV) {
    await new Promise(r => setTimeout(r, 600)) // 模擬網路延遲

    const account = DEV_ACCOUNTS[body.employeeId]

    if (!account || account.password !== body.password) {
      throw { code: "INVALID_CREDENTIALS", message: "員工編號或密碼錯誤" }
    }

    if (body.role !== null && account.role !== body.role) {
      throw { code: "ROLE_MISMATCH", message: "角色不符" }
    }

    return {
      token: `dev-token-${account.role}`,
      role: account.role,
    }
  }

  // 正式環境
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
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

export async function logout(): Promise<void> {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: getAuthHeaders(),
  })
  removeToken()
}

export async function getMe(): Promise<User> {
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