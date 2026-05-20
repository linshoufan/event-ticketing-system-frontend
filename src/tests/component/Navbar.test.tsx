import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom"
import Navbar from "../../components/Navbar"

function renderNavbar(role: string) {
  localStorage.setItem("role", role)
  return render(
    <MemoryRouter>
      <Navbar />
    </MemoryRouter>
  )
}

describe("Navbar", () => {
  it("employee 應該看到活動列表", () => {
    renderNavbar("employee")
    expect(screen.getByText("活動列表")).toBeInTheDocument()
  })

  it("employee 應該看到我的報名紀錄", () => {
    renderNavbar("employee")
    expect(screen.getByText("我的報名紀錄")).toBeInTheDocument()
  })

  it("employee 應該看到我的票券", () => {
    renderNavbar("employee")
    expect(screen.getByText("我的票券")).toBeInTheDocument()
  })

  it("welfare_member 應該看到活動管理", () => {
    renderNavbar("welfare_member")
    expect(screen.getByText("活動管理")).toBeInTheDocument()
  })

  it("welfare_member 應該看到使用者管理", () => {
    renderNavbar("welfare_member")
    expect(screen.getByText("使用者管理")).toBeInTheDocument()
  })

  it("welfare_member 不應該看到活動列表", () => {
    renderNavbar("welfare_member")
    expect(screen.queryByText("活動列表")).not.toBeInTheDocument()
  })

  it("hr 應該看到統計報表", () => {
    renderNavbar("hr")
    expect(screen.getByText("統計報表")).toBeInTheDocument()
  })

  it("hr 不應該看到活動管理", () => {
    renderNavbar("hr")
    expect(screen.queryByText("活動管理")).not.toBeInTheDocument()
  })

  it("所有角色都應該看到登出按鈕", () => {
    renderNavbar("employee")
    expect(screen.getByText("登出")).toBeInTheDocument()
  })

  it("所有角色都應該看到個人資料", () => {
    renderNavbar("employee")
    expect(screen.getByText("個人資料")).toBeInTheDocument()
  })
})