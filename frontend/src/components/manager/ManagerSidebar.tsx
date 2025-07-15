"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  Calendar,
  FileText,
  Users,
  AlertTriangle,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  BarChart,
  MessageSquare,
  User,
  DollarSign,
  ListCollapse,
  Plus,
  Pill,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/ucarelogo.png";
import { auth } from "@/api";

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path?: string;
  badge?: number;
  children?: {
    id: string;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    path: string;
    badge?: number;
  }[];
}

const sidebarItems: SidebarItem[] = [
  {
    id: "dashboard",
    label: "Trang tổng quan",
    icon: LayoutDashboard,
    path: "/manager/dashboard",
  },
  {
    id: "createprotocols",
    label: "Tạo phác đồ điều trị",
    icon: Plus,
    path: "/manager/createprotocols",
  },
  {
    id: "protocols",
    label: "Danh sách phác đồ điều trị",
    icon: ListCollapse,
    path: "/manager/protocols",
  },
  {
    id: "staff",
    label: "Quản lý nhân viên",
    icon: Users,
    badge: 1,
    children: [
      {
        id: "staff-schedules",
        label: "Lịch trực nhân viên",
        icon: Calendar,
        path: "/manager/staff/schedules",
        badge: 1,
      },
      {
        id: "staff-profiles",
        label: "Hồ sơ nhân viên",
        icon: User,
        path: "/manager/staff/profiles",
      },
    ],
  },
  {
    id: "appointments",
    label: "Lịch hẹn",
    icon: Calendar,
    path: "/manager/appointments",
  },
  {
    id: "assigned-drugs",
    label: "Quản lý đơn thuốc",
    icon: FileText,
    path: "/manager/assigned-drugs",
  },
  {
    id: "services",
    label: "Quản lý dịch vụ",
    icon: FileText,
    path: "/manager/services",
  },
  {
    id: "payments",
    label: "Quản lý thanh toán",
    icon: DollarSign,
    path: "/manager/payments",
  },
  {
    id: "create-doctor",
    label: "Tạo tài khoản bác sĩ",
    icon: User, // Hoặc icon nào khác phù hợp
    path: "/manager/doctors/create",
  },
  {
    id: "reports",
    label: "Báo cáo vận hành",
    icon: BarChart,
    children: [
      {
        id: "appointment-reports",
        label: "Báo cáo lịch hẹn",
        icon: FileText,
        path: "/manager/reports/appointments",
      },
      {
        id: "financial-reports",
        label: "Báo cáo tài chính",
        icon: DollarSign,
        path: "/manager/reports/financial",
      },
    ],
  },
  {
    id: "contracts",
    label: "Hợp đồng",
    icon: FileText,
    path: "/manager/contracts",
  },
  {
    id: "drugs",
    label: "Quản lý thuốc",
    icon: Pill,
    path: "/manager/drugs",
  },
  {
    id: "facility",
    label: "Cảnh báo cơ sở vật chất",
    icon: AlertTriangle,
    badge: 2,
    path: "/manager/facility/alerts",
  },
  {
    id: "notifications",
    label: "Thông báo",
    icon: Bell,
    badge: 3,
    path: "/manager/notifications",
  },
  {
    id: "support",
    label: "Hỗ trợ & tư vấn",
    icon: MessageSquare,
    path: "/manager/support",
  },
  {
    id: "profile",
    label: "Hồ sơ & Cài đặt",
    icon: User,
    path: "/manager/profile",
  },
];

interface ManagerSidebarProps {
  isCollapsed: boolean;
  isMobile?: boolean;
  onToggle: () => void;
}

export default function ManagerSidebar({
  isCollapsed,
  onToggle,
  isMobile = false,
}: ManagerSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["staff"]);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleExpanded = (itemId: string) => {
    setExpandedItems((prev) =>
      prev.includes(itemId)
        ? prev.filter((id) => id !== itemId)
        : [...prev, itemId]
    );
  };

  const isActive = (path: string) => location.pathname === path;

  const isParentActive = (item: SidebarItem) => {
    if (item.path && isActive(item.path)) return true;
    if (item.children) {
      return item.children.some((child) => isActive(child.path));
    }
    return false;
  };

  const handleLogout = async () => {
    try {
      await auth.logout(); // POST /auth/logout
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      navigate("/authorization/login", { replace: true });
    }
  };

  // Auto-expand parent items when child is active
  useEffect(() => {
    sidebarItems.forEach((item) => {
      if (
        item.children &&
        item.children.some((child) => isActive(child.path))
      ) {
        setExpandedItems((prev) => {
          if (!prev.includes(item.id)) {
            return [...prev, item.id];
          }
          return prev;
        });
      }
    });
  }, [location.pathname]);

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col sticky top-0 max-h-screen ${
        isCollapsed ? "w-16" : "w-64"
      }`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <Link to="/">
            <div className="flex items-center gap-1">
              <img
                src={logo || "/placeholder.svg"}
                alt="UCARE"
                className="h-7"
              />
              <span className="font-bold text-[#004c77] text-lg">UCARE</span>
            </div>
          </Link>
        )}
        <Button variant="ghost" size="sm" onClick={onToggle} className="p-1">
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
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
                    isParentActive(item)
                      ? "bg-[#004c77] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    {!isCollapsed && (
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {!isCollapsed && item.badge && (
                    <Badge
                      variant="destructive"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {item.badge > 0 ? item.badge : ""}
                    </Badge>
                  )}
                </div>
              </Link>
            ) : (
              <div
                className={`flex items-center justify-between p-2 rounded-lg cursor-pointer transition-colors ${
                  isParentActive(item)
                    ? "bg-[#004c77] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => {
                  if (item.children) {
                    toggleExpanded(item.id);
                  }
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!isCollapsed && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </div>
                {!isCollapsed && (
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="text-xs px-1.5 py-0.5"
                      >
                        {item.badge > 0 ? item.badge : ""}
                      </Badge>
                    )}
                    {item.children && (
                      <ChevronRight
                        className={`h-4 w-4 transition-transform ${
                          expandedItems.includes(item.id) ? "rotate-90" : ""
                        }`}
                      />
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Children */}
            {item.children &&
              !isCollapsed &&
              expandedItems.includes(item.id) && (
                <div className="ml-6 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link key={child.id} to={child.path}>
                      <div
                        className={`flex items-center justify-between p-2 rounded-lg transition-colors ${
                          isActive(child.path)
                            ? "bg-[#004c77] text-white"
                            : "text-gray-600 hover:bg-gray-100"
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1 min-w-0">
                          <child.icon className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm truncate">
                            {child.label}
                          </span>
                        </div>
                        {child.badge && (
                          <Badge
                            variant="destructive"
                            className="text-xs px-1.5 py-0.5"
                          >
                            {child.badge > 0 ? child.badge : ""}
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
            handleLogout();
          }}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {(!isCollapsed || isMobile) && (
            <span className="text-sm font-medium">Đăng xuất</span>
          )}
        </div>
      </div>
    </div>
  );
}
