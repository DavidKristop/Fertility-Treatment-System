import StaffLayout from "@/components/staff/StaffLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Calendar,
  Users,
  DollarSign,
} from "lucide-react"

// Mock data
const dashboardStats = {
  totalAppointments: 45,
  activeStaff: 12,
  dailyRevenue: 15000000, // in VND
}

const staffSchedules = [
  {
    id: 1,
    name: "BS. Trần Minh",
    role: "Bác sĩ",
    shift: "08:00 - 16:00",
    status: "on-duty",
  },
  {
    id: 2,
    name: "Lê Hoa",
    role: "Y tá",
    shift: "12:00 - 20:00",
    status: "on-duty",
  },
]

const operationalReports = [
  {
    id: 1,
    title: "Tỷ lệ hoàn thành lịch hẹn",
    value: "95%",
    status: "positive",
  },
  {
    id: 2,
    title: "Độ hài lòng của bệnh nhân",
    value: "4.8/5",
    status: "positive",
  },
]

const facilityAlerts = [
  {
    id: 1,
    message: "Máy siêu âm phòng 3 cần bảo trì",
    time: "30 phút trước",
    priority: "high",
  },
  {
    id: 2,
    message: "Hết thuốc Progynova tại kho",
    time: "2 giờ trước",
    priority: "medium",
  },
]

export default function StaffDashboard() {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "on-duty":
        return "bg-green-100 text-green-800"
      case "off-duty":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      case "medium":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <StaffLayout title="Bảng điều khiển nhân viên" breadcrumbs={[{ label: "Trang chủ" }]}>
      <div className="space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tổng lịch hẹn hôm nay</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.totalAppointments}</div>
              <p className="text-xs text-muted-foreground">Cập nhật lúc 08:00</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Nhân viên đang làm việc</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{dashboardStats.activeStaff}</div>
              <p className="text-xs text-muted-foreground">Ca trực hiện tại</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{(dashboardStats.dailyRevenue / 1000000).toFixed(1)}M VND</div>
              <p className="text-xs text-muted-foreground">Tính đến 08:00</p>
            </CardContent>
          </Card>
        </div>

        {/* Staff Schedules */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Lịch trực nhân viên</CardTitle>
            <Button size="sm" variant="outline">Quản lý lịch trực</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {staffSchedules.map((staff) => (
              <div key={staff.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{staff.name}</div>
                  <div className="text-sm text-muted-foreground">{staff.role} – {staff.shift}</div>
                </div>
                <Badge className={getStatusColor(staff.status)}>
                  {staff.status === "on-duty" ? "Đang trực" : "Nghỉ"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Operational Reports */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Báo cáo vận hành</CardTitle>
            <Button size="sm" variant="outline">Xem chi tiết</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {operationalReports.map((report) => (
              <div key={report.id} className="flex justify-between items-center p-3 border rounded-lg">
                <div>
                  <div className="font-medium">{report.title}</div>
                  <div className="text-sm text-muted-foreground">{report.value}</div>
                </div>
                <Badge variant={report.status === "positive" ? "default" : "secondary"}>
                  {report.status === "positive" ? "Tích cực" : "Bình thường"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Facility Alerts */}
        <Card>
          <CardHeader className="flex justify-between items-center">
            <CardTitle>Cảnh báo cơ sở vật chất</CardTitle>
            <Button size="sm" variant="outline">Xem tất cả</Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {facilityAlerts.map((alert) => (
              <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2" />
                <div className="flex-1">
                  <div className="text-sm">{alert.message}</div>
                  <div className="text-xs text-muted-foreground">{alert.time}</div>
                </div>
                <Badge className={getPriorityColor(alert.priority)}>
                  {alert.priority === "high" ? "Cao" : "Trung bình"}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </StaffLayout>
  )
}