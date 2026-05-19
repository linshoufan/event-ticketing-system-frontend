import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

interface User {
  userId: string
  username: string
  role: string
  registrationStatus: "active" | "locked"
  unlockAt: string | null
}

const BASE_URL = "https://api.your-domain.com/v1"

function getToken() {
  return localStorage.getItem("token")
}

function getAuthHeaders(): HeadersInit {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  }
}

function UserManagePage() {
  const navigate = useNavigate()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [roleFilter, setRoleFilter] = useState("")
  const [statusFilter, setStatusFilter] = useState("")

  useEffect(() => {
    fetchUsers()
  }, [roleFilter, statusFilter])

  async function fetchUsers() {
    setLoading(true)
    const query = new URLSearchParams()
    if (roleFilter) query.set("role", roleFilter)
    if (statusFilter) query.set("status", statusFilter)
    const res = await fetch(`${BASE_URL}/users?${query}`, {
      headers: getAuthHeaders(),
    })
    const json = await res.json()
    setUsers(json.data)
    setLoading(false)
  }

  async function handleUnlock(userId: string) {
    if (!confirm("確定要解鎖這個使用者嗎？")) return
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}/unlock`, {
        method: "PATCH",
        headers: getAuthHeaders(),
      })
      if (!res.ok) throw new Error()
      setUsers(prev =>
        prev.map(u =>
          u.userId === userId
            ? { ...u, registrationStatus: "active", unlockAt: null }
            : u
        )
      )
    } catch {
      alert("解鎖失敗")
    }
  }

  async function handleChangeRole(userId: string, role: string) {
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}/role`, {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({ role }),
      })
      if (!res.ok) throw new Error()
      setUsers(prev =>
        prev.map(u => u.userId === userId ? { ...u, role } : u)
      )
    } catch {
      alert("變更角色失敗")
    }
  }

  async function handleDelete(userId: string) {
    if (!confirm("確定要刪除這個使用者嗎？")) return
    try {
      const res = await fetch(`${BASE_URL}/users/${userId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      })
      if (!res.ok) throw new Error()
      setUsers(prev => prev.filter(u => u.userId !== userId))
    } catch {
      alert("刪除失敗")
    }
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

      {loading ? (
        <p>載入中...</p>
      ) : users.length === 0 ? (
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
            {users.map(user => (
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