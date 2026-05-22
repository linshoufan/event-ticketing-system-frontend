import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { saveToken } from "../api/auth"
import photo1 from "../assets/photo1.jpg"
import photo2 from "../assets/photo2.jpg"
import photo3 from "../assets/photo3.jpg"

const photos = [photo1, photo2, photo3]

function LoginPage() {
  const navigate = useNavigate()
  const [leaving, setLeaving] = useState(false)
  const [currentPhoto, setCurrentPhoto] = useState(0)
  const [fadeIn, setFadeIn] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeIn(false)
      setTimeout(() => {
        setCurrentPhoto(prev => (prev + 1) % photos.length)
        setFadeIn(true)
      }, 1500)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  function handleFakeLogin(role: string) {
    setLeaving(true)
    saveToken(`fake-token-${role}`)
    localStorage.setItem("role", role)

    setTimeout(() => {
      if (role === "welfare_member") {
        navigate("/admin/events")
      } else if (role === "hr") {
        navigate("/admin/hr")
      } else {
        navigate("/events")
      }
    }, 600)
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 overflow-hidden">

      {/* 背景照片 */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1500 ${fadeIn ? "opacity-100" : "opacity-0"}`}
        style={{ backgroundImage: `url(${photos[currentPhoto]})` }}
      />

      {/* 深色遮罩 */}
      <div className="absolute inset-0 bg-zinc-950/80" />

      {/* 內容 */}
      <div
        className={`relative z-10 w-full max-w-md transition-all duration-500 ${
          leaving ? "opacity-0 translate-y-[-40px]" : "opacity-100 translate-y-0"
        }`}
      >
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-zinc-800/80 backdrop-blur mb-6">
            <span className="text-3xl">🎫</span>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            企業活動訂票系統
          </h1>
          <p className="text-zinc-400 mt-2 text-sm">
            請選擇角色登入（開發模式）
          </p>
        </div>

        <div className="bg-zinc-900/80 backdrop-blur border border-zinc-800 rounded-2xl p-6 flex flex-col gap-3">
          <button
            onClick={() => handleFakeLogin("employee")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">👤</span>
            <div className="text-left">
              <p className="font-semibold">一般員工</p>
              <p className="text-zinc-400 text-xs">瀏覽活動、報名、查看票券</p>
            </div>
          </button>

          <button
            onClick={() => handleFakeLogin("welfare_member")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">⚙️</span>
            <div className="text-left">
              <p className="font-semibold">福委會</p>
              <p className="text-zinc-400 text-xs">管理活動、使用者、核銷票券</p>
            </div>
          </button>

          <button
            onClick={() => handleFakeLogin("hr")}
            className="w-full py-3 px-4 rounded-xl bg-zinc-800/80 hover:bg-zinc-700 text-white text-sm font-medium transition-colors flex items-center gap-3"
          >
            <span className="text-lg">📊</span>
            <div className="text-left">
              <p className="font-semibold">HR</p>
              <p className="text-zinc-400 text-xs">查看活動統計與報名數據</p>
            </div>
          </button>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-4">
          正式版本將使用 Google 帳號登入
        </p>
      </div>
    </div>
  )
}

export default LoginPage