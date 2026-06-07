# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: raceCondition.spec.ts >> 高流量 / 競態條件 E2E 測試 >> 情境一：多人同時搶票 >> 3 人同時報名 ticketLimit=1，只有 1 人能 confirmed，其餘必須 waitlist 或 409
- Location: e2e\raceCondition.spec.ts:188:5

# Error details

```
TypeError: Failed to parse URL from cnticketsystem.xyz/account/v1/auth/login
```