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
      
    </div>
  )
}