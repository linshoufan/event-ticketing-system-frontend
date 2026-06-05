import { useState, useRef, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../api/notifications"
import type { Notification } from "../types"

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; bar: string }> = {
  REGISTRATION_SUCCESS: { label: "報名成功",   color: "text-emerald-400", bg: "bg-emerald-900/30", bar: "bg-emerald-500" },
  WAITLIST_PROMOTED:    { label: "候補升正取", color: "text-amber-400",   bg: "bg-amber-900/30",   bar: "bg-amber-500" },
  EVENT_REMINDER:       { label: "活動提醒",   color: "text-zinc-400",    bg: "bg-zinc-800",        bar: "bg-zinc-500" },
  ACCOUNT_LOCKED:       { label: "帳號鎖定",   color: "text-red-400",     bg: "bg-red-900/30",      bar: "bg-red-500" },
  ACCOUNT_UNLOCKED:     { label: "帳號解鎖",   color: "text-emerald-400", bg: "bg-emerald-900/30",  bar: "bg-emerald-500" },
}

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return "剛剛"
  if (minutes < 60) return `${minutes} 分鐘前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小時前`
  return `${Math.floor(hours / 24)} 天前`
}

function NotificationBell() {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const queryClient = useQueryClient()

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: ({ signal }) => getNotifications({ limit: 20 }, signal),
    staleTime: 0,
    refetchInterval: 30 * 1000,
  })

  const notifications: Notification[] = data?.data ?? []
  const unreadCount = notifications.filter(n => !n.read).length

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    if (open) document.addEventListener("mousedown", onClickOutside)
    return () => document.removeEventListener("mousedown", onClickOutside)
  }, [open])

  async function handleRead(n: Notification) {
    if (n.read) return
    queryClient.setQueryData(["notifications"], (old: any) => ({
      ...old,
      data: old.data.map((item: Notification) =>
        item.notificationId === n.notificationId ? { ...item, read: true } : item
      ),
    }))
    await markNotificationRead(n.notificationId).catch(() => {})
  }

  async function handleReadAll() {
    queryClient.setQueryData(["notifications"], (old: any) => ({
      ...old,
      data: old.data.map((item: Notification) => ({ ...item, read: true })),
    }))
    await markAllNotificationsRead().catch(() => {})
  }

  return (
    <div className="relative" ref={ref}>

      {/* 鈴鐺按鈕 */}
      <button
        onClick={() => setOpen(v => !v)}
        className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center text-sm"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 px-0.5 rounded-full bg-red-500 text-white text-[9px] font-bold flex items-center justify-center leading-none tabular-nums">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* 下拉面板 */}
      {open && (
        <div className={`
          absolute right-0 top-full mt-2 w-72 sm:w-80
          bg-zinc-900/95 backdrop-blur-sm
          border border-zinc-800 rounded-2xl
          shadow-2xl overflow-hidden z-50
          transition-all duration-200
        `}>

          {/* 標頭 */}
          <div className="flex items-center justify-between px-4 pt-4 pb-3">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold text-sm">通知</span>
              {unreadCount > 0 && (
                <span className="text-xs px-1.5 py-0.5 rounded-full bg-zinc-800 text-zinc-400">
                  {unreadCount} 則未讀
                </span>
              )}
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleReadAll}
                className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
              >
                全部已讀
              </button>
            )}
          </div>

          <div className="border-t border-zinc-800/60" />

          {/* 通知列表 */}
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 gap-2">
                <span className="text-2xl opacity-40">🔔</span>
                <span className="text-zinc-600 text-sm">沒有通知</span>
              </div>
            ) : (
              <div>
                {notifications.map((n, i) => {
                  const config = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.EVENT_REMINDER
                  return (
                    <div key={n.notificationId}>
                      <div
                        onClick={() => handleRead(n)}
                        className="relative flex gap-3 px-4 py-3 hover:bg-zinc-800/40 transition-colors cursor-pointer group"
                      >
                        {/* 未讀左側色條 */}
                        {!n.read && (
                          <div className={`absolute left-0 top-2.5 bottom-2.5 w-0.5 rounded-r-full ${config.bar}`} />
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                              {config.label}
                            </span>
                            <span className="text-zinc-600 text-[10px] flex-shrink-0">
                              {timeAgo(n.createdAt)}
                            </span>
                          </div>
                          <p className={`text-xs leading-snug ${!n.read ? "text-white font-medium" : "text-zinc-400"}`}>
                            {n.title}
                          </p>
                          <p className="text-[11px] text-zinc-600 mt-0.5 line-clamp-2 leading-relaxed">
                            {n.message}
                          </p>
                        </div>
                      </div>
                      {i < notifications.length - 1 && (
                        <div className="border-t border-zinc-800/40 mx-4" />
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default NotificationBell