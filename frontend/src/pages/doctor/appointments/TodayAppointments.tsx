import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Calendar, Clock } from "lucide-react"
import AppointmentTable from "@/components/doctor/appointments/AppointmentTable"

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

        {/* Appointments Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách cuộc hẹn - {new Date().toLocaleDateString("vi-VN")}</CardTitle>
          </CardHeader>
          <CardContent>
            <AppointmentTable
              appointments={appointments}
              getStatusColor={getStatusColor}
              getStatusText={getStatusText}
            />
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
