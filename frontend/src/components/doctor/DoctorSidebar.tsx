"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Calendar,
  Users,
  FileText,
  Pill,
  Bell,
  BookOpen,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  Clock,
  CalendarDays,
  Search,
  Activity,
  Stethoscope,
  MessageSquare,
  Inbox,
  Eye,
  CalendarCheck,
  TestTube,
  Plus,
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
    label: "Bảng điều khiển",
    icon: LayoutDashboard,
    path: "/doctor/dashboard",
  },
  {
    id: "appointments",
    label: "Lịch khám",
    icon: Calendar,
    badge: 5,
    children: [
      {
        id: "today-appointments",
        label: "Lịch khám hôm nay",
        icon: Clock,
        path: "/doctor/appointments/today",
        badge: 3,
      },
      {
        id: "calendar",
        label: "Xem lịch",
        icon: CalendarDays,
        path: "/doctor/appointments/calendar",
      },
      {
        id: "booked-appointments",
        label: "Lịch đã đặt",
        icon: CalendarCheck,
        path: "/doctor/appointments/booked",
      },
    ],
  },
  {
    id: "patients",
    label: "Bệnh nhân",
    icon: Users,
    children: [
      {
        id: "all-patients",
        label: "Tất cả bệnh nhân",
        icon: Users,
        path: "/doctor/patients",
      },
      {
        id: "search-patients",
        label: "Tìm kiếm bệnh nhân",
        icon: Search,
        path: "/doctor/patients/search",
      },
    ],
  },
  {
    id: "contracts",
    label: "Hợp đồng điều trị",
    icon: Eye,
    path: "/doctor/contracts",
  },
  {
    id: "treatment-plans",
    label: "Kế hoạch điều trị",
    icon: Activity,
    children: [
      {
        id: "active-plans",
        label: "Kế hoạch đang hoạt động",
        icon: Stethoscope,
        path: "/doctor/treatment-plans/active",
      },
      {
        id: "create-plan",
        label: "Tạo kế hoạch mới",
        icon: Plus,
        path: "/doctor/treatment-plans",
      },
      {
        id: "stages-progress",
        label: "Giai đoạn & tiến độ",
        icon: Activity,
        path: "/doctor/treatment-plans/progress",
      },
    ],
  },
  {
    id: "results",
    label: "Ghi nhận kết quả",
    icon: TestTube,
    path: "/doctor/results/record",
  },
  {
    id: "prescriptions",
    label: "Đơn thuốc",
    icon: Pill,
    children: [
      {
        id: "active-prescriptions",
        label: "Đơn đang dùng",
        icon: Pill,
        path: "/doctor/prescriptions/active",
      },
      {
        id: "new-prescription",
        label: "Tạo đơn mới",
        icon: FileText,
        path: "/doctor/prescriptions/new",
      },
    ],
  },
  {
    id: "notifications",
    label: "Nhắc nhở & Thông báo",
    icon: Bell,
    badge: 7,
    children: [
      {
        id: "reminder-history",
        label: "Lịch sử nhắc nhở",
        icon: MessageSquare,
        path: "/doctor/notifications/reminders",
      },
      {
        id: "inbox",
        label: "Hộp thư đến",
        icon: Inbox,
        path: "/doctor/notifications/inbox",
        badge: 7,
      },
    ],
  },
  {
    id: "blog",
    label: "Blog",
    icon: BookOpen,
    path: "/doctor/blog",
  },
]

interface DoctorSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
  isMobile?: boolean
}

export default function DoctorSidebar({ isCollapsed, onToggle, isMobile = false }: DoctorSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([])
  const location = useLocation()

  // Tự động mở rộng menu chứa trang hiện tại
  useEffect(() => {
    const currentPath = location.pathname
    const parentItem = sidebarItems.find((item) => item.children?.some((child) => child.path === currentPath))

    if (parentItem && !expandedItems.includes(parentItem.id)) {
      setExpandedItems((prev) => [...prev, parentItem.id])
    }
  }, [location.pathname, expandedItems])

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

  const sidebarWidth = isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64"

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen ${sidebarWidth}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="UCARE" className="h-8 w-8" />
            <span className="font-bold text-[#004c77] text-lg">UCARE</span>
          </div>
        )}
        {!isMobile && (
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-1">
            {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        )}
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
                    {(!isCollapsed || isMobile) && <span className="text-sm font-medium truncate">{item.label}</span>}
                  </div>
                  {(!isCollapsed || isMobile) && item.badge && (
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
                  if (item.children && (!isCollapsed || isMobile)) {
                    toggleExpanded(item.id)
                  }
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {(!isCollapsed || isMobile) && <span className="text-sm font-medium truncate">{item.label}</span>}
                </div>
                {(!isCollapsed || isMobile) && (
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
            {item.children && (!isCollapsed || isMobile) && expandedItems.includes(item.id) && (
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
        <div className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Đăng xuất</span>}
        </div>
      </div>
    </div>
  )
}
