#!/bin/bash

ACCOUNT_URL="https://cnticketsystem.xyz/account/v1"
EVENT_URL="https://cnticketsystem.xyz/event/v1"

ADMIN_ID="welfare_001"
ADMIN_PW="password123"

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

# ... 後面 create_event function 跟那 5 個 create_event 呼叫整段保持原樣不動