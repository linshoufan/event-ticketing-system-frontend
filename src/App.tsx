import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import * as Sentry from "@sentry/react"
import Navbar from "./components/Navbar"
import { useAutoLogout } from "./hooks/useAutoLogout"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const EventListPage = lazy(() => import("./pages/EventListPage"))
const EventDetailPage = lazy(() => import("./pages/EventDetailPage"))
const MyTicketsPage = lazy(() => import("./pages/MyTicketsPage"))
const TicketDetailPage = lazy(() => import("./pages/TicketDetailPage"))
const MyTransactionsPage = lazy(() => import("./pages/MyTransactionsPage"))
const ProfilePage = lazy(() => import("./pages/ProfilePage"))
const EventManagePage = lazy(() => import("./pages/admin/EventManagePage"))
const RegistrationDetailPage = lazy(() => import("./pages/admin/RegistrationDetailPage"))
const UserManagePage = lazy(() => import("./pages/admin/UserManagePage"))
const CreateEventPage = lazy(() => import("./pages/admin/CreateEventPage"))
const CheckinPage = lazy(() => import("./pages/admin/CheckinPage"))
const HRDashboardPage = lazy(() => import("./pages/admin/HRDashboardPage"))
const EditEventPage = lazy(() => import("./pages/admin/EditEventPage"))

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const token = localStorage.getItem("token")
  if (!token) {
    return <Navigate to="/" replace />
  }
  return <>{children}</>
}
// 發生錯誤時的備用畫面
function ErrorFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-4xl mb-4">⚠️</p>
        <p className="text-white font-semibold mb-2">發生了一些問題</p>
        <p className="text-zinc-400 text-sm mb-6">錯誤已自動回報，請重新整理頁面</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-xl bg-white text-zinc-900 font-medium text-sm"
        >
          重新整理
        </button>
      </div>
    </div>
  )
}

function Layout() {
  const location = useLocation()
  useAutoLogout()

  const hideNavbar = location.pathname === "/" || location.pathname === "/auth/callback"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={<div className="text-center py-16 text-zinc-500">載入中...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/callback" element={<LoginPage />} />

          {/* 以下都需要登入 */}
          <Route path="/events" element={<PrivateRoute><EventListPage /></PrivateRoute>} />
          <Route path="/events/:eventId" element={<PrivateRoute><EventDetailPage /></PrivateRoute>} />
          <Route path="/my-transactions" element={<PrivateRoute><MyTransactionsPage /></PrivateRoute>} />
          <Route path="/my-tickets" element={<PrivateRoute><MyTicketsPage /></PrivateRoute>} />
          <Route path="/my-tickets/:ticketId" element={<PrivateRoute><TicketDetailPage /></PrivateRoute>} />
          <Route path="/admin/events" element={<PrivateRoute><EventManagePage /></PrivateRoute>} />
          <Route path="/admin/events/new" element={<PrivateRoute><CreateEventPage /></PrivateRoute>} />
          <Route path="/admin/events/:eventId/edit" element={<PrivateRoute><EditEventPage /></PrivateRoute>} />
          <Route path="/admin/events/:eventId/registrations" element={<PrivateRoute><RegistrationDetailPage /></PrivateRoute>} />
          <Route path="/admin/events/:eventId/checkin" element={<PrivateRoute><CheckinPage /></PrivateRoute>} />
          <Route path="/admin/users" element={<PrivateRoute><UserManagePage /></PrivateRoute>} />
          <Route path="/admin/hr" element={<PrivateRoute><HRDashboardPage /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><ProfilePage /></PrivateRoute>} />
        </Routes>
      </Suspense>
    </>
  )
}

function App() {
  return (
    <Sentry.ErrorBoundary fallback={<ErrorFallback />}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </Sentry.ErrorBoundary>
  )
}

export default Sentry.withProfiler(App)