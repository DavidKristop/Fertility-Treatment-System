import type React from "react"

import { useState } from "react"
import DoctorSidebar from "./DoctorSidebar"
import DoctorHeader from "./DoctorHeader"

interface DoctorLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function DoctorLayout({ children, title, breadcrumbs }: DoctorLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <DoctorSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DoctorHeader title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
