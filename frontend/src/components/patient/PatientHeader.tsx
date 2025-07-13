import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Bell, Search, User as UserIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { me } from "@/api/auth"
import { auth } from "@/api"

interface PatientHeaderProps {
  title: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function PatientHeader({ title, breadcrumbs }: PatientHeaderProps) {
  const navigate = useNavigate()
  const [userName, setUserName] = useState<string>("")
  const [userRole, setUserRole] = useState<string>("")

  // Fetch current user info
  useEffect(() => {
    ;(async () => {
      try {
        const payload = await me() // GET /auth/me
        setUserName(payload.fullName ?? payload.email)
        setUserRole(payload.role)
      } catch {
        navigate("/authorization/login", { replace: true })
      }
    })()
  }, [navigate])

  const handleLogout = async () => {
    try {
      await auth.logout() // POST /auth/logout
    } catch (err) {
      console.error("Logout API failed:", err)
    } finally {
      navigate("/authorization/login", { replace: true })
    }
  }

  // Map role to display label
  const roleLabelMap: Record<string, string> = {
    ROLE_PATIENT: "Bệnh nhân",
    ROLE_DOCTOR: "Bác sĩ",
    ROLE_MANAGER: "Quản lý",
    ROLE_ADMIN: "Admin",
  }
  const roleLabel = roleLabelMap[userRole] ?? userRole

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Title & Breadcrumbs */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {breadcrumbs && (
            <nav className="flex items-center space-x-2 text-sm text-gray-500 mt-1">
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="flex items-center">
                  {idx > 0 && <span className="mx-2">/</span>}
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

        {/* Utilities */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input placeholder="Tìm bác sĩ, đơn thuốc, lịch hẹn..." className="pl-10 w-80" />
          </div>

          {/* Notifications */}
          <Link to="/patient/notifications">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">
                3
              </Badge>
            </Button>
          </Link>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 cursor-pointer">
                <div className="w-8 h-8 bg-[#004c77] rounded-full flex items-center justify-center">
                  <UserIcon className="h-4 w-4 text-white" />
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">{userName}</div>
                  <div className="text-xs text-gray-500">{roleLabel}</div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild className="cursor-pointer">
                <Link to="/patient/profile" className="flex items-center gap-2">
                  <UserIcon className="h-4 w-4" />
                  Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600 cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  handleLogout()
                }}
              >
                Đăng xuất
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
