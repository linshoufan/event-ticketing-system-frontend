/**
 * 應用程式全域核心組態設定
 */
export const APP_CONFIG = {
  // API 端點配置
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL ?? "https://api.your-domain.com/v1",
  },
  
  // 安全與認證機制參數
  auth: {
    autoLogoutMinutes: 30, // 自動登出時限（分鐘）
    tokenKey: "token",
    roleKey: "role",
    expiryKey: "tokenExpiry",
  },
  
  // 開發與測試環境調校參數 (Mock 延遲)
  development: {
    mockDelayMs: 800,       // 列表載入延遲
    mockActionDelayMs: 500, // 按鈕操作延遲 (如報到、報名)
  }
} as const;