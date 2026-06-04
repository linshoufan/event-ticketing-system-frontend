// 從 CreateEventPage 的 handleSubmit 抽出來的純驗證邏輯
// 回傳錯誤訊息字串；通過驗證則回傳 null
export interface EventFormInput {
  name: string
  category: string
  location: string
  eventStartTime: string
  eventEndTime: string
  registrationStart: string
  registrationEnd: string
  cancellationDeadline: string
}

export function validateEventForm(form: EventFormInput): string | null {
  if (!form.name || !form.category || !form.location || !form.eventStartTime) {
    return "請填寫所有必填欄位"
  }
  if (form.eventEndTime && new Date(form.eventEndTime) <= new Date(form.eventStartTime)) {
    return "活動結束時間必須晚於開始時間"
  }
  if (
    form.registrationStart && form.registrationEnd &&
    new Date(form.registrationEnd) <= new Date(form.registrationStart)
  ) {
    return "報名截止時間必須晚於報名開始時間"
  }
  if (
    form.registrationEnd && form.eventStartTime &&
    new Date(form.registrationEnd) > new Date(form.eventStartTime)
  ) {
    return "報名截止時間不能晚於活動開始時間"
  }
  if (
    form.cancellationDeadline && form.eventStartTime &&
    new Date(form.cancellationDeadline) > new Date(form.eventStartTime)
  ) {
    return "取消截止時間不能晚於活動開始時間"
  }
  return null
}