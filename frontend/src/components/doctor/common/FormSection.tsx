"use client"

import type React from "react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, type LucideIcon } from "lucide-react"
import { useState } from "react"

interface FormSectionProps {
  title: string
  icon?: LucideIcon
  children: React.ReactNode
  actions?: React.ReactNode
  className?: string
  collapsible?: boolean
  defaultExpanded?: boolean
}

export default function FormSection({
  title,
  icon: Icon,
  children,
  actions,
  className = "",
  collapsible = false,
  defaultExpanded = true,
}: FormSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultExpanded)

  if (collapsible) {
    return (
      <Collapsible open={isOpen} onOpenChange={setIsOpen} className={className}>
        <Card>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  {Icon && <Icon className="h-5 w-5" />}
                  {title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {actions}
                  <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent>{children}</CardContent>
          </CollapsibleContent>
        </Card>
      </Collapsible>
    )
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {Icon && <Icon className="h-5 w-5" />}
            {title}
          </CardTitle>
          {actions}
        </div>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  )
}
