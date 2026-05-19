import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginPage from "./pages/LoginPage"
import EventListPage from "./pages/EventListPage"
import EventDetailPage from "./pages/EventDetailPage"
import MyTicketsPage from "./pages/MyTicketsPage"
import TicketDetailPage from "./pages/TicketDetailPage"
import EventManagePage from "./pages/admin/EventManagePage"
import RegistrationDetailPage from "./pages/admin/RegistrationDetailPage"
import UserManagePage from "./pages/admin/UserManagePage"
import CreateEventPage from "./pages/admin/CreateEventPage"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/auth/callback" element={<LoginPage />} />
        <Route path="/events" element={<EventListPage />} />
        <Route path="/events/:eventId" element={<EventDetailPage />} />
        <Route path="/my-tickets" element={<MyTicketsPage />} />
        <Route path="/my-tickets/:ticketId" element={<TicketDetailPage />} />
        <Route path="/admin/events" element={<EventManagePage />} />
        <Route path="/admin/events/new" element={<CreateEventPage />} />
        <Route path="/admin/events/:eventId/registrations" element={<RegistrationDetailPage />} />
        <Route path="/admin/users" element={<UserManagePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App