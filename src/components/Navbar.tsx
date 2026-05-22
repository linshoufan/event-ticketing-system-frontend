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

  const mainPages = ["/events", "/admin/events", "/admin/hr", "/my-transactions", "/my-tickets", "/profile", "/admin/users"]
  const isMainPage = mainPages.some(p => location.pathname === p)

  const linkClass = (path: string) =>
    `px-3 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
      isActive(path)
        ? "bg-zinc-700 text-white"
        : "text-zinc-400 hover:text-white hover:bg-zinc-800"
    }`

  return (
    <nav className="sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">

        <div className="flex items-center gap-3">
          {!isMainPage && (
            <button
              onClick={() => window.history.back()}
              className="w-8 h-8 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors flex items-center justify-center text-sm"
            >
              ←
            </button>
          )}
          <span className="text-white font-semibold text-sm">
            企業活動訂票系統
          </span>
        </div>

        <div className="flex items-center gap-1">
          {role === "employee" && (
            <>
              <span className={linkClass("/events")} onClick={() => navigate("/events")}>活動列表</span>
              <span className={linkClass("/my-transactions")} onClick={() => navigate("/my-transactions")}>我的報名</span>
              <span className={linkClass("/my-tickets")} onClick={() => navigate("/my-tickets")}>我的票券</span>
            </>
          )}
          {role === "welfare_member" && (
            <>
              <span className={linkClass("/admin/events")} onClick={() => navigate("/admin/events")}>活動管理</span>
              <span className={linkClass("/admin/users")} onClick={() => navigate("/admin/users")}>使用者管理</span>
            </>
          )}
          {role === "hr" && (
            <>
              <span className={linkClass("/events")} onClick={() => navigate("/events")}>活動列表</span>
              <span className={linkClass("/admin/hr")} onClick={() => navigate("/admin/hr")}>統計報表</span>
            </>
          )}
          <span className={linkClass("/profile")} onClick={() => navigate("/profile")}>個人資料</span>

          <button
            onClick={handleLogout}
            className="ml-2 px-3 py-1.5 rounded-lg text-sm font-medium text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500 transition-colors"
          >
            登出
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar