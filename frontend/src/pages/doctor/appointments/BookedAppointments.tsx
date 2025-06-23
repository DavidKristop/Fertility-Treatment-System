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

// Mock data cho các lịch đã đặt
const bookedAppointments = [
  {
    id: 1,
    bookingDate: "2024-01-10",
    appointmentDate: "2024-01-15",
    time: "09:00",
    patient: {
      name: "Nguyễn Thị Lan",
      age: 32,
      phone: "0901234567",
      email: "lan.nguyen@email.com",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
    },
    service: "Khám sàng lọc + Tư vấn IVF",
    type: "screening_consultation",
    status: "confirmed",
    notes: "Lần đầu khám, cần tư vấn chi tiết về quy trình IVF",
    duration: 60,
  },
  {
    id: 2,
    bookingDate: "2024-01-11",
    appointmentDate: "2024-01-15",
    time: "10:30",
    patient: {
      name: "Trần Văn Nam",
      age: 35,
      phone: "0912345678",
      email: "nam.tran@email.com",
      address: "456 Lê Lợi, Q3, TP.HCM",
    },
    service: "Khám sàng lọc + Tư vấn IUI",
    type: "screening_consultation",
    status: "confirmed",
    notes: "Đã có kết quả xét nghiệm cơ bản",
    duration: 45,
  },
  {
    id: 3,
    bookingDate: "2024-01-12",
    appointmentDate: "2024-01-16",
    time: "14:00",
    patient: {
      name: "Lê Thị Hoa",
      age: 28,
      phone: "0923456789",
      email: "hoa.le@email.com",
      address: "789 Võ Văn Tần, Q3, TP.HCM",
    },
    service: "Khám sàng lọc ban đầu",
    type: "initial_screening",
    status: "confirmed",
    notes: "Cặp vợ chồng trẻ, cần tư vấn toàn diện",
    duration: 45,
  },
  {
    id: 4,
    bookingDate: "2024-01-13",
    appointmentDate: "2024-01-17",
    time: "15:30",
    patient: {
      name: "Phạm Minh Tuấn",
      age: 40,
      phone: "0934567890",
      email: "tuan.pham@email.com",
      address: "321 Điện Biên Phủ, Q1, TP.HCM",
    },
    service: "Tư vấn chuyên sâu + Khám sàng lọc",
    type: "detailed_consultation",
    status: "confirmed",
    notes: "Đã thất bại 2 lần IVF ở nơi khác",
    duration: 75,
  },
  {
    id: 5,
    bookingDate: "2024-01-14",
    appointmentDate: "2024-01-18",
    time: "09:30",
    patient: {
      name: "Võ Thị Mai",
      age: 29,
      phone: "0945678901",
      email: "mai.vo@email.com",
      address: "654 Cách Mạng Tháng 8, Q10, TP.HCM",
    },
    service: "Khám sàng lọc + Tư vấn IVF",
    type: "screening_consultation",
    status: "confirmed",
    notes: "Có tiền sử sảy thai, cần thăm khám kỹ",
    duration: 60,
  },
  {
    id: 6,
    bookingDate: "2024-01-15",
    appointmentDate: "2024-01-19",
    time: "11:00",
    patient: {
      name: "Hoàng Văn Đức",
      age: 38,
      phone: "0956789012",
      email: "duc.hoang@email.com",
      address: "987 Nguyễn Thị Minh Khai, Q3, TP.HCM",
    },
    service: "Khám sàng lọc nam giới",
    type: "male_screening",
    status: "confirmed",
    notes: "Tập trung khám sàng lọc yếu tố nam",
    duration: 30,
  },
]

export default function BookedAppointments() {
  const [searchTerm, setSearchTerm] = useState("")
  const [dateFilter, setDateFilter] = useState("all")
  const [serviceFilter, setServiceFilter] = useState("all")
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
      appointment.service.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesDate =
      dateFilter === "all" ||
      (dateFilter === "today" && appointment.appointmentDate === new Date().toISOString().split("T")[0]) ||
      (dateFilter === "tomorrow" &&
        appointment.appointmentDate === new Date(Date.now() + 86400000).toISOString().split("T")[0]) ||
      (dateFilter === "custom" && selectedDate && appointment.appointmentDate === selectedDate)

    const matchesService = serviceFilter === "all" || appointment.type === serviceFilter

    return matchesSearch && matchesDate && matchesService
  })

  const getServiceBadgeColor = (type: string) => {
    switch (type) {
      case "screening_consultation":
        return "bg-blue-100 text-blue-800"
      case "initial_screening":
        return "bg-green-100 text-green-800"
      case "detailed_consultation":
        return "bg-purple-100 text-purple-800"
      case "male_screening":
        return "bg-orange-100 text-orange-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getServiceText = (type: string) => {
    switch (type) {
      case "screening_consultation":
        return "Sàng lọc + Tư vấn"
      case "initial_screening":
        return "Sàng lọc ban đầu"
      case "detailed_consultation":
        return "Tư vấn chuyên sâu"
      case "male_screening":
        return "Sàng lọc nam giới"
      default:
        return type
    }
  }

  // Statistics
  const totalAppointments = bookedAppointments.length
  const todayAppointments = bookedAppointments.filter(
    (apt) => apt.appointmentDate === new Date().toISOString().split("T")[0],
  ).length
  const thisWeekAppointments = bookedAppointments.filter((apt) => {
    const aptDate = new Date(apt.appointmentDate)
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
                placeholder="Tìm kiếm bệnh nhân, SĐT, dịch vụ..."
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

            <Select value={serviceFilter} onValueChange={setServiceFilter}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Lọc theo dịch vụ" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tất cả dịch vụ</SelectItem>
                <SelectItem value="screening_consultation">Sàng lọc + Tư vấn</SelectItem>
                <SelectItem value="initial_screening">Sàng lọc ban đầu</SelectItem>
                <SelectItem value="detailed_consultation">Tư vấn chuyên sâu</SelectItem>
                <SelectItem value="male_screening">Sàng lọc nam giới</SelectItem>
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
                    <TableHead>Dịch vụ</TableHead>
                    <TableHead>Thời lượng</TableHead>
                    <TableHead>Ngày đặt</TableHead>
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
                            <span>{new Date(appointment.appointmentDate).toLocaleDateString("vi-VN")}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span className="font-semibold">{appointment.time}</span>
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
                        <div className="space-y-2">
                          <Badge className={getServiceBadgeColor(appointment.type)}>
                            {getServiceText(appointment.type)}
                          </Badge>
                          <div className="text-sm text-muted-foreground">{appointment.service}</div>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{appointment.duration} phút</span>
                        </div>
                      </TableCell>

                      <TableCell>
                        <div className="text-sm">{new Date(appointment.bookingDate).toLocaleDateString("vi-VN")}</div>
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
                            <DropdownMenuItem>
                              <Calendar className="mr-2 h-4 w-4" />
                              Dời lịch hẹn
                            </DropdownMenuItem>
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
                  {searchTerm || dateFilter !== "all" || serviceFilter !== "all"
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
              <CardTitle className="text-lg">Thống kê theo dịch vụ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  {
                    type: "screening_consultation",
                    count: bookedAppointments.filter((a) => a.type === "screening_consultation").length,
                  },
                  {
                    type: "initial_screening",
                    count: bookedAppointments.filter((a) => a.type === "initial_screening").length,
                  },
                  {
                    type: "detailed_consultation",
                    count: bookedAppointments.filter((a) => a.type === "detailed_consultation").length,
                  },
                  {
                    type: "male_screening",
                    count: bookedAppointments.filter((a) => a.type === "male_screening").length,
                  },
                ].map((stat) => (
                  <div key={stat.type} className="flex items-center justify-between">
                    <Badge className={getServiceBadgeColor(stat.type)}>{getServiceText(stat.type)}</Badge>
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
                    <p className="font-medium text-sm">Lịch tự động xác nhận</p>
                    <p className="text-xs text-muted-foreground">Tất cả lịch đặt đều được xác nhận tự động</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Users className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Khám lần đầu</p>
                    <p className="text-xs text-muted-foreground">Tất cả đều là lịch khám sàng lọc + tư vấn offline</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">Tại phòng khám</p>
                    <p className="text-xs text-muted-foreground">Tất cả cuộc hẹn đều diễn ra trực tiếp</p>
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
