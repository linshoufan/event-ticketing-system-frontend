import { useState, useRef, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { getNotifications, markNotificationRead, markAllNotificationsRead } from "../api/notifications"
import type { Notification } from "../types"

const TYPE_CONFIG: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  REGISTRATION_SUCCESS: { label: "報名成功",   color: "text-emerald-400", bg: "bg-emerald-900/30", dot: "bg-emerald-400" },
  WAITLIST_PROMOTED:    { label: "候補升正取", color: "text-amber-400",   bg: "bg-amber-900/30",   dot: "bg-amber-400" },
  EVENT_REMINDER:       { label: "活動提醒",   color: "text-blue-400",    bg: "bg-blue-900/30",    dot: "bg-blue-400" },
  ACCOUNT_LOCKED:       { label: "帳號鎖定",   color: "text-red-400",     bg: "bg-red-900/30",     dot: "bg-red-400" },
  ACCOUNT_UNLOCKED:     { label: "帳號解鎖",   color: "text-emerald-400", bg: "bg-emerald-900/30", dot: "bg-emerald-400" },
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
  const dropdownRef = useRef<HTMLDivElement>(null)
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
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClick)
    return () => document.removeEventListener("mousedown", handleClick)
  }, [open])

  async function handleClickNotification(n: Notification) {
    if (!n.read) {
      queryClient.setQueryData(["notifications"], (old: any) => ({
        ...old,
        data: old.data.map((item: Notification) =>
          item.notificationId === n.notificationId ? { ...item, read: true } : item
        ),
      }))
      await markNotificationRead(n.notificationId).catch(() => {})
    }
  }

  async function handleMarkAllRead() {
    queryClient.setQueryData(["notifications"], (old: any) => ({
      ...old,
      data: old.data.map((item: Notification) => ({ ...item, read: true })),
    }))
    await markAllNotificationsRead().catch(() => {})
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(prev => !prev)}
        className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors flex items-center justify-center text-base"
      >
        🔔
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center leading-none">
            {unreadCount > 99 ? "99+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-10 w-80 bg-zinc-900 border border-zinc-700 rounded-2xl shadow-2xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
            <span className="text-white font-semibold text-sm">通知</span>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllRead}
                className="text-zinc-500 hover:text-zinc-300 text-xs transition-colors"
              >
                全部已讀
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="text-center py-10 text-zinc-500 text-sm">
                <p className="text-3xl mb-2">🔔</p>
                <p>目前沒有通知</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-800">
                {notifications.map(n => {
                  const config = TYPE_CONFIG[n.type] ?? TYPE_CONFIG.EVENT_REMINDER
                  return (
                    <div
                      key={n.notificationId}
                      onClick={() => handleClickNotification(n)}
                      className={`flex gap-3 px-4 py-3 cursor-pointer transition-colors hover:bg-zinc-800/60 ${
                        !n.read ? "bg-zinc-800/30" : ""
                      }`}
                    >
                      <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${!n.read ? config.dot : "bg-transparent"}`} />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-0.5">
                          <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                            {config.label}
                          </span>
                          <span className="text-zinc-600 text-xs flex-shrink-0">{timeAgo(n.createdAt)}</span>
                        </div>
                        <p className={`text-sm ${!n.read ? "text-white font-medium" : "text-zinc-400"} leading-snug`}>
                          {n.title}
                        </p>
                        <p className="text-zinc-500 text-xs mt-0.5 line-clamp-2">{n.message}</p>
                      </div>
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