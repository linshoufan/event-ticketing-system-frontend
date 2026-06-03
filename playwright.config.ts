import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./e2e",
  timeout: 30000,
  use: {
    headless: true,
    screenshot: "only-on-failure",
  },
  projects: [
    {
      name: "mock",
      use: {
        baseURL: "http://localhost:5173",
      },
    },
    {
      name: "production",
      use: {
        baseURL: "https://event-ticketing-system-frontend-eight.vercel.app",
      },
    },
  ],
})