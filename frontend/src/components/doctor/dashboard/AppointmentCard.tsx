import { Badge } from "@/components/ui/badge"
import { Clock, Phone } from "lucide-react"

interface AppointmentCardProps {
  appointment: {
    id: number
    time: string
    patient: string
    type: string
    status: string
    phone: string
  }
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export default function AppointmentCard({ appointment, getStatusColor, getStatusText }: AppointmentCardProps) {
  return (
    <div className="flex items-center justify-between p-3 border rounded-lg">
      <div className="flex items-center gap-3">
        <div className="flex flex-col items-center">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">{appointment.time}</span>
        </div>
        <div>
          <p className="font-medium">{appointment.patient}</p>
          <p className="text-sm text-muted-foreground">{appointment.type}</p>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Phone className="h-3 w-3" />
            {appointment.phone}
          </p>
        </div>
      </div>
      <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
    </div>
  )
}
