import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { configDefaults } from 'vitest/config' // ?????

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    // ?? exclude????????????????? e2e ??
    exclude: [...configDefaults.exclude, 'e2e/*'],
  },
})