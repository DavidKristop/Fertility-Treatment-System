import DoctorLayout from "@/components/doctor/DoctorLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Users, Clock, AlertCircle, DollarSign, Activity, Plus, Search, Pill } from "lucide-react"

// Mock data
const todayAppointments = [
  {
    id: 1,
    time: "09:00",
    patient: "Nguyễn Thị Lan",
    type: "Tái khám",
    status: "confirmed",
  },
  {
    id: 2,
    time: "10:30",
    patient: "Trần Văn Nam",
    type: "Khám đầu",
    status: "pending",
  },
  {
    id: 3,
    time: "14:00",
    patient: "Lê Thị Hoa",
    type: "Tư vấn online",
    status: "confirmed",
  },
  {
    id: 4,
    time: "15:30",
    patient: "Phạm Minh Tuấn",
    type: "Theo dõi",
    status: "confirmed",
  },
]

const recentNotifications = [
  {
    id: 1,
    message: "Bệnh nhân Nguyễn Thị Lan đã thanh toán giai đoạn 2",
    time: "10 phút trước",
    type: "payment",
  },
  {
    id: 2,
    message: "Nhắc nhở: Cuộc hẹn với Trần Văn Nam lúc 10:30",
    time: "30 phút trước",
    type: "reminder",
  },
  {
    id: 3,
    message: "Yêu cầu hoàn tiền từ Lê Thị Mai",
    time: "1 giờ trước",
    type: "refund",
  },
]

const upcomingStages = [
  {
    id: 1,
    patient: "Nguyễn Thị Lan",
    stage: "Giai đoạn 3: Chuyển phôi",
    dueDate: "2024-01-15",
    status: "upcoming",
  },
  {
    id: 2,
    patient: "Trần Văn Nam",
    stage: "Giai đoạn 2: Kích thích buồng trứng",
    dueDate: "2024-01-12",
    status: "overdue",
  },
]

export default function DoctorDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
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
      case "cancelled":
        return "Đã hủy"
      default:
        return status
    }
  }

  return (
    <DoctorLayout title="Bảng điều khiển" breadcrumbs={[{ label: "Trang chủ" }]}>
      <div className="space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Cuộc hẹn hôm nay</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4</div>
              <p className="text-xs text-muted-foreground">+2 so với hôm qua</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bệnh nhân đang điều trị</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">23</div>
              <p className="text-xs text-muted-foreground">+3 bệnh nhân mới tuần này</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Thanh toán chờ</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Tổng: 45.000.000 VNĐ</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Giai đoạn sắp đến hạn</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 giai đoạn quá hạn</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Tác vụ nhanh</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Button className="h-20 flex flex-col gap-2">
                <Plus className="h-6 w-6" />
                <span>Tạo cuộc hẹn</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Search className="h-6 w-6" />
                <span>Tìm bệnh nhân</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col gap-2">
                <Pill className="h-6 w-6" />
                <span>Tạo đơn thuốc</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Today's Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Lịch hẹn hôm nay</CardTitle>
              <Button variant="outline" size="sm">
                Xem tất cả
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todayAppointments.map((appointment) => (
                  <div key={appointment.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{appointment.time}</span>
                      </div>
                      <div>
                        <div className="font-medium">{appointment.patient}</div>
                        <div className="text-sm text-muted-foreground">{appointment.type}</div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(appointment.status)}>{getStatusText(appointment.status)}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Treatment Progress */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Tiến độ điều trị</CardTitle>
              <Button variant="outline" size="sm">
                Xem chi tiết
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingStages.map((stage) => (
                  <div key={stage.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <div className="font-medium">{stage.patient}</div>
                      <div className="text-sm text-muted-foreground">{stage.stage}</div>
                      <div className="text-xs text-muted-foreground">Đến hạn: {stage.dueDate}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      {stage.status === "overdue" && <AlertCircle className="h-4 w-4 text-red-500" />}
                      <Badge
                        className={stage.status === "overdue" ? "bg-red-100 text-red-800" : "bg-blue-100 text-blue-800"}
                      >
                        {stage.status === "overdue" ? "Quá hạn" : "Sắp đến"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Thông báo gần đây</CardTitle>
            <Button variant="outline" size="sm">
              Xem tất cả
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotifications.map((notification) => (
                <div key={notification.id} className="flex items-start gap-3 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="text-sm">{notification.message}</div>
                    <div className="text-xs text-muted-foreground">{notification.time}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DoctorLayout>
  )
}
