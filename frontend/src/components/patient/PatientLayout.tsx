import type React from "react"

import { useState } from "react"
import PatientSidebar from "./PatientSidebar"
import PatientHeader from "./PatientHeader"

interface PatientLayoutProps {
  children: React.ReactNode
  title: string
  breadcrumbs?: { label: string; path?: string }[]
}

export default function PatientLayout({ children, title, breadcrumbs }: PatientLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <PatientSidebar isCollapsed={sidebarCollapsed} onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} />
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <PatientHeader title={title} breadcrumbs={breadcrumbs} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
