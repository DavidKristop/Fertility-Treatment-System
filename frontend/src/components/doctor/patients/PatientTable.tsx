import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, User, Calendar, FileText, Phone, Mail, MapPin } from "lucide-react"

interface Patient {
  id: number
  name: string
  age: number
  phone: string
  email: string
  address: string
  treatmentPlan: string
  status: string
  lastVisit: string
  nextAppointment: string | null
}

interface PatientTableProps {
  patients: Patient[]
  getStatusColor: (status: string) => string
  getStatusText: (status: string) => string
}

export default function PatientTable({ patients, getStatusColor, getStatusText }: PatientTableProps) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Bệnh nhân</TableHead>
            <TableHead>Liên hệ</TableHead>
            <TableHead>Kế hoạch điều trị</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead>Lần khám cuối</TableHead>
            <TableHead>Cuộc hẹn tiếp theo</TableHead>
            <TableHead className="text-right">Hành động</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {patients.map((patient) => (
            <TableRow key={patient.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <span className="text-sm font-medium">{patient.name.charAt(0)}</span>
                  </div>
                  <div>
                    <div className="font-medium">{patient.name}</div>
                    <div className="text-sm text-muted-foreground">{patient.age} tuổi</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="h-3 w-3" />
                    {patient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="h-3 w-3" />
                    {patient.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-3 w-3" />
                    {patient.address}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-xs">
                  <p className="text-sm font-medium">{patient.treatmentPlan}</p>
                </div>
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(patient.status)}>{getStatusText(patient.status)}</Badge>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-3 w-3" />
                  {patient.lastVisit}
                </div>
              </TableCell>
              <TableCell>
                {patient.nextAppointment ? (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3" />
                    {patient.nextAppointment}
                  </div>
                ) : (
                  <span className="text-sm text-muted-foreground">Chưa có</span>
                )}
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Xem hồ sơ
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Calendar className="mr-2 h-4 w-4" />
                      Đặt lịch hẹn
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      Xem kế hoạch điều trị
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Phone className="mr-2 h-4 w-4" />
                      Gọi điện
                    </DropdownMenuItem>
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
