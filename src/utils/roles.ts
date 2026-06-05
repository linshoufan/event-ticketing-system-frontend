import type { Role } from "../types"

export function getRoleLabel(role: string | null): string {
  if (role === "welfare_member") return "福委會"
  if (role === "hr") return "HR"
  return "一般員工"
}

export function canManageEvents(role: Role): boolean {
  return role === "welfare_member"
}

export function canViewStats(role: Role): boolean {
  return role === "hr" || role === "welfare_member"
}

export function canRegister(role: Role): boolean {
  return role === "employee"
}

export function canManageUsers(role: Role): boolean {
  return role === "welfare_member"
}

export function canCheckin(role: Role): boolean {
  return role === "welfare_member"
}

export function getDefaultRoute(role: Role): string {
  if (role === "welfare_member") return "/admin/events"
  if (role === "hr") return "/admin/hr"
  return "/events"
}