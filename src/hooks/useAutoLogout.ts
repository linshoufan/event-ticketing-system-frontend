import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { removeToken } from "../api/auth"

const AUTO_LOGOUT_MINUTES = 30

export function saveLoginTime() {
  const expiry = Date.now() + AUTO_LOGOUT_MINUTES * 60 * 1000
  localStorage.setItem("tokenExpiry", String(expiry))
}

export function clearLoginTime() {
  localStorage.removeItem("tokenExpiry")
}

export function isTokenExpired(): boolean {
  const expiry = localStorage.getItem("tokenExpiry")
  if (!expiry) return false
  return Date.now() > Number(expiry)
}

export function useAutoLogout() {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return

    // 進頁面時先檢查一次有沒有過期
    if (isTokenExpired()) {
      handleLogout()
      return
    }

    const expiry = localStorage.getItem("tokenExpiry")
    if (!expiry) return

    const remaining = Number(expiry) - Date.now()

    const timer = setTimeout(() => {
      handleLogout()
    }, remaining)

    return () => clearTimeout(timer)

    function handleLogout() {
      removeToken()
      localStorage.removeItem("role")
      clearLoginTime()
      navigate("/", { replace: true })
    }
  }, [navigate])
}