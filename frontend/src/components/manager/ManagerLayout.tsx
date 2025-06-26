import type React from "react"
import { useState } from "react"
import ManagerSidebar from "./ManagerSidebar"
import ManagerHeader from "./ManagerHeader"

interface ManagerLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function ManagerLayout({ children, title, breadcrumbs }: ManagerLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <ManagerSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <ManagerHeader title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}