import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bell, User, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { logout, me } from "@/api/auth"
import type { HeaderProps } from "@/api/types"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"

export default function Header({
  onMenuClick,
  showMenuButton = false,
}: HeaderProps) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [userRole, setUserRole] = useState<string>("")
  const {breadCrumbs,title} = useAuthHeader()

  useEffect(() => {
    ;(async () => {
      try {
        const payload = await me()
        setUserName(payload.fullName ?? payload.email)
        setUserRole(payload.role)
      } catch {
        navigate("/authorization/login", { replace: true })
      }
    })()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await logout()
    } catch (err) {
      console.error("Logout API failed:", err)
    } finally {
      navigate("/authorization/login", { replace: true })
    }
  }

  const roleLabelMap: Record<string, string> = {
    ROLE_PATIENT: "Bệnh nhân",
    ROLE_DOCTOR: "Bác sĩ",
    ROLE_MANAGER: "Quản lý",
    ROLE_ADMIN: "Admin",
    ROLE_STAFF: "Nhân viên",
  }
  const roleLabel = roleLabelMap[userRole] ?? userRole

  const profilePathMap: Record<string, string> = {
  ROLE_PATIENT: "/patient/profile",
  ROLE_DOCTOR: "/doctor/profile",
  ROLE_MANAGER: "/manager/profile",
  ROLE_ADMIN: "/admin/profile",
  ROLE_STAFF: "/staff/profile",
}

const profilePath = profilePathMap[userRole] ?? "/"

  return (
    <header className="bg-white border-b border-gray-200 px-4 lg:px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Left side - Menu button (mobile) + Title and Breadcrumbs */}
        <div className="flex items-center gap-4">
          {showMenuButton && (
            <Button variant="ghost" size="icon" onClick={onMenuClick} className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          )}

          <div>
            <h1 className="text-xl lg:text-2xl font-bold text-gray-900">{title}</h1>
            {breadCrumbs && breadCrumbs.length > 0 && (
              <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
                {breadCrumbs.map((crumb, index) => (
                  <span key={index} className="flex items-center">
                    {index > 0 && <span className="mx-2">/</span>}
                    {crumb.path ? (
                      <Link to={crumb.path} className="hover:text-gray-700">
                        {crumb.label}
                      </Link>
                    ) : (
                      <span>{crumb.label}</span>
                    )}
                  </span>
                ))}
              </nav>
            )}
          </div>
        </div>

        {/* Right side - Notifications, Profile */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <Link to="/patient/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
                7
              </Badge>
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-[#004c77] rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="hidden lg:block text-left">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{roleLabel}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to={profilePath} className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={handleLogout}
              >
                <LogOut className="text-red h-4 w-4" />
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}