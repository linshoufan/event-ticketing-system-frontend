import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
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
          <Route path="/events" element={<EventListPage />} />
          <Route path="/events/:eventId" element={<EventDetailPage />} />
          <Route path="/my-transactions" element={<MyTransactionsPage />} />
          <Route path="/my-tickets" element={<MyTicketsPage />} />
          <Route path="/my-tickets/:ticketId" element={<TicketDetailPage />} />
          <Route path="/admin/events" element={<EventManagePage />} />
          <Route path="/admin/events/new" element={<CreateEventPage />} />
          <Route path="/admin/events/:eventId/registrations" element={<RegistrationDetailPage />} />
          <Route path="/admin/events/:eventId/checkin" element={<CheckinPage />} />
          <Route path="/admin/users" element={<UserManagePage />} />
          <Route path="/admin/hr" element={<HRDashboardPage />} />
          <Route path="/profile" element={<ProfilePage />} />
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