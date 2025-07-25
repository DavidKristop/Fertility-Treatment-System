import { useState, useEffect } from "react"
import Sidebar from "./SideBar"
import Header from "./Header"
import type { LayoutProps } from "@/api/types"
import { AuthHeaderProvider } from "@/lib/context/AuthHeaderContext"



export default function Layout({ children, sideBarItemsProp }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Detect mobile screen size
  useEffect(() => {
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)
      if (mobile) {
        setSidebarCollapsed(true)
        setSidebarOpen(false)
      }
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  const handleSidebarToggle = () => {
    if (isMobile) {
      setSidebarOpen(!sidebarOpen)
    } else {
      setSidebarCollapsed(!sidebarCollapsed)
    }
  }

  const handleOverlayClick = () => {
    if (isMobile) {
      setSidebarOpen(false)
    }
  }

  return (
    <AuthHeaderProvider>
        <div className="min-h-screen bg-gray-50 flex relative">
        {/* Mobile Overlay */}
        {isMobile && sidebarOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={handleOverlayClick} />
        )}

        {/* Sidebar */}
        <div
            className={`
            ${isMobile ? "fixed" : "sticky"} 
            ${isMobile && !sidebarOpen ? "-translate-x-full" : "translate-x-0"}
            ${isMobile ? "z-50" : "z-30"}
            transition-transform duration-300 ease-in-out
            lg:translate-x-0 top-0 h-screen
        `}
        >
            <Sidebar isCollapsed={!isMobile && sidebarCollapsed} onToggle={handleSidebarToggle} isMobile={isMobile} sideBarItemsProp={sideBarItemsProp} />
        </div>

        {/* Main Content */}
        <div
            className={`
            flex-1 flex flex-col min-w-0
            ${!isMobile && !sidebarCollapsed ? "lg:ml-0" : ""}
            transition-all duration-300 ease-in-out
        `}
        >
            <Header
            onMenuClick={handleSidebarToggle}
            showMenuButton={isMobile}
            />
            <main className="flex-1 p-4 lg:p-6 overflow-auto">{children}</main>
        </div>
        </div>
    </AuthHeaderProvider>
  )
}