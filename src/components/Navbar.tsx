import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { removeToken } from "../api/auth"

function Navbar() {
  const navigate = useNavigate()
  const location = useLocation()
  const role = localStorage.getItem("role")
  const [leaving, setLeaving] = useState(false)

  if (!role) return null

  function handleLogout() {
    setLeaving(true)
    setTimeout(() => {
      removeToken()
      localStorage.removeItem("role")
      navigate("/")
    }, 400)
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

  const bottomLinkClass = (path: string) =>
    `flex flex-col items-center gap-0.5 text-xs font-medium transition-colors cursor-pointer py-1 ${
      isActive(path) ? "text-white" : "text-zinc-500"
    }`

  const employeeLinks = [
    { path: "/events", label: "活動" },
    { path: "/my-transactions", label: "報名" },
    { path: "/my-tickets", label: "票券" },
    { path: "/profile", label: "個人" },
  ]

  const welfareLinks = [
    { path: "/admin/events", label: "活動管理" },
    { path: "/admin/users", label: "使用者" },
    { path: "/profile", label: "個人" },
  ]

  const hrLinks = [
    { path: "/events", label: "活動" },
    { path: "/admin/hr", label: "統計" },
    { path: "/profile", label: "個人" },
  ]

  const links = role === "welfare_member" ? welfareLinks : role === "hr" ? hrLinks : employeeLinks

  return (
    <>
      {/* 桌面版頂部 Navbar */}
      <nav className={`hidden sm:block sticky top-0 z-50 bg-zinc-950/80 backdrop-blur border-b border-zinc-800 transition-all duration-400 ${leaving ? "opacity-0 -translate-y-2" : "opacity-100 translate-y-0"}`}>
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
            <span className="text-white font-semibold text-sm">企業活動訂票系統</span>
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

      {/* 手機版底部 Navbar */}
      <nav className={`sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-zinc-950/90 backdrop-blur border-t border-zinc-800 transition-all duration-400 ${leaving ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"}`}>
        <div className="flex items-center justify-around px-2 py-2">
          {links.map(link => (
            <span
              key={link.path}
              className={bottomLinkClass(link.path)}
              onClick={() => navigate(link.path)}
            >
              <div className={`w-6 h-0.5 rounded-full mb-1 transition-colors ${isActive(link.path) ? "bg-white" : "bg-transparent"}`} />
              {link.label}
            </span>
          ))}
          <span
            className="flex flex-col items-center gap-0.5 text-xs font-medium transition-colors cursor-pointer py-1 text-zinc-500 hover:text-red-400"
            onClick={handleLogout}
          >
            <div className="w-6 h-0.5 rounded-full mb-1 bg-transparent" />
            登出
          </span>
        </div>
      </nav>

      {/* 手機版底部留白，避免內容被 Navbar 蓋住 */}
      <div className="sm:hidden h-16" />
    </>
  )
}

export default Navbar