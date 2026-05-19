import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CATEGORIES = ["outdoor", "food", "music", "sports", "travel"]

const MOCK_PROFILE = {
  username: "john.doe",
  role: "employee",
  preferences: ["outdoor", "food"],
  registrationStatus: "active",
  unlockAt: null as string | null,
  autofill: {
    dietType: "non-veg" as "veg" | "non-veg" | "none",
    selfDriving: true,
  },
}

function ProfilePage() {
  const navigate = useNavigate()
  const role = localStorage.getItem("role")

  const [preferences, setPreferences] = useState<string[]>(MOCK_PROFILE.preferences)
  const [dietType, setDietType] = useState(MOCK_PROFILE.autofill.dietType)
  const [selfDriving, setSelfDriving] = useState(MOCK_PROFILE.autofill.selfDriving)
  const [saved, setSaved] = useState(false)

  function togglePreference(category: string) {
    setPreferences(prev =>
      prev.includes(category)
        ? prev.filter(p => p !== category)
        : [...prev, category]
    )
  }

  async function handleSave() {
    // 之後換成真的 API
    // await updateUser(userId, { preferences, autofill: { dietType, selfDriving } })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div style={{ maxWidth: "600px", margin: "0 auto", padding: "24px" }}>
      <h1>個人資料</h1>

      <div style={{
        padding: "16px",
        border: "1px solid #eee",
        borderRadius: "8px",
        marginBottom: "24px",
      }}>
        <p style={{ margin: "0 0 8px" }}>
          <span style={{ color: "#666", marginRight: "8px" }}>帳號：</span>
          {MOCK_PROFILE.username}
        </p>
        <p style={{ margin: "0 0 8px" }}>
          <span style={{ color: "#666", marginRight: "8px" }}>角色：</span>
          {role === "welfare_member" ? "福委會" : role === "hr" ? "HR" : "一般員工"}
        </p>
        <p style={{ margin: 0 }}>
          <span style={{ color: "#666", marginRight: "8px" }}>報名狀態：</span>
          {MOCK_PROFILE.registrationStatus === "active" ? (
            <span style={{ color: "green" }}>正常</span>
          ) : (
            <span style={{ color: "red" }}>
              鎖定中（解鎖時間：{new Date(MOCK_PROFILE.unlockAt!).toLocaleDateString("zh-TW")}）
            </span>
          )}
        </p>
      </div>

      <div style={{ marginBottom: "24px" }}>
        <h3 style={{ marginBottom: "12px" }}>活動偏好</h3>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "12px" }}>
          選擇你有興趣的活動類別，系統會優先推薦相關活動
        </p>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          {CATEGORIES.map(category => (
            <span
              key={category}
              onClick={() => togglePreference(category)}
              style={{
                padding: "6px 16px",
                borderRadius: "20px",
                cursor: "pointer",
                border: "1px solid",
                borderColor: preferences.includes(category) ? "white" : "#666",
                background: preferences.includes(category) ? "#333" : "transparent",
                color: preferences.includes(category) ? "white" : "#666",
                fontSize: "14px",
              }}
            >
              {category}
            </span>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: "32px" }}>
        <h3 style={{ marginBottom: "12px" }}>報名自動填入</h3>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "16px" }}>
          報名活動時自動帶入以下資料
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "6px", color: "#666", fontSize: "14px" }}>
              飲食需求
            </label>
            <select
              value={dietType}
              onChange={e => setDietType(e.target.value as any)}
              style={{ padding: "8px", width: "200px" }}
            >
              <option value="none">無需求</option>
              <option value="veg">素食</option>
              <option value="non-veg">葷食</option>
            </select>
          </div>

          <div>
            <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={selfDriving}
                onChange={e => setSelfDriving(e.target.checked)}
              />
              <span>自行開車</span>
            </label>
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 24px",
            background: "black",
            color: "white",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          儲存
        </button>
        {saved && (
          <span style={{ color: "green" }}>已儲存！</span>
        )}
      </div>
    </div>
  )
}

export default ProfilePage