import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createEvent } from "../../api/events"

const CATEGORIES = ["outdoor", "food", "music", "sports", "travel"]

function CreateEventPage() {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState("")

  const [form, setForm] = useState({
    name: "",
    description: "",
    category: "",
    location: "",
    latitude: "",
    longitude: "",
    checkinRadiusMeters: "200",
    eventStartTime: "",
    eventEndTime: "",
    registrationStart: "",
    registrationEnd: "",
    ticketLimit: "",
    cancellationDeadline: "",
    isDraft: true,
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  async function handleSubmit(isDraft: boolean) {
    if (!form.name || !form.category || !form.location || !form.eventStartTime) {
      setMessage("請填寫所有必填欄位")
      return
    }

    setSubmitting(true)
    try {
      await createEvent({
        name: form.name,
        description: form.description,
        category: form.category,
        location: form.location,
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
        checkinRadiusMeters: Number(form.checkinRadiusMeters),
        eventStartTime: new Date(form.eventStartTime).toISOString(),
        eventEndTime: new Date(form.eventEndTime).toISOString(),
        registrationStart: new Date(form.registrationStart).toISOString(),
        registrationEnd: new Date(form.registrationEnd).toISOString(),
        ticketLimit: form.ticketLimit ? Number(form.ticketLimit) : null,
        cancellationDeadline: form.cancellationDeadline
          ? new Date(form.cancellationDeadline).toISOString()
          : null,
        isDraft,
      })
      navigate("/admin/events")
    } catch {
      setMessage("建立失敗，請稍後再試")
    }
    setSubmitting(false)
  }

  const inputStyle = {
    width: "100%",
    padding: "8px",
    marginTop: "4px",
    boxSizing: "border-box" as const,
  }

  const labelStyle = {
    display: "block" as const,
    marginBottom: "16px",
  }

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto", padding: "24px" }}>
      <button onClick={() => navigate("/admin/events")}>← 返回活動管理</button>
      <h1 style={{ marginTop: "16px" }}>新增活動</h1>

      <div style={{ display: "flex", flexDirection: "column" as const }}>

        <label style={labelStyle}>
          活動名稱 *
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="活動名稱"
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          活動描述
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="活動描述"
            rows={3}
            style={inputStyle}
          />
        </label>

        <label style={labelStyle}>
          活動類別 *
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">請選擇類別</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </label>

        <label style={labelStyle}>
          活動地點 *
          <input
            name="location"
            value={form.location}
            onChange={handleChange}
            placeholder="活動地點"
            style={inputStyle}
          />
        </label>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <label style={{ flex: 1 }}>
            緯度
            <input
              name="latitude"
              value={form.latitude}
              onChange={handleChange}
              placeholder="25.0478"
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            經度
            <input
              name="longitude"
              value={form.longitude}
              onChange={handleChange}
              placeholder="121.5319"
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            報到範圍（公尺）
            <input
              name="checkinRadiusMeters"
              value={form.checkinRadiusMeters}
              onChange={handleChange}
              placeholder="200"
              style={inputStyle}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <label style={{ flex: 1 }}>
            活動開始時間 *
            <input
              type="datetime-local"
              name="eventStartTime"
              value={form.eventStartTime}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            活動結束時間
            <input
              type="datetime-local"
              name="eventEndTime"
              value={form.eventEndTime}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <label style={{ flex: 1 }}>
            報名開始時間
            <input
              type="datetime-local"
              name="registrationStart"
              value={form.registrationStart}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            報名截止時間
            <input
              type="datetime-local"
              name="registrationEnd"
              value={form.registrationEnd}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        </div>

        <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
          <label style={{ flex: 1 }}>
            票數限制（留空代表不限制）
            <input
              name="ticketLimit"
              value={form.ticketLimit}
              onChange={handleChange}
              placeholder="50"
              type="number"
              style={inputStyle}
            />
          </label>
          <label style={{ flex: 1 }}>
            取消截止時間（留空代表不可取消）
            <input
              type="datetime-local"
              name="cancellationDeadline"
              value={form.cancellationDeadline}
              onChange={handleChange}
              style={inputStyle}
            />
          </label>
        </div>

        {message && <p style={{ color: "red" }}>{message}</p>}

        <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
          <button
            onClick={() => handleSubmit(true)}
            disabled={submitting}
            style={{ flex: 1, padding: "12px" }}
          >
            儲存草稿
          </button>
          <button
            onClick={() => handleSubmit(false)}
            disabled={submitting}
            style={{
              flex: 1,
              padding: "12px",
              background: "black",
              color: "white",
              border: "none",
              cursor: "pointer"
            }}
          >
            直接發布
          </button>
        </div>
      </div>
    </div>
  )
}

export default CreateEventPage