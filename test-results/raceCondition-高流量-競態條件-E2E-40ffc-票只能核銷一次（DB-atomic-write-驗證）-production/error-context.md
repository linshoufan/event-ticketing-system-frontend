# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: raceCondition.spec.ts >> 高流量 / 競態條件 E2E 測試 >> 情境二：多裝置同時核銷 >> 同一張票同時被 3 個裝置核銷，一票只能核銷一次（DB atomic write 驗證）
- Location: e2e\raceCondition.spec.ts:318:5

# Error details

```
TypeError: Failed to parse URL from cnticketsystem.xyz/account/v1/auth/login
```