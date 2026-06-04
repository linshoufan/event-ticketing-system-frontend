import type { Transaction } from "../types"

// 從 MyTransactionsPage 搬出來，多了一個 now 參數方便測試（預設為現在）
// 注意：cancellationDeadline 目前不在 Transaction 型別裡，後端補上後這裡就會自動生效
export function canCancel(t: Transaction, now: Date = new Date()): boolean {
  if (t.status !== "confirmed") return false
  const deadline = (t as { cancellationDeadline?: string | null }).cancellationDeadline
  if (deadline) return new Date(deadline) > now
  return new Date(t.eventStartTime) > now
}