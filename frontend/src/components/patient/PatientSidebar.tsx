"use client"

import type React from "react"
import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import {
  Calendar,
  FileText,
  Pill,
  CreditCard,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Clock,
  CalendarDays,
  Activity,
  MessageSquare,
  User,
  CalendarPlus,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import logo from "@/assets/ucarelogo.png"

interface SidebarItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  path?: string
  badge?: number
  children?: {
    id: string
    label: string
    icon: React.ComponentType<{ className?: string }>
    path: string
    badge?: number
  }[]
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Trang tổng quan",
    icon: LayoutDashboard,
    path: "/patient/dashboard",
  },
  {
    id: "appointments",
    label: "Lịch hẹn",
    icon: Calendar,
    badge: 2,
    children: [
      {
        id: "schedule-appointment",
        label: "Lên lịch khám",
        icon: CalendarPlus,
        path: "/patient/appointments/schedule",
      },
      {
        id: "upcoming-appointments",
        label: "Cuộc hẹn sắp tới",
        icon: CalendarDays,
        path: "/patient/appointments/upcoming",
        badge: 2,
      },
      {
        id: "appointment-history",
        label: "Lịch sử hẹn",
        icon: Clock,
        path: "/patient/appointments/history",
      },
    ],
  },
  {
    id: "treatment",
    label: "Kế hoạch điều trị",
    icon: Activity,
    path: "/patient/treatment",
  },
  {
    id: "prescriptions",
    label: "Đơn thuốc",
    icon: Pill,
    children: [
      {
        id: "active-prescriptions",
        label: "Đơn thuốc hiện tại",
        icon: Pill,
        path: "/patient/prescriptions/active",
      },
      {
        id: "history-prescriptions",
        label: "Lịch sử đơn thuốc",
        icon: FileText,
        path: "/patient/prescriptions/history",
      },
    ],
  },
  {
    id: "results",
    label: "Kết quả xét nghiệm",
    icon: FileText,
    path: "/patient/results",
  },
  {
    id: "payments",
    label: "Thanh toán & Hóa đơn",
    icon: CreditCard,
    path: "/patient/payments",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    badge: 3,
    path: "/patient/notifications",
  },
  {
    id: "support",
    label: "Hỗ trợ & Tư vấn",
    icon: MessageSquare,
    path: "/patient/support",
  },
  {
    id: "profile",
    label: "Hồ sơ & Cài đặt",
    icon: User,
    path: "/patient/profile",
  },
]

interface PatientSidebarProps {
  isCollapsed: boolean
  isMobile?: boolean
  onToggle: () => void
}

export default function PatientSidebar({ isCollapsed, onToggle, isMobile = false }: PatientSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["appointments"])
  const location = useLocation()
  const navigate = useNavigate()
  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const isActive = (path: string) => location.pathname === path

  const isParentActive = (item: SidebarItem) => {
    if (item.path && isActive(item.path)) return true
    if (item.children) {
      return item.children.some((child) => isActive(child.path))
    }
    return false
  }

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="UCARE" className="h-8 w-8" />
            <span className="font-bold text-[#004c77] text-lg">UCARE</span>
          </div>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="p-1">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {sidebarItems.map((item) => (
          <div key={item.id}>
            {/* Main Item */}
            {item.path ? (
              <Link to={item.path}>
                <div
                  className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                    isParentActive(item) ? "bg-[#004c77] text-white" : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            ) : (
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  isParentActive(item) ? "bg-[#004c77] text-white" : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.id)
                  }
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && <span className="text-sm font-medium truncate">{item.label}</span>}
                </div>
                {!isCollapsed && (
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                        {item.badge}
                      </Badge>
                    )}
                    {item.children && (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${expandedItems.includes(item.id) ? "rotate-90" : ""}`}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Children */}
            {item.children && !isCollapsed && expandedItems.includes(item.id) && (
              <div className="ml-6 mt-1 space-y-1">
                {item.children.map((child) => (
                  <Link key={child.id} to={child.path}>
                    <div
                      className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                        isActive(child.path) ? "bg-[#004c77] text-white" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        <child.icon className="h-4 w-4 flex-shrink-0" />
                        <span className="text-sm truncate">{child.label}</span>
                      </div>
                      {child.badge && (
                        <Badge variant="destructive" className="text-xs px-1.5 py-0.5">
                          {child.badge}
                        </Badge>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-gray-200">
        <div
          className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors"
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/authorization/login")
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Đăng xuất</span>}
        </div>
      </div>
    </div>
  )
}