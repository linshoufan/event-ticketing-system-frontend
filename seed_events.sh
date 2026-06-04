#!/bin/bash

# ============================
# 設定你的 API 網址
# ============================
ACCOUNT_URL="https://account-api-75541019693.asia-east1.run.app/v1"
EVENT_URL="https://event-api-75541019693.asia-east1.run.app/v1"

ADMIN_ID="welfare_001"
ADMIN_PW="password123"

# ============================
# 1. 登入取得 token
# ============================
echo "🔐 登入中..."
TOKEN=$(curl -s -X POST "$ACCOUNT_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d "{\"employeeId\": \"$ADMIN_ID\", \"password\": \"$ADMIN_PW\", \"role\": \"welfare_member\"}" \
  | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

if [ -z "$TOKEN" ]; then
  echo "❌ 登入失敗，請確認帳號密碼和 API 網址"
  exit 1
fi

echo "✅ 登入成功"

# ============================
# 建立活動的 function
# ============================
create_event() {
  local NAME=$1
  local BODY=$2
  echo "📅 建立活動：$NAME"
  curl -s -X POST "$EVENT_URL/events" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $TOKEN" \
    -d "$BODY" | grep -o '"eventId":"[^"]*"'
}

# ============================
# 2. 快滿的活動（剩 1 位）
# ============================
create_event "夏日 BBQ 同樂會（快滿）" '{
  "name": "夏日 BBQ 同樂會",
  "description": "年度最熱門的 BBQ 活動，名額即將額滿！",
  "category": "food",
  "location": "公司頂樓花園",
  "latitude": 25.0478,
  "longitude": 121.5319,
  "checkinRadiusMeters": 200,
  "eventStartTime": "2026-07-20T18:00:00Z",
  "eventEndTime": "2026-07-20T22:00:00Z",
  "registrationStart": "2026-06-01T00:00:00Z",
  "registrationEnd": "2026-07-15T23:59:59Z",
  "ticketLimit": 50,
  "cancellationDeadline": "2026-07-10T00:00:00Z",
  "isDraft": false
}'

# ============================
# 3. 過期的活動（已結束）
# ============================
create_event "2026 新春團拜（已結束）" '{
  "name": "2026 新春團拜",
  "description": "年度新春團拜活動，感謝大家的參與。",
  "category": "family",
  "location": "公司大會議室",
  "latitude": 25.0478,
  "longitude": 121.5319,
  "checkinRadiusMeters": 200,
  "eventStartTime": "2026-02-01T10:00:00Z",
  "eventEndTime": "2026-02-01T13:00:00Z",
  "registrationStart": "2026-01-10T00:00:00Z",
  "registrationEnd": "2026-01-28T23:59:59Z",
  "ticketLimit": 200,
  "cancellationDeadline": "2026-01-25T00:00:00Z",
  "isDraft": false
}'

create_event "冬季尾牙（已結束）" '{
  "name": "冬季尾牙",
  "description": "感謝今年大家的辛苦，一起吃尾牙慶祝！",
  "category": "food",
  "location": "台北君悅大飯店",
  "latitude": 25.0408,
  "longitude": 121.5676,
  "checkinRadiusMeters": 300,
  "eventStartTime": "2025-12-20T18:00:00Z",
  "eventEndTime": "2025-12-20T22:00:00Z",
  "registrationStart": "2025-11-20T00:00:00Z",
  "registrationEnd": "2025-12-15T23:59:59Z",
  "ticketLimit": 300,
  "cancellationDeadline": "2025-12-10T00:00:00Z",
  "isDraft": false
}'

# ============================
# 4. 報名人數多的熱門活動
# ============================
create_event "員工運動會（熱門）" '{
  "name": "2026 員工運動會",
  "description": "一年一度的全員運動會，今年主題是趣味競技！",
  "category": "sport",
  "location": "市立體育場",
  "latitude": 25.0478,
  "longitude": 121.5319,
  "checkinRadiusMeters": 500,
  "eventStartTime": "2026-09-05T09:00:00Z",
  "eventEndTime": "2026-09-05T17:00:00Z",
  "registrationStart": "2026-06-01T00:00:00Z",
  "registrationEnd": "2026-08-31T23:59:59Z",
  "ticketLimit": 500,
  "cancellationDeadline": "2026-08-25T00:00:00Z",
  "isDraft": false
}'

create_event "日本京都員工旅遊（熱門）" '{
  "name": "2026 日本京都員工旅遊",
  "description": "五天四夜京都奈良深度旅遊，名額有限，早報早得！",
  "category": "travel",
  "location": "日本京都",
  "latitude": 35.0116,
  "longitude": 135.7681,
  "checkinRadiusMeters": 1000,
  "eventStartTime": "2026-10-15T08:00:00Z",
  "eventEndTime": "2026-10-19T20:00:00Z",
  "registrationStart": "2026-06-01T00:00:00Z",
  "registrationEnd": "2026-08-31T23:59:59Z",
  "ticketLimit": 40,
  "cancellationDeadline": "2026-09-01T00:00:00Z",
  "isDraft": false
}'

echo ""
echo "🎉 全部活動建立完成！"
echo "⚠️  記得去後端手動調整「夏日 BBQ 同樂會」的 remainingTickets 為 1"