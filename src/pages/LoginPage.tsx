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
      navigate("/admin/hr")
    } else {
      navigate("/events")
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800 mb-6">
            <span className="text-3xl">🎫</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            企業活動訂票系統
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            請選擇角色登入（開發模式）
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
          <button
            onClick={() => handleFakeLogin("employee")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">👤</span>
            <div className="text-left">
              <p className="font-semibold">一般員工</p>
              <p className="text-zinc-400 text-xs">瀏覽活動、報名、查看票券</p>
            </div>
          </button>

          <button
            onClick={() => handleFakeLogin("welfare_member")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">⚙️</span>
            <div className="text-left">
              <p className="font-semibold">福委會</p>
              <p className="text-zinc-400 text-xs">管理活動、使用者、核銷票券</p>
            </div>
          </button>

          <button
            onClick={() => handleFakeLogin("hr")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">📊</span>
            <div className="text-left">
              <p className="font-semibold">HR</p>
              <p className="text-zinc-400 text-xs">查看活動統計與報名數據</p>
            </div>
          </button>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          正式版本將使用 Google 帳號登入
        </p>
      </div>
    </div>
  )
}

export default LoginPage