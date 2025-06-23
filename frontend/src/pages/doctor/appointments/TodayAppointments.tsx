import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Clock, MoreHorizontal, Search, CheckCircle, X, Calendar } from "lucide-react"

// Mock data - chỉ khám trực tiếp
const appointments = [
  {
    id: 1,
    time: "09:00",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      avatar: "",
    },
    reason: "Tái khám IVF - Giai đoạn 2",
    status: "confirmed",
    duration: 30,
  },
  {
    id: 2,
    time: "10:30",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      avatar: "",
    },
    reason: "Tư vấn kết quả xét nghiệm",
    status: "pending",
    duration: 20,
  },
  {
    id: 3,
    time: "14:00",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      avatar: "",
    },
    reason: "Khám đầu - Tư vấn IUI",
    status: "confirmed",
    duration: 45,
  },
  {
    id: 4,
    time: "15:30",
    patient: {
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      avatar: "",
    },
    reason: "Theo dõi sau chuyển phôi",
    status: "completed",
    duration: 30,
  },
  {
    id: 5,
    time: "16:30",
    patient: {
      name: "Võ Thị Mai",
      age: 29,
      phone: "0945678901",
      avatar: "",
    },
    reason: "Tư vấn kế hoạch điều trị",
    status: "cancelled",
    duration: 30,
  },
]

export default function TodayAppointments() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận"
      case "pending":
        return "Chờ xác nhận"
      case "completed":
        return "Đã hoàn thành"
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Cuộc hẹn" },
    { label: "Danh sách hôm nay" },
  ]

  return (
    <DoctorLayout title="Cuộc hẹn hôm nay" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Tìm kiếm bệnh nhân..." className="pl-10 w-80" />
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Xem lịch
            </Button>
            <Button>
              <Clock className="h-4 w-4 mr-2" />
              Tạo cuộc hẹn
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng cuộc hẹn</p>
                  <p className="text-2xl font-bold">5</p>
                </div>
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đã xác nhận</p>
                  <p className="text-2xl font-bold text-green-600">2</p>
                </div>
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Chờ xác nhận</p>
                  <p className="text-2xl font-bold text-yellow-600">1</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đã hoàn thành</p>
                  <p className="text-2xl font-bold text-blue-600">1</p>
                </div>
                <CheckCircle className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách cuộc hẹn - {new Date().toLocaleDateString("vi-VN")}</CardTitle>
          </CardHeader>
          <CardContent>
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
                        <Badge className={getStatusColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
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
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
