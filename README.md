# 企業活動訂票系統 — 前端

React + TypeScript + Vite 寫的訂票系統前端，串接三個後端服務（帳號、活動、交易）。

## 開始之前

Node.js 18 以上。

```bash
npm install
```

## 開發

```bash
npm run dev
```

預設跑在 `http://localhost:5173`。

開發時用 mock 資料，不需要起後端。測試帳號：

| 帳號 | 密碼 | 身份 |
|------|------|------|
| employee | 1234 | 一般員工 |
| admin | 1234 | 福委會 |
| hr | 1234 | HR |

## 環境變數

`.env.development` 已經設好 mock 模式，通常不需要動。

要串真實後端時，複製 `.env.development` 改成你的設定：

```bash
VITE_API_BASE_URL=https://你的後端網址/v1
VITE_USE_MOCK=false
```

`VITE_USE_MOCK=true` 的時候完全不打後端，改 `false` 才會真的發 API 請求。

## 測試

```bash
npx vitest run        # 跑一次
npx vitest            # watch 模式
```

目前有 127 個測試，包含：
- 元件測試（EventCard、Navbar）
- 單元測試（狀態邏輯、資格驗證）
- 高流量測試（防重複點擊、AbortController、409 錯誤處理）

## Build

```bash
npm run build
```

產出在 `dist/`，可以直接丟上靜態伺服器或 Vercel。

## 部署（Vercel）

1. 連結 GitHub repo
2. Framework 選 Vite
3. Build Command：`npm run build`
4. Output Directory：`dist`
5. 環境變數填 `VITE_API_BASE_URL` 和 `VITE_USE_MOCK=false`

## 專案結構

```
src/
  api/          # API 呼叫（auth、events、transactions、tickets、users）
  components/   # 共用元件（Navbar、Toast、Skeleton 等）
  hooks/        # Custom hooks（useDebounce、useToast、useAutoLogout）
  mock/         # Mock 資料
  pages/        # 頁面
    admin/      # 福委會後台（活動管理、核銷、使用者管理）
  tests/
    component/  # 元件測試
    unit/       # 單元測試
    highTraffic/# 高流量情境測試
  types/        # TypeScript 型別定義
```

## 角色權限

| 角色 | 可以做什麼 |
|------|-----------|
| employee | 瀏覽活動、報名、查票券 |
| welfare_member | 管理活動、核銷票券、管理使用者 |
| hr | 瀏覽活動、查看統計報表 |

## 注意事項

- 登入後 30 分鐘自動登出
- 報名按鈕有 500ms debounce，防止重複送出
- 所有 API 請求都有 AbortController，切換頁面時自動取消舊請求
- 搜尋框有 400ms debounce，避免每個字都打 API
