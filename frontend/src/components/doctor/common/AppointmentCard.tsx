"use client"
import { Clock, User, Phone } from "lucide-react"
import AppointmentStatusBadge from "./AppointmentStatusBadge"

interface AppointmentCardData {
  id: string
  time: string
  patient: {
    name: string
    phone: string
  }
  reason: string
  status: string
  duration?: number
  date?: string
}

interface AppointmentAction {
  label: string
  onClick: (id: string) => void
  variant?: "default" | "outline" | "destructive"
}

interface AppointmentCardProps {
  appointment: AppointmentCardData
  actions?: AppointmentAction[]
  onClick?: (id: string) => void
  showDate?: boolean
  className?: string
}

export default function AppointmentCard({
  appointment,
  actions,
  onClick,
  showDate = false,
  className = "",
}: AppointmentCardProps) {
  const handleClick = () => {
    if (onClick) {
      onClick(appointment.id)
    }
  }

  return (
    <div
      className={`flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors ${className}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-4">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-blue-600 font-medium">
            <Clock className="h-4 w-4" />
            {appointment.time}
            {showDate && appointment.date && <span>- {appointment.date}</span>}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <User className="h-4 w-4 text-gray-500" />
          <div>
            <div className="font-medium">{appointment.patient.name}</div>
            <div className="text-sm text-gray-500">{appointment.reason}</div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-gray-500">
          <Phone className="h-4 w-4" />
          <span className="text-sm">{appointment.patient.phone}</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <AppointmentStatusBadge status={appointment.status} />
        {appointment.duration && <span className="text-sm text-gray-500">{appointment.duration} phút</span>}
      </div>
    </div>
  )
}
