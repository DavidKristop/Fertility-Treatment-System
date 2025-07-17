import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/api";
import { me } from "@/api/auth";

interface ManagerHeaderProps {
  title: string;
  breadcrumbs?: { label: string; path?: string }[];
}

export default function ManagerHeader({
  title,
  breadcrumbs,
}: ManagerHeaderProps) {
  const navigate = useNavigate()

  const [userName, setUserName] = useState<string>("");
  const [userRole, setUserRole] = useState<string>("");

  // ✅ Fetch current user info
  useEffect(() => {
    (async () => {
      try {
        const payload = await me(); // GET /auth/me
        setUserName(payload.fullName ?? payload.email);
        setUserRole(payload.role);
      } catch {
        navigate("/authorization/login", { replace: true });
      }
    })();
  }, [navigate]);

  const handleLogout = async () => {
  try {
    await auth.logout(); // POST /auth/logout
  } catch (err) {
    console.error("Logout API failed:", err);
  } finally {
    navigate("/authorization/login", { replace: true });
  }
};

const roleLabelMap: Record<string, string> = {
    ROLE_PATIENT: "Bệnh nhân",
    ROLE_DOCTOR: "Bác sĩ", 
    ROLE_MANAGER: "Quản lý",
    ROLE_ADMIN: "Admin",
};
const roleLabel = roleLabelMap[userRole] ?? userRole;

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Title and Breadcrumbs */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              {breadcrumbs.map((crumb, index) => (
                <span key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  {crumb.path ? (
                    <a href={crumb.path} className="hover:text-gray-700">
                      {crumb.label}
                    </a>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#004c77] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  {/* ✅ Use dynamic user info */}
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{roleLabel}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Hồ sơ cá nhân
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Bell className="mr-2 h-4 w-4" />
                Thông báo
              </DropdownMenuItem>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Quản lý nhân viên
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  handleLogout();
                }}
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
