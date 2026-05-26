import type { User } from "../types"
import { APP_CONFIG } from "../config/app.config"

const BASE_URL = APP_CONFIG.api.baseUrl

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
  
  // 🔽 === 這是模擬登入的假資料邏輯 === 🔽
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // 只要帳號不是空白，我們就當作登入成功 (方便你測試)
      // 你可以根據你在畫面上選擇的面版 (role) 給予對應的權限
      if (body.employeeId.trim() && body.password.trim()) {
        resolve({
          token: "mock-jwt-token-123456789",
          role: body.role || "employee" 
        })
      } else {
        // 觸發密碼錯誤的提示
        reject({ code: "INVALID_CREDENTIALS" })
      }
    }, 800) // 模擬網路延遲 0.8 秒
  })
  
  /* 
  // 🔼 等到未來後端 API 做好了，就把上面的 Promise 刪掉，並把下面的真實請求解除註解即可 🔼
  
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  })
  const json = await res.json()
  if (!res.ok) throw json.error
  return json.data
  */
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