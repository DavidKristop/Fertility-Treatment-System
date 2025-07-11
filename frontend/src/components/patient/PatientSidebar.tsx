import type React from "react"
import { useEffect, useState } from "react"
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
  Activity,
  User,
  CalendarPlus,
  FileSignature,
  CalendarCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import logo from "@/assets/ucarelogo.png"
import { getAllOfMyReminder } from "@/api/reminder"
import { logout } from "@/api/auth"

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

const sidebarItemsProp: SidebarItem[] = [
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
    children: [
      {
        id: "schedule-appointment",
        label: "Đặt lịch hẹn",
        icon: CalendarPlus,
        path: "/patient/appointments/schedule",
      },
      {
        id: "my-requests",
        label: "Xem lịch hẹn đặt",
        icon: CalendarCheck,
        path: "/patient/appointments/my-request"
      }
    ],
  },
  {
    id: "treatment",
    label: "Kế hoạch điều trị",
    icon: Activity,
    path: "/patient/treatment",
  },
  {
    id: "contracts",
    label: "Hợp đồng",
    icon: FileSignature,
    path: "/patient/contracts",
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
    id: "payments",
    label: "Thanh toán & Hóa đơn",
    icon: CreditCard,
    path: "/patient/payments",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    path: "/patient/notifications",
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
  const [sideBarItems,setSideBarItems] = useState(sidebarItemsProp)
  const [expandedItems, setExpandedItems] = useState<string[]>([])
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

  const fetchReminders = async (pageNum = 0) => {
    try {
      const res = await getAllOfMyReminder({
        page: pageNum,
        size: 10,
      });
      setSideBarItems((prev) => {
        return prev.map((item) => {
          if (item.id === "notifications") {
            return {
              ...item,
              badge: res?.payload?.content?.reduce((acc, reminder) => acc + (reminder.read ? 0 : 1), 0),
            };
          }
          return item;
        });
      });
    } catch (err) {
      console.error("Failed to fetch reminders:", err);
    }
  };

// Tự động mở rộng mục cha khi một mục con được chọn
  useEffect(() => {
    sideBarItems.forEach((item) => {
      if (item.children && item.children.some((child) => isActive(child.path))) {
        setExpandedItems((prev) => {
          if (!prev.includes(item.id)) {
            return [...prev, item.id];
          }
          return prev;
        });
      }
    });
  }, [location.pathname]); // Chạy lại khi location.pathname thay đổi

  useEffect(() => {
    fetchReminders();
  }, []);
  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col sticky top-0 max-h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <Link to={"/"}>
            <div className="flex items-center gap-1">
              <img src={logo || "/placeholder.svg"} alt="UCARE" className="h-7" />
              <span className="font-bold text-[#004c77] text-lg">UCARE</span>
            </div>
          </Link>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="p-1">
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {sideBarItems.map((item) => (
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
                      {item.badge>0?item.badge:""}
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
                        {item.badge>0?item.badge:""}
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
                          {child.badge>0?child.badge:""}
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
          onClick={async () => {
            try {
              // Gọi API logout để xóa refresh token cookie
              await logout();
              // Navigate sau khi logout thành công
              navigate("/authorization/login");
            } catch (error) {
              console.error('Logout error:', error);
              // Dù có lỗi, vẫn navigate (vì localStorage đã bị xóa trong hàm logout)
              navigate("/authorization/login");
            }
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {(!isCollapsed || isMobile) && <span className="text-sm font-medium">Đăng xuất</span>}
        </div>
      </div>
    </div>
  )
}