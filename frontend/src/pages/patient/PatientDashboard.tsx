import PatientLayout from "@/components/patient/PatientLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  ClipboardList,
  Stethoscope,
} from "lucide-react"

// Mock data
const upcomingAppointments = [
  {
    id: 1,
    date: "2025-06-20",
    time: "10:30",
    doctor: "BS. Trần Minh",
    type: "Tái khám",
    status: "confirmed",
  },
  {
    id: 2,
    date: "2025-06-25",
    time: "14:00",
    doctor: "BS. Lê Hoa",
    type: "Tư vấn online",
    status: "pending",
  },
]

const recentPrescriptions = [
  {
    id: 1,
    date: "2025-06-10",
    doctor: "BS. Trần Minh",
    medicine: "Progynova",
    status: "active",
  },
  {
    id: 2,
    date: "2025-05-28",
    doctor: "BS. Lê Hoa",
    medicine: "Aspirin",
    status: "completed",
  },
]

const treatmentProgress = {
  currentStage: "Giai đoạn 2: Kích thích buồng trứng",
  completed: 2,
  total: 5,
}

const notifications = [
  {
    id: 1,
    message: "Kết quả xét nghiệm nội tiết tố đã sẵn sàng",
    time: "5 phút trước",
  },
  {
    id: 2,
    message: "Bạn có cuộc hẹn với BS. Trần Minh vào 20/06",
    time: "1 ngày trước",
  },
]

export default function PatientDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <PatientLayout title="Trang cá nhân" breadcrumbs={[{ label: "Trang chủ" }]}>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Cuộc hẹn sắp tới</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{upcomingAppointments.length}</div>
              <p className="text-xs text-muted-foreground">Hãy đến đúng giờ bạn nhé!</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Đơn thuốc đang dùng</CardTitle>
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1</div>
              <p className="text-xs text-muted-foreground">Cập nhật mới nhất ngày 10/06</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tiến độ điều trị</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {treatmentProgress.completed}/{treatmentProgress.total}
              </div>
              <p className="text-xs text-muted-foreground">{treatmentProgress.currentStage}</p>
            </CardContent>
          </Card>
        </div>

        {/* Appointments */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Lịch hẹn sắp tới</CardTitle>
            <Button size="sm" variant="outline">Xem tất cả</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((appt) => (
              <div key={appt.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{appt.date} - {appt.time}</div>
                  <div className="text-sm text-muted-foreground">{appt.type} với {appt.doctor}</div>
                </div>
                <Badge className={getStatusColor(appt.status)}>
                  {appt.status === "confirmed" ? "Đã xác nhận" : "Chờ xác nhận"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Prescriptions */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Đơn thuốc gần đây</CardTitle>
            <Button size="sm" variant="outline">Xem chi tiết</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentPrescriptions.map((rx) => (
              <div key={rx.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{rx.medicine}</div>
                  <div className="text-sm text-muted-foreground">
                    Ngày kê: {rx.date} – {rx.doctor}
                  </div>
                </div>
                <Badge variant={rx.status === "active" ? "default" : "secondary"}>
                  {rx.status === "active" ? "Đang dùng" : "Đã hoàn tất"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Thông báo mới</CardTitle>
            <Button size="sm" variant="outline">Xem tất cả</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm">{n.message}</div>
                  <div className="text-xs text-muted-foreground">{n.time}</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </PatientLayout>
  )
}
