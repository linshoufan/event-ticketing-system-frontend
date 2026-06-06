import { useNavigate } from "react-router-dom"
import PageTransition from "../components/PageTransition"

function WelcomePage() {
  const navigate = useNavigate()

  return (
    <PageTransition>
      <div className="min-h-screen flex items-center justify-center px-6">
        <div className="text-center max-w-md">

          <div className="text-5xl mb-10">🎪</div>

          <blockquote className="text-xl sm:text-2xl font-light text-white leading-relaxed tracking-wide mb-4">
            「辦活動不是為了聚在一起，
            <br />
            而是為了讓心走得更近。」
          </blockquote>

          <p className="text-zinc-500 text-sm mb-12">歡迎加入福委會</p>

          <button
            onClick={() => navigate("/admin/events", { replace: true })}
            className="px-8 py-3 rounded-xl bg-white hover:bg-zinc-100 text-zinc-900 font-semibold transition-colors"
          >
            開始使用
          </button>

        </div>
      </div>
    </PageTransition>
  )
}

export default WelcomePage