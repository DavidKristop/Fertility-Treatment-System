import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown } from "lucide-react"
import * as React from "react"

interface DropdownProps {
  label: string
  children: React.ReactNode
}

export function Dropdown({ label, children }: DropdownProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <div
          className="text-[20px] font-semibold px-4 py-6 transition-colors text-[#004c77] hover:bg-[#004c77] hover:text-white flex items-center space-x-1 cursor-pointer"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <span>{label}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="mt-2"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
