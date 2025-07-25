import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Users,
  DollarSign,
  Server,
} from "lucide-react"
import { useAuthHeader } from "@/lib/context/AuthHeaderContext"
import { useEffect } from "react"

// Mock data
const systemStats = {
  totalUsers: 1200,
  dailyRevenue: 25000000, // in VND
  systemUptime: "99.98%",
}

const recentUsers = [
  {
    id: 1,
    name: "Nguyễn Văn Hùng",
    role: "Bệnh nhân",
    registeredDate: "2025-06-23",
    status: "active",
  },
  {
    id: 2,
    name: "BS. Phạm Thị Mai",
    role: "Bác sĩ",
    registeredDate: "2025-06-22",
    status: "pending",
  },
]

const systemAnalytics = [
  {
    id: 1,
    metric: "Tỷ lệ hoàn thành lịch hẹn",
    value: "92%",
    trend: "positive",
  },
  {
    id: 2,
    metric: "Doanh thu tháng này",
    value: "150M VND",
    trend: "positive",
  },
]

const criticalAlerts = [
  {
    id: 1,
    message: "Lỗi kết nối cơ sở dữ liệu lúc 08:30",
    time: "1 giờ trước",
    priority: "high",
  },
  {
    id: 2,
    message: "Phát hiện truy cập trái phép vào hệ thống",
    time: "3 giờ trước",
    priority: "high",
  },
]

export default function AdminDashboard() {
  const {setTitle,setBreadCrumbs} = useAuthHeader()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "pending":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case "positive":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    setTitle("Bảng điều khiển quản trị")
    setBreadCrumbs([
      { label: "Trang chủ", path: "/admin" },
    ])
  },[])

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Tổng số người dùng</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">Cập nhật lúc 09:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Doanh thu hôm nay</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{(systemStats.dailyRevenue / 1000000).toFixed(1)}M VND</div>
            <p className="text-xs text-muted-foreground">Tính đến 09:00</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Thời gian hoạt động hệ thống</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{systemStats.systemUptime}</div>
            <p className="text-xs text-muted-foreground">Trong 24 giờ qua</p>
          </CardContent>
        </Card>
      </div>

      {/* User Management */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Người dùng mới đăng ký</CardTitle>
          <Button size="sm" variant="outline">Quản lý người dùng</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {recentUsers.map((user) => (
            <div key={user.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-muted-foreground">
                  {user.role} – Ngày đăng ký: {user.registeredDate}
                </div>
              </div>
              <Badge className={getStatusColor(user.status)}>
                {user.status === "active" ? "Đang hoạt động" : "Chờ duyệt"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* System Analytics */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Phân tích hệ thống</CardTitle>
          <Button size="sm" variant="outline">Xem báo cáo chi tiết</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {systemAnalytics.map((analytic) => (
            <div key={analytic.id} className="flex justify-between items-center p-3 border rounded-lg">
              <div>
                <div className="font-medium">{analytic.metric}</div>
                <div className="text-sm text-muted-foreground">{analytic.value}</div>
              </div>
              <Badge className={getTrendColor(analytic.trend)}>
                {analytic.trend === "positive" ? "Tích cực" : "Bình thường"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Critical Alerts */}
      <Card>
        <CardHeader className="flex justify-between items-center">
          <CardTitle>Cảnh báo hệ thống</CardTitle>
          <Button size="sm" variant="outline">Xem tất cả</Button>
        </CardHeader>
        <CardContent className="space-y-3">
          {criticalAlerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 border rounded-lg">
              <div className="w-2 h-2 bg-red-500 rounded-full mt-2" />
              <div className="flex-1">
                <div className="text-sm">{alert.message}</div>
                <div className="text-xs text-muted-foreground">{alert.time}</div>
              </div>
              <Badge className={getPriorityColor(alert.priority)}>
                {alert.priority === "high" ? "Ưu tiên cao" : "Bình thường"}
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}