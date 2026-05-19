import { useNavigate } from "react-router-dom"
import { saveToken } from "../api/auth"

function LoginPage() {
  const navigate = useNavigate()

  function handleFakeLogin(role: string) {
    saveToken(`fake-token-${role}`)
    localStorage.setItem("role", role)

    if (role === "welfare_member") {
      navigate("/admin/events")
    } else if (role === "hr") {
      navigate("/admin/events")
    } else {
      navigate("/events")
    }
  }

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      gap: "16px"
    }}>
      <h1>企業活動訂票系統</h1>
      <p style={{ color: "#666" }}>（開發模式 - 選擇角色登入）</p>

      <div style={{ display: "flex", flexDirection: "column", gap: "12px", width: "300px" }}>
        <button
          onClick={() => handleFakeLogin("employee")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          以一般員工登入
        </button>
        <button
          onClick={() => handleFakeLogin("welfare_member")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          以福委會登入
        </button>
        <button
          onClick={() => handleFakeLogin("hr")}
          style={{ padding: "12px", fontSize: "16px", cursor: "pointer" }}
        >
          以 HR 登入
        </button>
      </div>
    </div>
  )
}

export default LoginPage