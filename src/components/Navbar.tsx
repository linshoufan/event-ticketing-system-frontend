import { useNavigate, useLocation } from "react-router-dom"
import { removeToken } from "../api/auth"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = localStorage.getItem("role")

  if (!role) return null

  function handleLogout() {
    removeToken()
    localStorage.removeItem("role")
    navigate("/")
  }

  function isActive(path: string) {
    return location.pathname.startsWith(path)
  }

  const linkStyle = (path: string) => ({
    cursor: "pointer",
    padding: "8px 12px",
    borderRadius: "4px",
    background: isActive(path) ? "#333" : "transparent",
    color: "white",
    textDecoration: "none",
  })

  return (
    <nav style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "12px 24px",
      background: "#111",
      color: "white",
      position: "sticky",
      top: 0,
      zIndex: 100,
    }}>
      <span style={{ fontWeight: "bold", fontSize: "16px" }}>
        企業活動訂票系統
      </span>

      <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
        {role === "employee" && (
          <>
            <span
              style={linkStyle("/events")}
              onClick={() => navigate("/events")}
            >
              活動列表
            </span>
            <span
              style={linkStyle("/my-transactions")}
              onClick={() => navigate("/my-transactions")}
            >
              我的報名紀錄
            </span>
            <span
              style={linkStyle("/my-tickets")}
              onClick={() => navigate("/my-tickets")}
            >
              我的票券
            </span>
          </>
        )}

        {role === "welfare_member" && (
          <>
            <span
              style={linkStyle("/admin/events")}
              onClick={() => navigate("/admin/events")}
            >
              活動管理
            </span>
            <span
              style={linkStyle("/admin/users")}
              onClick={() => navigate("/admin/users")}
            >
              使用者管理
            </span>
          </>
        )}

        {role === "hr" && (
            <>
                <span
                style={linkStyle("/events")}
                onClick={() => navigate("/events")}
                >
                活動列表
                </span>
                <span
                style={linkStyle("/admin/hr")}
                onClick={() => navigate("/admin/hr")}
                >
                統計報表
                </span>
            </>
        )}
        <span
          style={linkStyle("/profile")}
          onClick={() => navigate("/profile")}
        >
          個人資料
        </span>
        <button
          onClick={handleLogout}
          style={{
            marginLeft: "16px",
            padding: "6px 14px",
            cursor: "pointer",
            background: "transparent",
            color: "white",
            border: "1px solid white",
            borderRadius: "4px",
          }}
        >
          登出
        </button>
      </div>
    </nav>
  )
}

export default Navbar