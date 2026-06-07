export function isOrphanRecord(eventName?: string | null): boolean {
  if (!eventName) return true                          // null / undefined / 空字串
  const lower = eventName.toLowerCase().trim()
  if (lower === "") return true
  if (lower === "unknown event") return true
  if (lower.includes("unknown")) return true
  return false
}