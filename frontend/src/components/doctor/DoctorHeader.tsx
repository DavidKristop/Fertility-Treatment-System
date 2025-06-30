"use client"

import { Link } from "react-router-dom"
import { Bell, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect, useState } from "react"
import { getDoctorProfile } from "@/api/doctor"
import type { DoctorProfile } from "@/api/types"
//import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DoctorHeaderProps {
  title: string
  breadcrumbs?: { label: string; path?: string }[]
  onMenuClick?: () => void
  showMenuButton?: boolean
}

export default function DoctorHeader({ title, breadcrumbs, onMenuClick, showMenuButton = false }: DoctorHeaderProps) {
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchDoctorProfile = async () => {
      setIsLoading(true)
      try {
        const profile = await getDoctorProfile()
        setDoctorProfile(profile)
      } catch (err: any) {
        setError(err.message || "Failed to fetch doctor profile")
        console.error("Error fetching doctor profile:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchDoctorProfile()
  }, [])

  const doctorName = doctorProfile?.fullName || "Dr. Nguyễn Văn A"
  const specialty = doctorProfile?.specialty || "Chuyên khoa Sản"
  const avatarUrl = doctorProfile?.avatarUrl

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
        </div>

        {/* Right side - Search, Notifications, Profile */}
        <div className="flex items-center gap-2 lg:gap-4">
          {/* Notifications */}
          <div className="relative">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs p-0">7</Badge>
            </Button>
          </div>

          {/* Profile Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2">
                {/* <Avatar className="w-8 h-8">
                  {avatarUrl ? (
                    <AvatarImage src={avatarUrl || "/placeholder.svg"} alt={doctorName} />
                  ) : (
                    <AvatarFallback>{doctorName?.charAt(0)}</AvatarFallback>
                  )}
                </Avatar> */}
                <div className="hidden lg:block text-left">
                  {isLoading ? (
                    <div>Loading...</div>
                  ) : error ? (
                    <div>Error: {error}</div>
                  ) : (
                    <>
                      <div className="text-sm font-medium">{doctorName}</div>
                      <div className="text-xs text-gray-500">{specialty}</div>
                    </>
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem asChild>
                <Link to="/doctor/profile">
                  <User className="mr-2 h-4 w-4" />
                  Hồ sơ cá nhân
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Đăng xuất</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
