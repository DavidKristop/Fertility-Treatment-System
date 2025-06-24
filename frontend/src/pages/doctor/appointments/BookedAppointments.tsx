"use client"

import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Calendar,
  Clock,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Phone,
  Mail,
  MapPin,
  Users,
  CalendarCheck,
  AlertCircle,
} from "lucide-react"
import { useState } from "react"

// Mock data cho các lịch đã đặt (aligned with ERD - Schedule table)
const bookedAppointments = [
  {
    id: "550e8400-e29b-41d4-a716-446655440001",
    appointmentDatetime: "15-01-2024 09:00",
    estimatedTime: "15-01-2024 10:00",
    status: "Done", // Pending, Changed, Done, Cancel
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440011",
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
    },
    treatmentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440021",
      title: "Giai đoạn 1: Khám và tư vấn",
      description: "Khám sàng lọc ban đầu và tư vấn phác đồ điều trị",
    },
    notes: "Lần đầu khám, cần tư vấn chi tiết về quy trình IVF",
    duration: 60,
    bookingDate: "10-01-2024",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440002",
    appointmentDatetime: "15-01-2024 10:30",
    estimatedTime: "15-01-2024 11:15",
    status: "Done",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440012",
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
      address: "456 Lê Lợi, Q3, TP.HCM",
    },
    treatmentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440022",
      title: "Giai đoạn 1: Khám và tư vấn",
      description: "Khám sàng lọc ban đầu và tư vấn phác đồ điều trị",
    },
    notes: "Đã có kết quả xét nghiệm cơ bản",
    duration: 45,
    bookingDate: "11-01-2024",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440003",
    appointmentDatetime: "16-01-2024 14:00",
    estimatedTime: "16-01-2024 14:45",
    status: "Pending",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440013",
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
      address: "789 Võ Văn Tần, Q3, TP.HCM",
    },
    treatmentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440023",
      title: "Giai đoạn 1: Khám sàng lọc ban đầu",
      description: "Khám sàng lọc toàn diện cho cặp vợ chồng",
    },
    notes: "Cặp vợ chồng trẻ, cần tư vấn toàn diện",
    duration: 45,
    bookingDate: "12-01-2024",
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440004",
    appointmentDatetime: "17-01-2024 15:30",
    estimatedTime: "17-01-2024 16:45",
    status: "Pending",
    patient: {
      id: "550e8400-e29b-41d4-a716-446655440014",
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
      address: "321 Điện Biên Phủ, Q1, TP.HCM",
    },
    treatmentPhase: {
      id: "550e8400-e29b-41d4-a716-446655440024",
      title: "Giai đoạn 2: Tư vấn chuyên sâu",
      description: "Tư vấn chi tiết về phác đồ điều trị phù hợp",
    },
    notes: "Đã thất bại 2 lần IVF ở nơi khác",
    duration: 75,
    bookingDate: "13-01-2024",
  },
]

export default function BookedAppointments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  const breadcrumbs = [
    { label: "Trang chủ", path: "/doctor/dashboard" },
    { label: "Cuộc hẹn" },
    { label: "Lịch đã đặt" },
  ]

  // Filter appointments
  const filteredAppointments = bookedAppointments.filter((appointment) => {
    const matchesSearch =
      appointment.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.patient.phone.includes(searchTerm) ||
      appointment.treatmentPhase.title.toLowerCase().includes(searchTerm.toLowerCase())

    const appointmentDate = appointment.appointmentDatetime.split(" ")[0]
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
    const tomorrow = new Date(Date.now() + 86400000).toLocaleDateString("en-GB").replace(/\//g, "-")

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && appointmentDate === today) ||
      (dateFilter === "tomorrow" && appointmentDate === tomorrow) ||
      (dateFilter === "custom" && selectedDate && appointmentDate === selectedDate.split("-").reverse().join("-"))

    const matchesStatus = statusFilter === "all" || appointment.status === statusFilter

    return matchesSearch && matchesDate && matchesStatus
  })

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "Done":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Changed":
        return "bg-blue-100 text-blue-800"
      case "Cancel":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "Done":
        return "Đã hoàn thành"
      case "Pending":
        return "Chờ khám"
      case "Changed":
        return "Đã thay đổi"
      case "Cancel":
        return "Đã hủy"
      default:
        return status
    }
  }

  // Statistics
  const totalAppointments = bookedAppointments.length
  const todayAppointments = bookedAppointments.filter((apt) => {
    const today = new Date().toLocaleDateString("en-GB").replace(/\//g, "-")
    return apt.appointmentDatetime.split(" ")[0] === today
  }).length
  const thisWeekAppointments = bookedAppointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentDatetime.split(" ")[0].split("-").reverse().join("-"))
    const today = new Date()
    const weekStart = new Date(today.setDate(today.getDate() - today.getDay()))
    const weekEnd = new Date(today.setDate(today.getDate() - today.getDay() + 6))
    return aptDate >= weekStart && aptDate <= weekEnd
  }).length

  return (
    <DoctorLayout title="Lịch đã đặt" breadcrumbs={breadcrumbs}>
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Tìm kiếm bệnh nhân, SĐT, giai đoạn..."
                className="pl-10 w-80"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo ngày" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả ngày</SelectItem>
                <SelectItem value="today">Hôm nay</SelectItem>
                <SelectItem value="tomorrow">Ngày mai</SelectItem>
                <SelectItem value="custom">Chọn ngày</SelectItem>
              </SelectContent>
            </Select>

            {dateFilter === "custom" && (
              <Input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-48"
              />
            )}

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả trạng thái</SelectItem>
                <SelectItem value="Pending">Chờ khám</SelectItem>
                <SelectItem value="Done">Đã hoàn thành</SelectItem>
                <SelectItem value="Changed">Đã thay đổi</SelectItem>
                <SelectItem value="Cancel">Đã hủy</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button variant="outline">
              <Calendar className="h-4 w-4 mr-2" />
              Xem lịch
            </Button>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Bộ lọc nâng cao
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tổng lịch đã đặt</p>
                  <p className="text-2xl font-bold">{totalAppointments}</p>
                </div>
                <CalendarCheck className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Hôm nay</p>
                  <p className="text-2xl font-bold text-green-600">{todayAppointments}</p>
                </div>
                <Clock className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tuần này</p>
                  <p className="text-2xl font-bold text-purple-600">{thisWeekAppointments}</p>
                </div>
                <Calendar className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Đã lọc</p>
                  <p className="text-2xl font-bold text-orange-600">{filteredAppointments.length}</p>
                </div>
                <Filter className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CalendarCheck className="h-5 w-5" />
              Danh sách lịch đã đặt ({filteredAppointments.length} lịch hẹn)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Ngày & Giờ hẹn</TableHead>
                    <TableHead>Bệnh nhân</TableHead>
                    <TableHead>Giai đoạn điều trị</TableHead>
                    <TableHead>Thời lượng dự kiến</TableHead>
                    <TableHead>Trạng thái</TableHead>
                    <TableHead>Ghi chú</TableHead>
                    <TableHead className="text-right">Hành động</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell className="font-medium">
                        <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{appointment.appointmentDatetime.split(" ")[0]}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{appointment.appointmentDatetime.split(" ")[1]}</span>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-sm font-medium">{appointment.patient.name.charAt(0)}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="font-medium">{appointment.patient.name}</div>
                            <div className="text-sm text-muted-foreground">{appointment.patient.age} tuổi</div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Phone className="h-3 w-3" />
                              {appointment.patient.phone}
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Mail className="h-3 w-3" />
                              {appointment.patient.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{appointment.treatmentPhase.title}</div>
                          <div className="text-sm text-muted-foreground">{appointment.treatmentPhase.description}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.duration} phút</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                          Dự kiến: {appointment.estimatedTime.split(" ")[1]}
                        </div>
                      </TableCell>

                      <TableCell>
                        <Badge className={getStatusBadgeColor(appointment.status)}>
                          {getStatusText(appointment.status)}
                        </Badge>
                      </TableCell>

                      <TableCell>
                        <div className="max-w-xs">
                          {appointment.notes && (
                            <div className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
                              <p className="text-sm text-muted-foreground">{appointment.notes}</p>
                            </div>
                          )}
                        </div>
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
                              <Eye className="mr-2 h-4 w-4" />
                              Xem chi tiết
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Phone className="mr-2 h-4 w-4" />
                              Gọi điện
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Mail className="mr-2 h-4 w-4" />
                              Gửi email
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <MapPin className="mr-2 h-4 w-4" />
                              Xem địa chỉ
                            </DropdownMenuItem>
                            {appointment.status === "Pending" && (
                              <DropdownMenuItem>
                                <Calendar className="mr-2 h-4 w-4" />
                                Dời lịch hẹn
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

            {filteredAppointments.length === 0 && (
              <div className="text-center py-8">
                <CalendarCheck className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-medium text-muted-foreground mb-2">Không có lịch hẹn nào</h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || dateFilter !== "all" || statusFilter !== "all"
                    ? "Thử thay đổi bộ lọc để xem thêm kết quả"
                    : "Chưa có lịch hẹn nào được đặt"}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Thống kê theo trạng thái</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    status: "Done",
                    count: bookedAppointments.filter((a) => a.status === "Done").length,
                  },
                  {
                    status: "Pending",
                    count: bookedAppointments.filter((a) => a.status === "Pending").length,
                  },
                  {
                    status: "Changed",
                    count: bookedAppointments.filter((a) => a.status === "Changed").length,
                  },
                  {
                    status: "Cancel",
                    count: bookedAppointments.filter((a) => a.status === "Cancel").length,
                  },
                ].map((stat) => (
                  <div key={stat.status} className="flex items-center justify-between">
                    <Badge className={getStatusBadgeColor(stat.status)}>{getStatusText(stat.status)}</Badge>
                    <span className="font-semibold">{stat.count} lịch</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lưu ý quan trọng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Lịch hẹn theo giai đoạn</p>
                    <p className="text-xs text-muted-foreground">Mỗi lịch hẹn thuộc về một giai đoạn điều trị cụ th���</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Thời gian dự kiến</p>
                    <p className="text-xs text-muted-foreground">
                      Thời gian kết thúc được tính dựa trên thời lượng dự kiến
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Tại phòng khám</p>
                    <p className="text-xs text-muted-foreground">
                      Tất cả cuộc hẹn đều diễn ra trực tiếp tại phòng khám
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DoctorLayout>
  )
}
