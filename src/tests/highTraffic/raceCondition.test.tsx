import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { vi, describe, it, expect, beforeEach } from "vitest"
import { MemoryRouter, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import EventDetailPage from "../../pages/EventDetailPage"

vi.mock("../../api/events", () => ({ getEventById: vi.fn() }))
vi.mock("../../api/transactions", () => ({
  checkEligibility: vi.fn(),
  createTransaction: vi.fn(),
}))

import { getEventById } from "../../api/events"
import { checkEligibility, createTransaction } from "../../api/transactions"

const mockEvent = {
  eventId: "ev_001",
  name: "夏日烤肉趴",
  description: "部門聯誼",
  category: "sport",
  location: "台北辦公室頂樓",
  latitude: 25.0478, longitude: 121.5319,
  checkinRadiusMeters: 200,
  eventStartTime: "2025-07-15T18:00:00Z",
  eventEndTime: "2025-07-15T22:00:00Z",
  registrationStart: "2025-06-01T00:00:00Z",
  registrationEnd: "2025-07-01T23:59:59Z",
  status: "registering" as const,
  ticketLimit: 1,        // ← 只剩一張票
  remainingTickets: 1,
  cancellationDeadline: "2025-07-10T00:00:00Z",
  guestAllowed: false, guestCount: 0,
  updatedAt: "2025-05-18T10:00:00Z",
  isDraft: false,
}

function renderPage() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,  // ← 加這個
      },
    },
  })
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["/events/ev_001"]}>
        <Routes>
          <Route path="/events/:eventId" element={<EventDetailPage />} />
        </Routes>
      </MemoryRouter>
    </QueryClientProvider>
  )
}

describe("票券競態條件", () => {
  beforeEach(() => {
    vi.mocked(getEventById).mockResolvedValue(mockEvent)
  })

  it("查詢時有票，送出時已被搶走（NO_TICKETS），顯示候補提示", async () => {
    const user = userEvent.setup()

    // 查詢時顯示還有 1 張票
    vi.mocked(checkEligibility).mockResolvedValue({
      eligible: true,
      reason: null,
      remainingTickets: 1,
      isWaitlist: false,
    })

    // 但送出時已被別人搶走
    vi.mocked(createTransaction).mockRejectedValue({ code: "NO_TICKETS" })

    renderPage()
    await waitFor(() => screen.getByText("立即報名"))

    // 使用者看到有票，點了報名
    await user.click(screen.getByText("立即報名"))
    await new Promise(resolve => setTimeout(resolve, 600))

    // 應該顯示候補提示，不是「報名失敗」
    await waitFor(() => {
      expect(screen.getByText(/名額.*候補/)).toBeInTheDocument()
    })
  })

  it("最後一張票被搶走後，eligibility 重新查詢會更新剩餘票數", async () => {
    const user = userEvent.setup()

    vi.mocked(checkEligibility)
      .mockResolvedValueOnce({
        eligible: true, reason: null,
        remainingTickets: 1, isWaitlist: false,
      })
      .mockResolvedValueOnce({
        // 第二次查詢（NO_TICKETS 後 refetch）票已經是 0
        eligible: true, reason: null,
        remainingTickets: 0, isWaitlist: true,
      })

    vi.mocked(createTransaction).mockRejectedValue({ code: "NO_TICKETS" })

    renderPage()
    await waitFor(() => screen.getByText("立即報名"))

    await user.click(screen.getByText("立即報名"))
    await new Promise(resolve => setTimeout(resolve, 600))

    // checkEligibility 要被呼叫兩次（初始 + refetch）
    await waitFor(() => {
      expect(vi.mocked(checkEligibility).mock.calls.length).toBeGreaterThanOrEqual(2)
    })
  })

  it("送出中按鈕 disabled，防止重複送出", async () => {
  const user = userEvent.setup()

  vi.mocked(checkEligibility).mockResolvedValue({
    eligible: true, reason: null,
    remainingTickets: 1, isWaitlist: false,
  })

  vi.mocked(createTransaction).mockImplementation(
    () => new Promise(resolve => setTimeout(() =>
      resolve({
        transactionId: "tx_001",
        status: "confirmed" as const,
        ticketId: "tk_001",
        waitlistNumber: null,
        registeredAt: new Date().toISOString(),
      }),
    2000))
  )

  renderPage()
  await waitFor(() => screen.getByText("立即報名"))

  await user.click(screen.getByText("立即報名"))
  await new Promise(resolve => setTimeout(resolve, 600))

  // 最重要的驗證：按鈕變 disabled，使用者看到「報名中...」
  await waitFor(() => {
    const button = screen.queryByText("報名中...")
    expect(button).not.toBeNull()
    expect(button).toBeDisabled()
  })
})
})