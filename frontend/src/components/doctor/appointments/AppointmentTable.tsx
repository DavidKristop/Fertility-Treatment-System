import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, MoreHorizontal, CheckCircle, Calendar, X } from "lucide-react"

interface Appointment {
  id: number
  time: string
  patient: {
    name: string
    age: number
    phone: string
    avatar: string
  }
  reason: string
  status: string
  duration: number
}

interface AppointmentTableProps {
  appointments: Appointment[]
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export default function AppointmentTable({ appointments, getStatusColor, getStatusText }: AppointmentTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Thời gian</TableHead>
            <TableHead>Bệnh nhân</TableHead>
            <TableHead>Lý do khám</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Thời lượng</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell className="font-medium">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {appointment.time}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{appointment.patient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{appointment.patient.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.patient.age} tuổi • {appointment.patient.phone}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <p className="text-sm">{appointment.reason}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
              </TableCell>
              <TableCell>{appointment.duration} phút</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Xem chi tiết
                    </DropdownMenuItem>
                    {appointment.status === "pending" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Xác nhận
                      </DropdownMenuItem>
                    )}
                    {appointment.status !== "completed" && appointment.status !== "cancelled" && (
                      <>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4" />
                          Dời lịch
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <X className="mr-2 h-4 w-4" />
                          Hủy cuộc hẹn
                        </DropdownMenuItem>
                      </>
                    )}
                    {appointment.status === "confirmed" && (
                      <DropdownMenuItem>
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Đánh dấu hoàn thành
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
