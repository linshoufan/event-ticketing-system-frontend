import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom"
import { lazy, Suspense } from "react"
import * as Sentry from "@sentry/react"
import Navbar from "./components/Navbar"
import { useAutoLogout } from "./hooks/useAutoLogout"

const LoginPage = lazy(() => import("./pages/LoginPage"))
const OnboardingPage = lazy(() => import("./pages/OnboardingPage"))
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
const WelcomePage = lazy(() => import("./pages/WelcomePage"))

function getDefaultRoute(role: string | null): string {
  if (role === "welfare_member") return "/admin/events"
  if (role === "hr") return "/admin/hr"
  return "/events"
}

function PrivateRoute({
  children,
  roles,
}: {
  children: React.ReactNode
  roles?: string[]
}) {
  const token = localStorage.getItem("token")
  const role = localStorage.getItem("role")

  if (!token) return <Navigate to="/" replace />

  if (roles && (!role || !roles.includes(role))) {
    return <Navigate to={getDefaultRoute(role)} replace />
  }
  return <>{children}</>
}

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

  // onboarding 頁面隱藏 navbar，讓使用者專注在設定流程
  const hideNavbar =
    location.pathname === "/" ||
    location.pathname === "/auth/callback" ||
    location.pathname === "/onboarding"
    location.pathname === "/welcome"

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Suspense fallback={<div className="text-center py-16 text-zinc-500">載入中...</div>}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/auth/callback" element={<LoginPage />} />

          {/* 第一次登入的 onboarding 設定流程 */}
          <Route path="/onboarding" element={
            <PrivateRoute><OnboardingPage /></PrivateRoute>
          } />

          {/* 三種角色都看得到 */}
          <Route path="/events" element={
            <PrivateRoute><EventListPage /></PrivateRoute>
          } />
          <Route path="/events/:eventId" element={
            <PrivateRoute><EventDetailPage /></PrivateRoute>
          } />
          <Route path="/profile" element={
            <PrivateRoute><ProfilePage /></PrivateRoute>
          } />

          {/* 可以報名的角色：employee + hr */}
          <Route path="/my-transactions" element={
            <PrivateRoute roles={["employee", "hr"]}><MyTransactionsPage /></PrivateRoute>
          } />
          <Route path="/my-tickets" element={
            <PrivateRoute roles={["employee", "hr"]}><MyTicketsPage /></PrivateRoute>
          } />
          <Route path="/my-tickets/:ticketId" element={
            <PrivateRoute roles={["employee", "hr"]}><TicketDetailPage /></PrivateRoute>
          } />

          {/* 福委會專屬 */}
          <Route path="/admin/events" element={
            <PrivateRoute roles={["welfare_member"]}><EventManagePage /></PrivateRoute>
          } />
          <Route path="/admin/events/new" element={
            <PrivateRoute roles={["welfare_member"]}><CreateEventPage /></PrivateRoute>
          } />
          <Route path="/admin/events/:eventId/edit" element={
            <PrivateRoute roles={["welfare_member"]}><EditEventPage /></PrivateRoute>
          } />
          <Route path="/admin/events/:eventId/checkin" element={
            <PrivateRoute roles={["welfare_member"]}><CheckinPage /></PrivateRoute>
          } />
          <Route path="/admin/users" element={
            <PrivateRoute roles={["welfare_member"]}><UserManagePage /></PrivateRoute>
          } />
          <Route path="/welcome" element={
            <PrivateRoute roles={["welfare_member"]}><WelcomePage /></PrivateRoute>
          } />
          {/* 福委 + HR 共用 */}
          <Route path="/admin/events/:eventId/registrations" element={
            <PrivateRoute roles={["welfare_member", "hr"]}><RegistrationDetailPage /></PrivateRoute>
          } />
          <Route path="/admin/hr" element={
            <PrivateRoute roles={["welfare_member", "hr"]}><HRDashboardPage /></PrivateRoute>
          } />
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