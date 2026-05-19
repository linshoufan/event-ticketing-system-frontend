import type { User } from "../types"

const BASE_URL = "https://api.your-domain.com/v1"

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
  return json.data
}