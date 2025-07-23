"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FileText,
  LogOut,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  ListCollapse,
  Plus,
  Pill,
  DollarSign,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import logo from "@/assets/ucarelogo.png";
import { logout } from "@/api/auth";

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
    id: "protocol",
    label: "Phác đồ điều trị",
    icon: FileText,
    children: [
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
    ],
  },
  {
    id: "assigned-drugs",
    label: "Quản lý đơn thuốc",
    icon: FileText,
    path: "/manager/assigned-drugs",
  },
  {
    id: "drugsAndServicesManagement",
    label: "Quản lý thuốc & Dịch vụ",
    icon: FileText,
    children: [
      {
        id: "drugs",
        label: "Quản lý thuốc",
        icon: Pill,
        path: "/manager/drugs",
      },
      {
        id: "services",
        label: "Quản lý dịch vụ",
        icon: FileText,
        path: "/manager/services",
      },
    ],
  },
  {
    id: "payments",
    label: "Quản lý thanh toán",
    icon: DollarSign,
    path: "/manager/payments",
  },
  {
    id: "contracts",
    label: "Hợp đồng",
    icon: FileText,
    path: "/manager/contracts",
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
  onToggle: () => void;
  isMobile?: boolean;
}

export default function ManagerSidebar({
  isCollapsed,
  onToggle,
  isMobile = false,
}: ManagerSidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  // Auto-expand parent items when child is active
  useEffect(() => {
    const currentPath = location.pathname;
    const parentItem = sidebarItems.find((item) =>
      item.children?.some((child) => child.path === currentPath)
    );
    if (parentItem && !expandedItems.includes(parentItem.id)) {
      setExpandedItems((prev) => [...prev, parentItem.id]);
    }
  }, [location.pathname, expandedItems]);

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
      await logout();
    } catch (err) {
      console.error("Logout API failed:", err);
    } finally {
      navigate("/authorization/login", { replace: true });
    }
  };

  const sidebarWidth = isMobile ? "w-64" : isCollapsed ? "w-16" : "w-64";

  return (
    <div
      className={`bg-white border-r border-gray-200 transition-all duration-300 flex flex-col h-screen overflow-hidden ${sidebarWidth}`}
    >
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex items-center justify-between">
        {(!isCollapsed || isMobile) && (
          <div className="flex items-center gap-2">
            <img src={logo || "/placeholder.svg"} alt="UCARE" className="h-8" />
            <span className="font-bold text-[#004c77] text-lg">UCARE</span>
          </div>
        )}
        {!isMobile && (
          <Button variant="ghost" size="sm" onClick={onToggle} className="p-1">
            {isCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto custom-scrollbar">
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
                    {(!isCollapsed || isMobile) && (
                      <span className="text-sm font-medium truncate">
                        {item.label}
                      </span>
                    )}
                  </div>
                  {(!isCollapsed || isMobile) && item.badge && (
                    <Badge
                      variant="destructive"
                      className="text-xs px-1.5 py-0.5"
                    >
                      {item.badge}
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
                  if (item.children && (!isCollapsed || isMobile)) {
                    toggleExpanded(item.id);
                  }
                }}
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {(!isCollapsed || isMobile) && (
                    <span className="text-sm font-medium truncate">
                      {item.label}
                    </span>
                  )}
                </div>
                {(!isCollapsed || isMobile) && (
                  <div className="flex items-center gap-1">
                    {item.badge && (
                      <Badge
                        variant="destructive"
                        className="text-xs px-1.5 py-0.5"
                      >
                        {item.badge}
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
            {item.children && (!isCollapsed || isMobile) && expandedItems.includes(item.id) && (
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
                        <span className="text-sm truncate">{child.label}</span>
                      </div>
                      {child.badge && (
                        <Badge
                          variant="destructive"
                          className="text-xs px-1.5 py-0.5"
                        >
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
          onClick={handleLogout}
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
