import { useEffect } from "react"
import { getLoginUrl, handleCallback, saveToken } from "../api/auth"

function LoginPage() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const code = params.get("code")

    if (code) {
      handleCallback(code).then(({ token, role }) => {
        saveToken(token)
        if (role === "welfare_member") {
          window.location.href = "/admin/events"
        } else {
          window.location.href = "/events"
        }
      })
    }
  }, [])

  async function handleLogin() {
    const url = await getLoginUrl()
    window.location.href = url
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "24px"
    }}>
      <h1>企業活動訂票系統</h1>
      <button
        onClick={handleLogin}
        style={{
          padding: "12px 24px",
          fontSize: "16px",
          cursor: "pointer"
        }}
      >
        使用 Google 帳號登入
      </button>
    </div>
  )
}

export default LoginPage