import type React from "react"

import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  Calendar,
  Users,
  FileText,
  Pill,
  CreditCard,
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
  DollarSign,
  RefreshCw,
  MessageSquare,
  Inbox,
  User,
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
    label: "Cuộc hẹn",
    icon: Calendar,
    badge: 5,
    children: [
      {
        id: "today-appointments",
        label: "Danh sách hôm nay",
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
        id: "stages-progress",
        label: "Giai đoạn & tiến độ",
        icon: Activity,
        path: "/doctor/treatment-plans/progress",
      },
    ],
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
    id: "payments",
    label: "Thanh toán",
    icon: CreditCard,
    badge: 12,
    children: [
      {
        id: "pending-payments",
        label: "Thanh toán chờ",
        icon: DollarSign,
        path: "/doctor/payments/pending",
        badge: 8,
      },
      {
        id: "refund-requests",
        label: "Yêu cầu hoàn tiền",
        icon: RefreshCw,
        path: "/doctor/payments/refunds",
        badge: 4,
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
  {
    id: "profile",
    label: "Hồ sơ & Cài đặt",
    icon: User,
    path: "/doctor/profile",
  },
]

interface DoctorSidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

export default function DoctorSidebar({ isCollapsed, onToggle }: DoctorSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["appointments"])
  const location = useLocation()

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
            <div
              className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                isParentActive(item) ? "bg-[#004c77] text-white" : "text-gray-700 hover:bg-gray-100"
              }`}
              onClick={() => {
                if (item.children) {
                  toggleExpanded(item.id)
                } else if (item.path) {
                  // Navigate to path
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
        <div className="flex items-center gap-3 p-2 rounded-lg text-red-600 hover:bg-red-50 cursor-pointer transition-colors">
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isCollapsed && <span className="text-sm font-medium">Đăng xuất</span>}
        </div>
      </div>
    </div>
  )
}
