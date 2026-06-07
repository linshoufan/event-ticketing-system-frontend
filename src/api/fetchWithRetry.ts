// src/api/fetchWithRetry.ts
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  retries = 3,
  baseDelay = 500
): Promise<Response> {
  const { signal } = options

  for (let i = 0; i < retries; i++) {
    // 每次重試前都檢查是否已被取消
    if (signal?.aborted) {
      throw new DOMException("Aborted", "AbortError")
    }

    try {
      const res = await fetch(url, options)
      // 4xx 直接回（不該 retry 商業邏輯錯誤）；5xx 才 retry
      if (res.status < 500) return res
      if (i === retries - 1) return res  // 最後一次直接回，讓上層自己處理
    } catch (err: any) {
      // 取消的話直接拋，不要 retry
      if (err?.name === "AbortError") throw err
      if (i === retries - 1) throw err
    }

    // 指數退避，可被 abort 中斷
    const wait = baseDelay * Math.pow(2, i)
    await new Promise<void>((resolve, reject) => {
      const timer = setTimeout(resolve, wait)
      signal?.addEventListener("abort", () => {
        clearTimeout(timer)
        reject(new DOMException("Aborted", "AbortError"))
      })
    })
  }

  throw new Error("Max retries reached")
}