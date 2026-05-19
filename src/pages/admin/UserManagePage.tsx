import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MOCK_USERS } from "../../mock/users"

type UserStatus = "active" | "locked"

interface User {
  userId: string
  username: string
  role: string
  registrationStatus: UserStatus
  unlockAt: string | null
}

function UserManagePage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>(MOCK_USERS)
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  const filtered = users.filter(u => {
    if (roleFilter && u.role !== roleFilter) return false
    if (statusFilter && u.registrationStatus !== statusFilter) return false
    return true
  })

  function handleUnlock(userId: string) {
    if (!confirm("確定要解鎖這個使用者嗎？")) return
    // 之後換成真的 API
    setUsers(prev =>
      prev.map(u =>
        u.userId === userId
          ? { ...u, registrationStatus: "active" as UserStatus, unlockAt: null }
          : u
      )
    )
  }

  function handleChangeRole(userId: string, role: string) {
    // 之後換成真的 API
    setUsers(prev =>
      prev.map(u => u.userId === userId ? { ...u, role } : u)
    )
  }

  function handleDelete(userId: string) {
    if (!confirm("確定要刪除這個使用者嗎？")) return
    // 之後換成真的 API
    setUsers(prev => prev.filter(u => u.userId !== userId))
  }

  function getRoleLabel(role: string) {
    const map: Record<string, string> = {
      welfare_member: "福委會",
      employee: "一般員工",
      hr: "HR",
    }
    return map[role] ?? role
  }

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto", padding: "24px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>使用者管理</h1>
        <button onClick={() => navigate("/admin/events")}>活動管理</button>
      </div>

      <div style={{ display: "flex", gap: "12px", margin: "16px 0" }}>
        <select
          value={roleFilter}
          onChange={e => setRoleFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">所有角色</option>
          <option value="welfare_member">福委會</option>
          <option value="employee">一般員工</option>
          <option value="hr">HR</option>
        </select>
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          style={{ padding: "8px" }}
        >
          <option value="">所有狀態</option>
          <option value="active">正常</option>
          <option value="locked">鎖定中</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <p>沒有使用者</p>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #ccc" }}>
              <th style={{ textAlign: "left", padding: "8px" }}>帳號</th>
              <th style={{ textAlign: "left", padding: "8px" }}>角色</th>
              <th style={{ textAlign: "left", padding: "8px" }}>狀態</th>
              <th style={{ textAlign: "left", padding: "8px" }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(user => (
              <tr key={user.userId} style={{ borderBottom: "1px solid #eee" }}>
                <td style={{ padding: "8px" }}>{user.username}</td>
                <td style={{ padding: "8px" }}>
                  <select
                    value={user.role}
                    onChange={e => handleChangeRole(user.userId, e.target.value)}
                    style={{ padding: "4px" }}
                  >
                    <option value="welfare_member">福委會</option>
                    <option value="employee">一般員工</option>
                    <option value="hr">HR</option>
                  </select>
                </td>
                <td style={{ padding: "8px" }}>
                  {user.registrationStatus === "locked" ? (
                    <span style={{ color: "red" }}>
                      鎖定中
                      {user.unlockAt && (
                        <span style={{ fontSize: "12px", marginLeft: "4px", color: "#666" }}>
                          （{new Date(user.unlockAt).toLocaleDateString("zh-TW")} 解鎖）
                        </span>
                      )}
                    </span>
                  ) : (
                    <span style={{ color: "green" }}>正常</span>
                  )}
                </td>
                <td style={{ padding: "8px", display: "flex", gap: "8px" }}>
                  {user.registrationStatus === "locked" && (
                    <button onClick={() => handleUnlock(user.userId)}>
                      解鎖
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(user.userId)}
                    style={{ color: "red" }}
                  >
                    刪除
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default UserManagePage